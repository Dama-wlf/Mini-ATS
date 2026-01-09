import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    label,
    type = "text",
    name,
    id,
    placeholder,
    size = "md",
    hasIcon = false,
    error,
    value,
    onChange,
    ...props
  },
  ref
) {
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
        ref={ref}               // ✅ RHF
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}           // ✅ usage classique
        onChange={onChange}     // ✅ usage classique
        className={`
          w-full h-11 rounded-xl border text-sm
          focus:outline-none focus:ring-1 focus:ring-primary
          bg-background
          ${sizes[size]}
          ${hasIcon ? "pl-10" : ""}
          ${error ? "border-red-500" : "border-gray-300"}
        `}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

export default Input;
