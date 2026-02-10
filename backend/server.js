const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Pozwala na połączenia z innego portu (np. React na 3000)
app.use(express.json()); // Pozwala czytać dane JSON z żądań POST

// --- Konfiguracja Bazy Danych ---

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/chatdb';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Połączono z MongoDB'))
  .catch(err => console.error('Błąd połączenia z MongoDB:', err));

// --- Model Danych (Schema) ---
const MessageSchema = new mongoose.Schema({
  user: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

// --- Endpointy API ---

// 1. Pobierz wszystkie wiadomości (GET)
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(50);
    
    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ error: 'Nie udało się pobrać wiadomości' });
  }
});

// 2. Wyślij nową wiadomość (POST)
app.post('/messages', async (req, res) => {
  try {
    const { user, text } = req.body;

    if (!user || !text) {
      return res.status(400).json({ error: 'Brak użytkownika lub treści' });
    }

    const newMessage = new Message({ user, text });
    await newMessage.save();

    console.log(`Nowa wiadomość od ${user}: ${text}`);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Nie udało się zapisać wiadomości' });
  }
});

// --- Start Serwera ---
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});