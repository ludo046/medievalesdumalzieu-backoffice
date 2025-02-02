const Joi = require('joi');

const createArchiveSchema = Joi.object({
    
        id: Joi.any(),

        years: Joi.string()
        .error(new Error('⚠️ Indiquer année')),

        teaser: Joi.string()
        .error(new Error('⚠️ Ajouter le lien du teaser')),

        picture: Joi.any()

    })
    module.exports = createArchiveSchema;