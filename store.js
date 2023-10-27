if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function addItemToCart(item) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartRowContents = `
  <div class="cart-item cart-column">
    <span class="cart-item-title">${item?.name}</span>
  </div>
  <span class="cart-price cart-column">Rs.${item?.price}</span>
  <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="${item?.quantity}" min="1" />
    <button class="btn btn-danger" type="button">REMOVE</button>
</div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function ready() {
  const cartData = JSON.parse(localStorage.getItem("cart"));
  if (cartData) {
    for (const item of cartData) {
      addItemToCart(item);
    }
  }
  updateCartTotal();
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  alert("Thank you for your purchase");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
  localStorage.removeItem("cart");
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
  updateLocalStorage();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
  updateLocalStorage();
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("Rs.", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "Rs." + total;
}

function updateLocalStorage() {
  const cartItems = document.getElementsByClassName("cart-items")[0];
  const cartRows = Array.from(cartItems.getElementsByClassName("cart-row"));
  const items = cartRows.map((row) => {
    const name = row.getElementsByClassName("cart-item-title")[0].innerText;
    const price = parseFloat(
      row.getElementsByClassName("cart-price")[0].innerText.replace("Rs.", "")
    );
    const quantity = parseInt(
      row.getElementsByClassName("cart-quantity-input")[0].value
    );
    return { name, price, quantity };
  });
  localStorage.setItem("cart", JSON.stringify(items));
}
