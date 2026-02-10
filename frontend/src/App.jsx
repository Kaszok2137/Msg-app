import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('Anonim'); // Domyślna nazwa użytkownika
  const [text, setText] = useState('');

  // Adres Twojego backendu
  const API_URL = 'http://localhost:5000/messages';

  // 1. Funkcja pobierająca wiadomości (GET)
  const fetchMessages = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Błąd pobierania:", error);
    }
  };

  // 2. Uruchom pobieranie co 2 sekundy (Polling)
  useEffect(() => {
    fetchMessages(); // Pierwsze pobranie od razu
    const interval = setInterval(fetchMessages, 2000); // Kolejne co 2s
    return () => clearInterval(interval); // Sprzątanie przy zamknięciu
  }, []);

  // 3. Funkcja wysyłania (POST)
  const sendMessage = async () => {
    if (!text) return;

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, text })
      });
      setText(''); // Wyczyść pole tekstowe
      fetchMessages(); // Odśwież widok natychmiast
    } catch (error) {
      console.error("Błąd wysyłania:", error);
    }
  };

  return (
    <div className="chat-container">
      <h1>Docker Chat (REST API)</h1>
      
      {/* Lista wiadomości */}
      <div className="messages-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user === user ? 'me' : ''}`}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Formularz */}
      <div className="input-area">
        <input 
          type="text" 
          placeholder="Twój nick" 
          value={user} 
          onChange={(e) => setUser(e.target.value)} 
          style={{ width: '100px' }}
        />
        <input 
          type="text" 
          placeholder="Wpisz wiadomość..." 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Wyślij</button>
      </div>
    </div>
  )
}

export default App