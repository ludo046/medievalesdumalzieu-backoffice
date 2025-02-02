const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const {invalid} = require('joi');
const loginSchema = require('../utils/joi/loginSchema');
const createUserSchema = require('../utils/joi/createUser');
const createPassworsSchema = require('../utils/joi/createPassword')
const nodemailer = require('nodemailer')
require ('dotenv').config()
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

module.exports = {
    login: async function(req, res) {
        try{
            const valid = await loginSchema.validateAsync(req.body);
            if(valid){
                const mail = req.body.email;
                const password = req.body.password;

                if(mail == null || password == null){
                    return res.status(400).json({message : '⚠️ Tous les champs ne sont pas remplis'});
                }
                models.User.findOne({
                    where: {email: mail}
                })
                .then(function(userFound){
                    if(userFound){
                        bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
                            if(userFound.activate === false){
                                return res.status(400).json({message: `⚠️ Ton compte n'est pas activé`})
                            } else if(resBycrypt){

                                return res.status(200).json({
                                    'userId' : userFound.id,
                                    'role' : userFound.role,
                                    'name': userFound.lastName,
                                    'firstname':userFound.firstName,
                                    'commission': userFound.commission,
                                    'isAdmin': userFound.isAdmin,
                                    'token' : jwtUtils.generateTokenForUser(userFound)
                                })
                            } else {
                                return res.status(403).json({message : '⚠️ Mot de passe incorrect'});
                            }
                        })
                    } else {
                        //return res.status(404).json({message: '⚠️ Adresse email incorrect'})                        
                    }
                })
                // .catch(function(err){
                //     return res.status(500).json({message : `⚠️ Adresse email incorrect`})
                // })
            } else {
                throw error(invalid)
            }
        }catch(error){
            
            res.status(400).json({message: error.message})
        }
    },

    createUser: async function(req, res){
        console.log(req.body);
        try{
            const valid = await createUserSchema.validateAsync(req.body)
            if(valid){
                models.User.findOne({
                    where : {email : req.body.email}
                })
                .then(function(userFound){
                    if(!userFound){
                        let code = JSON.stringify(Math.floor((Math.random() * 100000000) + 1));
                        console.log(code);
                            models.User.create({
                                firstName : req.body.firstname,
                                lastName : req.body.lastname,
                                email : req.body.email,
                                phone : req.body.phone,
                                isAdmin : true,
                                code: code
                            })
                            
                            let transport = nodemailer.createTransport({
                                service: 'gmail',
                                host: 'smtp.gmail.com',
                                port: 587,
                                secure: true,
                                auth: {
                                    user : 'moissinac.ludovic@gmail.com',
                                    pass: 'xbbf fctk vkjt pqcj'
                                }
                            });

                            const mailOptions = {
                                from: 'moissinac.ludovic@gmail.com',
                                to: req.body.email,
                                subject : 'créer votre mot de passe',
                                text : 'pour créer votre mot de passe rdv sur http://localhost:4200/createpassword avec votre code' + code 
                            }

                            transport.sendMail(mailOptions, function(error, info){
                                if (error) {
                               console.log(error);
                                } else {
                                  console.log('Email sent: ' + info.response);
                                  // do something useful
                                }
                              });
                    } else {
                        return res.status(301).json({message: '⚠️ Utilisateur déjà enregistré'})
                    }
                })
            }
        } catch(error){
            res.status(400).json({message: error.message})
        }
    },

    createPassword : async function(req,res){
        try{
        const valid = await createPassworsSchema.validateAsync(req.body)
        console.log(req.body);
        if(valid){
            models.User.findOne({
                where:{
                    email : req.body.email,
                    code : req.body.code
                }
            })
            .then(function(userFound){
                bcrypt.hash(req.body.password, 10, function(err, bcryptedPassword){
                    userFound.update({
                        password: (bcryptedPassword ? bcryptedPassword : userFound.password) 
                     })
                })
                return res.status(202).json({message : 'mot de passe créé avec succès'})
            })
        } else {
            return res.status(304).json({message : 'email ou code incorrect'})
        }
        }catch(error){
            res.status(400).json({message: error.message})
        }
    },

    getAllUser : function(req, res){
        const headerAuth = req.headers["authorization"];
        const userId = jwtUtils.getUserId(headerAuth);
        if(userId <= 0){
            return res.status(400).json({'error': `vous n'êtes pas identifié`});
        }
        let fields  = req.query.fields;
        let order   = req.query.order;
        models.User.findAll({
            order: [(order != null) ? order.split(':') : ['id']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        }).then(function (users){
            if(users){
                return res.status(200).json(users)
            } else {
                res.status(404).json({error : 'aucun utilisateur trouvé'})
            }
        }).catch(function(err){
            res.status(500).json({message: err.message})
        })
    }
}