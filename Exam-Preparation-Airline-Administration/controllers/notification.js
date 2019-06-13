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
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    }

    const monthNames = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ];

    return {
        showInfo,
        showError,
        monthNames
    }
}();