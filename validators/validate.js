const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorStr = errors
      .array()
      .map((err) => err.msg)
      .join("; ");

    next(new AppError(errorStr, 400));
  }

  next();
};

module.exports = validate;
