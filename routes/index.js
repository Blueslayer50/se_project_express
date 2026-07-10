const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingitems");

const { loginUser, createUser } = require("../controllers/users");

const {
  validateUserLogin,
  validateUserRegister,
} = require("../middleware/validation");

const { NotFoundError } = require("../utils/errors");

router.post("/signup", validateUserRegister, createUser);
router.post("/signin", validateUserLogin, loginUser);

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res, next) => {
  next(new NotFoundError("The requested resource was not found."));
});

module.exports = router;
