const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const {invalid} = require('joi');
const fs = require('fs');
const createPartenaireSchema =  require("../utils/joi/createPartenaire");
const modifyPartenaireSchema =  require("../utils/joi/modifyPartenaire");
const { where } = require('sequelize');
module.exports = {

    createPartenaire : async function(req, res){
        try{
            const valid = await createPartenaireSchema.validateAsync(req.body)
            if(valid){
                console.log(req.body);
                const headerAuth = req.headers["authorization"];
                const userId = jwtUtils.getUserId(headerAuth);
                if(userId <= 0){
                    return res.status(400).json({'error': `vous n'êtes pas identifié`});
                }
                models.Partenaire.findOne({
                    where : {
                        email : req.body.email
                    }
                })
                .then(function(partenaireFound){
                    if(!partenaireFound){
                        console.log(req.body);
                        models.Partenaire.create({
                            partenaireName: req.body.partenaireName,
                            contact : req.body.contact,
                            email: req.body.email,
                            phone : req.body.phone,
                            formule: req.body.formule,
                            montant: req.body.montant,
                            adresse: req.body.adresse,
                            reglement: req.body.reglement,
                            site: req.body.site,
                            activate: true,
                            texte: req.body.texte,
                            picture: `//${req.get("host")}/images/${req.files[0].filename}`
                        })
                    } else {
                        return res.status(409).json({'error': `ce partenaire existe déjà`});
                    }
                })
            } else {
                throw error(invalid)
            }
        } catch(error) {
            res.status(400).json({message: error.message})
        }
    },

    getAllPartenaires: function(req, res){
        let fields  = req.query.fields;
        let order   = req.query.order;
        models.Partenaire.findAll({
            order: [(order != null) ? order.split(':') : ['id']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        }).then(function (partenaire){
            if(partenaire){
                return res.status(200).json(partenaire)
            } else {
                res.status(404).json({error : 'aucun partenaire trouvé'})
            }
        }).catch(function(err){
            res.status(500).json({message: err.message})
        })
    },

    getOnePartenaire: function(req,res){
        const headerAuth = req.headers["authorization"];
        const userId = jwtUtils.getUserId(headerAuth);
        if(userId <= 0){
            return res.status(400).json({'error': `vous n'êtes pas identifié`});
        }
        models.Partenaire.findOne({
            where:{
              id : req.params.id  
            }
        })
        .then(function(partenaire){
            if(partenaire){
                return res.status(200).json(partenaire)
            }else{
                return res.status(404)({error : 'aucun partenaire trouvé'})
            }
        }).catch(function(err){
            res.status(500).json({message: err.message})
        })
    },

    modifyPartenaire: async function(req,res){
        try{
            const valid = await modifyPartenaireSchema.validateAsync(req.body);
            if (valid) {
                const headerAuth = req.headers["authorization"];
        const userId = jwtUtils.getUserId(headerAuth);
        if(userId <= 0){
            return res.status(400).json({'error': `vous n'êtes pas identifié`});
        }
        models.Partenaire.findOne({
            where :{
               id : req.body.id 
            }
            
        })
        .then(function(partenaire){
            console.log(partenaire);
            if(partenaire){
                if(req.files){
                    const filename = partenaire.picture.split('/images/')[1];
                    fs.unlink(`images/${filename}`, (err)=> {
                        if(err){
                            return console.log(err);
                        }
                        else {
                            console.log("image supprimée !");
                          }
                    })
                }
                partenaire.update({
                    partenaireName: req.body.partenaireName ? req.body.partenaireName : partenaireName,
                    contact : req.body.contact ? req.body.contact : contact ,
                    email: req.body.email ? req.body.email : email,
                    phone : req.body.phone ? req.body.phone : phone,
                    formule: req.body.formule ? req.body.formule : formule,
                    montant: req.body.montant ? req.body.montant : montant,
                    adresse: req.body.adresse ? req.body.adresse : adresse, 
                    reglement: req.body.reglement ? req.body.reglement : reglement,
                    site: req.body.site ? req.body.site : site,
                    activate: req.body.activate ? req.body.activate : activate,
                    texte: req.body.texte ? req.body.texte : texte,
                    picture: `//${req.get("host")}/images/${req.files[0].filename}` ? `//${req.get("host")}/images/${req.files[0].filename}` : picture
                })
                .then(function(partenaire){
                    return res.status(201).json(partenaire)
                  })
                  .catch(function(err){
                    res.status(500).json({err});
                  })
            }
        }).catch(function(err){
            res.status(500).json({message: err.message + 'coucou2'})
        })
            }else {
                throw error(invalid)
            }
        }catch(error) {
            res.status(400).json({message: error.message + 'coucou'})
        }
        
    },

    deletePartenaire : function(req,res){
        const headerAuth = req.headers["authorization"];
        const userId = jwtUtils.getUserId(headerAuth);
        if(userId <= 0){
            return res.status(400).json({'error': `vous n'êtes pas identifié`});
        }
        models.Partenaire.findOne({
            where:{
                id : req.params.id
            }
            
        })
        .then(function(partenaire){
            const filename = partenaire.picture.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                models.Partenaire.destroy({
                    where : {
                        id : req.params.id
                    }
                }).then(function(){
                    res.status(201).json(({ok: "partenaire supprimée"}))
                })
                .catch(function(error){
                    res.status(400).json({message : error.message});
                })
            })

        })
        .catch(function(error){
            res.status(400).json({message : error.message});
        })
    }
}