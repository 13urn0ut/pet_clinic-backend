const { query, checkExact } = require("express-validator");
const { getUserById } = require("../models/userModel");
const { getAppointmentCount } = require("../models/appointmentModel");

exports.checkGetAllAppointmentsFilter = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid page number")
    .custom(async (page, { req }) => {
      try {
        const { count } = await getAppointmentCount(req.query.userId || null);

        if (page > Math.ceil(count / req.query.limit))
          throw new Error("Page not found");

        return true;
      } catch (err) {
        throw new Error(err.message);
      }
    }),

  query("limit").optional().isInt({ min: 1 }).withMessage("Invalid limit"),

  query("sortBy")
    .optional()
    .isString()
    .withMessage("Invalid sortBy")
    .isIn(["date", "confirmed"])
    .withMessage("SortBy must be 'date' or 'confirmed'"),

  query("sortDirection")
    .optional()
    .isString()
    .toUpperCase()
    .isIn(["ASC", "DESC"])
    .withMessage("SortDirection must be 'ASC' or 'DESC'"),

  query("userId")
    .optional()
    .isInt()
    .withMessage("Invalid userId")
    .custom(async (id) => {
      try {
        const user = await getUserById(id);

        if (!user) throw new Error("User not found");

        return true;
      } catch (err) {
        throw new Error(err.message);
      }
    }),

  checkExact([], { message: "Invalid fields" }),
];
