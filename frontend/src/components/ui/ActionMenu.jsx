import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  FolderArchive,
} from "lucide-react";

export default function ActionMenu({ onEdit, onDelete, onMoveToCVBank }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative">
      {/* Bouton */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 p-0"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {/* Dropdown */}
      {open && (
        <div className="absolute sm:absolute md:absolute lg:fixed right-0 mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow-lg z-10">
          <button
            className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
          >
            <Edit className="h-4 w-4" /> Modifier
          </button>

          <button
            className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              onMoveToCVBank();
              setOpen(false);
            }}
          >
            <FolderArchive className="h-4 w-4" /> Rejeté
          </button>

          <div className="border-t my-1" />

          <button
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            <Trash2 className="h-4 w-4" /> Supprimer
          </button>
        </div>
      )}
    </div>
  );
}
