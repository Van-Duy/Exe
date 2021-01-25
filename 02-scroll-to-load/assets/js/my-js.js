$(document).ready(function () {
    let ITEM_PER_PAGE = 6;
    let page = 0;
    let flag = false;
    let showFilmsElement = $('#show-films');
    let filmHtmlTemplate = $('#templateHtml');
    let haveMoreItem = true;

    loadData();

    $(window).scroll(function () {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            if (haveMoreItem) {
                loadData();
            }
        }
    });

    function loadData() {
        $("body").loading();
        $.ajax({
            url: 'scroll_to_load.php',
            type: 'GET',
            data: {
                offset: page * ITEM_PER_PAGE,
                limit: ITEM_PER_PAGE + 1 //load more than ITEM_PER_PAGE then can check that data can have next page
            },
            dataType: 'json',
            success: function (data) {
                $('body').loading('stop');
                // if has more items per page then increase page
                if (data.items.length > ITEM_PER_PAGE) {
                    page++;
                    var showItems = data.items.slice(0, ITEM_PER_PAGE);
                    appendData(showItems, filmHtmlTemplate, showFilmsElement);
                } else {
                    haveMoreItem = false;
                    appendData(data.items, filmHtmlTemplate, showFilmsElement);
                }
            }
        });
    }
    
    function appendData(items, filmHtmlTemplate, showFilmsElement) {
        if (items.length > 0) {
            $.each(items, (index, value) => {
                var htmlMore = filmHtmlTemplate.html();
                htmlMore = htmlMore.replace(/{image}/g, value.image);
                htmlMore = htmlMore.replace(/{title}/g, value.title);
                htmlMore = htmlMore.replace(/{description}/g, value.description);
                showFilmsElement.append(htmlMore);
            });
        }
    }
});



