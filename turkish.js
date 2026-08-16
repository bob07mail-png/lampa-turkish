(function () {
    'use strict';

    function addTurkish() {
        // Перевіряємо чи є меню
        if (typeof Lampa !== 'undefined' && Lampa.Menu && Lampa.Menu.add) {
            
            // Створюємо компонент
            Lampa.Component.add('turkish_tv', function () {
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

                this.empty = function () {
                    this.activity.loader(false);
                    this.activity.toggle(Lampa.Template.get('empty'));
                };
            });

            // Додаємо в меню
            Lampa.Menu.add({
                title: 'Турецькі серіали',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
                component: 'turkish_tv'
            });
        }
    }

    // Безпечний запуск після повної готовності додатка
    if (window.appready) {
        addTurkish();
    } else {
        if (typeof Lampa !== 'undefined' && Lampa.Listener) {
            Lampa.Listener.follow('app', function (e) {
                if (e.type === 'ready') addTurkish();
            });
        }
    }
})();
