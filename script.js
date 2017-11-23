$(document).ready(function () {
    $('#sidebar-toggle').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    $('#receipt-toggle').on('click', function () {
        $('#receipt-bar').toggleClass('active');
    });

    //Home button pressed from start
    $('#home-option').trigger('click');
    $('#b1').trigger('click');

});


// Display correct page when button is clicked
$('.sidebar-options').on('click', function () {
    $('.page-content').hide();
    $('#' + $(this).attr('id') + '-page').show();

    $('.sidebar-options').removeClass('link-hover');
    $(this).addClass('link-hover');

});

// Popular Items carousel
// $('#home-carousel').owlCarousel({
//     mouseDrag: false,
//     touchDrag: false,
//     pullDrag: false,
//     margin: 10,
//     nav: true,
//     autoHeight: true,
//     items: 1,
//     //Define navigation icons as < >
//     navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>',
//         '<i class="fa fa-angle-right" aria-hidden="true"></i>']
// });

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



//Receipt Add button
function editBurger(bID) {
    $('#build-option').trigger('click');
}

// Add popular item burger
$('#add-popular').on('click', function () {
    addItem($('.item.item-hover'));
});

//Send to edit page
$('.edit').on('click', function() {
    editBurger($(this).attr('id'));
});




function removeBurger(bID) {
    $('#'+bID+'-receipt-item').remove();
}


/* Set rates + misc */
var taxRate = 0.13;
var fadeTime = 300;


/* Assign actions */
$('.product-quantity input').change(function () {
    updateQuantity(this);
});

$('.product-removal button').click(function () {
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
    CHECKOUT
----------------------------------------------*/
$('#checkout-option').on('click', function() {
    $('#product-list').empty();
    addOrderToCheckout();
});

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
            $('#receipt-list').append('<li data-id="' + itemId +'" id="' + itemId + '-receipt-item"' + ' class="receipt-item">' +
                '<img src="images/' + itemId + '-icon.png"> x <input class="receipt-quantity" id="' + itemId +
                '-quantity"' + ' type="number" value="1" min="1"><div class="receipt-button"><button type="button" ' +
                'class="btn btn-danger edit" onclick="editBurger(' + itemId + ')"><i class="fa fa-pencil" ' +
                'aria-hidden="true"></i></button><button data-id="' + itemId + '" type="button" data-toggle="modal"' +
                'data-target="#removeModal" class="btn btn-danger">' +
                '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div></li>');
        }
    }
}

//Remove burger from receipt list
$('#removeModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var bID = button.data('id');
    
    $('#remove-confirm').on('click', function() {
        removeBurger(bID);
        $('#removeModal').modal('hide');
    });
});

function addOrderToCheckout() {
    var imageHtml = '<div class="product"><div class="product-image">';
    var titleHtml = '<div class="product-details"><div class="product-title">';
    var descriptHtml = '<p class="product-description">';
    var priceHtml = '<div class="product-price">';
    var quantityHtml = '<div class="product-quantity"><input type="number" value="';
    var linePriceHtml = '<div class="product-line-price">';
    var btnHtml = '<div class="product-customize">' + 
            '<button class="customize-product-btn">Remove</button></div>' +
            '<div class="product-customize">' +
            '<button class="customize-product-btn">Edit</button></div>';
    var ih, th, dh, ph, qh, lph;

    $('#receipt-list li').each(function() {
        var product = $(this);
        var bId = product.data('id');

        // Reset html
        ih = imageHtml;
        th = titleHtml;
        dh = descriptHtml;
        ph = priceHtml;
        qh = quantityHtml;
        lph = linePriceHtml;

        // Add image
        ih += '<img src=images/' + bId + '-icon-lg.png></div>';

        // Add project details
        th += $('#description-' + bId + ' .name').text() + '</div>';
        dh += $('#description-' + bId + ' .dsecription').text() + '</p></div>';

        // Add product price
        var quantity = $('#' + bId + '-receipt-item ' + '#' + bId + '-quantity').val();
        var price = $('#description-' + bId + ' .price').text();
        var linePrice = quantity * parseFloat(price);
        
        ph += price + '</div>';
        qh += quantity + '" min="1"></div>';
        lph += linePrice + '</div></div>';

        $('#product-list').append(ih + th + dh + ph + qh + btnHtml + lph);

    });
}

