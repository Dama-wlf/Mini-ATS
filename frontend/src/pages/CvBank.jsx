import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRejectedCandidates, deleteCandidate, updateCandidateStatus } from "../features/candidate/candidateSlice.js";
import { Button, Input, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmpty  } from "../components/ui";
import CandidateProfileModal from "../components/CandidateProfilModal.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { RotateCcw, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 8;

export default function CvBank() {
  const dispatch = useDispatch();
  const { rejectedCandidates, loading } = useSelector(
    (state) => state.candidates
  );

  const { showToast } = useToast();

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getRejectedCandidates());
  }, [dispatch]);

  const filteredCandidates = useMemo(() => {
    let result = [...rejectedCandidates];

    // Recherche texte
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.firstName.toLowerCase().includes(s) ||
          c.lastName.toLowerCase().includes(s) ||
          c.email.toLowerCase().includes(s)
      );
    }

    // Filtre date via dropdown
    if (dateFilter !== "all") {
      const now = new Date();

      result = result.filter((c) => {
        if (!c.rejectedAt) return false;
        const rejectedAt = new Date(c.rejectedAt);

        const diffDays =
          (now - rejectedAt) / (1000 * 60 * 60 * 24);

        switch (dateFilter) {
          case "today":
            return rejectedAt.toDateString() === now.toDateString();
          case "7days":
            return diffDays <= 7;
          case "30days":
            return diffDays <= 30;
          default:
            return true;
        }
      });
    }

    return result;
  }, [rejectedCandidates, search, dateFilter]);

  const totalPages = Math.ceil(
    filteredCandidates.length / ITEMS_PER_PAGE
  );

  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRestore = async (id) => {
  await dispatch(updateCandidateStatus({ id, status: "new" }));
  dispatch(getRejectedCandidates()); // re-fetch la liste
  showToast("success", "Candidat restauré avec succès");
};


  const handleDelete = (id) => {
    dispatch(deleteCandidate(id));
    showToast("success", "Candidat supprimé définitivement");
  };

  return (
    <div className="p-6 animate-fade-in">
      {/* En Tête */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Banque de CV</h1>
        <p className="text-muted-foreground mt-1">
          Tous les candidats rejetés
        </p>
      </div>

      {/* Filtre */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-4 h-4 w-4 text-muted" />
          <Input
            placeholder="Rechercher un candidat..."
            value={search}
            hasIcon
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select
          className="h-11 rounded-xl border border-gray-300 px-3
          focus:outline-none focus:ring-1 focus:ring-primary
          bg-background"
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
          {paginatedCandidates.length === 0 ? (
            <TableEmpty colSpan={6} label="Aucun candidat rejeté" />
          ) : (
            paginatedCandidates.map((c) => (
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
                    onClick={(e) => handleDelete(c._id)}
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
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(
              currentPage * ITEMS_PER_PAGE,
              filteredCandidates.length
            )}{" "}
            of {filteredCandidates.length} candidates
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="h-9 w-9"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <Button
                  key={page}
                  variant={
                    page === currentPage ? "default" : "outline"
                  }
                  onClick={() => setCurrentPage(page)}
                  className="h-9 w-9"
                >
                  {page}
                </Button>
              )
            )}

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="h-9 w-9"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Modal profil */}
      <CandidateProfileModal
        candidate={selectedCandidate}
        open={profileModalOpen}
        onOpenChange={setProfileModalOpen}
      />
    </div>
  );
}
