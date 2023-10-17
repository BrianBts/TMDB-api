const express = require("express");
const moviesController = require("../controllers/movies.controllers");
const router = express.Router();

router.get("/", moviesController.getAll);
router.get("/:name", moviesController.getByName);
router.get("/:id", moviesController.getById);

module.exports = router;
