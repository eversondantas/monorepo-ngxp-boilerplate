import Joi from 'joi';

export const createRoleSchema = Joi.object({
  name: Joi.string().max(50).required(),
});
