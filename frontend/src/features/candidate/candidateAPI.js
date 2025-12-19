import api from "../../services/api";

// Récupérer tous les candidats
export const fetchCandidatesAPI = async () => {
    const res = await api.get("/candidates");
    return res.data;
};

// Récupérer un candidat par ID
export const fetchCandidateByIdAPI = async (id) => {
    const res = await api.get(`/candidates/${id}`);
    return res.data;
};

// Créer un candidat (avec CV)
export const createCandidateAPI = async (formData) => {
    const res = await api.post("/candidates", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};

// Mettre à jour un candidat 
export const updateCandidateAPI = async (id, formData) => {
    const res = await api.put(`/candidates/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};

// Mettre à jour le statut du candidat
export const updateCandidateStatusAPI = async (id, status) => {
    const res = await api.patch(`/candidates/${id}/status`, { status });
    return res.data;
};

// Rejeter un candidat
export const rejectCandidateAPI = async (id) => {
    const res = await api.patch(`/candidates/${id}/reject`);
    return res.data;
};

// Supprimer un candidat
export const deleteCandidateAPI = async (id) => {
    const res = await api.delete(`/candidates/${id}`);
    return res.data;
};

// Récupérer les candidats rejetés (Banque de CV)
export const getRejectedCandidatesAPI = async () => {
    const res = await api.get("/candidates/rejected/all");
    return res.data;
};
