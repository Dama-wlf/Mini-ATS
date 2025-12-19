import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { Input, Button, AuthHeader } from "../components/ui";
import { Mail, Lock, Loader2, Briefcase } from "lucide-react";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });
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
            const result = await dispatch(login(formData));
            if (login.fulfilled.match(result)) {
                navigate("/");
            } else {
                setError("Email ou mot de passe incorrect" );
            }
        } catch (err) {
            setError("Erreur serveur");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-md animate-fade-in">

                <AuthHeader />

                {/* Login */}
                <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-xl shadow-primary/5">
                    <div className="mb-6 text-center">
                        <h2 className="text-xl font-bold text-gray-900">Connexion au Compte</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Connectez-vous à votre compte pour continuer
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div className="space-y-2">

                            <div className="relative">
                                <Mail className="absolute left-3 top-10 h-4 w-4  text-gray-400" />
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
                        </div>

                        <div className="space-y-2">

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
                        </div>

                        <Button type="submit" size="md" rounded="lg" fullWidth disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Connexion...
                                </span>
                            ) : (
                                "Se Connecter"
                            )}
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-xs text-gray-600">
                        Vous n'avez pas de compte ?{" "}
                        <Link to="/register" className="text-primary font-medium">
                            S'inscrire
                        </Link>
                    </p>

                    {error && <p className="mt-2 text-center text-sm text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;
