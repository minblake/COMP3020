// Display correct page when button is clicked
$('.sidebar-options').on( 'click', function() {
	$('.page-content').hide();
	$('#' + $(this).attr('id')+'-page').show();
});

// Display correct description when item is selected
$('.item').on( 'click', function() {
  $('.item').removeClass("selected");
  $(this).addClass("selected");

  $('.description-text').hide();
  $('#' + 'description-' + $(this).attr('id')).show();
});

// Popular Items carousel
$('#popular-carousel').owlCarousel({
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,

  margin: 10,
  nav: true,
  autoHeight: true,
  items: 6,

  //Define navigation icons as < >
  navText : [ '<i class="fa fa-angle-left" aria-hidden="true"></i>', 
  '<i class="fa fa-angle-right" aria-hidden="true"></i>' ] 
});



