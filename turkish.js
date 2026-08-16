(function () {
    'use strict';

    function startPlugin() {
        // Додаємо категорію у Каталог без створення пунктів у головному меню
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
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') startPlugin();
        });
    }
})();
