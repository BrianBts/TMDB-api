const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const moviesRoutes = require("./movies.routes");

router.use("/auth", authRoutes);
router.use("/movies", moviesRoutes);

module.exports = router;
