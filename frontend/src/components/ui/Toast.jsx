import { useEffect, useState } from "react";

export default function Toast({
  message,
  type = "info",
  duration = 4000,
  onClose,
}) {
  const [progress, setProgress] = useState(100);

  // Couleurs selon le type
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  useEffect(() => {
    const start = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(percent);

      if (elapsed >= duration) {
        clearInterval(timer);
        onClose();
      }
    }, 100);

    return () => clearInterval(timer);
  }, [duration, onClose]);

  return (
    <div className="relative w-80 bg-white shadow-lg rounded-lg overflow-hidden flex justify-between items-center">
      {/* Contenu du toast */}
      <p className="p-4 text-sm text-gray-800 flex-1">{message}</p>

      {/* Bouton close */}
      <button
        onClick={onClose}
        className="absolute top-3 right-2 text-gray-500 hover:text-gray-700 font-bold"
      >
        ×
      </button>

      {/* Bande colorée côté droit */}
      <div
        className={`absolute top-0 left-0 h-full ${colors[type]}`}
        style={{ width: "6px" }}
      />

      {/* Progress bar en bas */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200">
        <div
          className={`${colors[type]} h-full transition-all`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
