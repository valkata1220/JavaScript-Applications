$(function () {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        //home
        this.get('#/home',home.getHome);

        //user
        this.get('#/register',user.getRegister);
        this.post('#/register',user.postRegister);

        this.get('#/login',user.getLogin);
        this.post('#/login',user.postLogin);

        this.get('#/logout',user.logout);

        //pets
        this.get('#/dashboard',pets.getDashboard);
        this.get('#/like/:petId',pets.like);

        //categories
        this.get('#/cats',pets.cats);
        this.get('#/dogs',pets.dogs);
        this.get('#/parrots',pets.parrots);
        this.get('#/reptiles',pets.reptiles);
        this.get('#/other',pets.other);

        //add pet
        this.get('#/addPet',pets.getAddPet);
        this.post('#/addPet',pets.postAddPet);

        //my pets
        this.get('#/myPets',pets.myPets);

        //detail
        this.get('#/detail/:petId',pets.petDetail);

        //edit
        this.get('#/edit/:petId',pets.editPet);
        this.post('#/edit/:petId',pets.postEditPet);

        //delete
        this.get('#/delete/:petId',pets.deletePet);
        this.post('#/delete/:petId',pets.postDeletePet);
    });

    app.run('#/home');
});