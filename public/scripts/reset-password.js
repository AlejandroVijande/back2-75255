document.getElementById("reset-form").onsubmit = async function(e) {
  e.preventDefault();
  const token = document.getElementById("token").value;
  const newPassword = document.getElementById("newPassword").value;
  const repeatPassword = document.getElementById("repeatPassword").value;
  if (newPassword !== repeatPassword) return alert("Passwords do not match");
  const res = await fetch(`/api/auth/reset/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newPassword })
  });
  if (res.ok) {
    alert("Password reset successfully!");
    window.location = "/login";
  } else {
    const err = await res.json();
    alert(err.error || "Could not reset password.");
  }
};
