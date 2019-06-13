function attachEvents() {
    const url = 'https://judgetests.firebaseio.com/';

    let getBtn = $('#submit').on('click', getWeatherReport);

    function requestReport(suffix) {
        return $.get(url + suffix);
    }

    function getWeatherReport() {

        let symbols = {
            'Sunny': '&#x2600;',
            'Partly sunny': '&#x26C5;',
            'Overcast': '&#x2601;',
            'Rain': '&#x2614;',
            'Degrees': '&#176;'
        };

        requestReport('locations.json')
            .then(getForecast)
            .catch(displayError);

        function getForecast(locations) {
            let location = $('#location').val();
            let locationCode;

            for (let loc of locations) {
                if (loc.name === location) {
                    locationCode = loc.code;
                    break;
                }
            }

            if (!locationCode) {
                displayError();
            }

            let currentWeather = requestReport(`forecast/today/${locationCode}.json`);
            let threeDaysWeather = requestReport(`forecast/upcoming/${locationCode}.json`);

            Promise.all([currentWeather, threeDaysWeather])
                .then(displayWeather)
                .catch(displayError);

            function displayWeather([currentWeather, threeDaysWeather]) {
                $('#forecast').css('display', 'block');

                let current = $('#current');
                let label = $('#current .label')[0];

                current.empty();
                $(label).appendTo(current);
                let conditionSymbol = $(`<span class='condition symbol'>${symbols[currentWeather['forecast']['condition']]}</span>`);
                $(conditionSymbol).appendTo(current);
                let condition = $(`<span class='condition'></span>`);
                $(`<span class='forecast-data'>${currentWeather['name']}</span>`).appendTo(condition);
                $(`<span class='forecast-data'>${currentWeather['forecast']['low']}&#176;/${currentWeather['forecast']['high']}&#176;</span>`).appendTo(condition);
                $(`<span class='forecast-data'>${currentWeather['forecast']['condition']}</span>`).appendTo(condition);
                $(condition).appendTo(current);


                let upcoming = $('#upcoming');
                let label2 = $('#upcoming .label')[0];
                upcoming.empty();
                $(label2).appendTo(upcoming);
                for (let i = 0; i < 3;i++){
                    let span = $('<span class="upcoming"></span>');
                    $(`<span class='symbol'>${symbols[threeDaysWeather['forecast'][i]['condition']]}</span>`).appendTo(span);
                    $(`<span class='symbol'>${threeDaysWeather['forecast'][i]['low']}&#176;/${threeDaysWeather['forecast'][i]['high']}&#176;</span>`).appendTo(span);
                    $(`<span class='symbol'>${threeDaysWeather['forecast'][i]['condition']}</span>`).appendTo(span);
                    $(span).appendTo(upcoming);
                }


            }
        }

    }

    function displayError() {
        $('#forecast')
            .css('display', 'block')
            .text('Error');
    }

}