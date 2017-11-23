/* -------------------------------------------
    START
----------------------------------------------*/
$(document).ready(function () {
    // Activate sidebar toggle button
    $('#sidebar-toggle').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    // Activate receipt bar toggle button
    $('#receipt-toggle').on('click', function () {
        $('#receipt-bar').toggleClass('active');
    });

    //Home button pressed from start
    $('#home-option').trigger('click');
    $('#b1').trigger('click');

});

/* -------------------------------------------
    SIDEBAR
----------------------------------------------*/
// Display correct page when button is clicked
$('.sidebar-options').on('click', function () {
    $('.page-content').hide();
    $('#' + $(this).attr('id') + '-page').show();

    $('.sidebar-options').removeClass('link-hover');
    $(this).addClass('link-hover');

});

/* -------------------------------------------
    CUSTOMIZE ITEMS
----------------------------------------------*/
function removeBurger(bID) {
    $('#' + bID + '-receipt-item').remove();
}

function editBurger(bID) {
    $('#build-option').trigger('click');
    $('.modal').modal('hide');
}

/* -------------------------------------------
    POPULAR ITEMS
----------------------------------------------*/
// Popular Items carousel
$('#popular-carousel').owlCarousel({
    mouseDrag: false,
    // touchDrag: false,
    margin: 10,
    nav: true,
    autoHeight: true,
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


// Add popular item burger
$('#add-popular').on('click', function () {
    addItem($('.item.item-hover'));
    calcTotalPrice($('#receipt-list'));
});

//Send to edit page
$('.edit').on('click', function () {
    editBurger($(this).attr('id'));
});


/* -------------------------------------------
    CHECKOUT
----------------------------------------------*/


/* Set rates + misc */
var taxRate = 0.13;
var fadeTime = 300;


/* Assign actions */
$('.product-quantity input').change(function () {
    updateQuantity(this);
});

$('').click(function () {
    removeItem(this);
});


/* Recalculate cart */
function recalculateCart() {
    var subtotal = 0;

    /* Sum up row totals */
    $('.product').each(function () {
        subtotal += parseFloat($(this).children('.product-line-price').text());
    });

    /* Calculate totals */
    var tax = subtotal * taxRate;
    var total = subtotal + tax;

    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function () {
        $('#cart-subtotal').html(subtotal.toFixed(2));
        $('#cart-tax').html(tax.toFixed(2));
        $('#cart-total').html(total.toFixed(2));
        if (total == 0) {
            $('.checkout').fadeOut(fadeTime);
        } else {
            $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
    });
}


/* Update quantity */
function updateQuantity(quantityInput) {
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function () {
        $(this).fadeOut(fadeTime, function () {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });
}


/* Remove item from cart */
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();
    });
}


/* -------------------------------------------
    RECEIPT BAR
----------------------------------------------*/

// Add item to receipt list
function addItem(obj) {
    if (obj.length) {
        var itemId = obj.attr('id');

        // if already in the list, increase counter
        if ($('#' + itemId + '-receipt-item').length)
            $('#' + itemId + '-quantity').val(function (i, oldval) {
                return ++oldval;
            });

        // else, add new item
        else {
            $('#receipt-list').append('<li data-id="' + itemId + '" id="' + itemId + '-receipt-item" class="receipt-item">' +
                '<img src="images/' + itemId + '-icon.png"> x' + 
                '<input class="receipt-quantity" id="' + itemId + '-quantity" type="number" value="1" min="1">' + 
                '<span class="receipt-btn"><button data-id="' + itemId + '" type="button" data-toggle="modal" ' + 
                'data-target="#removeModal" class="btn btn-danger btn-sm cust-btn">' +
                '<i class="fa fa-trash" aria-hidden="true"></i></button>' + 
                '<button type="button" onclick="editBurger(' + itemId + ')" class="btn btn-danger cust-btn btn-sm">' +
                '<i class="fa fa-pencil" aria-hidden="true"></i></button></span></li>');
        }
    }
}

// Get total price 
function calcTotalPrice(list) {
    var tp = 0;

    $('li', list).each(function () {
        var bId = $(this).data('id');

        // Total price += price * quantity
        tp += parseFloat($('#description-' + bId + ' .price').text()) * 
        $('#' + bId + '-receipt-item ' + '#' + bId + '-quantity').val();
    });
    $('#tp').html(tp.toFixed(2));
}

// Add current order to review
function addOrderToCheckout() {

    $('#receipt-list li').each(function () {
        var bId = $(this).data('id');
        var quantity = $('#' + bId + '-receipt-item ' + '#' + bId + '-quantity').val();
        var price = $('#description-' + bId + ' .price').text();

        $('#order-list').append(
            '<li data-id="'+ bId + '"><div class="row no-gutter order">' +
            '<div class="col-xs-12 col-sm-2 order-image">' +
            '<img src="images/' + bId + '-icon-lg.png"></div>' +
            '<div class="col-xs-12 col-sm-3 order-name">' +
            $('#description-' + bId + ' .name').text() + '</div>' +
            '<div class="col-sm-1 order-price">' + price +'</div>' +
            '<div class="col-xs-12 col-sm-2 order-quantity">' +
            '<input type="number" value="' + quantity + '" +min="1"></div>' +
            '<div class="col-xs-12 col-sm-3 order-customize">' +
            '<button class="cust-order-btn btn btn-danger btn order-remove">' +
            '<i class="fa fa-trash" aria-hidden="true"></i></button>' +
            '<button class="cust-order-btn btn btn-danger btn order-edit"' +
            ' onclick="editBurger(' + bId + ')">' +
            '<i class="fa fa-pencil" aria-hidden="true"></i></button></div>' +
            '<div class="col-xs-12 col-sm-1 order-line-price">' +
            quantity * parseFloat(price) + '</div></div></li>');

    });
}


// Update total price when quantity in receipt bar is changed
$(document).on('change', '.receipt-quantity', function () {
    calcTotalPrice($('#receipt-list'));
});

//Remove burger from receipt list
$('#removeModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var bID = button.data('id');

    $('#remove-confirm').on('click', function () {
        removeBurger(bID);
        $('#removeModal').modal('hide');
        calcTotalPrice($('#receipt-list'));
    });
});


/* -------------------------------------------
    CHECKOUT
----------------------------------------------*/

// Add order to checkout
$('#reviewModal').on('show.bs.modal', function () {
    $('#order-list').empty();
    addOrderToCheckout();
});
