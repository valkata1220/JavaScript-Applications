function attachEvents() {
    let loadBtn = $('#btnLoadTowns').on('click', loadTowns);

    function loadTowns() {
        let towns = $('#towns').val().split(', ').reduce((acc, cur) => {
            acc.towns.push({'town': cur});
            return acc;
        }, {'towns': []});

        renderTowns(towns);

        async function renderTowns(towns) {
            let root = $('#root');
            let source = await $.get('template.hbs');
            let template = Handlebars.compile(source);
            root.append(template(towns))
        }
    }
}