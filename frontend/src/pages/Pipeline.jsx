import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCandidates, updateCandidateStatus } from "../features/candidate/candidateSlice";
import CandidateProfileModal from "../components/CandidateProfilModal";
import { useToast } from "../context/ToastContext";
import { GripVertical, User } from "lucide-react";

const PIPELINE_STAGES = [
  { status: "new", label: "Nouveau", color: "bg-primary" },
  { status: "interview", label: "Entretien", color: "bg-yellow-500" },
  { status: "test", label: "Teste", color: "bg-secondary" },
  { status: "hired", label: "Embauché", color: "bg-green-500" },
];

export default function Pipeline() {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const { allCandidates } = useSelector(
    (state) => state.candidates
  );

  const [draggedId, setDraggedId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch]);

  const activeCandidates = allCandidates.filter(
    (c) => c.status !== "rejected"
  );


  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e, status) => {
    e.preventDefault();
    setDragOverColumn(status);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();

    if (!draggedId) return;

    const candidate = allCandidates.find(c => c._id === draggedId);
    if (!candidate || candidate.status === newStatus) return;

    dispatch(
      updateCandidateStatus({
        id: draggedId,
        status: newStatus,
      })
    );

    showToast(
      "success",
      `${candidate.firstName} ${candidate.lastName} déplacé vers ${newStatus}`
    );

    setDraggedId(null);
    setDragOverColumn(null);
  };

  return (
    <div className="p-6 animate-fade-in">
      {/* En tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Pipeline</h1>
        <p className="mt-1 text-muted-foreground">
          Glisser-déposer les candidats selon leur avancement
        </p>
      </div>

      {/* Tableau */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {PIPELINE_STAGES.map((stage) => {
          const stageCandidates = activeCandidates.filter(
            (c) => c.status === stage.status
          );

          const isOver = dragOverColumn === stage.status;

          return (
            <div
              key={stage.status}
              onDragOver={(e) => handleDragOver(e, stage.status)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage.status)}
              className={`rounded-xl border bg-card p-4 transition-all
                ${isOver ? "ring-2 ring-primary ring-offset-2" : ""}
              `}
            >
              
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${stage.color}`} />
                  <h3 className="font-semibold">{stage.label}</h3>
                </div>
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium">
                  {stageCandidates.length}
                </span>
              </div>

              {/* Cartes */}
              <div className="space-y-3">
                {stageCandidates.map((candidate) => (
                  <div
                    key={candidate._id}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, candidate._id)
                    }
                    onDragEnd={handleDragEnd}
                    onClick={() => {
                      if (!draggedId) {
                        setSelectedCandidate(candidate);
                        setProfileModalOpen(true);
                      }
                    }}
                    className={`rounded-xl border bg-background p-3 cursor-pointer transition
                      hover:bg-muted/20
                      ${draggedId === candidate._id
                        ? "opacity-50 ring-2 ring-primary"
                        : ""
                      }
                    `}
                  >
                    <div className="flex gap-3">
                      <div className="mt-1 cursor-grab text-muted-foreground">
                        <GripVertical className="h-4 w-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                            {candidate.firstName.charAt(0)}
                            {candidate.lastName.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-medium">
                              {candidate.firstName} {candidate.lastName}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {candidate.position}
                            </p>
                          </div>
                        </div>

                        {candidate.note && (
                          <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                            {candidate.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {stageCandidates.length === 0 && (
                  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-8 text-center text-muted-foreground">
                    <User className="h-8 w-8 opacity-50" />
                    <p className="mt-2 text-sm">Aucun candidat</p>
                    <p className="text-xs opacity-70">
                      Glissez un candidat ici
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal profil */}
      <CandidateProfileModal
        candidate={selectedCandidate}
        open={profileModalOpen}
        onOpenChange={setProfileModalOpen}
      />
    </div>
  );
}
