export default function Card({ children }) {
  return (
    <div className="bg-card rounded-lg shadow p-4">
      {children}
    </div>
  );
}
