export default function List({ items = [] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="bg-card p-3 rounded shadow">
          {item}
        </li>
      ))}
    </ul>
  );
}
