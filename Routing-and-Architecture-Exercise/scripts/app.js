$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/home', displayHome);
        this.get('#/home', displayHome);
        this.get('#/about', function (context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/about/about.hbs');
            }, auth.handleError);
        });

        this.get('#/login', function (context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs');
            }, auth.handleError);
        });

        this.post('#/login', function (context) {
            let username = this.params.username;
            let password = this.params.password;

            auth.login(username, password)
                .then(function (result) {
                    auth.saveSession(result);
                    auth.showInfo('You logged in successfuly!');
                    context.redirect('#/home');
                }, auth.handleError);
        });

        this.get('#/register', function (context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs');
            }, auth.handleError);
        });

        this.post('#/register', function (context) {
            let username = this.params.username;
            let password = this.params.password;
            let repeatPassword = this.params.repeatPass;

            if (password !== repeatPassword) {
                auth.showError('The given passwords do not match!');
            } else {
                auth.register(username, password)
                    .then(function (result) {
                        auth.saveSession(result);
                        auth.showInfo('You registered successfully!');
                        context.redirect('#/home');
                    }, auth.handleError);
            }
        });

        this.get('#/logout', function (context) {
            auth.logout()
                .then(function (result) {
                    sessionStorage.clear();
                    auth.showInfo('Logout successfully!');
                    context.redirect('#/home');
                }, auth.handleError);
        });

        this.get('#/catalog', showCatalog);

        this.get('#/create', function (context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function () {
                this.partial('./templates/create/createPage.hbs');
            }, auth.handleError);
        });

        this.post('#/create', function (context) {

            let name = this.params.name;
            let comment = this.params.comment;


            teamsService.createTeam(name, comment)
                .then((responce) => {
                    teamsService.joinTeam(responce['_id'])
                        .then(function () {
                            auth.showInfo(`You have created a ${name} team successfully!`);
                            responce.saveSession(responce);
                            context.redirect('#/catalog');
                        }, auth.handleError);
                }, auth.handleError);

        });

        this.get(`#/catalog/:teamId`, function (context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            teamsService.loadTeamDetails(context.params.teamId.substring(1))
                .then((responce) => {
                    context.teamId = responce._id;
                    context.creator = responce._acl.creator;
                    context.name = responce.name;
                    context.comment = responce.comment;
                    context.members = responce.members;
                    context.isAuthor = sessionStorage.getItem('userId') === context.creator;
                    context.isOnTeam = sessionStorage.getItem('teamId') === context.teamId;

                    this.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        teamMember: './templates/catalog/teamMember.hbs',
                        teamControls: './templates/catalog/teamControls.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/details.hbs');
                    });
                }, auth.handleError);
        });

        this.get('#/leave', function (context) {
            teamsService.leaveTeam()
                .then((responce) => {
                    auth.saveSession(responce);
                    context.redirect('#/catalog');
                    auth.showInfo('You left the team successfully!');
                }, auth.handleError);
        });

        this.get('#/edit/:teamId', function (context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');
            let teamId = context.params.teamId.substring(1);

            teamsService.loadTeamDetails(teamId)
                .then((responce) => {
                    context.teamId = teamId;
                    context.name = responce.name;
                    context.comment = responce.comment;
                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        editForm: './templates/edit/editForm.hbs'
                    }).then(function () {
                        this.partial('./templates/edit/editPage.hbs');
                    }, auth.handleError);
                }, auth.handleError);
        });
        
        this.post('#/edit/:teamId',function (context) {
            context.name = context.params.name;
            context.comment = context.params.comment;
            context.teamId = context.params.teamId.substr(1);

            teamsService.edit(context.teamId,context.name,context.comment)
                .then(function (result) {
                    auth.showInfo('Edited information successfully!');
                    context.redirect(`#/catalog/:${context.teamId}`);
                },auth.handleError);
        });


        this.get('#/join/:teamId', function (context) {
            if (sessionStorage.getItem('teamId') === 'undefined' || sessionStorage.getItem('teamId') === '') {
                teamsService.joinTeam(context.params.teamId.substring(1))
                    .then((responce) => {
                        auth.showInfo(`You have joined ${name} team successfully!`);
                        auth.saveSession(responce);
                        context.redirect('#/catalog');
                    }, auth.handleError);
            } else {
                auth.showInfo(`You already joined a team, leave your old team to be able to join the new one!`);
            }
        });

        function displayHome(context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');
            context.teamId = sessionStorage.getItem('teamId');
            context.hasTeam = sessionStorage.getItem('teamId') !== 'undefined';
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/home/home.hbs');
            }, auth.handleError);
        }

        function showCatalog(context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');
            context.teamId = sessionStorage.getItem('teamId') !== 'undefined' || sessionStorage.getItem('teamId') !== null;
            context.hasTeam = sessionStorage.getItem('teamId') !== 'undefined';

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                team: './templates/catalog/team.hbs'
            }).then(function () {
                teamsService.loadTeams()
                    .then((responce) => {
                        context.teams = responce;
                        this.partial('./templates/catalog/teamCatalog.hbs');
                    });
            }, auth.handleError);
        }
    });

    app.run('#/home');
})
;