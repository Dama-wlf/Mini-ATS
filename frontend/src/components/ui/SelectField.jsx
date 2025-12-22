import { ChevronDown } from "lucide-react";

export default function SelectField({
    name,
    value,
    onChange,
    options = [],
    placeholder = "Select",
    icon: Icon,
    className = "",
    disabled = false,
}) {
    return (
        <div className={`relative ${className}`}>
            {Icon && (
                <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            )}

            <select
                disabled={disabled}
                name={name}
                value={value}
                onChange={onChange}
                className={`
          h-11 w-full appearance-none rounded-xl border
          bg-card px-3 pr-10 text-sm text-text
          transition-all duration-200
          
          ${Icon ? "pl-10" : ""}
          ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}

          border-muted/30
          hover:border-primary/50
          focus:border-primary
          focus:outline-none
          focus:ring-2 focus:ring-primary/20
        `}
            >
                <option value="" disabled >
                    {placeholder}
                </option>

                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} >
                        {opt.label}
                    </option>
                ))}
            </select>

            <ChevronDown
                className="
          pointer-events-none absolute right-3 top-1/2 h-4 w-4
          -translate-y-1/2 text-muted transition-transform duration-200
        "
            />
        </div>
    );
}
