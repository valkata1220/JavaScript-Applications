$(function () {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/home',home.getHome);

        this.get('#/register',user.getRegister);
        this.post('#/register',user.postRegister);
    });

    app.run('#/home');
});