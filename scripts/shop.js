var cart = {};
var login = 'login';
var password = 'password';
var isLoged = 1;
var currentCategory=0;




$('document').ready(function () {
    loadCategories();
    loadGoods();
    isEmpty();
    load();

});

function loadGoods() {
if(currentCategory!=10){
    $.getJSON("https://nit.tron.net.ua/api/product/list/category/"+currentCategory, function (data) {


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

                if(data[key]['special_price']!=null) {
                   out+= '<h6>Price: <span style="text-decoration: line-through ">' + data[key]['price'] + ' </span></h6>'+
                    '<h6 style="color: darkred">'+ data[key]['special_price'] +'₴</h6>';
                }else{
                    out+='<h6>Price: ' + data[key]['price'] + ' ₴</h6>';
                }
                out += '</div> <div class="card-footer">';

                    out +=
                        '<button type="button" class="btn btn-outline-dark btn-sm addToCart" data-toggle="modal" data-target="#minicartModal" data-art="' + key + '" >' +
                        ' Add to cart' +
                        '</button>'+
                        '<button type="button" class="btn btn-outline-dark btn-sm addToCart" data-toggle="modal" data-target="#minicartModal" data-art="' + key + '" style="margin-left: 5px">'+
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

            $('#logInButtonConfirm').on('click', logIn);

        }
    );
}}

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
function changeCategory() {
    var art = $(this).attr('data-art');

    currentCategory=art;


    $.getJSON('https://nit.tron.net.ua/api/category/list', function (data) {
        var out = data.find(function (item) {
            return item['id'] == art;
        })['name'];

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
function loadCategories() {
    $.getJSON('https://nit.tron.net.ua/api/category/list', function (data) {
        var categoryout='';
        for(var i in data){
            categoryout+='<a class="dropdown-item"><button type="button" class="cc"  style="display: contents;width: 100%;height: 100%" data-art="' + data[i].id + '">' + data[i].name + '</button> </a>';
        }
            categoryout+='<div class="dropdown-divider"></div><a class="dropdown-item"><button type="button" class="clearFilt"  style="display: contents" data-art="' + data[i].id + '">Clear Filters</button></a>'
        $('#categorylisty').html(categoryout);
        $('.cc').on('click', changeCategory);
        $('.clearFilt').on('click', clearFilter);

    });

}
function clearFilter(){
    currentCategory = 0;
    out='Products';
    $('#catName').html(out);
    loadGoods();
}
function loadProductPage() {

}































