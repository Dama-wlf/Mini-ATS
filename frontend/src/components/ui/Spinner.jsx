export default function Spinner({ label = "Chargement..." }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex flex-col items-center gap-3 bg-white rounded-lg p-6 shadow-lg">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground/70">{label}</p>
      </div>
    </div>
  );
}