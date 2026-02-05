// const Joi = require('joi');

// const createTroupeSchema = Joi.object({

//         id: Joi.any(),

//         partenaireName: Joi.string()
//         .error(new Error('⚠️ Indiquer le nom de la troupe')),

//         contact: Joi.string()
//         .error(new Error('⚠️ Indiquer le contact de la troupe')),

//         email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['fr','com', 'net']}})
//         .error(new Error(`⚠️ Vérifie le format de ton email`)),

//         phone: Joi.string()
//         .error(new Error('⚠️ Indiquer un numéro de téléphone')),

//         formule: Joi.string()
//         .error(new Error('⚠️ Indiquer la formule')),

//         montant: Joi.string()
//         .error(new Error('⚠️ Indiquer le montant')),

//         adresse: Joi.string()
//         .error(new Error('⚠️ Indiquer adresse du partenaire')),

//         reglement: Joi.string()
//         .error(new Error('⚠️ Indiquer le type de reglement')),

//         site: Joi.string()
//         .error(new Error('⚠️ Ajouter le site web du partenaire')),
//         texte: Joi.string()
//         .max(20)
//         .error(new Error('⚠️ Ajouter un petit texte au partenaire')),

//         activate: Joi.string(),

//         picture: Joi.any()

//     })
//     module.exports = createTroupeSchema;

const Joi = require('joi');

const createPartenaireSchema = Joi.object({
  id: Joi.any(), // en create normalement pas utile, mais ok

  partenaireName: Joi.string()
    .required()
    .error(new Error('⚠️ Indiquer le nom du partenaire')),

  contact: Joi.string()
    .required()
    .error(new Error('⚠️ Indiquer le contact du partenaire')),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['fr', 'com', 'net'] } })
    .required()
    .error(new Error('⚠️ Vérifie le format de ton email')),

  phone: Joi.string()
    .required()
    .error(new Error('⚠️ Indiquer un numéro de téléphone')),

  formule: Joi.string()
    .required()
    .error(new Error('⚠️ Indiquer la formule')),

  montant: Joi.string()
    .required()
    .error(new Error('⚠️ Indiquer le montant')),

  adresse: Joi.string()
    .required()
    .error(new Error('⚠️ Indiquer adresse du partenaire')),

  reglement: Joi.string()
    .required()
    .error(new Error('⚠️ Indiquer le type de reglement')),

  site: Joi.string()
    .required()
    .error(new Error('⚠️ Ajouter le site web du partenaire')),

  texte: Joi.string()
    .max(20)
    .required()
    .error(new Error('⚠️ Ajouter un petit texte au partenaire')),

  // mieux en booléen si c'est un switch on/off
  activate: Joi.boolean().optional(),

  // ce qui peut arriver dans req.body
  picture: Joi.any().optional(),
  image: Joi.any().optional()   // <-- ajoute ça pour stopper l'erreur
})
.unknown(true); // <-- pour éviter tous les "XXX is not allowed"

module.exports = createPartenaireSchema;
