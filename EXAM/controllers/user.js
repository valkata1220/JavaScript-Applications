const user = (function () {
    const getRegister = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        context.loadPartials({
            header: 'template/common/header.hbs',
            footer: 'template/common/footer.hbs'
        }).then(function () {
            this.partial('template/register/register.hbs');
        }, notification.showError);
    };

    const postRegister = function (context) {
        let username = context.params.username;
        let password = context.params.password;

        if(username.length === 0 || password.length === 0){
            notification.showError('Username/password should not be empty');
            return;
        }

        if(username.length < 3){
            notification.showError('Username must be at least 3 symbols');
            return;
        }

        if(password.length < 6){
            notification.showError('Password must be at least 6 symbols');
            return;
        }

        requester.post('user','','basic',{username,password})
            .then((responce)=>{
                requester.saveSession(responce);
                notification.showInfo('User registration successful.');
                context.redirect('#/home');
            },notification.showError);
    };

    function getLogin(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        context.loadPartials({
            header: 'template/common/header.hbs',
            footer: 'template/common/footer.hbs'
        }).then(function () {
            this.partial('template/login/login.hbs');
        }, notification.showError);
    }

    function postLogin(context) {
        let username = context.params.username;
        let password = context.params.password;

        if(username.length === 0 || password.length === 0){
            notification.showError('Username/password should not be empty');
            return;
        }

        if(username.length < 3){
            notification.showError('Username must be at least 3 symbols');
            return;
        }

        if(password.length < 6){
            notification.showError('Password must be at least 6 symbols');
            return;
        }

        requester.post('user','login','basic',{username,password})
            .then((responce) => {
                requester.saveSession(responce);
                notification.showInfo('Login successful.');
                context.redirect('#/home');
            },notification.showError)

    }

    function logout(context) {
        requester.post('user', '_logout', 'kinvey', {authtoken: sessionStorage.getItem('authtoken')})
            .then(function () {
                sessionStorage.clear();
                notification.showInfo('Logout successful.');
                context.redirect('#/home');
            });
    }

    return {
        getRegister,
        postRegister,
        getLogin,
        postLogin,
        logout
    };
})();