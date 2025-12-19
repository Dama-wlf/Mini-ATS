import mongoose from "mongoose";

// Modèle pour les utilisateurs dans la base de données MongoDB.
const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
    }  
);

const User = mongoose.model("User", userSchema);

export default User;