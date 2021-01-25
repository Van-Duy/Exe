let filmHtmlTemplate = $('#templateHtml');
let showFilmsElement = $('.content-movie');
let categoryId =1;
if( localStorage.getItem("id")) categoryId = localStorage.getItem("id");

$(document).ready(function(){
	init().then(function(categoryId) {
		handleClassActive(categoryId);
		loadData(categoryId)
	
	});

	$(".tab-movie-demo").click(function(){
		let id = $(this).attr('id');
		handleClassActive(id);
		saveLocalStorage(id);
		loadData(id);
	})
});

function init(){
	return new Promise(function(resolve, reject) {
		$.ajax({
			url		: 'tab.php',
			data	: {
				type: 'category'
			},
			type	: 'GET',
			dataType: 'json',
			async: false
		}).done(function(data){
			var count = 0;
			$.each(data, (key, value) => {
				if(count == 0) {
					$('#tab-category-demo').append('<li id="' + value.id + '" class="active tab-movie-demo"><a href="javascript:void(0)">'+ value.name +'</button></li>');
				} else {
					$('#tab-category-demo').append('<li id="' + value.id + '" class="tab-movie-demo"><a href="javascript:void(0)">'+ value.name +'</a></li>');
				}
				count++;
			});
		});
		resolve(categoryId);
		reject('Error');
	});
}

function loadData(categoryId) {
	$.ajax({
		url		: 'tab.php',
		data	: {
		type: 'load-data', 
		id: categoryId
		},
		type	: 'GET',
		dataType: 'json'
	}).done(function(data){
		appendData(data, filmHtmlTemplate, showFilmsElement);
	});
}

function handleClassActive(id) {
	$('#tab-category-demo li').removeClass("active");
	$("#" + id).addClass("active");
}

function appendData(items, filmHtmlTemplate, showFilmsElement) {
	if (items.length > 0) {
		showFilmsElement.empty();
		$.each(items, (index, value) => {
			var htmlMore = filmHtmlTemplate.html();
			htmlMore = htmlMore.replace(/{image}/g, value.image);
			htmlMore = htmlMore.replace(/{title}/g, value.title);
			htmlMore = htmlMore.replace(/{description}/g, value.description);
			showFilmsElement.append(htmlMore);
		});
	}
}

saveLocalStorage = (id) => {
	localStorage.setItem('id',id);
}