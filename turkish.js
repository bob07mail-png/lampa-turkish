(function () {
    'use strict';

    function startPlugin() {
        if (window.turkish_plugin_loaded) return;
        window.turkish_plugin_loaded = true;

        // Безпечно додаємо категорію в Каталог
        Lampa.Listener.follow('catalog', function (e) {
            if (e.type === 'compleat' && e.data) {
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
        startPlugin();
    } else {
        if (typeof Lampa !== 'undefined' && Lampa.Listener) {
            Lampa.Listener.follow('app', function (e) {
                if (e.type === 'ready') startPlugin();
            });
        }
    }
})();
