// Add this script to your frontend after the existing HTML.
// It connects the login/signup forms to the Arogyam backend.
//
// Backend URL:
const API_URL = "http://localhost:5000/api";

async function api(path, options = {}) {
  const token = localStorage.getItem("arogyam_token");

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

async function signupUser(name, email, password) {
  const data = await api("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password })
  });

  localStorage.setItem("arogyam_token", data.token);
  localStorage.setItem("arogyam_user", JSON.stringify(data.user));
  return data.user;
}

async function loginUser(email, password) {
  const data = await api("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  localStorage.setItem("arogyam_token", data.token);
  localStorage.setItem("arogyam_user", JSON.stringify(data.user));
  return data.user;
}

function logoutUser() {
  localStorage.removeItem("arogyam_token");
  localStorage.removeItem("arogyam_user");
}

async function getCurrentUser() {
  if (!localStorage.getItem("arogyam_token")) return null;

  try {
    const data = await api("/auth/me");
    return data.user;
  } catch {
    logoutUser();
    return null;
  }
}

async function loadCourses() {
  const data = await api("/courses");
  return data.courses;
}

async function loadProgress() {
  const data = await api("/progress");
  return data.progress;
}

// Example:
// loginUser("you@example.com", "password123")
//   .then(user => console.log("Logged in:", user))
//   .catch(error => alert(error.message));
