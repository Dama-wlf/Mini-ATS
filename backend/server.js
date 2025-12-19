import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import candidateRoutes from './routes/candidate.route.js';
import path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
))
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidateRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Serveur est démarré dans http://localhost:${PORT}`);
});