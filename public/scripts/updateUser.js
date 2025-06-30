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
    response = await response.json();
    if (response.error) {
      alert(response.error);
    } else {
      alert("¡Usuario actualizado!");
      location.replace("/profile");
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
});
