const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const mainRouter = require("./routes/index");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const centralizedError = require("./middlewares/centralizedError");
const limiter = require("./middlewares/rateLimit");
require("dotenv").config();

const app = express();
const { PORT = 3001, MONGO_URL = "mongodb://127.0.0.1:27017/wtwr_db" } =
  process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to WTWR DB"))
  .catch((err) => console.error(err.message));

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now...");
  }, 0);
});

app.use(mainRouter);

app.use(errorLogger);
app.use(errors());
app.use(centralizedError);

app.listen(PORT);
