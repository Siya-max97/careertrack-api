const express = require("express");

const router = express.Router();

const applicationRoutes = require("./applicationRoutes");

router.use("/applications", applicationRoutes);

module.exports = router;