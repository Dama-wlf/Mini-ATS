import mongoose from "mongoose";
import Candidate from "../models/candidate.model.js";
import fs from "fs";
import path from "path";

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

// filtrer les candidats

export const getCandidateFiltred = async (req, res) => {
    try {
        const { search, position, status, sort = "asc", page = 1, limit = 8 } = req.query;

        const matchStage = { status: { $ne: "rejected" } }; 

        if (search) {
            const regex = new RegExp(search, "i");  matchStage.$or = [ { firstName: regex }, { lastName: regex }, { email: regex } ];
        }

        if (position && position !== "all") matchStage.position = position;
        if (status && status !== "all") matchStage.status = status;

        const sortStage = {
            $sort: { firstName: sort === "asc" ? 1 : -1, lastName: sort === "asc" ? 1 : -1 },
        };

        const skipStage = { $skip: (parseInt(page) - 1) * parseInt(limit) };
        const limitStage = { $limit: parseInt(limit) };

        const aggregatePipeline = [
            { $match: matchStage }, sortStage, skipStage, limitStage,
        ];

        const candidates = await Candidate.aggregate(aggregatePipeline);

        const total = await Candidate.countDocuments(matchStage);

        res.status(200).json({ success: true, data: candidates, total, totalPages: Math.ceil(total / limit), currentPage: parseInt(page) });

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
        // Vérifier si email ou téléphone existe déjà
        const existing = await Candidate.findOne({ $or: [{ email }, { phone }] });

        if (existing) {
            let message;
            if (existing.email === email && existing.phone === phone) {
                message = "Email et téléphone existent déjà.";
            } else if (existing.email === email) {
                message = "Email déjà utilisé.";
            } else {
                message = "Numéro de Téléphone déjà utilisé.";
            }

            return res.status(400).json({ success: false, message });
        }


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
        const candidate = await Candidate.findById(candidateId);

        if (!candidate) {
            return res.status(404).json({ success: false, message: "Candidat non trouvé" });
        }

        const updatedData = { ...req.body };

        //supprimer l'ancien CV
        if (req.file) {
            if (candidate.cv?.filePath) {
                const oldCvPath = path.resolve(candidate.cv.filePath);
                if (fs.existsSync(oldCvPath)) {
                    fs.unlinkSync(oldCvPath);
                }
            }

            //Remplacer le CV
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

    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
        return res.status(400).json({ success: false, message: "ID invalide" });
    }

    try {

        const candidate = await Candidate.findById(candidateId);

        if (!candidate) {
            return res.status(404).json({ success: false, message: "Candidat non trouvé" });
        }

        //supprimer CV candidat si existe
        if (candidate.cv?.filePath) {
            const cvPath = path.resolve(candidate.cv.filePath);
            if (fs.existsSync(cvPath)) {
                fs.unlinkSync(cvPath);
            }
        }
        await Candidate.findByIdAndDelete(candidateId);

        res.status(200).json({ success: true, message: "Candidat supprimé définitivement" });

    } catch (error) {
        console.error("Erreur suppression candidat :", error.message);
        res.status(500).json({ success: false, message: "Erreur du serveur" });
    }
};

// filtrer candidat rejeter
export const getRejectedCandidates = async (req, res) => {
    try {
        let { from, to, page = 1, limit = 8, search } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;

        const matchStage = { status: "rejected" };

        if (search) {
            const regex = new RegExp(search, "i");
            matchStage.$or = [ { firstName: regex }, { lastName: regex },{ email: regex } ];
        }

        if (from && to) {
            const startDate = new Date(from);
            const endDate = new Date(to);
            matchStage.rejectedAt = { $gte: startDate, $lte: endDate };
        }

        const aggregatePipeline = [ { $match: matchStage }, { $sort: { rejectedAt: -1 } }, { $skip: skip }, { $limit: limit }];

        const candidates = await Candidate.aggregate(aggregatePipeline);

        // Pour le total 
        const totalResult = await Candidate.aggregate([ { $match: matchStage }, { $count: "total" } ]);

        const total = totalResult[0]?.total || 0;

        res.status(200).json({ success: true, data: candidates, total, totalPages: Math.ceil(total / limit), currentPage: page });

    } catch (error) {
        console.error("Erreur banque de CV (aggregate) :", error.message);
        res.status(500).json({ success: false, message: "Erreur du serveur" });
    }
};


