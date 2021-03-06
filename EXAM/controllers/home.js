const home = (function () {
    const getHome = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        context.loadPartials({
            header: 'template/common/header.hbs',
            footer: 'template/common/footer.hbs'
        }).then(function () {
            this.partial('template/home.hbs');
        }, notification.showError);
    };

    return {
        getHome
    };
})();