function attachEvents() {
    $('#btnLoad').on('click',loadContacts);
    $('#btnCreate').on('click',createContacts);

    function loadContacts() {
        $.get('https://phonebook-nakov.firebaseio.com/phonebook.json')
            .then(displayContacts)
            .catch(displayError);
    }
    
    function createContacts() {
        let contact = {
            person: $('#person').val(),
            phone: $('#phone').val()
        };

        $('#person').val('');
        $('#phone').val('');

        $.post('https://phonebook-nakov.firebaseio.com/phonebook.json',JSON.stringify(contact))
            .then(loadContacts)
            .catch(displayError);
    }

    function displayContacts(contacts) {
        let phonebook = $('#phonebook');
        phonebook.empty();

        for (let key in contacts) {
            let person = contacts[key]['person'];
            let phone = contacts[key]['phone'];

            let deleteBtn = $('<button>[Delete]</button>').on('click',deleteContact.bind(this,key));
            let li = $('<li>');
            li.text(`${person}: ${phone}`);
            $(deleteBtn).appendTo(li);
            $(li).appendTo(phonebook);
        }
    }

    function displayError() {
        $('<li>Error</li>').appendTo($('#phonebook'))
    }

    function deleteContact(key) {
        let request = {
            method: 'DELETE',
            url: `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`,
            success: loadContacts,
            error: displayError
        };

        $.ajax(request);
    }
}