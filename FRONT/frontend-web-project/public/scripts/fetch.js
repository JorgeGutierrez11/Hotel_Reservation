const API_URL = "http://localhost:8081/auth/login";
const API_URL_SIGNUP = "http://localhost:8081/auth/register";
const API_URL_USERS = "http://localhost:8081/users/update";
try{
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            throw new Error("Login fallido, revisa tus credenciales.");
        }else{
            const data = await response.json(); // Aquí obtenemos el JSON

            if (data.role === "ADMIN") {
                window.location.href = "/dashboard"; // Redirigir al dashboard si es admin
            }else{
                alert("Login usuario")
            }
        }
        
    } catch (e) {
        console.error(e);
    }

})
}catch(e){
    console.log(e)
}
try{
document.getElementById("singupForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const typeDocument = document.getElementById("typeDoc").value;
    const numberDocument = document.getElementById("numberDocument").value;
    const phoneNumber = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    




    try {

        const response = await fetch(API_URL_SIGNUP, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name,lastname, email,typeDocument,numberDocument, phoneNumber, password })
        });
        if (!response.ok) {
            throw new Error("Error al registrarse, revisa tus datos.");
        }else{
            window.location.href = "/login";
        }
        

    } catch (e) {
        console.error(e);
    }

})
}catch (e){
    console.log(e)
}
function update_user(name,lastname, email,typeDocument,numberDocument, phoneNumber, password){
    try {

        const response = fetch(API_URL_USERS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name,lastname, email,typeDocument,numberDocument, phoneNumber, password })
        });
        if (!response.ok) {
            throw new Error("Error al registrarse, revisa tus datos.");
        }
        

    } catch (e) {
        console.error(e);
    }
}