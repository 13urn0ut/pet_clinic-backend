const { registerPet } = require("../models/petModel");
const AppError = require("../utils/appError");

exports.registerPet = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id: user_id } = req.user;

    const newPet = await registerPet({ name, user_id });

    if (!newPet) throw new AppError("Pet registration failed", 500);

    res.status(201).json({ status: "success", data: newPet });
  } catch (err) {
    next(err);
  }
};
