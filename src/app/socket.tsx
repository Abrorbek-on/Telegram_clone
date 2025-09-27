import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
});

export default function ChatPage() {
  const [messages, setMessages] = useState<{ id: number; username: string; text: string }[]>([]);
  const [text, setText] = useState("");
  const [username] = useState("User" + Math.floor(Math.random() * 100));
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (text.trim()) {
      const newMsg = { id: Date.now(), username, text };
      socket.emit("sendMessage", newMsg);
      setText("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "15px",
            background: "#667eea",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "18px",
            textAlign: "center",
          }}
        >
          💬 Real-time Chat
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            padding: "10px",
            overflowY: "auto",
            background: "#f9f9f9",
          }}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: "flex",
                justifyContent: m.username === username ? "flex-end" : "flex-start",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  background: m.username === username ? "#667eea" : "#e5e5ea",
                  color: m.username === username ? "#fff" : "#000",
                  padding: "10px 14px",
                  borderRadius: "16px",
                  maxWidth: "70%",
                  fontSize: "14px",
                }}
              >
                <b style={{ fontSize: "12px" }}>{m.username}</b>
                <div>{m.text}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        <div
          style={{
            display: "flex",
            padding: "10px",
            borderTop: "1px solid #ddd",
            background: "#fff",
          }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Xabar yozing..."
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "20px",
              outline: "none",
              marginRight: "8px",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              background: "#667eea",
              color: "#fff",
              border: "none",
              borderRadius: "20px",
              padding: "10px 16px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
