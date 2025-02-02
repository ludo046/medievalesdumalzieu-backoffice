const Joi = require('joi');

const createArchiveSchema = Joi.object({

        years: Joi.string()
        .error(new Error('⚠️ Indiquer année')),

        teaser: Joi.string()
        .allow(''),
        //.error(new Error('⚠️ Ajouter le lien du teaser')),

        picture: Joi.any()
        .allow(''),

    })
    module.exports = createArchiveSchema;