import React, { useState, useRef, useEffect } from "react";

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function App() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = "https://hosted-app-llm-bot-tmmy.onrender.com"; // Replace with your backend URL
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  async function sendQuestion() {
    if (!question.trim()) return;
    setLoading(true);

    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message: question, timestamp: new Date() },
    ]);

    try {
      const res = await fetch(`${API_BASE_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", message: data.answer || "No response", timestamp: new Date() },
      ]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", message: "Error contacting server", timestamp: new Date() },
      ]);
    }

    setQuestion("");
    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") sendQuestion();
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Aisiri's Chatbot</h1>
      </header>
      <section style={styles.chatWindow}>
        {chatHistory.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#4B9CE2" : "#E5E5EA",
              color: msg.sender === "user" ? "#fff" : "#000",
              borderTopRightRadius: msg.sender === "user" ? 0 : 20,
              borderTopLeftRadius: msg.sender === "user" ? 20 : 0,
            }}
          >
            <div>{msg.message}</div>
            <div style={styles.timestamp}>{formatTime(new Date(msg.timestamp))}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </section>
      <footer style={styles.footer}>
        <input
          type="text"
          placeholder="Type a message..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
          disabled={loading}
        />
        <button
          onClick={sendQuestion}
          disabled={loading || !question.trim()}
          style={styles.button}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </footer>
    </div>
  );
}

const styles = {
  const styles = {
  container: {
    maxWidth: 600,
    margin: "2rem auto",
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    fontFamily: "'Segoe UI', sans-serif",
    borderRadius: 12,
    backgroundColor: "#14001f", // deep violet
    color: "white",
    boxShadow: "0 0 20px rgba(0,0,0,0.6)",
  },

  header: {
    padding: "1rem",
    borderBottom: "1px solid #3a0066",
    backgroundColor: "#24003a", // dark purple
    textAlign: "center",
    color: "#c77dff", // violet text
  },

  chatWindow: {
    flexGrow: 1,
    overflowY: "auto",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    backgroundColor: "#14001f", // same as container
  },

  message: {
    maxWidth: "70%",
    padding: "0.75rem 1.25rem",
    borderRadius: 20,
    fontSize: 16,
  },

  timestamp: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 4,
    textAlign: "right",
  },

  footer: {
    display: "flex",
    borderTop: "1px solid #3a0066",
    padding: "1rem",
    backgroundColor: "#24003a",
  },

  input: {
    flexGrow: 1,
    fontSize: 16,
    padding: "0.5rem 1rem",
    borderRadius: 20,
    border: "none",
    outline: "none",
    backgroundColor: "#3a0066",
    color: "white",
  },

  button: {
    marginLeft: 12,
    padding: "0.5rem 1.5rem",
    borderRadius: 20,
    border: "none",
    backgroundColor: "#7b2cbf",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer",
  },
};
    cursor: "pointer",
  },
};
