import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createCandidate, updateCandidate, fetchCandidateById, clearSelectedCandidate } from "../features/candidate/candidateSlice.js";
import { Button, Input } from "../components/ui";
import { Upload, X, FileText, Save, Loader2 } from "lucide-react";
import { useToast } from "../context/ToastContext.jsx";
import { useForm } from "react-hook-form";

const POSITIONS = ["Frontend Developeur", "Backend Developeur", "Fullstack Developeur", "UI/UX Designer"];

export default function CandidateForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const { selectedCandidate, loading } = useSelector((state) => state.candidates);

  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting }, } = useForm({
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      note: "",
      status: "new",
      cv: null
    },
  });

  const [cvFile, setCvFile] = useState(null);
  const [existingCv, setExistingCv] = useState(null);

  useEffect(() => {
    if (isEditing) dispatch(fetchCandidateById(id));
    return () => dispatch(clearSelectedCandidate());
  }, [id, isEditing, dispatch]);

  useEffect(() => {
    if (isEditing && selectedCandidate) {
      reset({
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
  }, [selectedCandidate, isEditing, reset]);

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

  const onSubmit = async (values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (cvFile) formData.append("cv", cvFile);

    try {
      if (isEditing) {
        await dispatch(updateCandidate({ id, formData })).unwrap();
      } else {
        await dispatch(createCandidate(formData)).unwrap();
      }

      showToast("success", `Candidat ${isEditing ? "mis à jour" : "créé"} avec succès !`);
      navigate("/candidates");
    } catch (error) {
      console.log("Erreur backend reçue :", error);
      if (error.field) {
        setError(error.field, { type: "server", message: error.message });
      } else {

        showToast("error", error.message || "Erreur lors de la création");
      }
    }

  };

  return (

    <div className=" p-6 max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <h1 className="text-3xl font-bold text-text mb-2">{isEditing ? "Modifier le candidat" : "Ajouter un candidat"} </h1>
      <p className="text-muted mb-6">{isEditing ? "Mettre à jour les informations du candidat" : "Créer un nouveau candidat"} </p>


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
        {/* Infos personnelles */}
        <section className="bg-card border rounded-2xl p-6">
          <h2 className="font-semibold mb-6">Informations personnelles</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <Input label="Nom *" placeholder="Nom du candidat" error={errors.firstName?.message}  {...register("firstName", { required: "Nom obligatoire" })} />
            <Input label="Prénom *" placeholder="Prénom du candidat" error={errors.lastName?.message}  {...register("lastName", { required: "Prénom obligatoire" })} />
            <Input label="Email *" type="email" placeholder="Adresse Email professionnelle" error={errors.email?.message} {...register("email",
              { required: "Email obligatoire", pattern: { value: /^\S+@\S+\.\S+$/, message: "Email invalide", }, })} />
            <Input label="Téléphone *" placeholder="Numéro de Téléphone" error={errors.phone?.message}  {...register("phone",
              { required: "Numéro de téléphone obligatoire", minLength: { value: 10, message: "Minimum 10 chiffres" }, pattern: { value: /^[0-9+\-\s]*$/, message: "Numéro de téléphone invalide", } })} />
          </div>
        </section>

        {/* Poste */}
        <section className="bg-card border rounded-2xl p-6">
          <h2 className="font-semibold mb-1">Poste *</h2>
          <select
            className="w-full rounded-md border p-3 bg-background"
            {...register("position", { required: "Poste obligatoire" })}>
            <option value="">Sélectionner un poste</option>
            {POSITIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {errors.position && (
            <p className="mt-1 text-sm text-red-500">
              {errors.position.message}
            </p>
          )}

          {/* Note */}
          <h2 className="font-semibold mt-6">Note ( Facultatif )</h2>
          <textarea
            rows={4}
            placeholder="Notes"
            className="mt-1 w-full rounded-md border p-3 resize-none focus:outline-none focus:ring-1 focus:ring-primary bg-background"
            {...register("note")}
          />
        </section>

        {/* CV */}
        <section className="bg-card border rounded-2xl p-6">
          <h2 className="font-semibold mb-1">CV *</h2>

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
              <Input type="file" className="hidden" error={errors.cv?.message}  {...register("cv", { required: "Le CV est obligatoire" })} onChange={handleFileChange} />
            </label>
          )}
        </section>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" onClick={() => navigate(-1)}>
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sauvegarde...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {isEditing ? "Mettre à jour" : "Enregistrer"}
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>

  );
}

