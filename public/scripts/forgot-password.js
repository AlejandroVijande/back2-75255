document.getElementById("forgot-form").onsubmit = async function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const res = await fetch("/api/auth/recover", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  if (res.ok) {
    alert("¡Si tu email está registrado, te enviamos un enlace de recuperación!");
    window.location = "/login";
  } else {
    const err = await res.json();
    alert(err.error || "No se pudo enviar el correo de recuperación.");
  }
};
