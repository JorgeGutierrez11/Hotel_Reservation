const express = require("express");
const bodyParser = require("body-parser");
const emailHelper = require("./helpers/emailHelper");

const app = express();
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { to, subject, code } = req.body;
  try {
    await emailHelper(to, subject, code);
    res.status(200).json({ message: "Correo enviado con éxito" });
  } catch (err) {
    console.error("Error al enviar el correo:", err);
    res.status(500).json({ error: "Error al enviar el correo" });
  }
});

app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
