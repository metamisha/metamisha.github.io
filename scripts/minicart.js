var cnt = 0;
var checkOut = 0;


function load() {
    $.getJSON('goods.json', function (data) {
        var goods = data;
        checkCart();
        var out = '';
        var sum = 0, count = 0;

        if ($.isEmptyObject(cart)) {
            out += '<h5 class="text-sm-center">Your cart is empty</h5>'
        } else {

            sum = 0;
            count = 0;
            for (var key in cart) {
                count += cart[key];
                sum += goods[key].price * cart[key];
                out += '<div class="card mb-3" id="productInCart" style="width:100%;">' +
                    '<div class="row no-gutters">' +
                    '<div class="col-md-4" style="text-align: center">' +
                    '<img src="' + goods[key].image + '" class="card-img " alt="..." style="height: 200px; width: 200px; object-fit: contain">' +
                    '</div>' +
                    '<div class="col-md-8">' +
                    '<div class="card-body">' +
                    '<h6 class="card-title text-left">' + goods[key].name + '<button type="button" class="btnDelete" style="height: 20px; width: 20px;font-size: x-small; text-align: center;vertical-align: center;margin-left: 10px; display: contents; font-size: 15px;" data-art="' + key + '"><i class="fa fa-close"  style="margin-left: 40px"></i></button> </h6>' +
                    '<h6 class="card-text text-left text-sm-left"><small class="text-muted">' + goods[key].description + '</small></h6>' +
                    '<h6 class="card-title text-left text-sm">Price/1ptc: $' + goods[key].price + '</h6>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="card-footer text-sm-left">' +
                    '<div class="quant text-sm-left" style="position: absolute; display: flex"><h6 class="text-sm-left">Quantity: ' + cart[key] + '      ' +
                    '</h6><div class="buttonsGroup" style="display: grid; margin-left: 10px"> <button type="button" class="btn btn-light btnPlus" style="height: 13px; width: 25px; font-size: 13px; text-align: center; display: contents;" data-art="' + key + '"><i class="fa fa-plus"></i></button>' +
                    '<button type="button" class="btn btn-light btnMinus" style="height: 13px; width:25px; font-size:13px; vertical-align: center; text-align: center; display: contents;" data-art="' + key + '"><i class="fa fa-minus"></i> </button>';

                out += '</div></div><div class="price text-sm-right" style="text-align: end"><h6 class="text-sm-right">Price: $' + goods[key].price * cart[key] + '</h6>' +
                    '</div></div>' +
                    '</div>' +
                    '</div>';
            }
        }
        var cartOut = '';
            cartOut += '<div class="cartSize">Cart:<span style=" font-weight: bold"> ' + count + '</span></div>';
        var totalPriceOut = '';
        if (sum != 0) {
            totalPriceOut += 'Total Price:  <span style="font-weight: bold">' + sum + '$</span>';
        }
        $('#counter').html(cartOut);
        $('#modalMiniCart').html(out);
        $('#sumOut').html(totalPriceOut);
        $('.btnPlus').on('click', plusGoods);
        $('.btnMinus').on('click', minusGoods);
        $('.btnDelete').on('click', goodDelete);


    });
}

function goodDelete() {
    var artDelete = $(this).attr('data-art');
    cnt = cnt - cart[artDelete];
    delete cart[artDelete];
    localStorage.setItem('cart', JSON.stringify(cart));
    load();

}

function plusGoods() {
    var art = $(this).attr('data-art');
    cart[art]++;
    localStorage.setItem('cart', JSON.stringify(cart));


    cnt++;
    load();
}

function minusGoods() {

    var art = $(this).attr('data-art');
    if (cart[art] > 1) {
        cart[art]--;

    } else {
        delete cart[art];
    }
    cnt--;
    localStorage.setItem('cart', JSON.stringify(cart));
    load();


}

function checkCart() {
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}
