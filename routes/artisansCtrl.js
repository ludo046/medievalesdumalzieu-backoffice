const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const {invalid} = require('joi');
const fs = require('fs');
const createArtisansSchema =  require("../utils/joi/createArtisan");
const modifyArtisansSchema =  require("../utils/joi/modifyArtisan");
module.exports = {

    createArtisans : async function(req, res){
        try{
            const valid = await createArtisansSchema.validateAsync(req.body)
            if(valid){
                console.log(req.body);
                const headerAuth = req.headers["authorization"];
                const userId = jwtUtils.getUserId(headerAuth);
                if(userId <= 0){
                    return res.status(400).json({'error': `vous n'êtes pas identifié`});
                }
                models.Artisan.findOne({
                    where : {
                        email : req.body.email
                    }
                })
                .then(function(artisansFound){
                    if(!artisansFound){
                        console.log(req.body);
                        models.Artisan.create({
                            companieName: req.body.companieName,
                            contact : req.body.contact,
                            phone : req.body.phone,
                            email: req.body.email,
                            person: req.body.person,
                            ville: req.body.town,
                            pays: req.body.contry,
                            postalCode: req.body.postalCode,
                            description: req.body.description,
                            price: req.body.price,
                            taille : req.body.taille,
                            activate: true,
                            picture: `${req.protocol}://${req.get("host")}/images/${req.files[0].filename}`
                        })
                    } else {
                        return res.status(409).json({'error': `ce artisans existe déjà`});
                    }
                })
            } else {
                throw error(invalid)
            }
        } catch(error) {
            res.status(400).json({message: error.message})
        }
    },

    getAllArtisanss: function(req, res){
        let fields  = req.query.fields;
        let order   = req.query.order;
        models.Artisan.findAll({
            order: [(order != null) ? order.split(':') : ['id']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        }).then(function (artisans){
            if(artisans){
                return res.status(200).json(artisans)
            } else {
                res.status(404).json({error : 'aucun artisans trouvé'})
            }
        }).catch(function(err){
            res.status(500).json({message: err.message})
        })
    },

    getOneArtisans: function(req,res){
        const headerAuth = req.headers["authorization"];
        const userId = jwtUtils.getUserId(headerAuth);
        if(userId <= 0){
            return res.status(400).json({'error': `vous n'êtes pas identifié`});
        }
        models.Artisan.findOne({
            id : req.params.id
        })
        .then(function(artisans){
            if(artisans){
                return res.status(200).json(artisans)
            }else{
                return res.status(404)({error : 'aucun artisans trouvé'})
            }
        }).catch(function(err){
            res.status(500).json({message: err.message})
        })
    },

    modifyArtisans: async function(req,res){
        try{
            const valid = await modifyArtisansSchema.validateAsync(req.body);
            if (valid) {
                const headerAuth = req.headers["authorization"];
        const userId = jwtUtils.getUserId(headerAuth);
        if(userId <= 0){
            return res.status(400).json({'error': `vous n'êtes pas identifié`});
        }
        models.Artisan.findOne({
            where :{
               id : req.body.id 
            }
            
        })
        .then(function(artisans){
            console.log(artisans);
            if(artisans){
                if(req.files){
                    const filename = artisans.picture.split('/images/')[1];
                    fs.unlink(`images/${filename}`, (err)=> {
                        if(err){
                            return console.log(err);
                        }
                        else {
                            console.log("image supprimée !");
                          }
                    })
                }
                artisans.update({
                    companieName: req.body.companieName ? req.body.companieName : companieName,
                    contact : req.body.contact ? req.body.contact : contact ,
                    phone : req.body.phone ? req.body.phone : phone,
                    email: req.body.email ? req.body.email : email,
                    person: req.body.person ? req.body.person : person,
                    ville: req.body.ville ? req.body.ville : ville,
                    pays: req.body.pays ? req.body.pays : pays, 
                    postalCode: req.body.postalCode ? req.body.postalCode : postalCode,
                    description: req.body.description ? req.body.description : description,
                    price: req.body.price ? req.body.price : price,
                    taille: req.body.taille ? req.body.taille : taille,
                    activate: req.body.activate ? req.body.activate : activate,
                    picture: `${req.protocol}://${req.get("host")}/images/${req.files[0].filename}` ? `${req.protocol}://${req.get("host")}/images/${req.files[0].filename}` : picture
                })
                .then(function(artisans){
                    return res.status(201).json(artisans)
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

    deleteArtisans : function(req,res){
        const headerAuth = req.headers["authorization"];
        const userId = jwtUtils.getUserId(headerAuth);
        if(userId <= 0){
            return res.status(400).json({'error': `vous n'êtes pas identifié`});
        }
        models.Artisan.findOne({
            id : req.params.id
        })
        .then(function(artisans){
            const filename = artisans.picture.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                models.Artisan.destroy({
                    where : {
                        id : req.params.id
                    }
                }).then(function(){
                    res.status(201).json(({ok: "artisans supprimée"}))
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