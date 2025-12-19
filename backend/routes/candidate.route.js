import express from "express";
import uploadCv from "../middleware/uploadCv.middleware.js";
import {
     getCandidate,
     getAllCandidate, 
     createCandidate,
     updateCandidate,
     updateCandidateStatus, 
     getRejectedCandidates, 
     rejectCandidate, 
     deleteCandidate, } from "../controllers/candidate.controller.js";

const router = express.Router();

router.get("/", getAllCandidate);
router.get("/:id", getCandidate);
router.post("/", uploadCv.single("cv"), createCandidate);
router.put("/:id", uploadCv.single("cv"), updateCandidate);
router.patch("/:id/status", updateCandidateStatus);
router.patch("/:id/reject", rejectCandidate);
router.delete("/:id", deleteCandidate);
router.get("/rejected/all", getRejectedCandidates);

export default router;
