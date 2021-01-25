let ITEM_PER_PAGE = 4;
let page = 0;
let flag = false;
let showFilmsElement = $('#show-films');
let filmHtmlTemplate = $('#templateHtml');

$(document).ready(function () {
    loadData();
});

function loadData(){
    $("body").loading();
    if(flag == false) {
        flag = true;
        $.ajax({
            url		: 'load_more.php',
            type	: 'GET',
            data	: {
                offset: page * ITEM_PER_PAGE,
                limit: ITEM_PER_PAGE + 1 //load more than ITEM_PER_PAGE then can check that data can have next page
            },
            dataType: 'json',
            success	: function(data){
                flag = false;
                setTimeout(() => {
                    $('body').loading('stop');
                    if (data.items.length > ITEM_PER_PAGE) {
                        page++;
                        let showItems = data.items.slice(0, ITEM_PER_PAGE);
                        appendData(showItems,filmHtmlTemplate, showFilmsElement);
                    } else {
                        $('#btn-show').hide();
                        appendData(data.items, filmHtmlTemplate, showFilmsElement);
                    }
                }, 1000);
                // if has more items per page then increase page
            }
        });
    }
}

function appendData(items, filmHtmlTemplate, showFilmsElement) {
    if (items.length > 0) {
        $.each(items, (index, value) => {
            let htmlMore = filmHtmlTemplate.html();
            htmlMore = htmlMore.replace(/{image}/g, value.image);
            htmlMore = htmlMore.replace(/{title}/g, value.title);
            htmlMore = htmlMore.replace(/{description}/g, value.description);
            showFilmsElement.append(htmlMore);
        });
    }
    $("body, html").animate({scrollTop: $(document).height()}, 500);
}