const Joi = require('joi');

const modifyTroupeSchema = Joi.object({

        id:Joi.number(),

        companieName: Joi.string()
        .error(new Error('⚠️ Indiquer le nom de la troupe')),

        contact: Joi.string()
        .error(new Error('⚠️ Indiquer le contact de la troupe')),

        phone: Joi.string()
        .error(new Error('⚠️ Indiquer un numéro de téléphone')),

        email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['fr','com', 'net']}})
        .error(new Error(`⚠️ Vérifie le format de ton email`)),

        person: Joi.number()
        .error(new Error('⚠️ Indiquer le nombre de personne de la troupe')),

        ville: Joi.string()
        .error(new Error('⚠️ Indiquer la ville de la troupe')),

        pays: Joi.string()
        .error(new Error('⚠️ Indiquer le pays de la troupe')),

        postalCode: Joi.string()
        .error(new Error('⚠️ Indiquer le code postal de la troupe')),

        description: Joi.string()
        .error(new Error('⚠️ Ajouter une description à la troupe')),

        price: Joi.string()
        .error(new Error(`⚠️ Indiquer le prix de l'artisan`)),

        activate: Joi.string(),

        picture: Joi.any()

    })
    module.exports = modifyTroupeSchema;