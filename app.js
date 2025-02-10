const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/userRouter");
const petRouter = require("./routers/petRouter");
const appointmentRouter = require("./routers/appointmentRouter");
const errorHandler = require("./middleware/errorHandler");
const AppError = require("./utils/appError");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/pets", petRouter);
app.use("/api/v1/appointments", appointmentRouter);

app.all("*", (req, res, next) => {
  next(new AppError("Not found", 404));
});

app.use(errorHandler);

module.exports = app;
