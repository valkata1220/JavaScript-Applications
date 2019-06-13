const user = (function () {

    function getRegister(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        context.loadPartials({
            header: 'template/common/header.hbs',
            footer: 'template/common/footer.hbs'
        }).then(function (responce) {
            this.partial('template/register/register.hbs');
        },function(error){notification.showError('Could not load register page!')})
    }

    function postRegister(context) {
        let username = context.params.username;
        let password = context.params.password;
        let repeatPass = context.params.repeatPass;
        let email = context.params.email;
        let avatarUrl = context.params.avatarUrl;
    }

    return {
        getRegister,
        postRegister
    };
})();