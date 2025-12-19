export default function Input({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  name,          
  size = "md",
  ...props       
}) {
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2",
    lg: "px-4 py-3 text-lg",
  };

  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        type={type}
        name={name}             // passer name
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full h-10 pl-10 border border-gray-300 text-sm rounded-xl ring-offset-background focus-visible:outline-none ${sizes[size]} focus:ring-1 focus:ring-primary bg-background`}
        {...props}             
      />
    </div>
  );
}
