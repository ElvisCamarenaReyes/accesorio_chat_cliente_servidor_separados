import { Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getChat, sendMessage } from "../api";

export default function UserChat({ email, onClose }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  const loadMessages = async () => {
    const data = await getChat(email);
    if (data?.messages) setMessages(data.messages);
  };

  useEffect(() => {
    loadMessages();
    const id = setInterval(loadMessages, 500);
    return () => clearInterval(id);
  }, []);

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage(email, text, false);
    setText("");
    loadMessages();
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 h-[420px] bg-white rounded-lg shadow-xl flex flex-col">
      <div className="bg-blue-600 text-white p-4 flex justify-between">
        <span>Chat con soporte</span>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
        {messages.map((m) => (
          <div
            key={m.timestamp}
            className={`mb-2 flex ${
              m.isAdmin ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[70%] ${
                m.isAdmin ? "bg-gray-300" : "bg-blue-600 text-white"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Escribe un mensaje…"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-3 rounded"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
