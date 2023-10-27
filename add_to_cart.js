const add_to_cart_button =
  document.getElementsByClassName("add-to-cart-button")?.[0];
const local_storage = window.localStorage;

function addItemToCart(item) {
  let cart = JSON.parse(local_storage.getItem("cart"));
  if (!cart) {
    cart = [];
  } else {
    for (const cart_item of cart) {
      if (cart_item.name === item.name) {
        cart_item.quantity += 1;
        local_storage.setItem("cart", JSON.stringify(cart));
        return;
      }
    }
  }
  cart.push(item);
  local_storage.setItem("cart", JSON.stringify(cart));
}

if (add_to_cart_button) {
  add_to_cart_button.addEventListener("click", () => {
    const item = {
      name: document.getElementsByClassName("shop-item-title")?.[0]
        ?.textContent,
      price: parseFloat(
        document
          .getElementsByClassName("shop-item-price")?.[0]
          ?.textContent.split(" ")[1]
      ),
      quantity: 1,
    };
    addItemToCart(item);
    window.location.href = "/cart.html";
  });
}
