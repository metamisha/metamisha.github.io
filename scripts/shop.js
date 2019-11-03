var cart = {};
var login = 'login';
var password = 'password';
var isLoged = 0;


$('document').ready(function () {
    loadGoods();
    isEmpty();
    load();
// in Development    scrollToProducts();
});

function loadGoods() {
    // adds goods to the page
    $.getJSON('goods.json', function (data) {

            var out = '';
            var gooodsInJson = data;
            console.log(sortObject(data));

            for (var key in data) {
                out += '<div class="product-wrap col-12 col-sm-6 col-md-4 col-lg-3  d-flex align-items-stretch">' +
                    '<div class="product">' +
                    '<div class="card h-100" >' +
                    '<div class="card-body">' +
                    '<img class="card-img-top" src="' + data[key].image + '"  alt="Card image cap" style="height: 180px; width: 180px" >' +
                    '<div class="name" id="name"><h5 class="card-title"> ' + data[key]['name'] + '</h5></div>' +
                    '<div class="descr">' + data[key]['description'] + '</div></div>' +
                    '<div class="price">';
                out += '<h5 class="text">Price<span class="text-sm-center">: $' + data[key]['price'] + ' </span></h5>';
                '<h5>Price: $' + data[key]['price'] + ' </h5>'
                out += '</div> <div class="card-footer">';
                if (data[key]['isNew'] === 1) {
                    out +=
                        '<button type="button" class="btn btn-outline-dark btn-sm addToCart" data-toggle="modal" data-target="#minicartModal" data-art="' + key + '" >\n' +
                        ' Add to cart' +
                        '</button>'

                } else {
                    out +=
                        '<button type="button" class="btn btn-outline-dark btn-sm addToCart" data-toggle="modal" data-target="#minicartModal" data-art="' + key + '" id>\n' +
                        ' Add to cart' +
                        '</button>';
                }
                out += '  </div>';
                out += '  </div>';
                out += '  </div>';
                out += '  </div>';
                out += '  </div>';
            }
            $('#goods').html(out);
            $('button.addToCart').on('click', addToCart);
            $('#logInButtonConfirm').on('click', logIn);

        }
    );
}

function addToCart() {
    var art = $(this).attr('data-art');
    if (!(typeof cart[art] == "undefined")) {
        cart[art]++;
    } else {
        cart[art] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));


    cnt++;
    load();

}


function isEmpty() {
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function logIn() {
    var outError = '';

    if (document.getElementById("usernameInput").value === login && document.getElementById("passwordInput").value === password) {
        outError = '<div class="logInResult" style="text-align: center"><span class="text-sm" style="text-align: center">Logged In</span></div>'
        $('#forWrongInput').html(outError);
        var logedIn = ' <a class="nav-link push-right" id="addNewProduct" href="#" data-toggle="modal"\n' +
            'data-target="#addNewProductModalCenter">\n' +
            '<button type="button" class="btn btn-outline-dark btn-sm"><span\n' +
            'style=" font-weight: bold"> Add new product</span></button>\n' +
            '</a>'
        $('#adminPanel').html(logedIn);


    } else {
        outError = '<div class="logInResult" style="text-align: center"><span class="text-sm text-danger">Username or Password is incorrect, try again.</span></div>'
        $('#forWrongInput').html(outError);
    }

}
function sortObject(obj) {
    var arr = [];
    var prop;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'price': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) {
        return a.value - b.value;
    });
    return arr; // returns array
}
/* In Development
function scrollToProducts() {
    console.log("debug");
    $("#scrollButton").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html,body').animate({
                scrollTop: $(hash).offset().
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });
}

*/




























