const express = require("express");
const router = express.Router();
const { crud } = require("../controllers/base_controller");

router.all("/:modelname", crud);

module.exports = router;
