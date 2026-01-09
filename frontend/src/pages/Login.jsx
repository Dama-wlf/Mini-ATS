import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { Input, Button, AuthHeader } from "../components/ui";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ mode: "onSubmit", defaultValues: { email: "", password: "" } });

    const onSubmit = async (data) => {
        setServerError("");

        try {
            const result = await dispatch(login(data));

            if (login.fulfilled.match(result)) {
                navigate("/");
            } else {
                setServerError("Email ou mot de passe incorrect");
            }
        } catch {
            setServerError("Erreur serveur");
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

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        <div className="space-y-2">

                            <div className="relative">
                                <Mail className="absolute left-3 top-10 h-4 w-4  text-gray-400" />
                                <Input
                                    label="Email"
                                    type="email"
                                    hasIcon
                                    placeholder="votre@entreprise.com"
                                    error={errors.email?.message}
                                    {...register("email", { required: "Email obligatoire", pattern: { value: /^\S+@\S+\.\S+$/, message: "Email invalide", }, })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">

                            <div className="relative">
                                <Lock className="absolute left-3 top-10 h-4 w-4 text-gray-400" />
                                <Input
                                    label="Mot de passe"
                                    type="password"
                                    hasIcon={true}
                                    placeholder="••••••••"
                                    error={errors.password?.message}
                                    {...register("password", {
                                        required: "Mot de passe obligatoire", minLength: { value: 8, message: "Minimum 8 caractères" },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, message: "Doit contenir majuscule, minuscule, chiffre et symbole"
                                        },
                                    })}
                                />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">
                            Minimum 8 caractères, avec majuscule, minuscule, chiffre et symbole.
                        </p>


                        <Button type="submit" size="md" rounded="lg" fullWidth disabled={isSubmitting}>
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Connexion...
                                </span>
                            ) : (
                                "Se Connecter"
                            )}
                        </Button>
                    </form>
                    {serverError && (<p className="mt-4 text-center text-sm text-red-500"> {serverError} </p>)}
                    <p className="mt-6 text-center text-xs text-gray-600">
                        Vous n'avez pas de compte ?{" "}
                        <Link to="/register" className="text-primary font-medium">
                            S'inscrire
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;
