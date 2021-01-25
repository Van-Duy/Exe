$(document).ready(function () {
    loadUser();

    // check subscribe
    $('#subscribe-form').click(function (e) { 
        e.preventDefault();
        let value = $('.subscribe-form').val();
        if(validateEmail(value)){
            $('.error-subscript').css('display', 'none');
            $('.success-subscript').css('display', 'block');

            var dt = new Date();
            let time =  dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
            $.get('save_user.php', {'email' : value,'time' : time},
                function (data) {
                    loadUser();
                },
                "json"
            );
        }else{
            $('.error-subscript').css('display', 'block');
            $('.success-subscript').css('display', 'none');
        }
    });


    

    


});

function validateEmail($email) {
    if($email == ''){
        return false;
    }
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
}

function loadUser() {
    $.get('load_user.php',
    function (data) {
        let html = '';
        $.each(data.items, function (index, value) { 
            html += ` <tr>
                        <td class="text-center">` + value['id'] + `</td>
                        <td class="text-center">` + value['email'] + `</td>
                        <td class="text-center">` + value['time'] + `</td>
                    </tr>`;
        });
        $('#user').append(html);
    },
    "json"
    );
}