let currentCartId = null;

async function loadCart() {
  const res = await fetch("/api/carts/user", { credentials: "include" });
  if (!res.ok) return alert("Could not load cart");
  const cart = await res.json();
  currentCartId = cart._id;
  const container = document.getElementById("cart-items");
  container.innerHTML = "";
  if (!cart.products || cart.products.length === 0) {
    container.innerHTML = "<p>The cart is empty.</p>";
    return;
  }
  cart.products.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <span>${item.product.title} - Quantity: ${item.quantity}</span>
      <button onclick="removeFromCart('${item.product._id}')">Remove</button>
    `;
    container.appendChild(div);
  });
}

async function removeFromCart(pid) {
  const res = await fetch(`/api/carts/user/products/${pid}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) return alert("Error removing product");
  loadCart();
}

async function clearCart() {
  if (!confirm("¿Seguro que deseas vaciar el carrito?")) return;
  const res = await fetch(`/api/carts/user`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) return alert("Error emptying cart");
  loadCart();
}

async function checkoutCart() {
  const res = await fetch(`/api/carts/user/purchase`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    const err = await res.json();
    return alert(err.error || " Error completing purchase");
  }
  const data = await res.json();
  alert("Purchase completed! Ticket: " + data.ticket.code);
  loadCart();
}

window.addEventListener("DOMContentLoaded", () => {
  loadCart();
  document.getElementById("clear-cart").onclick = clearCart;
  document.getElementById("checkout").onclick = checkoutCart;
});
