const jwt = require("jsonwebtoken");

const User = require("../models/User");

// get user by jwt token
const getUserByToken = async (token, res) => {
  if (!token) {
    res.status(401).json({ message: "Acesso negado!" });
    return;
  }

  try {
    const decoded = jwt.verify(token, "nossosecret");

    const userId = decoded.id;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado!" });
      return;
    }
    return user;
  } catch (err) {
    res.status(400).json({ message: "Token inválido!" });
  }
};

module.exports = getUserByToken;
