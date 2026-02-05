const Joi = require('joi');

const createTroupeSchema = Joi.object({
  id: Joi.any(), // en create tu n’en as normalement pas besoin, mais ok

  companieName: Joi.string()
    .required()
    .error(new Error('⚠️ Indiquer le nom de la troupe')),

  contact: Joi.string()
    .required()
    .error(new Error('⚠️ Indiquer le contact de la troupe')),

  phone: Joi.string()
    .required()
    .error(new Error('⚠️ Indiquer un numéro de téléphone')),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['fr', 'com', 'net'] } })
    .required()
    .error(new Error('⚠️ Vérifie le format de ton email')),

  person: Joi.number()
    .required()
    .error(new Error('⚠️ Indiquer le nombre de personne de la troupe')),

  ville: Joi.string()
    .required()
    .error(new Error('⚠️ Indiquer la ville de la troupe')),

  pays: Joi.string()
    .required()
    .error(new Error('⚠️ Indiquer le pays de la troupe')),

  postalCode: Joi.string()
    .required()
    .error(new Error('⚠️ Indiquer le code postal de la troupe')),

  description: Joi.string()
    .required()
    .error(new Error('⚠️ Ajouter une description à la troupe')),

  price: Joi.string()
    .required()
    .error(new Error('⚠️ Indiquer le prix de la troupe')),

  taille: Joi.string()
    .required()
    .error(new Error('⚠️ Indiquer la taille du stand')),

  // mieux en booléen si c'est un "switch"
  activate: Joi.boolean().optional(),

  // ce que tu peux avoir dans req.body
  picture: Joi.any().optional(),
  image: Joi.any().optional() // pour éviter le fameux `"image" is not allowed`
})
.unknown(true); // pour ne plus exploser sur les champs en rab

module.exports = createTroupeSchema;
