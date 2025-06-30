const selector = document.querySelector("#opts");

const isOnline = async () => {
  try {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = "/api/auth/online";
    let response = await fetch(url, opts);
    response = await response.json();
    console.log(response);
    if (response.error) {
      selector.innerHTML = `
        <a class="btn btn-primary py-1 px-2 m-1" href="/register">Register</a>
        <a class="btn btn-primary py-1 px-2 m-1" href="/login">Login</a>
      `;
    } else {
      selector.innerHTML = `
        <a class="btn btn-primary py-1 px-2 m-1" href="/profile">Profile</a>
        <a class="btn btn-primary py-1 px-2 m-1" href="/cart">Cart</a>
        <button class="btn btn-primary py-1 px-2 m-1" id="signout">Sign out</button>
      `;
      document.querySelector("#signout").addEventListener("click", async () => {
        try {
<<<<<<< HEAD
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = "/api/auth/signout";
    await fetch(url, opts);
    localStorage.removeItem("token");
    location.replace("/");
  } catch (error) {
    console.log(error);
  }
});
    }
    
=======
          const signoutOpts = { method: "POST", headers: { "Content-Type": "application/json" } };
          const signoutUrl = "/api/auth/signout";
          await fetch(signoutUrl, signoutOpts);
          localStorage.removeItem("token");
          location.replace("/");
        } catch (error) {
          console.log(error);
        }
      });
    }

>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
  } catch (error) {
    console.log(error);
  }
};

<<<<<<< HEAD
isOnline();
=======
isOnline();
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
