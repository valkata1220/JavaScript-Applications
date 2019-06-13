const flights = (function () {

        function getFlights(context) {

            requester.get('appdata', 'flights', 'kinvey', 'flights?query={"isPublished":"true"}')
                .then((responce) => {
                    context.loggedIn = sessionStorage.getItem('authtoken') !== null;
                    context.username = sessionStorage.getItem('username');
                    context.flights = responce.filter((fl) => fl.isPublic);
                    context.hasFlights = context.flights.length > 0;

                    context.loadPartials({
                        headers: './templates/common/headers.hbs',
                        footer: './templates/common/footer.hbs',
                        flight: './templates/flights/flight.hbs'
                    }).then(function () {
                        this.partial('./templates/flights/flights.hbs');
                    }, notification.showError);
                }, notification.showError);
        }

        function renderAddFlight(context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');
            context.loadPartials({
                headers: './templates/common/headers.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/flights/addFlight.hbs');
            }, notification.showError);
        }

        function postFlight(context) {
            let destination = context.params.destination;
            let origin = context.params.origin;
            let dates = context.params.departureDate.split('-');
            let departureTime = context.params.departureTime;
            let seats = context.params.seats;
            let cost = context.params.cost;
            let image = context.params.img;
            let isPublic = context.params.public;
            let departureDate = `${dates[1]} ${notification.monthNames[+dates[2] - 1]}`;
            let creator = sessionStorage.getItem('username');
            let departure = context.params.departureDate;

            if (destination.length === 0 || origin.length === 0) {
                notification.showError('Destination/Origin should not be empty!');
                return;
            }

            if (Number.isNaN(+seats) || Number.isNaN(+cost)) {
                notification.showError('Seats/Cost should be numbers!');
                return;
            }

            if (+seats < 1 || +cost < 1) {
                notification.showError('Seats/Cost should be positive numbers!');
                return;
            }

            requester.post('appdata', 'flights', 'kinvey', {
                destination,
                origin,
                departureDate,
                departureTime,
                seats,
                cost,
                image,
                isPublic,
                creator,
                departure
            })
                .then(function () {
                    notification.showInfo('Created flight.');
                    context.redirect('#/flights');
                }, notification.showError);
        }

        function getFlightDetail(context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');
            context.flightId = context.params.flightId.substr(1);

            requester.get('appdata', `flights/${context.flightId}`, 'kinvey', '')
                .then((responce) => {

                    context.destination = responce.destination;
                    context.origin = responce.origin;
                    context.departureDate = responce.departureDate;
                    context.departureTime = responce.departureTime;
                    context.seats = responce.seats;
                    context.cost = `${(+responce.cost).toFixed(2)}`;
                    context.image = responce.image;
                    context.isAuthor = responce.creator === sessionStorage.getItem('username');

                    context.loadPartials({
                        headers: './templates/common/headers.hbs',
                        footer: './templates/common/footer.hbs'
                    }).then(function () {
                        this.partial('./templates/flights/flightDetail.hbs');
                    }, notification.showError);
                }, notification.showError);
        }

        function getEditFlight(context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');
            context.flightId = context.params.flightId.substr(1);

            requester.get('appdata', `flights/${context.flightId}`, 'kinvey', '')
                .then((responce) => {
                    context.destination = responce.destination;
                    context.origin = responce.origin;
                    context.departure = responce.departure;
                    context.departureTime = responce.departureTime;
                    context.seats = responce.seats;
                    context.cost = responce.cost;
                    context.image = responce.image;

                    context.loadPartials({
                        headers: './templates/common/headers.hbs',
                        footer: './templates/common/footer.hbs'
                    }).then(function () {
                        this.partial('./templates/edit/edit.hbs');
                    }, notification.showError);
                }, notification.showError);
        }

        function postEditFlight(context) {
            context.flightId = context.params.flightId.substr(1);
            let destination = context.params.destination;
            let origin = context.params.origin;
            let dates = context.params.departureDate.split('-');
            let departureTime = context.params.departureTime;
            let seats = context.params.seats;
            let cost = context.params.cost;
            let image = context.params.img;
            let isPublic = context.params.public;
            let departureDate = `${dates[1]} ${notification.monthNames[+dates[2] - 1]}`;
            let creator = sessionStorage.getItem('username');
            let departure = context.params.departureDate;

            if (destination.length === 0 || origin.length === 0) {
                notification.showError('Destination/Origin should not be empty!');
                return;
            }

            if (Number.isNaN(+seats) || Number.isNaN(+cost)) {
                notification.showError('Seats/Cost should be numbers!');
                return;
            }

            if (+seats < 1 || +cost < 1) {
                notification.showError('Seats/Cost should be positive numbers!');
                return;
            }

            requester.update('appdata', `flights/${context.flightId}`, 'kinvey', {
                destination,
                origin,
                departureDate,
                departureTime,
                seats,
                cost,
                image,
                isPublic,
                creator,
                departure
            }).then(function () {
                notification.showInfo('Edited flight.');
                context.redirect('#/flights');
            }, notification.showError);
        }

        function getMyFlights(context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            requester.get('appdata',`flights?query={"creator":"${context.username}"}`,'kinvey')
                .then((responce) =>{
                    context.flights = responce;
                    console.log(context.flights);
                    context.loadPartials({
                        headers: './templates/common/headers.hbs',
                        footer: './templates/common/footer.hbs',
                        myFlight: './templates/flights/myFlight.hbs'
                    }).then(function () {
                        this.partial('./templates/flights/myFlights.hbs');
                    },notification.showError)
                },notification.showError);
        }

        function deleteFlight(context) {
            context.flightId = context.params.flightId.substr(1);
            requester.remove('appdata', `flights/${context.flightId}`, 'kinvey')
                .then(function () {
                    notification.showInfo('Pet removed successfully!');
                    context.redirect('#/dashboard');
                },notification.showError)
        }

        return {
            getFlights,
            renderAddFlight,
            postFlight,
            getFlightDetail,
            getEditFlight,
            postEditFlight,
            getMyFlights,
            deleteFlight
        }
    }
)();
