const { getAll } = require("../models/petModel");
const AppError = require("../utils/appError");

exports.getAll = async (req, res, next) => {
  try {
    const data = await getAll();

    if (!data || data.length === 0) throw new AppError("No data found", 404);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
