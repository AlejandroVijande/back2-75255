document.getElementById("forgot-form").onsubmit = async function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const res = await fetch("/api/auth/recover", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  if (res.ok) {
    alert("If your email is registered, we’ve sent you a recovery link!");
    window.location = "/login";
  } else {
    const err = await res.json();
    alert(err.error || "Could not send recovery email.");
  }
};
