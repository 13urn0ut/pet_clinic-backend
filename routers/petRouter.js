const { protect } = require("../controllers/authController");
const { registerPet } = require("../controllers/petController");
const { checkRegisterPetBody } = require("../validators/checkBody");
const validate = require("../validators/validate");

const petRouter = require("express").Router();

petRouter
  .route("/register")
  .post(protect, checkRegisterPetBody, validate, registerPet);

module.exports = petRouter;
