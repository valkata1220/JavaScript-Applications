$(function () {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/flights',flights.getFlights);

        this.get('#/register',user.getRegister);
        this.post('#/register',user.postRegister);

        this.get('#/login', user.getLogin);
        this.post('#/login', user.postLogin);

        this.get('#/logout',user.logout);

        this.get('#/addFlight',flights.renderAddFlight);
        this.post('#/addFlight',flights.postFlight);

        this.get('#/flightDetail/:flightId',flights.getFlightDetail);

        this.get('#/editFlight/:flightId',flights.getEditFlight);
        this.post('#/editFlight/:flightId',flights.postEditFlight);

        this.get('#/myFlights',flights.getMyFlights);

        this.get('#/deleteFlight/:flightId',flights.deleteFlight)

    });

    app.run('#/login');
});