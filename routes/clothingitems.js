const itemRouter = require("express").Router();

const { authorize } = require("../middleware/auth");

const {
  validateItemID,
  validateCardBody,
} = require("../middleware/validation");

const {
  getItems,
  createItem,
  deleteItem,
  addLike,
  deleteLike,
} = require("../controllers/clothingitems");

itemRouter.get("/", getItems);

itemRouter.use(authorize);

itemRouter.post("/", validateCardBody, createItem);
itemRouter.delete("/:itemId", validateItemID, deleteItem);
itemRouter.put("/:itemId/likes", validateItemID, addLike);
itemRouter.delete("/:itemId/likes", validateItemID, deleteLike);

module.exports = itemRouter;
