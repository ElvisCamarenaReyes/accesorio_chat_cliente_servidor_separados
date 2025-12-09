import { X } from "lucide-react";
import { useState } from "react";
import { createChat } from "../api";

export default function EmailForm({ onSubmit, onClose }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email.trim()) return;
    await createChat(email);
    onSubmit(email);
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Iniciar Chat</h3>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      <input
        type="email"
        placeholder="Tu email"
        className="w-full border px-3 py-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-3"
      >
        Iniciar
      </button>
    </div>
  );
}
