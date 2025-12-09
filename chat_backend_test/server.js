const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Chat temporal en memoria
let chats = {};

// Crear chat
app.post("/api/create-chat", (req, res) => {
  const { email } = req.body;

  if (!chats[email]) {
    chats[email] = {
      email,
      messages: [],
      unread: 0,
    };
  }

  res.json(chats[email]);
});

// Obtener un chat
app.get("/api/chat/:email", (req, res) => {
  const { email } = req.params;
  res.json(chats[email] || { email, messages: [] });
});

// Enviar mensaje
app.post("/api/send-message", (req, res) => {
  const { email, text, isAdmin } = req.body;

  if (!chats[email]) {
    chats[email] = { email, messages: [], unread: 0 };
  }

  const message = {
    id: Date.now(),
    text,
    isAdmin,
  };

  chats[email].messages.push(message);

  if (!isAdmin) {
    chats[email].unread++;
  }

  res.json({ success: true });
});

// Todos los chats para el admin
app.get("/api/chats", (req, res) => {
  const list = Object.values(chats);
  res.json(list);
});

// Marcar como leído
app.post("/api/mark-read", (req, res) => {
  const { email } = req.body;

  if (chats[email]) {
    chats[email].unread = 0;
  }

  res.json({ success: true });
});

// Servidor corriendo
app.listen(3001, () => {
  console.log("Backend corriendo en http://localhost:3001");
});
