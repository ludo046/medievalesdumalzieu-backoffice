const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const {invalid} = require('joi');
const fs = require('fs');
const createArchiveSchema =  require("../utils/joi/createArchive");
const modifyArchiveSchema =  require("../utils/joi/modifyArchive");
module.exports = {

    createArchive : async function(req, res){
        try{
            const valid = await createArchiveSchema.validateAsync(req.body)
            if(valid){
                console.log(req.body);
                const headerAuth = req.headers["authorization"];
                const userId = jwtUtils.getUserId(headerAuth);
                if(userId <= 0){
                    return res.status(400).json({'error': `vous n'êtes pas identifié`});
                }
                        models.Archive.create({
                            picture: `${req.protocol}://${req.get("host")}/images/${req.files[0].filename}`,
                            years : req.body.years,
                            teaser : req.body.teaser
                        })
            } else {
                throw error(invalid)
            }
        } catch(error) {
            res.status(400).json({message: error.message})
        }
    },

    getAllArchives: function(req, res){
        let fields  = req.query.fields;
        let order   = req.query.order;
        models.Archive.findAll({
            order: [(order != null) ? order.split(':') : ['id']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        }).then(function (archive){
            if(archive){
                return res.status(200).json(archive)
            } else {
                res.status(404).json({error : 'aucune archive trouvé'})
            }
        }).catch(function(err){
            res.status(500).json({message: err.message})
        })
    },

    getOneArchive: function(req,res){
        const headerAuth = req.headers["authorization"];
        const userId = jwtUtils.getUserId(headerAuth);
        if(userId <= 0){
            return res.status(400).json({'error': `vous n'êtes pas identifié`});
        }
        models.Archive.findOne({
            id : req.params.id
        })
        .then(function(archive){
            if(archive){
                return res.status(200).json(archive)
            }else{
                return res.status(404)({error : 'aucune archive trouvé'})
            }
        }).catch(function(err){
            res.status(500).json({message: err.message})
        })
    },

    modifyArchive: async function(req,res){
        try{
            const valid = await modifyArchiveSchema.validateAsync(req.body);
            if (valid) {
                const headerAuth = req.headers["authorization"];
        const userId = jwtUtils.getUserId(headerAuth);
        if(userId <= 0){
            return res.status(400).json({'error': `vous n'êtes pas identifié`});
        }
        models.Archive.findOne({
            where :{
               id : req.body.id 
            }
            
        })
        .then(function(archive){
            console.log(archive);
            if(archive){
                if(req.files){
                    const filename = archive.picture.split('/images/')[1];
                    fs.unlink(`images/${filename}`, (err)=> {
                        if(err){
                            return console.log(err);
                        }
                        else {
                            console.log("image supprimée !");
                          }
                    })
                }
                archive.update({
                    picture: `${req.protocol}://${req.get("host")}/images/${req.files[0].filename}` ? `${req.protocol}://${req.get("host")}/images/${req.files[0].filename}` : picture,
                    years: req.body.years ? req.body.years : years,
                    teaser: req.body.teaser ? req.body.teaser : teaser
                })
                .then(function(archive){
                    return res.status(201).json(archive)
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

    deleteArchive : function(req,res){
        const headerAuth = req.headers["authorization"];
        const userId = jwtUtils.getUserId(headerAuth);
        if(userId <= 0){
            return res.status(400).json({'error': `vous n'êtes pas identifié`});
        }
        models.Archive.findOne({
            id : req.params.id
        })
        .then(function(archive){
            const filename = archive.picture.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                models.Archive.destroy({
                    where : {
                        id : req.params.id
                    }
                }).then(function(){
                    res.status(201).json(({ok: "archive supprimée"}))
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