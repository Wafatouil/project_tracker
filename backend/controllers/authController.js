const bcrypt = require("bcryptjs");
const User = require("../models/User");

//fonction pour Registre
const registerUser = async (req, res) => {
    try {
      const { username, Entreprisename, email, password } = req.body;
  
      // Vérification si l'email ou le username existe déjà
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email déjà utilisé" });
      }
  
      const existingUserByUsername = await User.findOne({ username });
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username déjà utilisé" });
      }
  
      // On va haché le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Création du nouvel utilisateur
      const newUser = new User({
        username,
        Entreprisename,
        email,
        password: hashedPassword,
      });
  
      // Sauvegarder dans la base de données
      await newUser.save();
  
      res.status(201).json({ message: "Inscription réussie", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };

//fonction pour la connexion
const loginUser  = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    res.status(200).json({ message: "Connexion réussie", user });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

module.exports = { registerUser, loginUser };

