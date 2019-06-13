$(function(){
    const app = Sammy('#container',function () {
        this.use('Handlebars','hbs');

        this.get('#/',home.index);
        this.get('#/login',user.getLogin);
        this.post('#/login',user.postLogin);
        this.get('#/register',user.getRegister);
        this.post('#/register',user.postRegister);
        this.get('#/logout',user.logout);

        this.get('#/allListings',cars.allListings);

        this.get('#/createListings',cars.getCreateAd);
        this.post('#/createListings',cars.postAd);

        this.get('#/editAd/:adId',cars.getEditAd);
        this.post('#/editAd/:adId',cars.postEditAd);

        this.get('#/adDetails/:adId',cars.getAdDetails);

        this.get('#/myListings',cars.getMyListings);

        this.get('#/deleteAd/:adId',cars.deleteAd);
    });

    app.run('#/');
});