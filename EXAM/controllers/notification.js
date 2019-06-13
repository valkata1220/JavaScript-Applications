let notification = function() {
    $(document).on({
        ajaxStart: () => $("#loadingBox").show(),
        ajaxStop: () => $('#loadingBox').fadeOut()
    });

    function showInfo(message) {
        $('#infoBox>span').text(message);
        $('#infoBox').show().fadeOut(3000);
    }

    function showError(message) {
        $('#errorBox>span').text(message);
        $('#errorBox').show().fadeOut(3000);
    }

    return {
        showInfo,
        showError,
    }
}();