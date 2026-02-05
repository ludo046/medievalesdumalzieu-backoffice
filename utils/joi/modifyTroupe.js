// const Joi = require('joi');

// const modifyTroupeSchema = Joi.object({

//         id:Joi.number(),

//         companieName: Joi.string()
//         .error(new Error('⚠️ Indiquer le nom de la troupe')),

//         contact: Joi.string()
//         .error(new Error('⚠️ Indiquer le contact de la troupe')),

//         phone: Joi.string()
//         .error(new Error('⚠️ Indiquer un numéro de téléphone')),

//         email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['fr','com', 'net']}})
//         .error(new Error(`⚠️ Vérifie le format de ton email`)),

//         person: Joi.number()
//         .error(new Error('⚠️ Indiquer le nombre de personne de la troupe')),

//         ville: Joi.string()
//         .error(new Error('⚠️ Indiquer la ville de la troupe')),

//         pays: Joi.string()
//         .error(new Error('⚠️ Indiquer le pays de la troupe')),

//         postalCode: Joi.string()
//         .error(new Error('⚠️ Indiquer le code postal de la troupe')),

//         description: Joi.string()
//         .error(new Error('⚠️ Ajouter une description à la troupe')),

//         price: Joi.string()
//         .error(new Error(`⚠️ Indiquer le prix de l'artisan`)),

//         activate: Joi.string(),

//         picture: Joi.any()

//     })
//     module.exports = modifyTroupeSchema;


// modifyTroupeSchema.js
const Joi = require('joi');

const modifyTroupeSchema = Joi.object({
  id: Joi.number().integer().required()
    .error(new Error('⚠️ Id de la troupe manquant ou invalide')),

  name: Joi.string().optional()
    .error(new Error('⚠️ Indiquer le nom de la troupe')),

  contact: Joi.string().optional()
    .error(new Error('⚠️ Indiquer le contact de la troupe')),

  phone: Joi.string().optional()
    .error(new Error('⚠️ Indiquer un numéro de téléphone')),

  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['fr', 'com', 'net'] } }).optional()
    .error(new Error(`⚠️ Vérifie le format de ton email`)),

  person: Joi.number().optional()
    .error(new Error('⚠️ Indiquer le nombre de personne de la troupe')),

  town: Joi.string().optional()
    .error(new Error('⚠️ Indiquer la ville de la troupe')),

  contry: Joi.string().optional()
    .error(new Error('⚠️ Indiquer le pays de la troupe')),

  postalCode: Joi.string().optional()
    .error(new Error('⚠️ Indiquer le code postal de la troupe')),

  description: Joi.string().optional()
    .error(new Error('⚠️ Ajouter une description à la troupe')),

  price: Joi.string().optional()
    .error(new Error('⚠️ Indiquer le prix de la troupe')),

  activate: Joi.boolean().optional(),

  picture: Joi.any().optional(),
  image: Joi.any().optional() // au cas où ton front envoie encore "image"
}).unknown(true);

module.exports = modifyTroupeSchema;
