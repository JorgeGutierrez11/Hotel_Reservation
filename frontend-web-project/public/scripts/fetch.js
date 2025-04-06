const API_URL = "http://localhost:8080/auth/login";
const API_URL_SIGNUP = "http://localhost:8080/auth/signup";
const API_URL_HOTELS = "http://localhost:8080/hotels";

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("myPassword").value;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) {
            throw new Error("Login fallido, revisa tus credenciales.");
        }
        //const data = await response.json();
        //localStorage.setItem("token", data.token);
        //console.log(data);
    } catch (e) {
        console.error(e);
    }

})
document.getElementById("singupForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;




    try {
        const response = await fetch(API_URL_SIGNUP, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, phone, password })
        });
        if (!response.ok) {
            throw new Error("Error al registrarse, revisa tus datos.");
        }
    } catch (e) {
        console.error(e);
    }

})