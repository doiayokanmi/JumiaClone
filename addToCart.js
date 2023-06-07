var allCart;
var allProduct;
var LSallProduct = localStorage.getItem('allProduct');

if (LSallProduct) {
  allProduct = JSON.parse(LSallProduct);
} else {
  allProduct = [];
}

var LSallCart = localStorage.getItem('allCart');

if (LSallCart) {
  allCart = JSON.parse(LSallCart);
} else {
  allCart = [];
}

function addToCart(index) {
  var productQty = document.getElementById(`productQty${index}`);

  if (productQty.value === "") {
    productQty.style.outline = "2px solid red";
    productQty.focus();
  } else {
    var cartItem = {
      productName: allProduct[index].productName,
      productPrice: allProduct[index].price,
      productQty: productQty.value
    };

    allCart.push(cartItem);

    localStorage.setItem('allCart', JSON.stringify(allCart));
    alertCon.innerHTML = "Successfully added to cart"
    alertCon.style.display = 'block'

    setTimeout(function() {
      alertCon.style.display = "none";
    }, 2000);
    
    console.log(allCart);
    loadCart();
  }
}

const asideProductDetails = document.getElementById("asideProductDetails")

function loadCart() {
  asideProductDetails.innerHTML = ""
  for (var index = 0; index < allCart.length; index++) {
    asideProductDetails.innerHTML += `<div class="p-2">${allCart[index].productName}</div>`;
  }
}
