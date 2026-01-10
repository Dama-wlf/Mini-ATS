import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { filtreCandidates, deleteCandidate, rejectCandidate } from "../features/candidate/candidateSlice.js";
import { ActionMenu, Button, Input, StatusBadge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmpty } from "../components/ui";
import CandidateProfileModal from "../components/CandidateProfilModal.jsx";
import { useToast } from '../context/ToastContext.jsx';
import { ArrowUpDown, UserPlus, Search, Loader2 } from "lucide-react";

const POSITIONS = ["Frontend Developeur", "Backend Developeur", "Fullstack Developeur", "UI/UX Designer"];
const ITEMS_PER_PAGE = 10;

export default function CandidatesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const { filtredCandidates, loading, totalPages } = useSelector((state) => state.candidates);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const filters = { search, position: positionFilter, status: statusFilter, sort: sortOrder, page: currentPage, limit: ITEMS_PER_PAGE, };
    dispatch(filtreCandidates(filters));
  }, [dispatch, search, positionFilter, statusFilter, sortOrder, currentPage]);


  const handleChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };
  const handleDelete = (id) => {
    dispatch(deleteCandidate(id));
    showToast("success", "Candidat suprimer avec Succes");
  };
  const handleReject = (id) => {
    dispatch(rejectCandidate(id));
    dispatch(filtreCandidates());
    showToast("success", "Candidat rejete avec Succes");
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className=" p-6 animate-fade-in">
      {/* En Tête */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Candidats</h1>
          <p className="text-muted-foreground mt-1">Gérer tous les candidats</p>
        </div>
        <Button onClick={() => navigate("/add-candidate")} className="h-11">
          <UserPlus className="mr-2 h-4 w-4" />
          Ajouter Candidat
        </Button>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-4 h-4 w-4  text-muted" />

          <Input
            placeholder="Rechercher candidats..."
            value={search}
            hasIcon={true}
            onChange={handleChange}
          />
        </div>
        <select
          className="h-11 rounded-xl border border-gray-300 px-3
          focus:outline-none focus:ring-1 focus:ring-primary
          bg-background "
          value={positionFilter}
          onChange={(e) => {
            setPositionFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">Tous les postes</option>
          {POSITIONS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select
          className="h-11 rounded-xl border border-gray-300 px-3
          focus:outline-none focus:ring-1 focus:ring-primary
          bg-background "
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">Tous les statuts</option>
          <option value="new">Nouveau</option>
          <option value="interview"> Entretien</option>
          <option value="test">Teste</option>
          <option value="hired">Embauché</option>
        </select>

        <Button
          variant="outline"
          onClick={handleSort}
          className="h-11"
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          {sortOrder === "asc" ? "A → Z" : "Z → A"}
        </Button>
      </div>

      {/* Table */}

        <Table>
          <TableHeader>
            <tr>
              <TableHead>Nom et Prénom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Poste</TableHead>
              <TableHead>Statut</TableHead>
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
            ) : filtredCandidates.length === 0 ? (
              <TableEmpty colSpan={6}>Aucun candidat trouvé</TableEmpty>
            ) : (
              filtredCandidates.map((c) => (
                <TableRow
                  key={c._id}
                  onClick={() => {
                    setSelectedCandidate(c);
                    setProfileModalOpen(true);
                  }}
                >
                  <TableCell className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                      {c.firstName[0]}
                      {c.lastName[0]}
                    </div>
                    {c.firstName} {c.lastName}
                  </TableCell>

                  <TableCell className="text-muted">{c.email}</TableCell>
                  <TableCell className="text-muted">{c.phone}</TableCell>
                  <TableCell>{c.position}</TableCell>
                  <TableCell>
                    <StatusBadge status={c.status} />
                  </TableCell>

                  <TableCell>
                    <div onClick={(e) => e.stopPropagation()}>
                      <ActionMenu
                        onEdit={() => navigate(`/edit-candidate/${c._id}`)}
                        onMoveToCVBank={() => handleReject(c._id)}
                        onDelete={() => handleDelete(c._id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
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

      {/* Modal Profil */}
      <CandidateProfileModal
        candidate={selectedCandidate}
        open={profileModalOpen}
        onOpenChange={setProfileModalOpen}
      />
    </div>
  );
}
