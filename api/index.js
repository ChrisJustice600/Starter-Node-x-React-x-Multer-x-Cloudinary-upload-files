const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();
const cors = require("cors");

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: "dnexrdcxg",
  api_key: "733678216346691",
  api_secret: "lslv3lJKnDxhRS8anh0x7XiU8ps",
});

// Endpoint pour gérer le téléchargement d'image
app.post("/upload", upload.single("image"), async (req, res) => {
  console.log(req.file);
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result.secure_url);
    // res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors du téléversement de l'image." });
  }
});

// Démarrer le serveur
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
