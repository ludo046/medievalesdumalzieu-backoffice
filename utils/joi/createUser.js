const Joi = require('joi');

const createUserSchema = Joi.object({

        firstname: Joi.string()
        .error(new Error('⚠️ Indiquer prénom')),

        lastname: Joi.string()
        .error(new Error('⚠️ Indiquer nom')),

        email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['fr','com', 'net']}})
        .error(new Error(`⚠️ Vérifie le format de ton email`)),

        // password: Joi.string()
        // .min(8)
        // .max(16)
        // .error(new Error('⚠️ Mot de passe incorrect')),

        isAdmin: Joi.boolean(),

        phone: Joi.string()
        .min(10)
        .max(10)
        .error(new Error('⚠️ telephone inccorect')),
    })
    module.exports = createUserSchema;

    