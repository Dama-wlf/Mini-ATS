import multer from "multer";
import path from "path";

//stockage des fichiers sur le serveur
const storage = multer.diskStorage({
  destination: "uploads/cv",

  filename: (request, file, callback) => {
    const fileExtension = path.extname(file.originalname);
    const generatedFileName = Date.now() + fileExtension;

    callback(null, generatedFileName);
  },
});

const uploadCv = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limite de taille de fichier
  },
});

export default uploadCv;
