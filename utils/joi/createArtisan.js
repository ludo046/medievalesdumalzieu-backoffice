const Joi = require('joi');

const createTroupeSchema = Joi.object({

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

        town: Joi.string()
        .error(new Error('⚠️ Indiquer la ville de la troupe')),

        contry: Joi.string()
        .error(new Error('⚠️ Indiquer le pays de la troupe')),

        postalCode: Joi.string()
        .error(new Error('⚠️ Indiquer le code postal de la troupe')),

        description: Joi.string()
        .error(new Error('⚠️ Ajouter une description à la troupe')),

        price: Joi.string()
        .error(new Error('⚠️ Indiquer le prix de la troupe')),

        taille: Joi.string()
        .error(new Error('⚠️ Indiquer la taille du stand')),

        picture: Joi.any()

    })
    module.exports = createTroupeSchema;