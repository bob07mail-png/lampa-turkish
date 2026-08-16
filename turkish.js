(function () {
    'use strict';

    function initPlugin() {
        // Створюємо компонент для відображення серіалів
        Lampa.Component.add('turkish_series_page', function () {
            this.create = function () {
                var _this = this;
                this.activity.loader(true);

                // Запит до TMDB
                Lampa.Api.sources.tmdb.get('discover/tv?with_origin_country=TR&sort_by=popularity.desc', {}, function (data) {
                    _this.build(data);
                }, function () {
                    _this.empty();
                });
            };

            this.build = function (data) {
                this.activity.loader(false);
                var scroll = new Lampa.Scroll({mask: true, over: true});
                var display = new Lampa.Extract();
                var items = data.results || [];

                if (items.length) {
                    items.forEach(function (element) {
                        var card = Lampa.Template.get('card', element);
                        card.on('hover:enter', function () {
                            Lampa.Activity.push({
                                url: '',
                                component: 'full',
                                id: element.id,
                                method: 'tv',
                                card: element
                            });
                        });
                        scroll.append(card);
                    });
                }

                this.activity.toggle(scroll.render());
            };

            this.empty = function () {
                this.activity.loader(false);
                this.activity.toggle(Lampa.Template.get('empty'));
            };
        });

        // Безпечний виклик через Listener без використання Lampa.Menu.add
        Lampa.Listener.follow('catalog', function (e) {
            if (e.type === 'compleat') {
                e.data.push({
                    title: 'Турецькі серіали',
                    url: 'discover/tv?with_origin_country=TR&sort_by=popularity.desc',
                    component: 'category_full',
                    source: 'tmdb',
                    card_type: 'tv'
                });
            }
        });
    }

    if (window.appready) {
        initPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') initPlugin();
        });
    }
})();
