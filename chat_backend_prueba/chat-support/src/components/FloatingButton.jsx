import { MessageSquare } from "lucide-react";

export default function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
    >
      <MessageSquare size={28} />
    </button>
  );
}
