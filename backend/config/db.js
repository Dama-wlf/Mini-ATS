import mongoose from "mongoose";

// Établit la connexion à la base de données MongoDB Atlas via Mongoose en utilisant les variables d’environnement.
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connecté: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Erreur: ${error.message}`);
        process.exit(1);
    }
}
export default connectDB;