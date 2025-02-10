const { body, checkExact } = require("express-validator");
const argon2 = require("argon2");
const { getUserByEmail } = require("../models/userModel");

exports.checkSignupBody = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .toLowerCase(),

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .toLowerCase(),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .normalizeEmail()
    .custom(async (email) => {
      try {
        const user = await getUserByEmail(email);

        if (user) throw new Error("Email already in use");

        return true;
      } catch (err) {
        throw new Error(err.message);
      }
    }),

  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  checkExact([], { message: "Invalid fields" }),
];

exports.checkLoginBody = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .custom(async (password, { req }) => {
      try {
        const user = await getUserByEmail(req.body.email);

        if (!user) throw new Error("User not found");

        const isPasswordCorrect = await argon2.verify(user.password, password);

        if (!isPasswordCorrect) throw new Error("Incorrect email or password");

        return true;
      } catch (err) {
        throw new Error(err.message);
      }
    }),

  checkExact([], { message: "Invalid fields" }),
];

exports.checkRegisterPetBody = [
  body("name").trim().notEmpty().withMessage("Name is required").toLowerCase(),

  checkExact([], { message: "Invalid fields" }),
];
