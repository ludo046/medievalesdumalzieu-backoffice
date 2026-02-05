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

    // modifyPartenaire: async function(req,res){
    //     try{
    //         const valid = await modifyPartenaireSchema.validateAsync(req.body);
    //         if (valid) {
    //             const headerAuth = req.headers["authorization"];
    //     const userId = jwtUtils.getUserId(headerAuth);
    //     if(userId <= 0){
    //         return res.status(400).json({'error': `vous n'êtes pas identifié`});
    //     }
    //     models.Partenaire.findOne({
    //         where :{
    //            id : req.body.id 
    //         }
            
<<<<<<< HEAD
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
=======
    //     })
    //     .then(function(partenaire){
    //         console.log(partenaire);
    //         if(partenaire){
    //             if(req.files){
    //                 const filename = partenaire.picture.split('/images/')[1];
    //                 fs.unlink(`images/${filename}`, (err)=> {
    //                     if(err){
    //                         return console.log(err);
    //                     }
    //                     else {
    //                         console.log("image supprimée !");
    //                       }
    //                 })
    //             }
    //             partenaire.update({
    //                 partenaireName: req.body.partenaireName ? req.body.partenaireName : partenaireName,
    //                 contact : req.body.contact ? req.body.contact : contact ,
    //                 email: req.body.email ? req.body.email : email,
    //                 phone : req.body.phone ? req.body.phone : phone,
    //                 formule: req.body.formule ? req.body.formule : formule,
    //                 montant: req.body.montant ? req.body.montant : montant,
    //                 adresse: req.body.adresse ? req.body.adresse : adresse, 
    //                 reglement: req.body.reglement ? req.body.reglement : reglement,
    //                 site: req.body.site ? req.body.site : site,
    //                 activate: req.body.activate ? req.body.activate : activate,
    //                 texte: req.body.texte ? req.body.texte : texte,
    //                 picture: `//${req.get("host")}/images/${req.files[0].filename}` ? `//${req.get("host")}/images/${req.files[0].filename}` : picture
    //             })
    //             .then(function(partenaire){
    //                 return res.status(201).json(partenaire)
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

modifyPartenaire: async function (req, res) {
  try {
    // Validation Joi
    const data = await modifyPartenaireSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    // Auth
    const headerAuth = req.headers["authorization"];
    const userId = jwtUtils.getUserId(headerAuth);
    if (userId <= 0) {
      return res.status(400).json({ error: `vous n'êtes pas identifié` });
    }

    // Récupération du partenaire
    const partenaire = await models.Partenaire.findOne({
      where: { id: data.id },
    });

    if (!partenaire) {
      return res.status(404).json({ error: "Partenaire introuvable" });
    }

    // Gestion de l'image
    let picture = partenaire.picture;
    const file = req.file || (req.files && req.files[0]);

    if (file) {
      // supprimer l'ancienne image si elle existe
      if (partenaire.picture) {
        const filename = partenaire.picture.split("/images/")[1];
        if (filename) {
          fs.unlink(`images/${filename}`, (err) => {
            if (err) {
              console.log("Erreur suppression ancienne image :", err);
            } else {
              console.log("Ancienne image partenaire supprimée !");
            }
          });
        }
      }

      picture = `//${req.get("host")}/images/${file.filename}`;
    }

    // Mise à jour des champs
    await partenaire.update({
      partenaireName: data.partenaireName ?? partenaire.partenaireName,
      contact: data.contact ?? partenaire.contact,
      email: data.email ?? partenaire.email,
      phone: data.phone ?? partenaire.phone,
      formule: data.formule ?? partenaire.formule,
      montant: data.montant ?? partenaire.montant,
      adresse: data.adresse ?? partenaire.adresse,
      reglement: data.reglement ?? partenaire.reglement,
      site: data.site ?? partenaire.site,
      texte: data.texte ?? partenaire.texte,
      // attention à false !
      activate:
        typeof data.activate !== "undefined" ? data.activate : partenaire.activate,
      picture,
    });

    return res.status(200).json(partenaire);
  } catch (error) {
    console.error(error);

    // Erreurs Joi
    if (error.isJoi) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: error.message || "Erreur serveur" });
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