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

    console.log(allCart);
    loadCart();
  }
}

function loadCart() {
  var cartList = ""; // Initialize cartList variable
  cartList.innerHTML = ""
  for (var index = 0; index < allCart.length; index++) {
    cartList.innerHTML += `<li>${allCart[index].productName}</li>`;
  }
}
