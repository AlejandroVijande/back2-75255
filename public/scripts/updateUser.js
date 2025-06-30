<<<<<<< HEAD
document.querySelector("#update").addEventListener("click", async () => {
  try {
    const data = {};
    const name = document.querySelector("#name").value;
    if (name) data.name = name;

    const age = document.querySelector("#age").value;
    if (age) data.age = age;

    const city = document.querySelector("#city").value;
    if (city) data.city = city;

    const avatar = document.querySelector("#avatar").value;
    if (avatar) data.avatar = avatar;

    const opts = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    };

    let response = await fetch("/api/users", opts);
=======
document.querySelector("#register").addEventListener("click", async () => {
  try {
    const data = {};
    const name = document.querySelector("#name").value
    if (name) {
      data.name = name
    }
    const date = document.querySelector("#date").value
    if (date) {
      data.date = date
    }
    const avatar = document.querySelector("#avatar").value
    if (avatar) {
      data.avatar = avatar
    }
    const city = document.querySelector("#city").value
    if (city) {
      data.city = city
    }
    const opts = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const url = "/api/users";
    let response = await fetch(url, opts);
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
    response = await response.json();
    if (response.error) {
      alert(response.error);
    } else {
<<<<<<< HEAD
      alert("¡Usuario actualizado!");
      location.replace("/profile");
=======
      location.replace("/login");
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
<<<<<<< HEAD
});
=======
});
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
