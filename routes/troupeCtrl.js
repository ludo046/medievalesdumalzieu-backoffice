const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const {invalid} = require('joi');
const fs = require('fs');
const createTroupeSchema =  require("../utils/joi/createTroupe");
const modifyTroupeSchema =  require("../utils/joi/modifyTroupe");

module.exports = {

    createTroupe : async function(req, res){
        try{
            const valid = await createTroupeSchema.validateAsync(req.body)
            if(valid){
                console.log(req.body);
                const headerAuth = req.headers["authorization"];
                const userId = jwtUtils.getUserId(headerAuth);
                if(userId <= 0){
                    return res.status(400).json({'error': `vous n'êtes pas identifié`});
                }
                models.Troupe.findOne({
                    where : {
                        email : req.body.email
                    }
                })
                .then(function(troupeFound){
                    if(!troupeFound){
                        models.Troupe.create({
                            companieName: req.body.name,
                            contact : req.body.contact,
                            phone : req.body.phone,
                            email: req.body.email,
                            person: req.body.person,
                            ville: req.body.town,
                            pays: req.body.contry,
                            postalCode: req.body.postalCode,
                            description: req.body.description,
                            price: req.body.price,
                            activate: true,
                            picture: `${req.protocol}://${req.get("host")}/images/${req.files[0].filename}`
                        })
                    } else {
                         return res.status(409).json(troupeFound);
                    }
                })
            } else {
                throw error(invalid)
            }
        } catch(error) {
            res.status(400).json({message: error.message})
        }
    },

    getAllTroupes: function(req, res){
        let fields  = req.query.fields;
        let order   = req.query.order;
        models.Troupe.findAll({
            order: [(order != null) ? order.split(':') : ['id']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        }).then(function (troupe){
            if(troupe){
                return res.status(200).json(troupe)
            } else {
                res.status(404).json({error : 'aucune troupe trouvé'})
            }
        }).catch(function(err){
            res.status(500).json({message: err.message})
        })
    },

    getOneTroupe: function(req,res){
        const headerAuth = req.headers["authorization"];
        const userId = jwtUtils.getUserId(headerAuth);
        if(userId <= 0){
            return res.status(400).json({'error': `vous n'êtes pas identifié`});
        }
        models.Troupe.findOne({
            where:{
               id : req.params.id 
            }
            
        })
        .then(function(troupe){
            if(troupe){
                return res.status(200).json(troupe)
            }else{
                return res.status(404)({error : 'aucune troupe trouvé'})
            }
        }).catch(function(err){
            res.status(500).json({message: err.message})
        })
    },

    modifyTroupe: async function(req,res){
        try{
            const valid = await modifyTroupeSchema.validateAsync(req.body);
            if (valid) {
                const headerAuth = req.headers["authorization"];
        const userId = jwtUtils.getUserId(headerAuth);
        if(userId <= 0){
            return res.status(400).json({'error': `vous n'êtes pas identifié`});
        }
        models.Troupe.findOne({
            where :{
               id : req.body.id 
            }
            
        })
        .then(function(troupe){
            console.log(troupe);
            if(troupe){
                if(req.files){
                    const filename = troupe.picture.split('/images/')[1];
                    fs.unlink(`images/${filename}`, (err)=> {
                        if(err){
                            return console.log(err);
                        }
                        else {
                            console.log("image supprimée !");
                          }
                    })
                }
                troupe.update({
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
                    activate: req.body.activate ? req.body.activate : activate,
                    picture: `${req.protocol}://${req.get("host")}/images/${req.files[0].filename}` ? `${req.protocol}://${req.get("host")}/images/${req.files[0].filename}` : picture
                })
                .then(function(troupe){
                    return res.status(201).json(troupe)
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

    deleteTroupe : function(req,res){
        const headerAuth = req.headers["authorization"];
        const userId = jwtUtils.getUserId(headerAuth);
        if(userId <= 0){
            return res.status(400).json({'error': `vous n'êtes pas identifié`});
        }
        models.Troupe.findOne({
            id : req.params.id
        })
        .then(function(troupe){
            const filename = troupe.picture.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                models.Troupe.destroy({
                    where : {
                        id : req.params.id
                    }
                }).then(function(){
                    res.status(201).json(({ok: "troupe supprimée"}))
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