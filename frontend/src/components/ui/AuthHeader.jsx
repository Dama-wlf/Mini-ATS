import Logo from "./Logo";

export default function AuthHeader({ title = "Mini ATS", subtitle = "Système de suivi des candidatures" }) {
  return (
    <div className="mb-8 flex flex-col items-center">
      <Logo />
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-1 text-gray-600">{subtitle}</p>
    </div>
  );
}
