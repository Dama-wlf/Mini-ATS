import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createCandidate, updateCandidate, fetchCandidateById, clearSelectedCandidate } from "../features/candidate/candidateSlice.js";
import { Button, Input, SelectField } from "../components/ui";
import { Upload, X, FileText, Save } from "lucide-react";
import { useToast } from "../context/ToastContext.jsx";

const POSITIONS = ["Frontend Developeur", "Backend Developeur", "Fullstack Developeur", "UI/UX Designer"];

export default function CandidateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const { selectedCandidate, loading } = useSelector(
    (state) => state.candidates
  );

  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    note: "",
    status: "new",
  });

  const [cvFile, setCvFile] = useState(null);
  const [existingCv, setExistingCv] = useState(null);

  useEffect(() => {
    if (isEditing) dispatch(fetchCandidateById(id));
    return () => dispatch(clearSelectedCandidate());
  }, [id, isEditing, dispatch]);

  useEffect(() => {
    if (isEditing && selectedCandidate) {
      setFormData({
        firstName: selectedCandidate.firstName,
        lastName: selectedCandidate.lastName,
        email: selectedCandidate.email,
        phone: selectedCandidate.phone,
        position: selectedCandidate.position,
        note: selectedCandidate.note || "",
        status: selectedCandidate.status,
      });
      setExistingCv(selectedCandidate.cv || null);
    }
  }, [selectedCandidate, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      setExistingCv(null);
    }
  };

  const removeFile = () => {
    setCvFile(null);
    setExistingCv(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) data.append(key, formData[key]);
    if (cvFile) data.append("cv", cvFile);

    if (isEditing) {
      dispatch(updateCandidate({ id, formData: data }));
    } else {
      dispatch(createCandidate(data));
    }
    showToast("success", `Candidat ${isEditing ? "mis à jour" : "créé"} avec succès !`);
    navigate("/candidates");
  };

  return (

    <div className=" p-6 max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <h1 className="text-3xl font-bold text-text mb-2">{isEditing ? "Modifier le candidat" : "Ajouter un candidat"} </h1>
      <p className="text-muted mb-6">{isEditing ? "Mettre à jour les informations du candidat" : "Créer un nouveau candidat"} </p>


      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        {/* Infos personnelles */}
        <section className="bg-card border rounded-2xl p-6">
          <h2 className="font-semibold mb-6">Informations personnelles</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <Input label="Nom *" name="lastName" placeholder="Nom du candidat" value={formData.lastName} onChange={handleChange} />
            <Input label="Prénom *" name="firstName" placeholder="Prénom du candidat" value={formData.firstName} onChange={handleChange} />
            <Input label="Email *" name="email" type="email" placeholder="Adresse Email professionnelle" value={formData.email} onChange={handleChange} />
            <Input label="Téléphone *" name="phone" placeholder="Numéro de Téléphone" value={formData.phone} onChange={handleChange} />
          </div>
        </section>

        {/* Poste */}
        <section className="bg-card border rounded-2xl p-6">
          <h2 className="font-semibold mb-6">Poste et Note</h2>
          <SelectField
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Sélectionner un poste"
            options={POSITIONS.map((p) => ({
              value: p,
              label: p,
            }))}
          />

          {/* Note */}
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows={4}
            placeholder="Notes"
            className="mt-4 w-full rounded-md border p-3 resize-none focus:outline-none focus:ring-1 focus:ring-primary bg-background"
          />
        </section>

        {/* CV */}
        <section className="bg-card border rounded-2xl p-6">
          <h2 className="font-semibold mb-6">CV</h2>

          {cvFile || existingCv ? (
            <div className="flex justify-between items-center border rounded-xl p-4">
              <div className="flex items-center gap-3">
                <FileText className="text-primary" />
                <span>{cvFile?.name || existingCv?.fileName}</span>
              </div>
              <button type="button" onClick={removeFile}>
                <X />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center border-2 border-dashed rounded-xl p-8 bg-background">
              <Upload className="text-primary mb-3" />
              <span>Importer un CV</span>
              <p className="text-sm text-muted">PDF, DOCX ou IMAGE (max. 10 MB)</p>
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
          )}
        </section>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" onClick={() => navigate(-1)}>
            Annuler
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? "Mettre à jour" : "Enregistrer"}
          </Button>
        </div>
      </form>

    </div>

  );
}

