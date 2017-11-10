
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

// Display correct page when button is clicked
$('.sidebar-options').on( 'click', function() {
  $('.page-content').hide();
  $('#' + $(this).attr('id')+'-page').show();
});

// Display correct description when carousel item is selected
$('.item').on( 'click', function() {
  $('.item').removeClass("selected");
  $(this).addClass("selected");

  $('.description-text').hide();
  $('#' + 'description-' + $(this).attr('id')).show();
});

// Add item to receipt list
function addItem(obj) {
  if (obj.length) {
    var itemId = obj.attr('id');

    // if already in the list, increase counter
    if ( $('#' + itemId + '-receipt').length)
      $('#' + itemId + '-quantity').html(function(i,val) { return +val+1});
    
    // else, add new item
    else
      $('#receipt-list').append('<li id="' + itemId + '-receipt"' + ' class="receipt-item">' +
        '<img src="images/' + itemId + '-icon.png"> x<span id="' + itemId + '-quantity' +'">1</span></li>')
  } 
}

// Add popular item burger
$('#add-popular').on ( 'click', function() { addItem( $('.item.selected')); });

