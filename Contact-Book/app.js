$(() => {
    const context = {
        contacts: []
    };

    loadData();

    async function loadData() {
        context.contacts = await $.get('data.json');
    }
    
    async function loadTemplates() {
        const contactSource = await $.get('templates/contact.html');
        Handlebars.registerPartial('contact',contactSource);

    }
});