const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
const PORT = 3000;

// MiddleWare
app.use(cors()); 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.get("/singup", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "CreateAcount.html"));
});
app.get("/recpwd", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "recpwd.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
})
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})
