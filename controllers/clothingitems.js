const ClothingItems = require("../models/clothingItem");

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors");

const getItems = (req, res, next) => {
  ClothingItems.find({})
    .then((items) => res.send(items))
    .catch(next);
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItems.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("The data could not be validated"));
      }
      return next(err);
    });
};

const deleteItem = (req, res, next) => {
  ClothingItems.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        return next(
          new ForbiddenError("User unauthorized to delete this item."),
        );
      }
      return item
        .deleteOne()
        .then(() => res.send({ message: "Item successfully deleted." }));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Data format is invalid."));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Requested resource not found"));
      }
      return next(err);
    });
};

const addLike = (req, res, next) => {
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Requested resource not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Data format is invalid."));
      }
      return next(err);
    });
};

const deleteLike = (req, res, next) => {
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Requested resource not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(err);
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  addLike,
  deleteLike,
};
