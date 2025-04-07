// Toggle Password Visibility
function togglePassword(id) {
    const passwordField = document.getElementById(id);
    const toggleIcon = passwordField.nextSibling; // El ícono junto al campo

    if (passwordField.type === "password") {
        passwordField.type = "text"; // Muestra la contraseña
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash"); // Cambia al ícono de ojo cerrado
    } else {
        passwordField.type = "password"; // Oculta la contraseña
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye"); // Cambia al ícono de ojo abierto
    }
}