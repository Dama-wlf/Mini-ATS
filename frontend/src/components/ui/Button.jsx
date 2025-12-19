export default function Button({
  children,
  variant = "primary",  // couleur
  size = "md",          // taille
  rounded = "md",       // arrondi
  fullWidth = false,    // largeur complète
  ...props
}) {
  const base = "font-medium transition focus:outline-none";

  const variants = {
    primary: "bg-primary text-white hover:bg-secondary",
    secondary: "bg-secondary text-white hover:bg-primary",
    danger: "bg-danger text-white hover:bg-red-700",
    outline: "border border-primary text-primary",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const round = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${round[rounded]} ${widthClass}`}
      {...props}
    >
      {children}
    </button>
  );
}
