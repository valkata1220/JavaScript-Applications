const cars = function () {
    const allListings = function (context) {
        requester.get('appdata', 'cars?query={}&sort={"_kmd.ect": -1}', 'kinvey')
            .then((responce) => {
                context.loggedIn = sessionStorage.getItem('authtoken') !== null;
                context.username = sessionStorage.getItem('username');
                context.hasCars = responce.length > 0;
                let cars = responce;
                cars.forEach((car) => car.isAuthor = context.username === car.seller);
                context.cars = cars;

                context.loadPartials({
                    header: 'templates/common/header.hbs',
                    footer: 'templates/common/footer.hbs',
                    carAd: 'cars/carAd.hbs'
                }).then(function () {
                    this.partial('cars/cars.hbs');
                })
            }, notification.showError)
    };

    const getCreateAd = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        context.loadPartials({
            header: 'templates/common/header.hbs',
            footer: 'templates/common/footer.hbs',
        }).then(function () {
            this.partial('cars/create.hbs');
        });
    };

    const postAd = function (context) {
        let title = context.params.title;
        let imageUrl = context.params.imageUrl;
        let brand = context.params.brand;
        let model = context.params.model;
        let seller = sessionStorage.getItem('username');
        let fuel = context.params.fuelType;
        let year = context.params.year;
        let description = context.params.description;
        let price = context.params.price;

        if (title.length > 33) {
            notification.showError('Title should be less than 34 characters long.');
            return;
        }

        if (description.length < 30 || description.length > 450) {
            notification.showError('Description should be in the range 30-450.');
            return;
        }

        if (brand.length > 11 || fuel.length > 11 || model > 11) {
            notification.showError('Brand/Fuel should\'t be longer than 11 characters.');
            return;
        }

        if (model.length < 4 || model.length > 11) {
            notification.showError('Model should be in the range 4-11.');
            return;
        }

        if (year.length !== 4) {
            notification.showError('Year must be only 4 chars long.');
            return;
        }

        if (+price > 1000000 || price < 1) {
            notification.showError('Price is not valid.');
            return;
        }

        if (!imageUrl.startsWith('http')) {
            notification.showError('Image url is not correct.');
            return;
        }

        requester.post('appdata', 'cars', 'kinvey', {
            title,
            imageUrl,
            brand,
            model,
            seller,
            fuel,
            year,
            description,
            price
        }).then(function () {
            notification.showInfo('Created ad.');
            context.redirect('#/allListings');
        }, notification.showError);
    };

    function getEditAd(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        context.adId = context.params.adId.substr(1);

        requester.get('appdata', `cars/${context.adId}`, 'kinvey')
            .then((responce) => {
                context.title = responce.title;
                context.imageUrl = responce.imageUrl;
                context.brand = responce.brand;
                context.model = responce.model;
                context.seller = responce.seller;
                context.fuel = responce.fuel;
                context.year = responce.year;
                context.description = responce.description;
                context.price = responce.price;

                context.loadPartials({
                    header: 'templates/common/header.hbs',
                    footer: 'templates/common/footer.hbs',
                }).then(function () {
                    this.partial('cars/edit.hbs');
                }, notification.showError);
            }, notification.showError);

    }

    function postEditAd(context) {
        context.adId = context.params.adId.substr(1);
        let title = context.params.title;
        let imageUrl = context.params.imageUrl;
        let brand = context.params.brand;
        let model = context.params.model;
        let seller = sessionStorage.getItem('username');
        let fuel = context.params.fuelType;
        let year = context.params.year;
        let description = context.params.description;
        let price = context.params.price;

        if (title.length > 33) {
            notification.showError('Title should be less than 34 characters long.');
            return;
        }

        if (description.length < 30 || description.length > 450) {
            notification.showError('Description should be in the range 30-450.');
            return;
        }

        if (brand.length > 11 || fuel.length > 11 || model > 11) {
            notification.showError('Brand/Fuel should\'t be longer than 11 characters.');
            return;
        }

        if (model.length < 4 || model.length > 11) {
            notification.showError('Model should be in the range 4-11.');
            return;
        }

        if (year.length !== 4) {
            notification.showError('Year must be only 4 chars long.');
            return;
        }

        if (+price > 1000000 || price < 1) {
            notification.showError('Price is not valid.');
            return;
        }

        if (!imageUrl.startsWith('http')) {
            notification.showError('Image url is not correct.');
            return;
        }


        requester.update('appdata', `cars/${context.adId}`, 'kinvey', {
            title,
            imageUrl,
            brand,
            model,
            seller,
            fuel,
            year,
            description,
            price
        }).then(function () {
            notification.showInfo(`Listing ${title} updated.`);
            context.redirect('#/allListings');
        });
    }

    function getAdDetails(context) {
        context.adId = context.params.adId.substr(1);
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        requester.get('appdata', `cars/${context.adId}`, 'kinvey')
            .then((responce) => {
                context.isAuthor = sessionStorage.getItem('username') === responce.seller;
                context.title = responce.title;
                context.imageUrl = responce.imageUrl;
                context.brand = responce.brand;
                context.model = responce.model;
                context.seller = responce.seller;
                context.fuel = responce.fuel;
                context.year = responce.year;
                context.description = responce.description;
                context.price = responce.price;

                context.loadPartials({
                    header: 'templates/common/header.hbs',
                    footer: 'templates/common/footer.hbs',
                }).then(function () {
                    this.partial('cars/detail.hbs');
                }, notification.showError);
            }, notification.showError)
    }

    function getMyListings(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        requester.get('appdata', `cars?query={"seller":"${context.username}"}&sort={"_kmd.ect": -1}`, 'kinvey')
            .then((responce) => {
                context.hasCars = responce.length > 0;
                context.cars = responce;
                context.loadPartials({
                    header: 'templates/common/header.hbs',
                    footer: 'templates/common/footer.hbs',
                    myCar: 'cars/myCar.hbs'
                }).then(function () {
                    this.partial('cars/myCars.hbs');
                }, notification.showError);

            }, notification.showError);
    }

    function deleteAd(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        context.adId = context.params.adId.substr(1);

        requester.remove('appdata', `cars/${context.adId}`, 'kinvey')
            .then(function () {
                notification.showInfo('Listing deleted.');
                context.redirect('#/allListings');
            })
            .catch(() => notification.showError('Internet connection lost / unauthorized request / missing message'));
    }

    return {
        allListings,
        getCreateAd,
        postAd,
        getEditAd,
        postEditAd,
        getAdDetails,
        getMyListings,
        deleteAd
    };
}();