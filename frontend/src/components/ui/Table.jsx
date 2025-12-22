// Table
export function Table({ children, className = "" }) {
  return (
    <div className={`overflow-x-auto border rounded-xl bg-card text-sm ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        {children}
      </table>
    </div>
  );
}

// Header
export function TableHeader({ children, className = "" }) {
  return (
    <thead className={`text-muted ${className}`}>
      {children}
    </thead>
  );
}

// Body
export function TableBody({ children, className = "" }) {
  return (
    <tbody className={`divide-y divide-gray-200 ${className}`}>
      {children}
    </tbody>
  );
}

// Row
export function TableRow({ children, className = "", onClick }) {
  return (
    <tr
      onClick={onClick}
      className={`hover:bg-muted/10 transition ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </tr>
  );
}

// Th
export function TableHead({ children, className = "" }) {
  return (
    <th className={`px-4 py-2 text-left font-medium ${className}`}>
      {children}
    </th>
  );
}

// Td
export function TableCell({ children, className = "" }) {
  return (
    <td className={`px-4 py-2 align-middle ${className}`}>
      {children}
    </td>
  );
}

// Aucun résultat
export function TableEmpty({ colSpan, label = "Aucun candidat trouvé" }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="py-10 text-center text-muted"
      >
        {label}
      </td>
    </tr>
  );
}
