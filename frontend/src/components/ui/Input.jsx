export default function Input({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  name,
  id,
  size = "md",
  hasIcon = false,
  ...props
}) {
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2",
    lg: "px-4 py-3 text-lg",
  };

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id || name}
          className="block mb-1 font-medium text-text"
        >
          {label}
        </label>
      )}

      <input
        id={id || name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`
          w-full h-11 border border-gray-300 text-sm rounded-xl
          focus:outline-none focus:ring-1 focus:ring-primary
          bg-background
          ${sizes[size]}
          ${hasIcon ? "pl-10" : ""}
        `}
        {...props}
      />
    </div>
  );
}
