const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const mainRouter = require("./routes/index");
require("dotenv").config();
mongoose.set("strictQuery", true);

const app = express();

const { PORT = 3001, MONGO_URL = "mongodb://127.0.0.1:27017/wtwr_db" } =
  process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to WTWR DB"))
  .catch((err) => console.error(err.message));

app.use(helmet());
app.use(express.json());
app.use(cors());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now...");
  }, 0);
});

app.use(mainRouter);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "An error has occurred on the server." : message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
