document.getElementById("reset-form").onsubmit = async function(e) {
  e.preventDefault();
  const token = document.getElementById("token").value;
  const newPassword = document.getElementById("newPassword").value;
  const repeatPassword = document.getElementById("repeatPassword").value;
  if (newPassword !== repeatPassword) return alert("Las contraseñas no coinciden");
  const res = await fetch(`/api/auth/reset/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newPassword })
  });
  if (res.ok) {
    alert("¡Contraseña restablecida!");
    window.location = "/login";
  } else {
    const err = await res.json();
    alert(err.error || "No se pudo restablecer la contraseña.");
  }
};
