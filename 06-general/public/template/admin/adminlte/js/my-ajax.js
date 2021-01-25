$(document).ready(function () {
    $('.filmName').change(function (e) { 
       let filmName = $(this).val();
       let id = $(this).attr('id');
       let current = $(this);
       let url = `index.php?module=backend&controller=index&action=changeAjax`;
       $.get(url, {'value' : filmName,'id' : id,'type' : 'changeNameFilm'},
           function (data) {
            notice(current,data);
           },'json'
       );
    });

    $('select[name=category_name]').change(function (e) { 
        let id = $(this).attr('id');
        let current = $(this);
        
        let value = $(this).val();
        let url = `index.php?module=backend&controller=index&action=changeAjax`;
        $.get(url, {'value' : value,'id' : id,'type' : 'changeCategoryName'},
        function (data) {
         notice(current,data);
        },'json'
    );
    });

   

});

function changeStatus(url) {
    $.get(url,
        function (data) {
            let current = $('.status-' + data.id);
            notice(current,data);
            $(current).replaceWith(data.html);
        },'json'
        
    );
}
function trashSingle(url){
    Swal.fire(confirmObj('Bạn chắc chắn muốn xóa dòng dữ liệu này?', 'error', 'Xóa')).then(
        (result) => {
            if (result.value) {
                $.get(url,
                    function (data) {
                        let current = 'tr-' + data.id;
                        showToast(data.class, data.title);
                        $( '#' + current ).hide( 2000);
                    },
                    "json"
                );
            }
        }
    );
}

function confirmObj(text, icon, confirmText) {
    return {
        position: 'top',
        title: 'Thông báo!',
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmText,
        cancelButtonText: 'Hủy',
    };
}

function notice(currrent,data){
    currrent.notify(data.title, {
        className: data.class,
        position: 'top center',
    });
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
    timer: 5000,
    padding: '1rem',
});

function showToast(type, message) {
    Toast.fire({
        icon: type,
        title: ' ' + message,
    });
}