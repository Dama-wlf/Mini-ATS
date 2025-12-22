import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCandidates } from "../features/candidate/candidateSlice.js";
import CandidateProfileModal from "../components/CandidateProfilModal.jsx";
import StatusBadge from "../components/ui/StatusBadge.jsx";
import { Link } from "react-router-dom";
import { Users, UserPlus, Columns3, FolderArchive, MessageSquare, ClipboardCheck, UserCheck, UserX, TrendingUp} from "lucide-react";

export default function Dashboard() {
    const dispatch = useDispatch();
    const candidates = useSelector((state) => state.candidates.allCandidates);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCandidates());
    }, [dispatch]);

    // Statistiques
    const stats = {
        total: candidates.length,
        new: candidates.filter(c => c.status === "new").length,
        interview: candidates.filter(c => c.status === "interview").length,
        test: candidates.filter(c => c.status === "test").length,
        hired: candidates.filter(c => c.status === "hired").length,
        rejected: candidates.filter(c => c.status === "rejected").length,
    };

    const statCards = [
        { label: "Total", value: stats.total, icon: Users, color: "bg-primary/10 text-primary" },
        { label: "En entretien", value: stats.interview, icon: MessageSquare, color: "bg-secondary/10 text-secondary" },
        { label: "En test", value: stats.test, icon: ClipboardCheck, color: "bg-muted/10 text-muted" },
        { label: "Embauché", value: stats.hired, icon: UserCheck, color: "bg-primary/10 text-primary" },
        { label: "Rejeté", value: stats.rejected, icon: UserX, color: "bg-muted/20 text-muted" },
    ];

    const actionCards = [
        { label: "Ajouter un candidat", to: "/add-candidate", icon: UserPlus, description: 'Ajouter un nouveau candidat au système' },
        { label: "Pipeline", to: "/pipeline", icon: Columns3, description: 'Gérer les candidats à travers les étapes' },
        { label: "Banque de CV", to: "/cv-bank", icon: FolderArchive, description: 'Parcourir les candidats rejetés' },
        { label: "Liste des candidats", to: "/candidates", icon: Users, description: 'Voir tous les candidats' },
    ];

    return (
        <div className="p-6 bg-background min-h-screen">
            <h1 className="text-3xl font-bold text-text mb-2">Tableau de bord</h1>
            <p className="text-muted mb-6">Aperçu de votre pipeline de recrutement</p>

            {/* Statistiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {statCards.map((stat) => (
                    <div key={stat.label} className="bg-card rounded-xl p-4 flex flex-col justify-between shadow hover:shadow-lg transition">
                        <div className="flex justify-between items-center">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                            <TrendingUp className="h-4 w-4 text-muted" />
                        </div>
                        <div className="mt-4">
                            <p className="text-2xl font-bold text-text">{stat.value}</p>
                            <p className="text-sm text-muted">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Outils */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-text mb-4">Outils</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {actionCards.map((action) => (
                        <Link key={action.to} to={action.to} className="block">
                            <div className="bg-card rounded-xl p-4 flex flex-col shadow hover:shadow-lg transition">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
                                    <action.icon className="h-6 w-6" />
                                </div>
                                <p className="font-medium text-text">{action.label}</p>
                                <p className="mt-1 text-sm text-muted">{action.description}</p>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Derniers candidats */}
            <div>
                <h2 className="text-xl font-semibold text-text mb-4">Candidats Récents</h2>
                <div className="bg-card rounded-xl shadow divide-y divide-muted/30">
                    {candidates.slice(-5).reverse().map((c) => (
                        <div
                            key={c._id}
                            className="flex items-center justify-between p-4 hover:bg-muted/10 cursor-pointer"
                            onClick={() => {
                                setSelectedCandidate(c);
                                setProfileModalOpen(true);
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                                    {c.firstName.charAt(0)}{c.lastName.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-text">{c.firstName} {c.lastName}</p>
                                    <p className="text-sm text-muted">{c.position}</p>
                                </div>
                            </div>
                            <StatusBadge status={c.status} />
                        </div>
                    ))}
                </div>
            </div>

            <CandidateProfileModal
                candidate={selectedCandidate}
                open={profileModalOpen}
                onOpenChange={setProfileModalOpen}
            />
        </div>
    );
}
