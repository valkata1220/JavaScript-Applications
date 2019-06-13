const user = function () {

    const getLogin = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;

        context.loadPartials({
            header: 'templates/common/header.hbs',
            footer: 'templates/common/footer.hbs'
        }).then(function () {
            this.partial('templates/login/login.hbs');
        }, notification.showError);
    };

    const postLogin = function (context) {
        let username = context.params.username;
        let password = context.params.password;

        if (!/^[A-Za-z]{3,}$/g.test(username)) {
            notification.showError('Invalid username');
            return;
        }

        if (!/^[A-Za-z0-9]{6,}$/g.test(password)) {
            notification.showError('Invalid password');
            return;
        }

        requester.post('user', 'login', 'basic', {username, password})
            .then((responce) => {
                requester.saveSession(responce);
                notification.showInfo('Login successful.');
                context.redirect('#/allListings');
            }, () => {
                notification.showError('Invalid credentials. Please retry your request with correct credentials.')
            });
    };

    const getRegister = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;

        context.loadPartials({
            header: 'templates/common/header.hbs',
            footer: 'templates/common/footer.hbs'
        }).then(function () {
            this.partial('templates/register/register.hbs');
        }, notification.showError)
    };

    const postRegister = function (context) {
        let username = this.params.username;
        let password = this.params.password;
        let repeatPassword = this.params.repeatPass;

        if (!/^[A-Za-z]{3,}$/g.test(username)) {
            notification.showError('Invalid username');
            return;
        }

        if (!/^[A-Za-z0-9]{6,}$/g.test(password)) {
            notification.showError('Invalid password');
            return;
        }

        if (password !== repeatPassword) {
            notification.showError('Password don\'t match');
            return;
        }

        requester.post('user', '', 'basic', {username, password})
            .then((responce) => {
                requester.saveSession(responce);
                notification.showInfo('User registration successful.');
                context.redirect('#/allListings');
            })

    };

    const logout = function (context) {
      requester.post('user', '_logout', 'kinvey',{ authtoken: sessionStorage.getItem('authtoken')})
          .then(function () {
              sessionStorage.clear();
              notification.showInfo('Logout successful.');
              context.redirect('#/');
          },notification.showError);
    };

    return {
        getLogin,
        postLogin,
        getRegister,
        postRegister,
        logout
    };
}();