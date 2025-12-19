import { createContext, useContext, useState } from "react";
import Toast from "../components/ui/Toast";
const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (type, message, duration = 4000) => {
    const id = Date.now();

    setToasts((prev) => [
      ...prev,
      { id, type, message, duration },
    ]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Zone d’affichage */}
      <div className="fixed top-4 right-4 space-y-3 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
