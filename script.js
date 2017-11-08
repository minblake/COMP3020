
// Display the correct page content when its button is pressed
function showContent(content) {
	$('.page-content').each(function(index) {
		if($(this).attr("id") == content)
			$(this).show();
		else
			$(this).hide();
	});
}
