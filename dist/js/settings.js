$(document).ready(() => {
    $('.settings__button').click(() => {
        const date = $('.settings__date-input').val();
        const time = $('.settings__time-input').val();
        const fillDate = new Date([date, time].join(' '));
        const timeout = $('.settings__timeout-input').val();
        const interval = $('.settings__interval-input').val();
        const stop = $('.settings__stop-input').val();
        $.ajax('/settings', {
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                auctionStartDate: fillDate,
                timeout,
                interval,
                stop
            })

        })
            .done(() => alert("Изменено"));
    })
})