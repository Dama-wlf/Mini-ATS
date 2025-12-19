import { Briefcase } from "lucide-react";

export default function Logo() {
  return (
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
      <Briefcase className="h-7 w-7 text-background" />
    </div>
  );
}
