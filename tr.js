(function () {
    'use strict';

    function startPlugin() {
        if (window.plugin_turkish_ready) return;
        window.plugin_turkish_ready = true;

        function addMenuButton() {
            if ($('.menu .menu__item[data-action="turkish_tv"]').length) return;

            var button = $('<li class="menu__item selector" data-action="turkish_tv">' +
                '<div class="menu__ico">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg">' +
                        '<rect x="2" y="7" width="20" height="15" rx="2" stroke="currentColor"/>' +
                        '<polyline points="17 2 12 7 7 2" stroke="currentColor"/>' +
                    '</svg>' +
                '</div>' +
                '<div class="menu__text">Турецькі серіали</div>' +
            '</li>');

            button.on('hover:enter', function () {
                Lampa.Activity.push({
                    url: 'discover/tv?with_origin_country=TR&sort_by=popularity.desc',
                    title: 'Турецькі серіали',
                    component: 'category_full',
                    source: 'tmdb',
                    card_type: 'tv',
                    page: 1
                });
            });

            $('.menu .menu__list').eq(0).append(button);
        }

        function init() {
            addMenuButton();
        }

        if (window.appready) {
            init();
        } else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type === 'ready') init();
            });
        }
    }

    startPlugin();
})();
