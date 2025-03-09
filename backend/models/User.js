const mongoose = require("mongoose");

// Création du schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  username:{ 
    type: String,required: true,unique: true},
  Entreprisename:{ 
    type: String,required: true,unique: true},
  email:{type: String,required: true,unique: true,match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ // Validation de l'email 
  },
  password:{type: String,required: true}
});

// Création du modèle "User" basé sur ce schéma
const User = mongoose.model("User", userSchema);

// Exportation du modèle pour l'utiliser dans d'autres fichiers
module.exports = User;

