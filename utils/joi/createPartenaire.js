const Joi = require('joi');

const createTroupeSchema = Joi.object({

        partenaireName: Joi.string()
        .error(new Error('⚠️ Indiquer le nom de la troupe')),

        contact: Joi.string()
        .error(new Error('⚠️ Indiquer le contact de la troupe')),

        email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['fr','com', 'net']}})
        .error(new Error(`⚠️ Vérifie le format de ton email`)),

        phone: Joi.string()
        .error(new Error('⚠️ Indiquer un numéro de téléphone')),

        formule: Joi.string()
        .error(new Error('⚠️ Indiquer la formule')),

        montant: Joi.string()
        .error(new Error('⚠️ Indiquer le montant')),

        adresse: Joi.string()
        .error(new Error('⚠️ Indiquer adresse du partenaire')),

        reglement: Joi.string()
        .error(new Error('⚠️ Indiquer le type de reglement')),

        site: Joi.string()
        .error(new Error('⚠️ Ajouter le site web du partenaire')),

        texte: Joi.string()
        .max(20)
        .error(new Error('⚠️ Ajouter un petit texte au partenaire')),

        picture: Joi.any()

    })
    module.exports = createTroupeSchema;