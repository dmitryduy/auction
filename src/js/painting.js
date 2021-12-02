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
})