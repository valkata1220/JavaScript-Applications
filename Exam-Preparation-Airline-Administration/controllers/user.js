const user = (function () {
    function getRegister(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        context.loadPartials({
            headers: './templates/common/headers.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/register/register.hbs');
        }, notification.showError);
    }

    function postRegister(context) {
        let username = context.params.username;
        let password = context.params.pass;
        let repeatPass = context.params.checkPass;

        if (!/^[A-Za-z]{5,}$/g.test(username)) {
            notification.showError('Invalid username!');
            return;
        }

        if (password.length === 0 || repeatPass.length === 0) {
            notification.showError('Invalid password!');
            return;
        }

        if (password !== repeatPass) {
            notification.showError('Passwords don\'t match!');
            return;
        }

        requester.post('user', '', 'basic', {username, password})
            .then((responce) => {
                requester.saveSession(responce);
                notification.showInfo('User registration successful.');
                context.redirect('#/flights');
            }, notification.showError);
    }

    function getLogin(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        context.loadPartials({
            headers: './templates/common/headers.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/login/login.hbs');
        }, notification.showError);
    }

    function postLogin(context) {
        let username = context.params.username;
        let password = context.params.pass;

        if (!/^[A-Za-z]{5,}$/g.test(username)) {
            notification.showError('Invalid username!');
            return;
        }

        if (password.length === 0) {
            notification.showError('Invalid password!');
            return;
        }

        requester.post('user', 'login ', 'basic', {username, password})
            .then((responce) => {
                requester.saveSession(responce);
                notification.showInfo('User logged in successfully.');
                context.redirect('#/flights');
            }, notification.showError);
    }

    function logout(context) {
        requester.post('user', '_logout', 'kinvey', {authtoken: sessionStorage.getItem('authtoken')})
            .then(function () {
                sessionStorage.clear();
                notification.showInfo('Logout successfully.');
                context.redirect('#/login');
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