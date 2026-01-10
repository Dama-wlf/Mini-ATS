
import mongoose from "mongoose";

// Modèle pour les candidats dans la base de données MongoDB.
const candidateSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    position: {
      type: String,
      required: true,
      trim: true, 
    },

    note: {
      type: String, 
    },

    cv: {
      fileName: String,
      filePath: String,
      fileType: String,
      fileSize: Number,
    },

    status: {
      type: String,
      enum: ["new", "interview", "test", "hired", "rejected"],
      default: "new",
    },

    rejectedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;
