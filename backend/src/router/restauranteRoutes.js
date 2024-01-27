const express = require("express");
const router = express.Router();
const restauranteController = require("../controller/restauranteController");

router.post("/restaurantes", restauranteController.createRestaurante);
router.get("/restaurantes", restauranteController.getRestaurantes);
router.get("/restaurantes/:id", restauranteController.getRestauranteById);
router.delete("/restaurantes/:id", restauranteController.deleteRestaurante);
router.patch("/restaurantes/:id", restauranteController.updateRestaurante);

module.exports = router;
