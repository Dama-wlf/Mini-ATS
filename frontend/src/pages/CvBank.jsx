import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRejectedCandidates, deleteCandidate, updateCandidateStatus, } from "../features/candidate/candidateSlice.js";
import { Button, Input, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmpty} from "../components/ui";
import CandidateProfileModal from "../components/CandidateProfilModal.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { RotateCcw, Trash2, Search, Loader2 } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function CvBank() {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const { rejectedCandidates, loading, totalPages } = useSelector((state) => state.candidates
  );

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Fonction pour fetch avec filtres
  useEffect(() => {
    const filters = {
      search,
      from: dateFilter === "all" ? undefined : getFromDate(dateFilter),
      to: dateFilter === "all" ? undefined : new Date().toISOString(),
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    };
    dispatch(getRejectedCandidates(filters));
  }, [search, dateFilter, currentPage, dispatch]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  }
  const handleRestore = async (id) => {
    dispatch(updateCandidateStatus({ id, status: "new" }));
     dispatch(getRejectedCandidates());
    showToast("success", "Candidat restauré avec succès");
  };

  const handleDelete = (id) => {
    dispatch(deleteCandidate(id));
    showToast("success", "Candidat supprimé définitivement");
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Banque de CV</h1>
        <p className="text-muted-foreground mt-1">
          Tous les candidats rejetés
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-4 h-4 w-4 text-muted" />
          <Input
            placeholder="Rechercher un candidat..."
            value={search}
            hasIcon
            onChange={handleChange}
          />
        </div>

        <select
          className="h-11 rounded-xl border border-gray-300 px-3 focus:outline-none focus:ring-1 focus:ring-primary bg-background"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">Toutes les dates</option>
          <option value="today">Aujourd’hui</option>
          <option value="7days">7 derniers jours</option>
          <option value="30days">30 derniers jours</option>
        </select>
      </div>

      {/* Table */}
     
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Nom et Prénom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Poste</TableHead>
              <TableHead>Date rejet</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-10">
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="animate-spin h-6 w-6 text-primary" />
                    <span className="text-muted-foreground">
                      Chargement des candidats...
                    </span>
                  </div>
                </td>
              </tr>
            ) :
            rejectedCandidates.length === 0 ? (
              <TableEmpty colSpan={6} label="Aucun candidat rejeté" />
            ) : (
              rejectedCandidates.map((c) => (
                <TableRow
                  key={c._id}
                  onClick={() => {
                    setSelectedCandidate(c);
                    setProfileModalOpen(true);
                  }}
                >
                  <TableCell className="flex items-center gap-3">
                    <div className="h-9 w-9 flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                      {c.firstName.charAt(0)}
                      {c.lastName.charAt(0)}
                    </div>
                    {c.firstName} {c.lastName}
                  </TableCell>
                  <TableCell className="text-muted">{c.email}</TableCell>
                  <TableCell className="text-muted">{c.phone}</TableCell>
                  <TableCell>{c.position}</TableCell>
                  <TableCell>
                    {new Date(c.rejectedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <div onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRestore(c._id)}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(c._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between mt-4 items-center">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} sur {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Précédent
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}

      <CandidateProfileModal
        candidate={selectedCandidate}
        open={profileModalOpen}
        onOpenChange={setProfileModalOpen}
      />
    </div>
  );
}
// Fonction pour calculer la date de départ selon le filtre
function getFromDate(filter) {
  const now = new Date();
  switch (filter) {
    case "today":
      return new Date(now.setHours(0, 0, 0, 0)).toISOString();
    case "7days":
      return new Date(now.setDate(now.getDate() - 7)).toISOString();
    case "30days":
      return new Date(now.setDate(now.getDate() - 30)).toISOString();
    default:
      return undefined;
  }
}


