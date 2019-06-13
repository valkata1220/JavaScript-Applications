const home = function () {
    const index = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        if (context.loggedIn) {
            context.redirect('#/allListings')
        } else {
            context.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs',
            }).then(function (responce) {
                this.partial('templates/home/homePage.hbs');
            }).catch(function (error) {
                notification.showError(error);
            });
        }
    };

    return {
        index
    };
}();