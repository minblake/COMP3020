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
        if ($('#' + itemId + '-receipt-item').length)
            $('#' + itemId + '-quantity').val(function (i, oldval) {
                return ++oldval;
            });

        // else, add new item
        else {
            $('#receipt-list').append('<li id="' + itemId + '-receipt-item"' + ' class="receipt-item">' +
                '<img src="images/' + itemId + '-icon.png"> x <input class="receipt-quantity" id="' + itemId +
                '-quantity"' + ' type="number" value="1" min="1"><div class="receipt-button"><button type="button" ' +
                'class="btn btn-danger edit" onclick="editBurger(' + itemId + ')"><i class="fa fa-pencil" ' +
                'aria-hidden="true"></i></button><button data-id="' + itemId + '" type="button" data-toggle="modal"' +
                'data-target="#removeModal" class="btn btn-danger">' +
                '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div></li>');
        }
    }
}

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


//Remove burger from receipt list
$('#removeModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var bID = button.data('id');
    
    $('#remove-confirm').on('click', function() {
        removeBurger(bID);
        $('#removeModal').modal('hide');
    });
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
<<<<<<< HEAD
<<<<<<< HEAD
}

/* -------------------------------------------
    RECEIPT BAR
----------------------------------------------*/
// function addOrderToCheckout {
//     var productList = $('#product-list');
//     var listItems = $('$receipt-list li');

//     listItems.each(function(idx, li) {
//         var product = $(li);

            

//     });
// }
||||||| merged common ancestors
}
=======
}


>>>>>>> 7734010ec068b2910baf0743f5875b90aa120d05
||||||| merged common ancestors
}
=======
}


>>>>>>> 7734010ec068b2910baf0743f5875b90aa120d05
