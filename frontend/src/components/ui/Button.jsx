export default function Button({
  children,
  variant = "primary",
  size = "md",
  rounded = "md",
  fullWidth = false,
  height = "",
  width = "",
  className = "",
  type = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition focus:outline-none";

  const variants = {
    primary: "bg-primary text-white hover:bg-secondary",
    secondary: "bg-secondary text-white hover:bg-primary",
    danger: "bg-danger text-white hover:bg-red-700",
    outline: "border border-primary text-primary hover:bg-primary/10",
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

  return (
    <button
      type={type}
      className={`
        ${base}
        ${variants[variant]}
        ${sizes[size]}
        ${round[rounded]}
        ${fullWidth ? "w-full" : ""}
        ${height}
        ${width}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
