
// Display correct page when button is clicked
$('.sidebar-options').on( 'click', function() {
	$('.page-content').hide();
	$('#' + $(this).attr('id')+'-page').show();
});
