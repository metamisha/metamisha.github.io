var cart = {};
var count;
$('document').ready(function () {
    loadGoods();
    isEmpty();

});

function loadGoods() {
    // adds goods to the page
    $.getJSON('json/goods.json', function (data) {
        console.log(data);
        var out = '';
        for (var key in data) {
            out += '<div class="product-wrap col-12 col-sm-6 col-md-4 col-lg-3  d-flex align-items-stretch">';
            out += '<div class="product">';
            out += '<div class="card h-100" >';
            out += '<div class="card-body">';
            out += '<img class="card-img-top" src="' + data[key].image + '"  alt="Card image cap" style="height: 70%" >';
            out += '<div class="name" id="name">';
            out += '<h5 class="card-title"> <i class="fa fa-apple" aria-hidden="true"></i>' + data[key]['name'] + '</h5>';
            out += '</div>';
            out += '<div class="descr">';
            out += data[key]['description'];
            out += '</div>';
            out += '</div>';
            out += '<div class="price">';
            out += '<h5>Price: ' + data[key]['price'] + '$ </h5>';
            out += '</div>';
            out += '  <div class="card-footer">';
            if (data[key]['isNew'] == 1) {
                out += ' <small class="text-muted"><button type="button" class="btn btn-outline-danger btn-sm buttonaddProduct"  id="#addToCart data-toggle="modal" data-target="#exampleModalLong" data-art="' + key + '" >Add to cart</button></small>';
            } else {
                out += ' <small class="text-muted"><button type="button" class="btn btn-outline-dark btn-sm buttonaddProduct"  id="addToCart" data-toggle="modal" data-target="#exampleModalLong" data-art="' + key + '" >Add to cart</button></small>';
            }
            out += '  </div>';
            out += '  </div>';
            out += '  </div>';
            out += '  </div>';
            out += '  </div>';
        }
        $('#goods').html(out);
        $('button.buttonaddProduct').on('click', addToCart);



    });
}
function openMiniCart() {


}


function addToCart() {
    var art = $(this).attr('data-art');


    if (cart[art] != undefined) {
        cart[art]++;
    } else {
        cart[art] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);


}
function isEmpty() {
    // is store empty



    if(localStorage.getItem('cart')!=null){
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}
/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
  Open modal
</button>

<!-- The Modal -->
<div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Modal Heading</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        Modal body..
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>
*/






















