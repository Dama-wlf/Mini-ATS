import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { Input, Button, AuthHeader } from "../components/ui";
import { Mail, Lock, User, Loader2, Briefcase } from "lucide-react";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await api.post("/auth/register", formData);
            navigate("/login");
        } catch (err) {
            console.error("Inscription échouée :", err);
            setError("Échec de l'inscription. Vérifiez vos informations.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-md animate-fade-in">

                <AuthHeader />

                {/* Register*/}
                <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-xl shadow-primary/5">
                    <div className="mb-6 text-center">
                        <h2 className="text-xl font-bold text-gray-900">Créer un compte</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Remplissez le formulaire pour vous inscrire
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div className="relative">
                            <User className="absolute left-3 top-10 h-4 w-4 text-gray-400" />
                            <Input
                                label="Nom d'utilisateur"
                                name="userName"
                                type="text"
                                hasIcon={true}
                                placeholder="Votre nom d'utilisateur"
                                value={formData.userName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-10 h-4 w-4 text-gray-400" />
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                hasIcon={true}
                                placeholder="votre@entreprise.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-10 h-4 w-4 text-gray-400" />
                            <Input
                                label="Mot de passe"
                                name="password"
                                type="password"
                                hasIcon={true}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={8}
                            />
                        </div>

                        <Button type="submit" size="md" rounded="lg" fullWidth disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Inscription...
                                </span>
                            ) : (
                                "S'inscrire"
                            )}
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-xs text-gray-600">
                        Vous avez déjà un compte ?{" "}
                        <Link to="/login" className="text-primary font-medium">
                            Se connecter
                        </Link>
                    </p>

                    {error && <p className="mt-2 text-center text-sm text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Register;
