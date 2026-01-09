import { useState } from "react";
import { useNavigate, Link, data } from "react-router-dom";
import api from "../services/api";
import { Input, Button, AuthHeader } from "../components/ui";
import { Mail, Lock, User, Loader2, Briefcase } from "lucide-react";
import { useForm } from "react-hook-form";

const Register = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ mode: "onSubmit", defaultValues: { userName: "", email: "", password: "" } });

    const onSubmit = async (formData) => {

        try {
            await api.post("/auth/register", formData);
            navigate("/login");
        } catch (err) {
            setServerError("Échec de l'inscription. Vérifiez vos informations.");
        }
    }


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

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Username */}
                        <div className="relative">
                            <User className="absolute left-3 top-10 h-4 w-4 text-gray-400" />
                            <Input
                                label="Nom d'utilisateur"
                                type="text"
                                hasIcon
                                placeholder="Votre nom d'utilisateur"
                                error={errors.userName?.message}
                                {...register("userName", { required: "Nom d'utilisateur obligatoire" })}

                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-10 h-4 w-4 text-gray-400" />
                            <Input
                                label="Email"
                                type="email"
                                hasIcon
                                placeholder="votre@entreprise.com"
                                error={errors.email?.message}
                                {...register("email", { required: "Email obligatiore", pattern: { value: /^\S+@\S+\.\S+$/, message: "Email invalide" } })}
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-10 h-4 w-4 text-gray-400" />
                            <Input
                                label="Mot de passe"
                                type="password"
                                hasIcon
                                placeholder="••••••••"
                                error={errors.password?.message}
                                {...register("password", {
                                    required: "Mot de passe obligatoire", minLength: { value: 8, message: "Minimum 8 caractères" },
                                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, message: "Doit contenir majuscule, minuscule, chiffre et symbole" }
                                })}
                            />
                        </div>
                        <p className="text-xs text-gray-500">
                            Minimum 8 caractères, avec majuscule, minuscule, chiffre et symbole.
                        </p>
                        <Button type="submit" size="md" rounded="lg" fullWidth disabled={isSubmitting}>
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Inscription...
                                </span>
                            ) : (
                                "S'inscrire"
                            )}
                        </Button>
                    </form>

                    {serverError && <p className="mt-2 text-center text-sm text-red-500">{serverError}</p>}

                    <p className="mt-6 text-center text-xs text-gray-600">
                        Vous avez déjà un compte ?{" "}
                        <Link to="/login" className="text-primary font-medium">
                            Se connecter
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Register;
