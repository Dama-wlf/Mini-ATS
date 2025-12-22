import { Link } from "react-router-dom";
import { Logo } from "../components/ui";
import { Users, GitBranch, BarChart3, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
  const { t } = useTranslation();

  const features = [
    {
      icon: GitBranch,
      title: t("landing.features.pipeline.title"),
      description: t("landing.features.pipeline.description"),
    },
    {
      icon: Users,
      title: t("landing.features.candidates.title"),
      description: t("landing.features.candidates.description"),
    },
    {
      icon: BarChart3,
      title: t("landing.features.overview.title"),
      description: t("landing.features.overview.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-background ">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Logo size="h-8 w-8" iconSize="h-6 w-6" rounded="rounded-md" />
            Mini ATS
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-muted">
              {t("landing.login")}
            </Link>
            <Link
              to="/login"
              className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90"
            >
              {t("landing.start")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
            {t("landing.tagline")}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t("landing.title")}
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            {t("landing.description")}
          </p>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg text-lg hover:opacity-90"
          >
            {t("landing.accessApp")} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("landing.featuresTitle")}
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

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border bg-muted/20 p-6 shadow-xl">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {t("landing.statsLabels", { returnObjects: true }).map((label, idx) => (
                <div key={idx} className="bg-background border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="text-2xl font-bold mt-1">12</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {t("landing.steps", { returnObjects: true }).map((step, idx) => (
                <div key={idx} className="bg-background border rounded-lg p-3 min-h-[120px]">
                  <p className="text-sm font-medium text-muted mb-2">{step}</p>
                  <div className="h-10 bg-muted rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-white text-center">
        <h2 className="text-3xl font-bold mb-4">{t("landing.readyTitle")}</h2>
        <p className="opacity-90 mb-8">{t("landing.readyDesc")}</p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-medium hover:opacity-90"
        >
          {t("landing.login")} <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm text-muted">
        Copyright - {new Date().getFullYear()} Mini ATS
      </footer>
    </div>
  );
}
