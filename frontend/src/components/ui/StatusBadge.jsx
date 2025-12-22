export default function StatusBadge({ status }) {
  const baseClasses = "px-2 py-1 rounded-full text-xs bg-background";

  const statusColors = {
    new: "text-primary",          // nouveau candidat
    interview: "text-yellow-500",   // en entretien
    test: "text-secondary",      // en test
    hired: "text-green-500",      // embauché
    rejected: "text-red-500",     // rejeté
  };
  const label = {
    new: "nouveau",
    interview: "en entretien",
    test: "en test",
    hired: "embauché",
    rejected: "rejeté",
  };

  const colorClass = statusColors[status] || "bg-muted";

  return <span className={`${baseClasses} ${colorClass}`}>{label[status].toUpperCase()}</span>;
}
