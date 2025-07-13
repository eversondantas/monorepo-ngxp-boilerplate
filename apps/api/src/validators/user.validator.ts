import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  roleId: Joi.string().uuid().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().max(100),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  roleId: Joi.string().uuid(),
});
