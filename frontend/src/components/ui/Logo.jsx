import { Briefcase } from "lucide-react";

export default function Logo({ size = "h-14 w-14", iconSize = "h-7 w-7", rounded = "rounded-2xl" }) {
  return (
    <div className={`flex ${size} items-center justify-center ${rounded} bg-primary shadow-lg shadow-primary/25`}>
      <Briefcase className={`${iconSize} text-background`} />
    </div>
  );
}

