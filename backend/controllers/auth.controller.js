import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

// Contrôleur pour l'inscription des utilisateurs.
export const register = async (req, res) => {
    const {userName, email, password} = req.body;

    if(!userName || !email || !password){
        return res.status(400).json({success:false, message:"Tous les champs sont requis"});
    }

    try {
        const userExists = await User.findOne({email})
        if (userExists){
            return res.status(403).json({succes:false, message:"Utilisateur existe deja"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({userName, email, password: hashedPassword});
        res.status(201).json({success: true, data: user})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({succes:false, message: "Erreur serveur"});
    }
}

//Contrôleur pour la connexion des utilisateurs.
export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({success:false, message:"Tous les champs sont requis"});
    }
    try {
        const user = await User.findOne({email});
        if(!user){
           return res.status(401).json({succes:false, message:"Email incorrect"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
           return res.status(401).json({succes:false, message: "mot de passe incorrect"});
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

    //mettre refresh token dans les cookies 
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000 //7 jours
        });

        res.status(200).json({  user: { _id: user._id, userName: user.userName, email: user.email }, accessToken: accessToken });

    } catch (error) {
        console.error("Login error", error.message);
        res.status(500).json({succes:false, message: "Erreur serveur"});
    }
}

//Contrôleur pour la déconnexion des utilisateurs.
export const logout = async (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    });
    res.status(200).json({succes:true, message: "Déconnexion réussie"});
}

//Contrôleur pour rafraîchir le token d'accès.
export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id)
      .select("_id userName email");

    if (!user) {
      return res.status(401).json({ message: "Utilisateur introuvable" });
    }

    const newAccessToken = generateAccessToken(user._id);

    res.status(200).json({
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};
