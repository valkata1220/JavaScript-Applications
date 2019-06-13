$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        let source = $.get('catTemplate.hbs').then((result)=>{

            let template = Handlebars.compile(result);
            $('#allCats').append(template({cats}));

            $('.btn-primary').on('click',function () {
                let button = $(this);
                if(button.text() === 'Show status code'){
                    button.text('Hide status code');
                    button.next().css('display','block');
                }else if(button.text() === 'Hide status code'){
                    button.text('Show status code');
                    button.next().css('display','none');
                }
            })
        })
    }

});
