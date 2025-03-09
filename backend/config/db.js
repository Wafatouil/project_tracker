const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Charger les variables d'environnement

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connecté");
  } catch (error) {
    console.error("❌ Erreur de connexion MongoDB:", error);
    process.exit(1); // Arrête le serveur en cas d'échec
  }
};

module.exports = connectDB;
