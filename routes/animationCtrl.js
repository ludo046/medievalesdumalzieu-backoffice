const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const {invalid} = require('joi');
const fs = require('fs');
const createAnimationSchema =  require("../utils/joi/createTroupe");
const modifyAnimationSchema =  require("../utils/joi/modifyTroupe");

module.exports = {

    createAnimation : async function(req, res){
        try{
            const valid = await createAnimationSchema.validateAsync(req.body)
            if(valid){
                console.log(req.body);
                const headerAuth = req.headers["authorization"];
                const userId = jwtUtils.getUserId(headerAuth);
                if(userId <= 0){
                    return res.status(400).json({'error': `vous n'êtes pas identifié`});
                }
                models.Animation.findOne({
                    where:{
                        email : req.body.email
                    }
                })
                .then(function(animationFound){
                    if(!animationFound){
                        models.Animation.create({
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
                        return res.status(409).json({'error': `cette animation existe déjà`});
                    }
                })
            } else {
                throw error(invalid)
            }
        } catch(error) {
            res.status(400).json({message: error.message})
        }
    },

    getAllAnimations: function(req, res){
        let fields  = req.query.fields;
        let order   = req.query.order;
        models.Animation.findAll({
            order: [(order != null) ? order.split(':') : ['id']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        }).then(function (animation){
            if(animation){
                return res.status(200).json(animation)
            } else {
                res.status(404).json({error : 'aucune animation trouvé'})
            }
        }).catch(function(err){
            res.status(500).json({message: err.message})
        })
    },

    getOneAnimation: function(req,res){
        const headerAuth = req.headers["authorization"];
        const userId = jwtUtils.getUserId(headerAuth);
        if(userId <= 0){
            return res.status(400).json({'error': `vous n'êtes pas identifié`});
        }
        models.Animation.findOne({
            where:{
               id : req.params.id 
            }
        })
        .then(function(animation){
            if(animation){
                return res.status(200).json(animation)
            }else{
                return res.status(404)({error : 'aucune animation trouvé'})
            }
        }).catch(function(err){
            res.status(500).json({message: err.message})
        })
    },

    // modifyAnimation: async function(req,res){
    //     try{
    //         const valid = await modifyAnimationSchema.validateAsync(req.body);
    //         if (valid) {
    //             const headerAuth = req.headers["authorization"];
    //     const userId = jwtUtils.getUserId(headerAuth);
    //     if(userId <= 0){
    //         return res.status(400).json({'error': `vous n'êtes pas identifié`});
    //     }
    //     models.Animation.findOne({
    //         where :{
    //            id : req.body.id 
    //         }
            
    //     })
    //     .then(function(animation){
    //         console.log(animation);
    //         if(animation){
    //             if(req.files){
    //                 const filename = animation.picture.split('/images/')[1];
    //                 fs.unlink(`images/${filename}`, (err)=> {
    //                     if(err){
    //                         return console.log(err);
    //                     }
    //                     else {
    //                         console.log("image supprimée !");
    //                       }
    //                 })
    //             }
    //             animation.update({
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
    //                 activate: req.body.activate ? req.body.activate : activate,
    //                 picture: `${req.protocol}://${req.get("host")}/images/${req.files[0].filename}` ? `${req.protocol}://${req.get("host")}/images/${req.files[0].filename}` : picture
    //             })
    //             .then(function(animation){
    //                 return res.status(201).json(animation)
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
        
    // },

    modifyAnimation: async function (req, res) {
  try {
    // 1) Validation Joi
    const data = await modifyAnimationSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    // 2) Auth
    const headerAuth = req.headers["authorization"];
    const userId = jwtUtils.getUserId(headerAuth);
    if (userId <= 0) {
      return res.status(400).json({ error: `vous n'êtes pas identifié` });
    }

    // 3) Récupération de l'animation
    const animation = await models.Animation.findOne({
      where: { id: data.id },
    });

    if (!animation) {
      return res.status(404).json({ error: "Animation introuvable" });
    }

    // 4) Gestion de l'image
    const file = req.file || (req.files && req.files[0]);
    let picture = animation.picture; // on garde l’ancienne par défaut

    if (file) {
      // supprimer l’ancienne image si elle existe
      if (animation.picture) {
        const filename = animation.picture.split("/images/")[1];
        if (filename) {
          fs.unlink(`images/${filename}`, (err) => {
            if (err) {
              console.log("Erreur suppression ancienne image animation :", err);
            } else {
              console.log("Ancienne image animation supprimée !");
            }
          });
        }
      }

      // nouvelle image
      picture = `${req.protocol}://${req.get("host")}/images/${file.filename}`;
    }

    // 5) Mise à jour des champs (on garde la valeur BDD si le champ n’est pas envoyé)
    await animation.update({
      companieName: data.companieName ?? animation.companieName,
      contact: data.contact ?? animation.contact,
      phone: data.phone ?? animation.phone,
      email: data.email ?? animation.email,
      person: data.person ?? animation.person,
      ville: data.ville ?? animation.ville,
      pays: data.pays ?? animation.pays,
      postalCode: data.postalCode ?? animation.postalCode,
      description: data.description ?? animation.description,
      price: data.price ?? animation.price,
      activate:
        typeof data.activate !== "undefined" ? data.activate : animation.activate,
      picture,
    });

    return res.status(200).json(animation);
  } catch (error) {
    console.error(error);

    // erreur de validation Joi
    if (error.isJoi) {
      return res.status(400).json({ message: error.message + "coucou" });
    }

    return res
      .status(500)
      .json({ message: (error && error.message ? error.message : "Erreur serveur") + "coucou2" });
  }
},


    deleteAnimation : function(req,res){
        const headerAuth = req.headers["authorization"];
        const userId = jwtUtils.getUserId(headerAuth);
        if(userId <= 0){
            return res.status(400).json({'error': `vous n'êtes pas identifié`});
        }
        models.Animation.findOne({
            id : req.params.id
        })
        .then(function(animation){
            const filename = animation.picture.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                models.Animation.destroy({
                    where : {
                        id : req.params.id
                    }
                }).then(function(){
                    res.status(201).json(({ok: "animation supprimée"}))
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