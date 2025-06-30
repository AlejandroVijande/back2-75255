async function addToCart(pid) {
  const res = await fetch(`/api/carts/user/products/${pid}`, {
    method: "POST",
    credentials: "include"
  });
  if (!res.ok) return alert("No se pudo agregar al carrito");
  alert("Producto agregado al carrito");
}
