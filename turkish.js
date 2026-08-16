(function () {
    'use strict';

    Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') {
            Lampa.Menu.add({
                title: 'Турецькі серіали',
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
                click: function () {
                    Lampa.Activity.push({
                        title: 'Турецькі серіали',
                        url: 'discover/tv?with_origin_country=TR&sort_by=popularity.desc',
                        component: 'category_full',
                        page: 1
                    });
                }
            });
        }
    });
})();
