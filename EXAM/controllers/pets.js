const pets = (function () {
    const getDashboard = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        requester.get('appdata', 'pets?query={}&sort={"likes": -1}', 'kinvey')
            .then((responce) => {
                context.pets = responce.filter((pet) => pet._acl.creator !== sessionStorage.getItem('userId'))
                    .sort((p1,p2) => +p2.likes - +p1.likes);

                context.loadPartials({
                    header: 'template/common/header.hbs',
                    footer: 'template/common/footer.hbs',
                    petBox: 'template/dashboard/petBox.hbs'
                }).then(function () {
                    this.partial('template/dashboard/dashboard.hbs');
                }, notification.showError)
            }, notification.showError);
    };

    const like = function (context) {
        let petId = context.params.petId.substr(1);
        requester.get('appdata', `pets/${petId}`, 'kinvey')
            .then((responce) => {
                let name = responce.name;
                let likes = +responce.likes + 1;
                let imageURL = responce.imageURL;
                let description = responce.description;
                let category = responce.category;
                requester.update('appdata', `pets/${petId}`, 'kinvey', {name, imageURL, description, category, likes})
                    .then(function () {
                        context.redirect(`#/dashboard`);
                    }, notification.showError)
            }, notification.showError);
    };

    const cats = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        requester.get('appdata', 'pets?query={}&sort={"likes": -1}', 'kinvey')
            .then((responce) => {
                context.pets = responce.filter((pet) => pet._acl.creator !== sessionStorage.getItem('userId'))
                    .filter((pet) => pet.category === 'Cat')
                    .sort((p1, p2) => +p2.likes - +p1.likes);

                context.loadPartials({
                    header: 'template/common/header.hbs',
                    footer: 'template/common/footer.hbs',
                    petBox: 'template/dashboard/petBox.hbs'
                }).then(function () {
                    this.partial('template/dashboard/dashboard.hbs');
                }, notification.showError)
            }, notification.showError);
    };

    const dogs = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        requester.get('appdata', 'pets?query={}&sort={"likes": -1}', 'kinvey')
            .then((responce) => {
                context.pets = responce.filter((pet) => pet._acl.creator !== sessionStorage.getItem('userId'))
                    .filter((pet) => pet.category === 'Dog')
                    .sort((p1, p2) => +p2.likes - +p1.likes);

                context.loadPartials({
                    header: 'template/common/header.hbs',
                    footer: 'template/common/footer.hbs',
                    petBox: 'template/dashboard/petBox.hbs'
                }).then(function () {
                    this.partial('template/dashboard/dashboard.hbs');
                }, notification.showError)
            }, notification.showError);
    };

    const parrots = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        requester.get('appdata', 'pets?query={}&sort={"likes": -1}', 'kinvey')
            .then((responce) => {
                context.pets = responce.filter((pet) => pet._acl.creator !== sessionStorage.getItem('userId'))
                    .filter((pet) => pet.category === 'Parrot')
                    .sort((p1, p2) => +p2.likes - +p1.likes);

                context.loadPartials({
                    header: 'template/common/header.hbs',
                    footer: 'template/common/footer.hbs',
                    petBox: 'template/dashboard/petBox.hbs'
                }).then(function () {
                    this.partial('template/dashboard/dashboard.hbs');
                }, notification.showError)
            }, notification.showError);
    };

    const reptiles = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        requester.get('appdata', 'pets?query={}&sort={"likes": -1}', 'kinvey')
            .then((responce) => {
                context.pets = responce.filter((pet) => pet._acl.creator !== sessionStorage.getItem('userId'))
                    .filter((pet) => pet.category === 'Reptile')
                    .sort((p1, p2) => +p2.likes - +p1.likes);

                context.loadPartials({
                    header: 'template/common/header.hbs',
                    footer: 'template/common/footer.hbs',
                    petBox: 'template/dashboard/petBox.hbs'
                }).then(function () {
                    this.partial('template/dashboard/dashboard.hbs');
                }, notification.showError)
            }, notification.showError);
    };

    const other = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        requester.get('appdata', 'pets?query={}&sort={"likes": -1}', 'kinvey')
            .then((responce) => {
                context.pets = responce.filter((pet) => pet._acl.creator !== sessionStorage.getItem('userId'))
                    .filter((pet) => pet.category === 'Other')
                    .sort((p1, p2) => +p2.likes - +p1.likes);

                context.loadPartials({
                    header: 'template/common/header.hbs',
                    footer: 'template/common/footer.hbs',
                    petBox: 'template/dashboard/petBox.hbs'
                }).then(function () {
                    this.partial('template/dashboard/dashboard.hbs');
                }, notification.showError)
            }, notification.showError);
    };

    const getAddPet = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        context.loadPartials({
            header: 'template/common/header.hbs',
            footer: 'template/common/footer.hbs'
        }).then(function () {
            this.partial('template/create/create.hbs');
        }, notification.showError)
    };

    const postAddPet = function (context) {
        let name = context.params.name;
        let description = context.params.description;
        let imageURL = context.params.imageURL;
        let category = context.params.category;
        let likes = 0;

        requester.post('appdata', 'pets', 'kinvey', {
            name,
            description,
            imageURL,
            category,
            likes
        }).then(function () {
            notification.showInfo('Pet created.');
            context.redirect('#/home');
        }, notification.showError)
    };

    const myPets = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        requester.get('appdata', `pets?query={"_acl.creator":"${sessionStorage.getItem('userId')}"}`, 'kinvey')
            .then((responce) => {
                context.pets = responce.sort((p1, p2) => +p2.likes - +p1.likes);

                context.loadPartials({
                    header: 'template/common/header.hbs',
                    footer: 'template/common/footer.hbs',
                    pet: 'template/mypets/pet.hbs'
                }).then(function () {
                    this.partial('template/mypets/mypets.hbs');
                }, notification.showError)
            }, notification.showError)
    };

    const petDetail = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        let petId = context.params.petId.substr(1);

        requester.get('appdata', `pets/${petId}`, 'kinvey')
            .then((responce) => {
                context.loadPartials({
                    header: 'template/common/header.hbs',
                    footer: 'template/common/footer.hbs'
                }).then(function () {
                    context.name = responce.name;
                    context.description = responce.description;
                    context.likes = responce.likes;
                    context.imageURL = responce.imageURL;
                    context._id = responce._id;
                    this.partial('template/petdetail/detailpet.hbs');
                }, notification.showError);
            })
            .catch((error) => notification.showError(error.message));

    };

    const editPet = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        let petId = context.params.petId.substr(1);

        requester.get('appdata', `pets/${petId}`, 'kinvey')
            .then((responce) => {
                context.name = responce.name;
                context.likes = responce.likes;
                context.imageURL = responce.imageURL;
                context._id = responce._id;
                context.description = responce.description;
                context.loadPartials({
                    header: 'template/common/header.hbs',
                    footer: 'template/common/footer.hbs'
                }).then(function () {
                    this.partial('template/editpet/petedit.hbs');
                }, notification.showError);
            }).catch((error) => notification.showError(error.message));
    };

    const postEditPet = function (context) {
        let petId = context.params.petId.substr(1);

        requester.get('appdata', `pets/${petId}`, 'kinvey')
            .then((responce) => {
                let name = responce.name;
                let description = context.params.description;
                let likes = responce.likes;
                let imageURL = responce.imageURL;
                let category = responce.category;

                requester.update('appdata', `pets/${petId}`, 'kinvey', {name, description, likes, imageURL, category})
                    .then(function () {
                        notification.showInfo('Updated successfully!');
                        context.redirect('#/dashboard');
                    });
            }, notification.showError);
    };

    const deletePet = function (context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        let petId = context.params.petId.substr(1);

        requester.get('appdata', `pets/${petId}`, 'kinvey')
            .then((responce) => {
                context.name = responce.name;
                context.likes = responce.likes;
                context.imageURL = responce.imageURL;
                context._id = responce._id;
                context.description = responce.description;
                context.loadPartials({
                    header: 'template/common/header.hbs',
                    footer: 'template/common/footer.hbs'
                }).then(function () {
                    this.partial('template/deletepet/petdelete.hbs');
                }, notification.showError);
            }).catch((error) => notification.showError(error.message));
    };

    const postDeletePet = function (context) {
        let petId = context.params.petId.substr(1);

        requester.remove('appdata', `pets/${petId}`, 'kinvey')
            .then(function () {
                notification.showInfo('Pet removed successfully!');
                context.redirect('#/dashboard');
            },notification.showError)
    };

    return {
        getDashboard,
        like,
        cats,
        dogs,
        parrots,
        reptiles,
        other,
        getAddPet,
        postAddPet,
        myPets,
        petDetail,
        editPet,
        postEditPet,
        deletePet,
        postDeletePet
    };
})();