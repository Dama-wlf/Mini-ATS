export default function Table({ headers = [], data = [] }) {
  return (
    <table className="w-full border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="p-2 text-left">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-t hover:bg-gray-50">
            {row.map((cell, j) => (
              <td key={j} className="p-2">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
