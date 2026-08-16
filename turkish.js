(function () {
    'use strict';

    function addTurkishSection() {
        // Реєструємо компонент турецьких серіалів
        Lampa.Component.add('turkish_series', function () {
            this.create = function () {
                var _this = this;
                this.activity.loader(true);

                Lampa.Api.sources.tmdb.get('discover/tv?with_origin_country=TR&sort_by=popularity.desc', {}, function (data) {
                    _this.build(data);
                }, function () {
                    _this.empty();
                });
            };

            this.build = function (data) {
                var _this = this;
                this.activity.loader(false);
                
                Lampa.Activity.push({
                    title: 'Турецькі серіали',
                    component: 'category_full',
                    source: 'tmdb',
                    card_type: 'tv',
                    results: data.results,
                    more: data
                });
            };
        });

        // Додаємо пункт у головне меню
        var menu_item = {
            title: 'Турецькі серіали',
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
            component: 'turkish_series'
        };

        // Вставляємо в ліве меню
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') {
                if (Lampa.Menu.add) {
                    Lampa.Menu.add(menu_item);
                }
            }
        });
    }

    if (window.appready) {
        addTurkishSection();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') addTurkishSection();
        });
    }
})();
