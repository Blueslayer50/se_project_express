const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingitems");

// Users routes
router.use("/users", userRouter);

// Items routes
router.use("/items", itemRouter);

// Catch-all route for undefined endpoints
router.use((req, res) => {
  res.status(404).send({
    message: "Requested resource not found",
  });
});

module.exports = router;
