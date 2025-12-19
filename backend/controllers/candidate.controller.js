import mongoose from "mongoose";
import Candidate from "../models/candidate.model.js";

//CRUD candidats


// Récupérer tous les candidats

export const getAllCandidate = async (req, res) => {
    try {
        const candidates = await Candidate.find({}); 
        res.status(200).json({ success: true, data: candidates });

    } catch (error) {
        console.error("Erreur récupération candidats :", error.message);
        res.status(500).json({ success: false, message: "Erreur du serveur" });
    }
};

// Recuperer un candidat
export const getCandidate = async (req, res) => {
    const candidateId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
        return res.status(400).json({ success: false, message: "ID invalide" });
    }

    try {
        const candidate = await Candidate.findById(candidateId);

        if (!candidate) {
            return res.status(404).json({ success: false, message: "Candidat non trouvé" });
        }

        res.status(200).json({ success: true, data: candidate });
    } catch (error) {
        console.error("Erreur getCandidate :", error.message);
        res.status(500).json({ success: false, message: "Erreur du serveur" });
    }
};


// créer un nouveau candidat et CV
export const createCandidate = async (req, res) => {
    const { firstName, lastName, email, phone, position } = req.body;

    if (!firstName || !lastName || !email || !phone || !position) {
        return res.status(400).json({ success: false, message: "Tous les champs obligatoires doivent être remplis" });
    }

    try {
        const newCandidate = new Candidate({
            ...req.body,
            cv: req.file
                ? {
                    fileName: req.file.filename,
                    filePath: req.file.path,
                    fileType: req.file.mimetype,
                    fileSize: req.file.size,
                }
                : null,
        });

        await newCandidate.save();

        res.status(201).json({ success: true, data: newCandidate });
    } catch (error) {
        console.error("Erreur création candidat :", error.message);
        res.status(500).json({ success: false, message: "Erreur du serveur" });
    }
};

// Mettre à jour un candidat et CV
export const updateCandidate = async (req, res) => {
    const candidateId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
        return res.status(400).json({ success: false, message: "Identifiant candidat invalide" });
    }

    try {
        const updatedData = { ...req.body };

        if (req.file) {
            updatedData.cv = {
                fileName: req.file.filename,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
            };
        }

        const updatedCandidate = await Candidate.findByIdAndUpdate(candidateId, updatedData, { new: true });

        if (!updatedCandidate) {
            return res.status(404).json({ success: false, message: "Candidat non trouvé" });
        }

        res.status(200).json({ success: true, data: updatedCandidate });

    } catch (error) {
        console.error("Erreur mise à jour candidat :", error.message);
        res.status(500).json({ success: false, message: "Erreur du serveur" });
    }
};

// Mettre à jour le statut du candidat
export const updateCandidateStatus = async (req, res) => {
    const candidateId = req.params.id;
    const { status } = req.body;

    try {
        const updatedCandidate = await Candidate.findByIdAndUpdate(candidateId, { status }, { new: true });

        res.status(200).json({ success: true, data: updatedCandidate });

    } catch (error) {
        console.error("Erreur pipeline :", error.message);
        res.status(500).json({ success: false, message: "Erreur du serveur" });
    }
};

// Rejeter un candidat dans le banque de CV
export const rejectCandidate = async (req, res) => {
    const candidateId = req.params.id;

    try {
        const rejectedCandidate = await Candidate.findByIdAndUpdate(
            candidateId,
            {
                status: "rejected",
                rejectedAt: new Date(),
            },
            { new: true }
        );

        res.status(200).json({ success: true, data: rejectedCandidate });

    } catch (error) {
        console.error("Erreur rejet candidat :", error.message);
        res.status(500).json({ success: false, message: "Erreur du serveur" });
    }
};

// Supprimer définitivement un candidat
export const deleteCandidate = async (req, res) => {
    const candidateId = req.params.id;

    try {
        await Candidate.findByIdAndDelete(candidateId);

        res.status(200).json({ success: true, message: "Candidat supprimé définitivement" });

    } catch (error) {
        console.error("Erreur suppression candidat :", error.message);
        res.status(500).json({ success: false, message: "Erreur du serveur" });
    }
};

// Récupérer les candidats rejetés avec filtre de date
export const getRejectedCandidates = async (req, res) => {
    const { from, to } = req.query;

    try {
        const filter = { status: "rejected" };

        if (from && to) {
            const startDate = new Date(from);
            const endDate = new Date(to);

            filter.rejectedAt = { $gte: startDate, $lte: endDate };
        }

        const rejectedCandidates = await Candidate.find(filter).sort({ rejectedAt: -1 });

        res.status(200).json({ success: true, data: rejectedCandidates });

    } catch (error) {
        console.error("Erreur banque de CV :", error.message);
        res.status(500).json({ success: false, message: "Erreur du serveur" });
    }
};


