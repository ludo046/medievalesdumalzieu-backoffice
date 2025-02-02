const Joi = require('joi');

const createUserSchema = Joi.object({

        email: Joi.string().email({minDomainSegments: 2, tlds:{allow:['fr','com', 'net']}})
        .error(new Error(`⚠️ Vérifie le format de ton email`)),

        password: Joi.string()
        .min(8)
        .max(16)
        .error(new Error('⚠️ Mot de passe incorrect')),

        code: Joi.string()
        .min(8)
        .max(8)
        .error(new Error('⚠️ code incorrect'))


    })
    module.exports = createUserSchema;

    