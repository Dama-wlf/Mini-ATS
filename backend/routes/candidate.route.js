import express from "express";
import uploadCv from "../middleware/uploadCv.middleware.js";
import {
     getCandidate,
     getAllCandidate, 
     getCandidateFiltred,
     createCandidate,
     updateCandidate,
     updateCandidateStatus, 
     getRejectedCandidates, 
     rejectCandidate, 
     deleteCandidate, } from "../controllers/candidate.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(protect);

router.get("/rejected/all", getRejectedCandidates);
router.get("/", getAllCandidate);
router.get("/filtred",getCandidateFiltred );
router.get("/:id", getCandidate);
router.post("/", uploadCv.single("cv"), createCandidate);
router.put("/:id", uploadCv.single("cv"), updateCandidate);
router.patch("/:id/status", updateCandidateStatus);
router.patch("/:id/reject", rejectCandidate);
router.delete("/:id", deleteCandidate);
router.get("/rejected/all", getRejectedCandidates);

export default router;
