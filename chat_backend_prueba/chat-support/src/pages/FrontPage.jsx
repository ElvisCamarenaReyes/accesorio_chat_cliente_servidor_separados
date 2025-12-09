import { useState } from "react";
import EmailForm from "../components/EmailForm";
import FloatingButton from "../components/FloatingButton";
import UserChat from "../components/UserChat";

export default function FrontPage() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(null);

  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Página del Usuario</h1>

      {!open && <FloatingButton onClick={() => setOpen(true)} />}

      {open && !email && (
        <EmailForm
          onSubmit={(value) => setEmail(value)}
          onClose={() => setOpen(false)}
        />
      )}

      {open && email && (
        <UserChat email={email} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
