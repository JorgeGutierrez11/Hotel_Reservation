const API_URL_USERS = "http://localhost:8081/users";
const API_URL_USERS_UP = "http://localhost:8081/users/update";
// Función para actualizar un usuario
async function update_user(id, name, lastname, email, typeDocument, numberDocument, phoneNumber, password) {
  try {
    const response = await fetch(API_URL_USERS_UP, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, lastname, email, typeDocument, numberDocument, phoneNumber, password })
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el usuario, revisa tus datos.");
    }
    alert("Usuario actualizado correctamente");
  } catch (e) {
    console.error(e);
    alert("Hubo un error al actualizar el usuario");
  }
}

// Función que recoge los datos de una fila y llama a update_user
function handleUpdate(id) {
  const name = document.getElementById(`name-${id}`).value;
  const lastname = document.getElementById(`lastname-${id}`).value;
  const email = document.getElementById(`email-${id}`).value;
  const phoneNumber = document.getElementById(`phone-${id}`).value;
  const typeDocument = document.getElementById(`typeDoc-${id}`).value;
  const numberDocument = document.getElementById(`numberDocument-${id}`).value;
  const password = document.getElementById(`password-${id}`).value;
  
  update_user(id, name, lastname, email, typeDocument, numberDocument, phoneNumber, password);
}

// Función para alternar la visualización de la contraseña
function togglePassword(id) {
  const passwordInput = document.getElementById(`password-${id}`);
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

// Función para obtener los usuarios y mostrarlos en la tabla
async function fetchUsers() {
  try {
    const response = await fetch(`${API_URL_USERS}/getAll`);
    if (!response.ok) {
      throw new Error("Error al obtener usuarios");
    }
    const users = await response.json();
    const tbody = document.querySelector("#users-table tbody");
    tbody.innerHTML = ""; // Limpiar tabla

    users.forEach(user => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${user.id}</td>
        <td><input type="text" id="name-${user.id}" value="${user.name}" required></td>
        <td><input type="text" id="lastname-${user.id}" value="${user.lastname}" required></td>
        <td><input type="email" id="email-${user.id}" value="${user.email}" required></td>
        <td><input type="tel" id="phone-${user.id}" value="${user.phoneNumber}" required></td>
        <td>
          <select id="typeDoc-${user.id}">
            <option value="CC" ${user.typeDocument === "CC" ? "selected" : ""}>Cédula de Ciudadanía</option>
            <option value="CE" ${user.typeDocument === "CE" ? "selected" : ""}>Cédula de Extranjería</option>
            <option value="PPP" ${user.typeDocument === "PPP" ? "selected" : ""}>Permiso por Protección Permanente</option>
            <option value="PPT" ${user.typeDocument === "PPT" ? "selected" : ""}>Permiso por Protección Temporal</option>
          </select>
        </td>
        <td><input type="text" id="numberDocument-${user.id}" value="${user.numberDocument}" required></td>
        <td><input type="text" id="role-${user.id}" value="${user.role}" readonly></td>
        <td>
          <div class="password-container">
            <input type="password" id="password-${user.id}" value="${user.password}" required>
            <button type="button" onclick="togglePassword(${user.id})">👁</button>
          </div>
        </td>
        <td>
          <button class="save-btn" onclick="handleUpdate(${user.id})">Guardar</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (e) {
    console.error(e);
    document.getElementById("table-container").innerHTML = "<p>Error al cargar usuarios</p>";
  }
}

window.addEventListener("DOMContentLoaded", fetchUsers);
