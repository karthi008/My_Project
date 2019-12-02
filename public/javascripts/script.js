 
function ajaxCall(url, method, data, successCb, errorCb) {
	console.info(method);

	console.info(method.toLowerCase() === "get" ? (Object.keys(data).map(key => key + '=' + data[key]).join('&')) : JSON.stringify(data));

	$.ajax({
		url : url,
		method : method,
		contentType: "application/json",
		data : method.toLowerCase() === "get" ? Object.keys(data).map(key => key + '=' + data[key]).join('&') : JSON.stringify(data),
		success : function(response) {
			successCb(response);
		},
		error : function(error) {
			errorCb(error);
		}
	});
}

function changeFavBtn(method, element) {
	if (method == "PUT") {
		element.text("Mark Not Favourite");
		element.toggleClass("mark-favourite btn-primary mark-unfavourite btn-danger");
	} else {
		element.toggleClass("mark-unfavourite btn-danger mark-favourite btn-primary");
		element.text("Mark as Favourite");
	}
}

function favourites(id, method, element) {
	ajaxCall("/book/"+id+"/favourite", method, {}, function(response) {
			console.info(response);
			if (response.success) {
				changeFavBtn(method, element);
				alert(method === "PUT" ? "Marked as Favourite" : "Marked as not favourite");
			} else {
				alert("An error Occured");
			}
			// $(".books-wrapper").html(response);
		}, function(error) {
			console.info(error);
			// $(".books-wrapper").html(response);
		});
}

$(document).ready(function() {
	$("body").on("click", ".mark-favourite", function(e) {
		e.preventDefault();
		favourites($(this).data("id"), "PUT", $(this));
	});

	$("body").on("click", ".mark-unfavourite", function(e) {
		e.preventDefault();
		favourites($(this).data("id"), "DELETE", $(this));
	});
});