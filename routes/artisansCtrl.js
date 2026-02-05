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
                            picture: `//${req.get("host")}/images/${req.files[0].filename}`
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
            where:{
                id : req.params.id
            }
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

    // modifyArtisans: async function(req,res){
    //     try{
    //         const valid = await modifyArtisansSchema.validateAsync(req.body);
    //         if (valid) {
    //             const headerAuth = req.headers["authorization"];
    //     const userId = jwtUtils.getUserId(headerAuth);
    //     if(userId <= 0){
    //         return res.status(400).json({'error': `vous n'êtes pas identifié`});
    //     }
    //     models.Artisan.findOne({
    //         where :{
    //            id : req.body.id 
    //         }
            
<<<<<<< HEAD
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
                    picture: `//${req.get("host")}/images/${req.files[0].filename}` ? `//${req.get("host")}/images/${req.files[0].filename}` : picture
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
=======
    //     })
    //     .then(function(artisans){
    //         console.log(artisans);
    //         if(artisans){
    //             if(req.files){
    //                 const filename = artisans.picture.split('/images/')[1];
    //                 fs.unlink(`images/${filename}`, (err)=> {
    //                     if(err){
    //                         return console.log(err);
    //                     }
    //                     else {
    //                         console.log("image supprimée !");
    //                       }
    //                 })
    //             }
    //             artisans.update({
    //                 companieName: req.body.companieName ? req.body.companieName : companieName,
    //                 contact : req.body.contact ? req.body.contact : contact ,
    //                 phone : req.body.phone ? req.body.phone : phone,
    //                 email: req.body.email ? req.body.email : email,
    //                 person: req.body.person ? req.body.person : person,
    //                 ville: req.body.ville ? req.body.ville : ville,
    //                 pays: req.body.pays ? req.body.pays : pays, 
    //                 postalCode: req.body.postalCode ? req.body.postalCode : postalCode,
    //                 description: req.body.description ? req.body.description : description,
    //                 price: req.body.price ? req.body.price : price,
    //                 taille: req.body.taille ? req.body.taille : taille,
    //                 activate: req.body.activate ? req.body.activate : activate,
    //                 picture: `//${req.get("host")}/images/${req.files[0].filename}` ? `//${req.get("host")}/images/${req.files[0].filename}` : picture
    //             })
    //             .then(function(artisans){
    //                 return res.status(201).json(artisans)
    //               })
    //               .catch(function(err){
    //                 res.status(500).json({err});
    //               })
    //         }
    //     }).catch(function(err){
    //         res.status(500).json({message: err.message + 'coucou2'})
    //     })
    //         }else {
    //             throw error(invalid)
    //         }
    //     }catch(error) {
    //         res.status(400).json({message: error.message + 'coucou'})
    //     }
>>>>>>> a26d0b3 (fix modify with user flag)
        
    // },

modifyArtisans: async function (req, res) {
  try {
    // Validation Joi
    const data = await modifyArtisansSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    // Auth
    const headerAuth = req.headers["authorization"];
    const userId = jwtUtils.getUserId(headerAuth);
    if (userId <= 0) {
      return res.status(400).json({ error: `vous n'êtes pas identifié` });
    }

    // Récupération artisan
    const artisans = await models.Artisan.findOne({
      where: { id: data.id },
    });

    if (!artisans) {
      return res.status(404).json({ error: "Artisan introuvable" });
    }

    // Gestion image
    let picture = artisans.picture;
    const file = req.file || (req.files && req.files[0]);

    if (file) {
      // supprimer l’ancienne image si elle existe
      if (artisans.picture) {
        const filename = artisans.picture.split("/images/")[1];
        if (filename) {
          fs.unlink(`images/${filename}`, (err) => {
            if (err) {
              console.log("Erreur suppression ancienne image artisan :", err);
            } else {
              console.log("Ancienne image artisan supprimée !");
            }
          });
        }
      }

      picture = `//${req.get("host")}/images/${file.filename}`;
    }

    // Mise à jour : si pas envoyé -> on garde la valeur BDD
    await artisans.update({
      companieName: data.companieName ?? artisans.companieName,
      contact: data.contact ?? artisans.contact,
      phone: data.phone ?? artisans.phone,
      email: data.email ?? artisans.email,
      person: data.person ?? artisans.person,
      ville: data.ville ?? artisans.ville,
      pays: data.pays ?? artisans.pays,
      postalCode: data.postalCode ?? artisans.postalCode,
      description: data.description ?? artisans.description,
      price: data.price ?? artisans.price,
      taille: data.taille ?? artisans.taille,
      activate:
        typeof data.activate !== "undefined" ? data.activate : artisans.activate,
      picture,
    });

    return res.status(200).json(artisans);
  } catch (error) {
    console.error(error);

    if (error.isJoi) {
      return res.status(400).json({ message: error.message + " coucou" });
    }

    return res
      .status(500)
      .json({ message: (error && error.message) || "Erreur serveur coucou" });
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