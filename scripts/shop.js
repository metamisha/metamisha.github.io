var cart = {};
var login = 'login';
var password = 'password';
var isLoged = 1;
var currentCategory = 0;
var currentProduct = 3;
var nameCO;
var email;
var phone;


$('document').ready(function () {
    loadCategories();
    loadGoods();
    isEmpty();
    load();
$('#sendPost').on('click', sendPost);
});

function loadGoods() {
    if (currentCategory != 10) {
        $.getJSON("https://nit.tron.net.ua/api/product/list/category/" + currentCategory, function (data) {


                $('changecategory').on('click', changeCategory);

                var out = '';


                for (var key in data) {
                    out += '<div class="product-wrap col-12 col-sm-6 col-md-4 col-lg-3  d-flex align-items-stretch">' +
                        '<div class="product">' +
                        '<div class="card h-100" >' +
                        '<div class="card-body">' +
                        '<img class="card-img-top" src="' + data[key]['image_url'] + '"  alt="Card image cap" style="width: 90%; height: 200px; object-fit: contain " >' +
                        '<div class="name" id="name"><h5 class="card-title"> ' + data[key]['name'] + '</h5></div>' +
                        '<div class="giveMeDescr">' + data[key]['description'] + '</div></div>' +
                        '<div class="price">';

                    if (data[key]['special_price'] != null) {
                        out += '<h6 style="font-size: 15px">Price: <span style="text-decoration: line-through ">' + data[key]['price'] + ' </span></h6>' +
                            '<h6 style="color: darkred">' + data[key]['special_price'] + '₴</h6>';
                    } else {
                        out += '<h6>Price: ' + data[key]['price'] + ' ₴</h6>';
                    }
                    out += '</div> <div class="card-footer">';

                    out +=

                        '<button type="button" class="btn btn-outline-dark btn-sm addToCart" data-toggle="modal" data-target="#minicartModal" data-art="' + data[key].id + '" >' +
                        ' Add to cart' +
                        '</button>' +
                        '<button type="button" class="btn btn-outline-dark btn-sm productPage" data-toggle="modal" data-target="#prodModal" data-art="' + data[key].id + '" style="margin-left: 5px" >' +
                        'More..' +
                        '</button>';


                    out += '  </div>';
                    out += '  </div>';
                    out += '  </div>';
                    out += '  </div>';
                    out += '  </div>';
                }
                $('#goods').html(out);
                $('button.addToCart').on('click', addToCart);
                $('button.productPage').on('click', loadProductPage);
                $('#logInButtonConfirm').on('click', logIn);


            }
        );
    }
}

function addToCart() {
    var art = $(this).attr('data-art');
    art--;
    if (!(typeof cart[art] == "undefined")) {
        cart[art]++;
    } else {
        cart[art] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));


    cnt++;
    load();

}

function changeCategory() {
    var art = $(this).attr('data-art');

    currentCategory = art;


    $.getJSON('https://nit.tron.net.ua/api/category/list', function (data) {
        var out = data.find(function (item) {
            return item['id'] == art;
        })['description'];

        $('#catName').html(out);
    });
    loadGoods();

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
        var logedIn = ' <a class="nav-link push-right" id="addNewProduct" href="#" data-toggle="modal"' +
            'data-target="#addNewProductModalCenter">' +
            '<button type="button" class="btn btn-outline-dark btn-sm"><span' +
            'style=" font-weight: bold"> Add new product</span></button>' +
            '</a>'
        $('#adminPanel').html(logedIn);


    } else {
        outError = '<div class="logInResult" style="text-align: center"><span class="text-sm text-danger">Username or Password is incorrect, try again.</span></div>'
        $('#forWrongInput').html(outError);
    }
}

function loadCategories() {
    $.getJSON('https://nit.tron.net.ua/api/category/list', function (data) {
        var categoryout = '';
        for (var i in data) {
            categoryout += '<a class="dropdown-item"><button type="button" class="cc"  style="display: contents;width: 100%;height: 100%" data-art="' + data[i].id + '">' + data[i].name + '</button> </a>';
        }
        categoryout += '<div class="dropdown-divider"></div><a class="dropdown-item"><button type="button" class="clearFilt"  style="display: contents" data-art="' + data[i].id + '">Clear Filters</button></a>'
        $('#categorylisty').html(categoryout);
        $('.cc').on('click', changeCategory);
        $('.clearFilt').on('click', clearFilter);

    });

}

function clearFilter() {
    currentCategory = 0;
    out = 'Products';
    $('#catName').html(out);
    loadGoods();
}


function loadProductPage() {
    var art = $(this).attr('data-art');
    currentProduct = art;

    var out = '';
    $.getJSON("https://nit.tron.net.ua/api/product/" + currentProduct, function (data) {
        out += '<div class="card mb-3" id="productInCart" style="width:100%;">' +
            '<div className="card-header" style="text-align: right;">' +
            '</div>' +
            '<div class="row no-gutters">' +
            '<div class="col-md-4" style="text-align: center">' +
            '<img src="' + data.image_url + '" class="card-img " alt="..." style="height: 200px; width: 150px; object-fit: contain">' +
            '</div>' +
            '<div class="col-md-8">' +
            '<div class="card-body">' +
            '<h6 class="card-title text-left">' + data.name + '</h6>' +
            '<h6 class="card-text text-left text-sm-left cartDescription3"><small class="text-muted">' + data.description + '</small></h6>';
        if (data.special_price != null) {
            out += '<h6 class="card-title text-left text-sm" style="    margin-bottom: 0px;' +
                '    margin-top: 0.75rem;">Price/1ptc:<span style="color:darkred;"> ' + data.special_price + '</span> ₴</h6>';
        } else {
            out += '<h6 class="card-title text-left text-sm" style="    margin-bottom: 0px;' +
                '    margin-top: 0.75rem;">Price/1ptc: ' + data.price + ' ₴</h6>';
        }
        out += '</div>' +
            '</div>' +
            '</div>' +

            '</div>';


        $('#prodModalBody').html(out);
        $('.addToCartFromDesc').on('click', addToCart);
    });


}

function openCheckOutForm() {
    out = '<form>' +
        ' <div class="col">' +
        '<label class="sr-only" for="nameTab">Name</label>' +
        '<input type="text" class="form-control" id="nameTab" placeholder="Name">' +
        '    </div>' +
        ' <div class="col">' +
        '  <div class="input-group">' +
        '<input type="text" class="form-control" id="email" placeholder="Username" aria-label="username" aria-describedby="basic-addon2">' +
        '  <div class="input-group-append">' +
        '    <span class="input-group-text" id="basic-addon2">@hashshop.ua</span>' +
        '  </div>' +
        '</div>' +
        '  </div>' +
        ' <div class="col">' +
        '<input type="email" class="form-control" id="phone" aria-describedby="emailHelp" placeholder="Phone number">' +
        '  </div>' +
        '</form>';
    $('#checkoutModal').html(out);


}
function sendPost() {
    nameCO = document.getElementById('nameTab').value;
    phone = document.getElementById('phone').value;
    email = document.getElementById('email').value + '@hashshop.ua';


    $.ajax({
        type: "POST",
        url: "https://nit.tron.net.ua/api/order/add",
        data: {
            products: cart,
            token: "_aFZvAXwjzwjDVelSY3s",
            name: nameCO,
            phone: phone,
            email: email,
        },
        dataType: 'json',
        success: function(json) {
            alert('Done!')

        },
        error: function(xhr) {
            console.log("er")
            
        },});

}


/*     <div class="row no-gutters">
        <div class="col-md-4">
            <img src="..." class="card-img" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
    </div>

*/
























