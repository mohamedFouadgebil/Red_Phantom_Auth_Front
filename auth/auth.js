const API = "https://red-phantom-auth-back-hh6z.vercel.app/api/users";

async function signup() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const age = document.getElementById("age").value;
  const phone = document.getElementById("phone").value;
  const role = document.getElementById("role").value;
  const gender = document.querySelector("input[name='gender']:checked")?.value;

  if (password.length < 8) {
    alert("Password must be at least 8 characters long!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const data = {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    age: Number(age),
    phone,
    role,
    gender,
  };

  try {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message || "Signup failed");
      return;
    }

    localStorage.setItem("email", email);
    location.href = "verify-email.html";
  } catch (err) {
    alert("Server error");
  }
}

async function verifyEmail() {
  const emailStored = localStorage.getItem("email");
  const otpValue = document.getElementById("otp").value;

  try {
    const res = await fetch(`${API}/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailStored,
        otp: otpValue,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message || "Invalid OTP");
      return;
    }

    localStorage.removeItem("email");
    location.href = "login.html";
  } catch (err) {
    alert("Server error");
  }
}

async function login() {
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    location.href = "https://red-phantom-main.vercel.app/";
  } catch (err) {
    alert("Server error");
  }
}
