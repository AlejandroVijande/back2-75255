async function addToCart(pid) {
  const res = await fetch(`/api/carts/user/products/${pid}`, {
    method: "POST",
    credentials: "include"
  });
  if (!res.ok) return alert("Could not add to cart");
  alert("Product added to cart");
}
