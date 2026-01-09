import { useEffect } from "react";
import { Button } from "./ui";
import { StatusBadge } from "./ui";
import {
  Download,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  StickyNote,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";

export default function CandidateProfileModal({ candidate, open, onOpenChange }) {
  if (!open || !candidate) return null;

  const handleClose = () => onOpenChange(false);

  const handleDownloadCV = () => {
    if (candidate.cv) {
      const link = document.createElement("a");
      link.href = `http://localhost:5000/uploads/cv/${candidate.cv.fileName}`;
      link.download = candidate.cv.fileName || `${candidate.firstName}_${candidate.lastName}_CV`;
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick= {handleClose}
>
      <div className="relative w-full max-w-md mx-4 bg-card rounded-xl shadow-lg p-6" onClick={(e) => e.stopPropagation()}>
        {/*  button fermer */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-text text-xl font-bold"
        >
          ×
        </button>

        {/* en tête */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary">
            {candidate.firstName.charAt(0)}
            {candidate.lastName.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-text">
              {candidate.firstName} {candidate.lastName}
            </h2>
            <p className="text-sm text-muted">{candidate.position}</p>
            <div className="mt-2">
              <StatusBadge status={candidate.status} />
            </div>
          </div>
        </div>

        {/* information */}
        <div className="space-y-3 rounded-xl bg-muted/10 p-4">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted" />
            <a href={`mailto:${candidate.email}`} className="text-sm text-text hover:text-primary">
              {candidate.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted" />
            <a href={`tel:${candidate.phone}`} className="text-sm text-text hover:text-primary">
              {candidate.phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Briefcase className="h-4 w-4 text-muted" />
            <span className="text-sm text-text">{candidate.position}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted" />
            <span className="text-sm text-text">
              Ajouté le, {format(new Date(candidate.createdAt), "d MMMM yyyy", { locale: fr })}
            </span>
          </div>
          {candidate.rejectedAt && (
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary">
                Rejeté le {format(new Date(candidate.rejectedAt), "d MMMM yyyy", { locale: fr })}
              </span>
            </div>
          )}
        </div>

        {/* Notes */}
        {candidate.notes && (
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text">
              <StickyNote className="h-4 w-4" /> Notes
            </div>
            <p className="text-sm text-muted leading-relaxed rounded-lg bg-muted/20 p-3 mt-1">
              {candidate.notes}
            </p>
          </div>
        )}

        {/* CV Download */}
        <div className="mt-4">
          {candidate?.cv ? (
            <Button variant="outline" className="w-full h-12" onClick={handleDownloadCV}>
              <Download className="h-4 w-4" /> Télécharger CV
              <span className=" text-xs text-muted">(CV_{candidate.firstName})</span>
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-muted py-4 text-muted">
              <FileText className="h-4 w-4" />
              <span className="text-sm">Aucun CV</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
