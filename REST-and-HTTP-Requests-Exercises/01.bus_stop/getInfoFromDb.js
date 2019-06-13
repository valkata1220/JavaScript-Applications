function getInfo() {
    let stopId = $('#stopId');
    $.get(`https://judgetests.firebaseio.com/businfo/${stopId.val()}.json `)
        .then(displayBuses)
        .catch(displayError);

    $(stopId).val('');

    function displayBuses(stop) {
        $('#stopName').text(stop['name']);
        let buses = $('#buses').empty();
        for (let bus of Object.keys(stop['buses'])) {
            let time = stop['buses'][bus];
            $(`<li>Bus ${bus} arrives in ${time} minutes</li>`).appendTo(buses);
        }
    }

    function displayError(err) {
        $('#stopName').text('Error');
    }
}
