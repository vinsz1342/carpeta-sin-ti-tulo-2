const Restaurante = require("../schema/RestauranteSchema");
const bcrypt = require("bcryptjs");
const { encryptValue } = require("../utils");

exports.createRestaurante = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      res.status(400).json({ message: "Provide email, password" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      console.log = "comprobar mail";
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }
    const foundRestaurante = await Restaurante.findOne({ email });
    if (foundRestaurante) {
      res.status(400).json({ message: "User already exists." });
      return;
    }

    const encryptedPassword = await encryptValue(password);
    const newRestaurante = await Restaurante.create({
      ...req.body,
      password: encryptedPassword,
    });

    res.status(201).json(newRestaurante);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRestaurantes = async (req, res) => {
  try {
    const restaurantes = await Restaurante.find();
    res.json(restaurantes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRestauranteById = async (req, res) => {
  const restauranteId = req.params.id;
  try {
    const foundRestaurante = await Restaurante.findById(restauranteId);

    if (foundRestaurante) {
      res.json(foundRestaurante);
    } else {
      res.status(404).json({ error: "Restaurante not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRestaurante = async (req, res) => {
  const restauranteId = req.params.id;

  try {
    const deletedRestaurante = await Restaurante.findByIdAndDelete(
      restauranteId
    );
    if (deletedRestaurante) {
      res.json({
        message: "Restaurante deleted successfully",
        deletedRestaurante,
      });
    } else res.status(500).json({ error: "Restaurante not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRestaurante = async (req, res) => {
  const restauranteId = req.params.id;
  const updates = req.body;

  try {
    const updatedRestaurante = await Restaurante.findByIdAndUpdate(
      restauranteId,
      updates,
      { new: true }
    );

    if (updatedRestaurante) {
      res.json({
        message: "Restaurante updated successfully",
        updatedRestaurante,
      });
    } else {
      res.status(404).json({ error: "Restaurante not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
