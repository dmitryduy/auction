$(document).ready(() => {
    $('.delete_user').each(function () {
        $(this).click(function () {
            const user = $(this).parent().parent().parent();
            const id = user.attr('id');
            $.ajax({
                url: '/users',
                type: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({id})
            })
                .done(() => {
                    user.remove();
                })
        })
    });
    function addUser() {
        const participateButton = $('.participate');
        const notParticipateButton = $('.not-participate');
        participateButton.click(function () {
            $(this).addClass('active');
            notParticipateButton.removeClass('active');
        })
        notParticipateButton.click(function () {
            $(this).addClass('active');
            participateButton.removeClass('active');
        })

        $('.table__button').click(() => {
            $('.add-user').addClass('visible');
            $('.edit-user').removeClass('visible');
        });
        $('.close-icon').click(() => {
            $('.add-user').removeClass('visible');
        });

        const editParticipateButton = $('.edit-participate');
        const editNotParticipateButton = $('.edit-not-participate');
        editParticipateButton.click(function () {
            $(this).addClass('active-edit');
            editNotParticipateButton.removeClass('active-edit');
        })
        editNotParticipateButton.click(function () {
            $(this).addClass('active-edit');
            editParticipateButton.removeClass('active-edit');
        })


        $('.edit-close-icon').click(() => {
            $('.edit-user').removeClass('visible');
        });

        $('.add-user').submit(function (e) {
            e.preventDefault();
            const name = $('.add-user__name').val();
            const email = $('.add-user__email').val();
            const money = Math.abs(+$('.add-user__money').val());
            const participate = !!$('.active').attr('data-participate');
            $.ajax('/users', {
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({name, email, money, participate})
            })
                .done(() => {
                    location.reload();
                });
        });
    }

    addUser();

    function edit() {
        let nameItem;
        let emailItem;
        let moneyItem;
        let participate;
        $('.edit-user-button').click(function () {
            $('.add-user').removeClass('visible');
            const row = $(this).parent().parent().parent();
            $('.edit-user').addClass('visible').attr('id', row.attr('id'));
            nameItem = row.find('.user__title');
            emailItem = row.find('.user__email');
            moneyItem = row.find('.user__money');
            participate = row.find('.user__participate');
            $('.edit-user__name').val(nameItem.text());
            $('.edit-user__email').val(emailItem.text());
            $('.edit-user__money').val(moneyItem.text().slice(1));

        });
        $('.edit-user').submit((e) => {
            e.preventDefault();
            const name = $('.edit-user__name').val();
            const email = $('.edit-user__email').val();
            const money = $('.edit-user__money').val();
            const isParticipate = !!$('.active-edit').attr('data-participate');
            $.ajax('/users-edit', {
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: $('.edit-user').attr('id'),
                    name,
                    email,
                    money,
                    participate: isParticipate,
                })

            })
                .done(() => {
                    if (isParticipate) {
                        participate.removeClass('red').addClass('green');
                    } else {
                        participate.removeClass('green').addClass('red');
                    }
                    nameItem.text(name);
                    emailItem.text(email);
                    moneyItem.text('$' + money);
                    $('.edit-user').removeClass('visible');
                })
        });
    }

    edit();
});