import { Link } from "react-router-dom";
import { Logo } from "../components/ui";
import { Users, GitBranch, BarChart3, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: GitBranch,
      title: "Pipeline de recrutement",
      description:
        "Suivez vos candidats étape par étape grâce à un pipeline clair et visuel.",
    },
    {
      icon: Users,
      title: "Gestion des candidats",
      description:
        "Ajoutez, modifiez et gérez facilement tous vos candidats depuis un seul endroit.",
    },
    {
      icon: BarChart3,
      title: "Vue d’ensemble",
      description:
        "Analysez rapidement l’état de votre recrutement avec des indicateurs clairs.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Logo size="h-8 w-8" iconSize="h-6 w-6" rounded="rounded-md" />
            Mini ATS
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-muted">
              Connexion
            </Link>
            <Link
              to="/login"
              className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90"
            >
              Commencer <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
            Simplifiez votre recrutement
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Un ATS simple pour gérer vos{" "}
            <span className="text-primary">candidats efficacement</span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Centralisez vos candidats, suivez leur évolution et gérez votre
            pipeline de recrutement dans une seule application.
          </p>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg text-lg hover:opacity-90"
          >
            Accéder à l’application <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Fonctionnalités principales
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, index) => (
              <div
                key={index}
                className="bg-background border rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border bg-muted/20 p-6 shadow-xl">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {["Candidats", "Entretiens", "Tests", "Embauchés"].map((label) => (
                <div key={label} className="bg-background border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="text-2xl font-bold mt-1">12</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {["Nouveau", "Entretien", "Test", "Validé"].map((step) => (
                <div
                  key={step}
                  className="bg-background border rounded-lg p-3 min-h-[120px]"
                >
                  <p className="text-sm font-medium text-muted mb-2">
                    {step}
                  </p>
                  <div className="h-10 bg-muted rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-primary text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Prêt à mieux gérer vos recrutements ?
        </h2>
        <p className="opacity-90 mb-8">
          Lancez votre ATS et commencez à suivre vos candidats dès maintenant.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-medium hover:opacity-90"
        >
          Se connecter <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm text-muted">
        Copyright © {new Date().getFullYear()} Mini ATS – Tous droits réservés
      </footer>
    </div>
  );
}
