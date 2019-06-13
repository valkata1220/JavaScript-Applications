function attachEvents() {
    $('#submit').on('click', submitMessage);
    $('#refresh').on('click', refreshMessages);

    function submitMessage() {
        let message = JSON.stringify({
            'author': $('#author').val(),
            'content': $('#content').val(),
            'timestamp': Date.now()
        });

        $.post('https://messenger-85b78.firebaseio.com/.json', message)
            .then(refreshMessages)
            .catch('Error when trying to send message!');
    }

    function refreshMessages() {
        $.get('https://messenger-85b78.firebaseio.com/.json')
            .then(displayMessages);
    }

    function displayMessages(messages) {
        let messagesOutput = $('#messages');

        let output = '';

        for (let key in messages) {
            output += `${messages[key].author}: ${messages[key].content}\n`;
        }

        messagesOutput.text(output);
    }
}
