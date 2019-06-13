let result = (function solve() {
    let currentId = 'depot';
    let oldName = '';
    let span = $('#info span')[0];

    function depart() {
        $.get(`https://judgetests.firebaseio.com/schedule/${currentId}.json`)
            .then(displayStop)
            .catch(displayError);
    }

    function arrive() {
        $(span).text(`Arriving at ${oldName}`);
        $('#depart').attr('disabled', false);
        $('#arrive').attr('disabled', true);
    }

    function displayStop(stop) {
        currentId = stop['next'];
        oldName = stop['name'];

        $(span).text(`Next stop ${oldName}`);
        $('#depart').attr('disabled', true);
        $('#arrive').attr('disabled', false);
    }

    function displayError(err) {
        $(span).text(`Error`);
        $('#depart').attr('disabled', true);
        $('#arrive').attr('disabled', true);
    }


    return {
        depart,
        arrive
    };
})();
