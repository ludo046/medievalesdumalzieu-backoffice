const Joi = require('joi');

const userPermissionsSchema = Joi.object({
  isAdmin: Joi.boolean().optional(),

  troupe: Joi.boolean().optional(),
  campement: Joi.boolean().optional(),
  artisan: Joi.boolean().optional(),
  animation: Joi.boolean().optional(),
  marche: Joi.boolean().optional(),
  partenaire: Joi.boolean().optional(),
})
  .unknown(true); // on autorise les autres champs, si jamais

module.exports = userPermissionsSchema;
