const { celebrate, Joi } = require("celebrate");

const validateUserRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().uri().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
    imageUrl: Joi.string().uri().required(),
  }),
});

const validateItemID = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateUserRegister,
  validateUserLogin,
  validateCardBody,
  validateItemID,
};
