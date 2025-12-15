import mongoose from "mongoose";

// Modèle pour les candidats dans la base de données MongoDB.
const candidateSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        cvUrl: {
            type: String
        },
        status: {
            type: String,
            enum: ['new', 'interview', 'test', 'hired', 'rejected'],
            default: 'new'
        },
        rejectedAt: date
    },
    {
        timestamps: true
    }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;