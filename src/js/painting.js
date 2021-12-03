$(document).ready(() => {
    $.get('/auction-info', function(data){
        setInterval(() => {
            const days = Math.round((new Date(data.auctionEndDate) - Date.now())/1000/60/60/24);
            const hours = Math.round((new Date(data.auctionEndDate) - Date.now())/1000/60/60) %24;
            const minutes = Math.round((new Date(data.auctionEndDate) - Date.now())/1000/60) % 60;
            const seconds = Math.round((new Date(data.auctionEndDate) - Date.now())/1000) % 60;
            $('.time__day>span:first-child').text(Math.abs(days));
            $('.time__hour>span:first-child').text(Math.abs(hours));
            $('.time__minute>span:first-child').text(Math.abs(minutes));
            $('.time__second>span:first-child').text(Math.abs(seconds));
        }, 1000);

    });

    let endTimer = false;

    $('.editing__button').click(() => {
        if (!endTimer) {
            endTimer = true;
            setTimeout(() => endTimer = false, 5000);
            const id = $('.painting-content').attr('id');
            const title = $('.editing__name').text();
            const author = $('.editing__author').text();
            const country = $('.editing__country').text();
            const price = $('.editing__price').text();
            const photo = $('.editing__photo').text();
            const available = $('.editing__available').text();
            const minStep = $('.editing__min-step').text();
            const maxStep = $('.editing__max-step').text();
            $.ajax({
                url: '/editing',
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    id, title, author, country, price, photo, available, minStep, maxStep
                })
            })
                .done(function() {
                    $('.header__author').text(author);
                    $('.header__title').text(title);
                    $('.header__country').text(country);
                    $('.image')
                        .removeClass('not-available').removeClass('available')
                        .addClass(`${available==='true'? 'available': 'not-available'}`)
                        .attr('data-available',`${available==='true'? 'В аукционе': 'Не в аукционе'}`);
                    $('.main__image').attr({'src':photo, 'alt': title});
                    $('.bid__price').text(`$ ${price}`);
                    $('.min-bid').text(`Мин. шаг: $${minStep}`);
                    $('.max-bid').text(`Макс. шаг: $${maxStep}`);
                    $('.success-popup').addClass('show').text('Данные изменены');
                    setTimeout(() => $('.success-popup').removeClass('show'), 5000);
                })
                .fail(function(e) {
                    $('.success-popup').addClass('show-incorrect').text(e.responseText);
                    setTimeout(() => $('.success-popup').removeClass('show-incorrect'), 5000);
                })
        }
        else {
            $('.success-popup').addClass('show-incorrect').text('Нельзя отпралять запросы слишком часто');
            setTimeout(() => $('.success-popup').removeClass('show-incorrect'), 5000);
        }

    })
})