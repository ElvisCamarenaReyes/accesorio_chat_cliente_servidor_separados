import { MessageCircle, Send, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getAllChats, getChat, markAsRead, sendMessage } from "../api";

export default function AdminDashboard() {
  const [chats, setChats] = useState([]);
  const [email, setEmail] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  const loadChats = async () => {
    const list = await getAllChats();
    setChats(list);

    if (email) {
      const data = await getChat(email);
      if (data) setMessages(data.messages);
    }
  };

  useEffect(() => {
    loadChats();
    const id = setInterval(loadChats, 500);
    return () => clearInterval(id);
  }, [email]);

  const selectChat = async (e) => {
    setEmail(e);
    await markAsRead(e);
    const chat = await getChat(e);
    setMessages(chat.messages);
  };

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage(email, text, true);
    setText("");
    loadChats();
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Lista de chats */}
      <div className="w-80 bg-white border-r">
        <div className="p-4 bg-blue-600 text-white flex gap-2 items-center">
          <Users />
          <h2 className="font-bold text-lg">Admin</h2>
        </div>

        {chats.map((c) => (
          <div
            key={c.email}
            onClick={() => selectChat(c.email)}
            className={`p-4 border-b cursor-pointer ${
              email === c.email ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            <p className="font-semibold">{c.email}</p>
            {c.unread > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded px-2 py-1">
                {c.unread}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Área del chat */}
      <div className="flex-1 flex flex-col">
        {!email ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <MessageCircle size={50} className="opacity-60" />
            <p>Selecciona un chat</p>
          </div>
        ) : (
          <>
            <div className="p-4 bg-white border-b font-semibold">{email}</div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.map((m) => (
                <div
                  key={m.timestamp}
                  className={`mb-3 flex ${
                    m.isAdmin ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-[60%] ${
                      m.isAdmin
                        ? "bg-blue-600 text-white"
                        : "bg-white border text-gray-800"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="p-4 border-t bg-white flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 border rounded px-3 py-2"
                placeholder="Escribe un mensaje…"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-6 rounded"
              >
                <Send />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
