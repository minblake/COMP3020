$(document).ready(function () {
    $('#sidebar-toggle').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    $('#receipt-toggle').on('click', function () {
        $('#receipt-bar').toggleClass('active');
    });

    //Home button pressed from start
    $('#home-option').trigger('click');

});

// Display correct page when button is clicked
$('.sidebar-options').on('click', function () {
    $('.page-content').hide();
    $('#' + $(this).attr('id') + '-page').show();

    $('.sidebar-options').removeClass('link-hover');
    $(this).addClass('link-hover');

});

// Popular Items carousel
$('#popular-carousel').owlCarousel({
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 10,
    nav: true,
    autoHeight: true,
    // items: 5,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        992: {
            items: 6
        }
    },
    //Define navigation icons as < >
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>']
});


// Display correct description when carousel item is selected
$('.item').on('click', function () {
    $('.item').removeClass('item-hover');
    $(this).addClass('item-hover');

    $('.description-text').hide();
    $('#' + 'description-' + $(this).attr('id')).show();

});

// Add item to receipt list
function addItem(obj) {
    if (obj.length) {
        var itemId = obj.attr('id');

        // if already in the list, increase counter
        if ($('#' + itemId + '-receipt').length)
            $('#' + itemId + '-quantity').html(function (i, val) {
                return +val + 1
            });

        // else, add new item
        else
            $('#receipt-list').append('<li id="' + itemId + '-receipt"' + ' class="receipt-item">' +
                '<img src="images/' + itemId + '-icon.png"> x<span id="' + itemId + '-quantity' + '">1</span></li>');
    }
}

// Add popular item burger
$('#add-popular').on('click', function () {
    addItem($('.item.item-hover'));
});