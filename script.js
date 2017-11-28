/* -------------------------------------------
    START
----------------------------------------------*/
$(document).ready(function () {


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
        400: {
            items: 2
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


//Send to edit page
$('.edit').on('click', function () {
    editBurger($(this).attr('id'));
});


/* -------------------------------------------
    RECEIPT BAR
----------------------------------------------*/

// Add item to receipt list
function addItem(obj, val) {
    if (obj.length) {
        var itemId = obj.attr('id');
        var quantityId = '#' + itemId + '-quantity';

        // if already in the list, increase counter
        if ($('#' + itemId + '-receipt-item').length) {
            
            // Get sum and update value
            var sum = parseInt($(quantityId).val()) + parseInt(val);
            $(quantityId).val(sum);
        }

        // else, add new item
        else {
            $('#receipt-list').append(
                '<li data-id="' + itemId + '" id="' + itemId + '-receipt-item" class="receipt-item">' +
                    '<img src="images/' + itemId + '-icon.png"> x <input class="receipt-quantity" ' + 
                    'id="' + itemId + '-quantity" type="number" ' + 'value="' + val + '" min="1" max="999">' + 
                    '<span class="receipt-btn">' + 
                        '<button data-id="' + itemId + '" data-type="remove" type="button" data-toggle="modal" data-target="#customModal" ' + 
                        'class="btn btn-danger btn-sm">' +
                            '<i class="fa fa-trash" aria-hidden="true"></i>' + 
                        '</button>' + 
                        '<button type="button" onclick="editBurger(' + itemId + ')" class="btn btn-danger btn-sm">' +
                            '<i class="fa fa-pencil" aria-hidden="true"></i>' + 
                        '</button>' + 
                    '</span>' + 
                '</li>');
        }
    }
}

// Get total price 
function calcReceiptPrice() {
    var tp = 0;

    $('#receipt-list li').each(function () {
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
            '<div class="row no-gutter order">' +
                '<div class="col-xs-12 col-sm-2 order-image">' +
                    '<img src="images/' + bId + '-icon-lg.png">' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3 order-name">' +
                    $('#description-' + bId + ' .name').text() + 
                '</div>' +
                '<div class="col-sm-1 order-price">$<span>' + 
                    price + '</span>' + 
                '</div>' +
                '<div class="col-xs-12 col-sm-2 order-quantity">' +
                    '<input id="' + bId + '-quantity" type="number" value="' + quantity + '" min="1">' + 
                '</div>' +
                '<div class="col-xs-12 col-sm-3 order-customize">' +
                    '<button class="cust-order-btn btn btn-danger" onclick="removeOrder(this)">' +
                        '<i class="fa fa-trash" aria-hidden="true"></i>' + 
                    '</button>' +
                    '<button class="cust-order-btn btn btn-danger" onclick="editBurger(' + bId + ')">' +
                        '<i class="fa fa-pencil" aria-hidden="true"></i></button>' + 
                '</div>' +
                '<div class="col-xs-12 col-sm-1 order-line-price">$<span>' +
                    quantity * parseFloat(price) + '</span>' +
                '</div>' + 
            '</div>');

    });
}


// Update total price when quantity in receipt bar is changed
$(document).on('change', '.receipt-quantity', function () {
    calcReceiptPrice();
});

//Custom Modal for adding/removing burger from receipt list
$('#customModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var bID = button.data('id');

    if(button.data('type')=='remove'){
        $('#customModal .modal-title').text('Remove Order Item'); 
        $('#customModal .modal-body').text('Do you want remove all of this item from your order?');

        $('#modal-confirm').off().on('click', function () {
            removeBurger(bID, true);
            $('#customModal').modal('hide');
            calcReceiptPrice();
        });
    }
    else {
        $('#customModal .modal-title').text('Add Order Item'); 
        $('#customModal .modal-body').html('<p>How many would you like to add?   ' +
            '<input id="modal-add" type="number" value="1" min="1" max="999"></p>');

        $('#modal-confirm').off().on('click', function () {
            addItem($('.item.item-hover'), $('#modal-add').val());
            $('#customModal').modal('hide');
            calcReceiptPrice();
        });
    }
});


/* -------------------------------------------
    REVIEW ORDER
----------------------------------------------*/

// Add current order to checkout
$('#reviewModal').on('show.bs.modal', function () {
    $('#order-list').empty();
    addOrderToCheckout();
    calculateTotals();
});

// Update price on change on quantity
$(document).on('change', '.order-quantity input', function () {
    updateQuantity(this);
});

// Remove order
function removeOrder(button) {
    order = $(button).parent().parent();
    order.slideUp('fast', function () {
        order.remove();
        calculateTotals();
    });
};

// Calculate total price
function calculateTotals() {
    var subtotal = 0;
    var taxRate = 0.13;

    // Sum up row totals
    $('.order').each(function () {
        subtotal += parseFloat($(this).find('.order-line-price span').text());
    });

    // Calculate totals
    var tax = subtotal * taxRate;
    var total = subtotal + tax;

    // Update display
    $('#subtotal span').html(subtotal.toFixed(2));
    $('#tax span').html(tax.toFixed(2));
    $('#grand-total span').html(total.toFixed(2));

    $('#checkout-total').html(total.toFixed(2));
}

// Update total when quantity is changed
function updateQuantity(quantityInput) {
    var quantity = 0;
    var order = $(quantityInput).parent().parent();
    var price = parseFloat(order.find('.order-price span').text());
    quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    // Update line price display and re-calculate totals 
    order.find('.order-line-price span').each(function () {
        $(this).text(linePrice.toFixed(2));
        calculateTotals();
    });
}

$('#review-confirm').on('click', function (e) {
    $('#tab-navigation li:eq(1) a').tab('show');
});


/* -------------------------------------------
    CHECKOUT  ORDER
----------------------------------------------*/
$('#cash-btn').on('click', function () {
    $(this).addClass('active');
    $('#card-btn').removeClass('active');   
});

$('#card-btn').on('click', function () {
    $(this).addClass('active');
    $('#cash-btn').removeClass('active');   
});

$('#delivery-btn').on('click', function () {
    $(this).addClass('active');
    $('#pickup-btn').removeClass('active');
    $('#address-info').collapse('show');    
});

$('#pickup-btn').on('click', function () {
    $(this).addClass('active');
    $('#delivery-btn').removeClass('active');
    $('#address-info').collapse('hide');
});

$('#order-btn').on('click', function () {
    $('.page-content').hide();
    $('#thankyou-page').show();
    $('.sidebar-options').removeClass('link-hover');
    $('.modal').modal('hide');
    resetPage();
});

function resetPage() {
    $('#receipt-list').empty();
    $('#tp').html('0.00');
    $('#b1').trigger('click');
    
    $(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
    $(':checkbox, :radio').prop('checked', false);


    $('#tab-navigation li:eq(0) a').tab('show');
}
