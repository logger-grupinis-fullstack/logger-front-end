const register = document.getElementById("registerForm");
const regSuccess = document.querySelector(".register_success");
const overlay = document.querySelector(".overlay");
const passwordMsg = document.querySelector(".password_message");
const emailMsg = document.querySelector(".email_message");

const openSucessMsg = function () {
  regSuccess.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeSuccessMsg = function () {
  regSuccess.classList.add("hidden");
  overlay.classList.add("hidden");
};

const checkPasswordOn = function () {
  passwordMsg.classList.remove("hidden");
};

const checkPasswordOff = function () {
  passwordMsg.classList.add("hidden");
};

const checkEmail = function () {
  emailMsg.classList.remove("hidden");
};

register.addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = document.querySelector("#regForm__username").value;
  const email = document.querySelector("#regForm__email").value;
  const password = document.querySelector("#regForm__pass").value;
  const repeatPassword = document.querySelector("#regForm__passRepeat").value;

  try {
    if (password !== repeatPassword) {
      checkPasswordOn();
      return;
    }

    checkPasswordOff();

    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: name, email, password }),
    });

    const data = await response.text();

    if (response.ok) {
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userID", data._id);
      localStorage.setItem("userToken", data.token);

      openSucessMsg();
      setTimeout(() => {
        window.location.href = "/index.html";
      }, 1500);
    } else {
      if (data && data.error) {
        alert("Negerai ivesti duomenys");
      } else {
        checkEmail();
      }
    }

    console.log("User registered successfully:", jsonData);
  } catch (err) {
    console.error("Registration error:", err.message);
  }
});
