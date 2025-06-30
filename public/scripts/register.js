document.querySelector("#register").addEventListener("click", async () => {
  try {
    const data = {
<<<<<<< HEAD
      name: document.querySelector("#name").value,
=======
      first_name: document.querySelector("#first_name").value,
      last_name: document.querySelector("#last_name").value,
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
      age: document.querySelector("#age").value,
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      avatar: document.querySelector("#avatar").value,
      city: document.querySelector("#city").value,
    };

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const url = "/api/auth/register";
    let response = await fetch(url, opts);
    response = await response.json();

    if (response.error) {
      alert(response.error);
    } else {
      location.replace("/login");
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
});
