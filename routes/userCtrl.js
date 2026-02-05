const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const { invalid } = require('joi');
const loginSchema = require('../utils/joi/loginSchema');
const createUserSchema = require('../utils/joi/createUser');
const createPassworsSchema = require('../utils/joi/createPassword');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const permissionSchema = require('../utils/joi/permissionSchema');

// ✅ Convertit proprement true/false venant du front (boolean, string, number)
function toBool(v) {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'number') return v === 1;
  if (typeof v === 'string') {
    const s = v.trim().toLowerCase();
    if (['true', '1', 'on', 'yes'].includes(s)) return true;
    if (['false', '0', 'off', 'no'].includes(s)) return false;
  }
  return undefined; // valeur non interprétable
}

module.exports = {
  login: async function (req, res) {
    try {
      const valid = await loginSchema.validateAsync(req.body);
      if (valid) {
        const mail = req.body.email;
        const password = req.body.password;

        if (mail == null || password == null) {
          return res.status(400).json({ message: '⚠️ Tous les champs ne sont pas remplis' });
        }

        models.User.findOne({
          where: { email: mail }
        })
          .then(function (userFound) {
            if (userFound) {
              bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                if (userFound.activate === false) {
                  return res.status(400).json({ message: `⚠️ Ton compte n'est pas activé` });
                } else if (resBycrypt) {
                  return res.status(200).json({
                    'userId': userFound.id,
                    'name': userFound.lastName,
                    'firstname': userFound.firstName,
                    'isAdmin': userFound.isAdmin,
                    'troupe': userFound.troupe,
                    'campement': userFound.campement,
                    'artisan': userFound.artisan,
                    'animation': userFound.animation,
                    'marche': userFound.marche,
                    'partenaire': userFound.partenaire,
                    'token': jwtUtils.generateTokenForUser(userFound)
                  });
                } else {
                  return res.status(403).json({ message: '⚠️ Mot de passe incorrect' });
                }
              });
            } else {
              //return res.status(404).json({message: '⚠️ Adresse email incorrect'})
            }
          });
      } else {
        throw error(invalid);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  createUser: async function (req, res) {
    console.log(req.body);
    try {
      const valid = await createUserSchema.validateAsync(req.body);
      if (valid) {
        models.User.findOne({
          where: { email: req.body.email }
        })
          .then(function (userFound) {
            if (!userFound) {
              let code = JSON.stringify(Math.floor((Math.random() * 100000000) + 1));
              console.log(code);

              models.User.create({
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                isAdmin: true,
                code: code
              });

              let transport = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: true,
                auth: {
                  user: 'moissinac.ludovic@gmail.com',
                  pass: 'pwkx tzbs tovn devy'
                }
              });

              const mailOptions = {
                from: 'moissinac.ludovic@gmail.com',
                to: req.body.email,
                subject: 'créer votre mot de passe',
                text: 'pour créer votre mot de passe rdv sur https://backoffice.lesmedievalesdumalzieu.org/createpassword avec votre code ' + code
              };

              transport.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            } else {
              return res.status(301).json({ message: '⚠️ Utilisateur déjà enregistré' });
            }
          });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  createPassword: async function (req, res) {
    try {
      const valid = await createPassworsSchema.validateAsync(req.body);
      console.log(req.body);

      if (valid) {
        models.User.findOne({
          where: {
            email: req.body.email,
            code: req.body.code
          }
        })
          .then(function (userFound) {
            bcrypt.hash(req.body.password, 10, function (err, bcryptedPassword) {
              userFound.update({
                password: (bcryptedPassword ? bcryptedPassword : userFound.password)
              });
            });
            return res.status(202).json({ message: 'mot de passe créé avec succès' });
          });
      } else {
        return res.status(304).json({ message: 'email ou code incorrect' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllUser: function (req, res) {
    const headerAuth = req.headers["authorization"];
    const userId = jwtUtils.getUserId(headerAuth);

    if (userId <= 0) {
      return res.status(400).json({ 'error': `vous n'êtes pas identifié` });
    }

    let fields = req.query.fields;
    let order = req.query.order;

    models.User.findAll({
      order: [(order != null) ? order.split(':') : ['id']],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
    })
      .then(function (users) {
        if (users) {
          return res.status(200).json(users);
        } else {
          res.status(404).json({ error: 'aucun utilisateur trouvé' });
        }
      })
      .catch(function (err) {
        res.status(500).json({ message: err.message });
      });
  },

  // ✅ VERSION CORRIGÉE
  updateUserPermissions: async function (req, res) {
    try {
      const userId = parseInt(req.params.id, 10);
      if (isNaN(userId)) {
        return res.status(400).json({ error: 'Id utilisateur invalide' });
      }

      // Debug : voir ce que le front envoie
      console.log('BODY REÇU POUR PERMISSIONS:', req.body);
      console.log('TYPES:', Object.fromEntries(
        Object.entries(req.body).map(([k, v]) => [k, typeof v])
      ));

      // On ne garde que ces flags
      const allowedFlags = [
        'isAdmin',
        'troupe',
        'campement',
        'artisan',
        'animation',
        'marche',
        'partenaire',
      ];

      const payload = {};
      allowedFlags.forEach((flag) => {
        if (Object.prototype.hasOwnProperty.call(req.body, flag)) {
          const b = toBool(req.body[flag]);     // ✅ parse proprement
          if (b !== undefined) payload[flag] = b;
        }
      });

      // Si rien à modifier => message clair
      if (Object.keys(payload).length === 0) {
        return res.status(400).json({
          error: '⚠️ Indiquer au moins un droit à modifier (valeurs attendues: true/false)',
        });
      }

      // On récupère l'utilisateur cible
      const user = await models.User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur introuvable' });
      }

      // Sécurité : ne pas destituer le DERNIER admin
      if (
        Object.prototype.hasOwnProperty.call(payload, 'isAdmin') &&
        payload.isAdmin === false &&
        user.isAdmin === true
      ) {
        const adminCount = await models.User.count({ where: { isAdmin: true } });
        if (adminCount <= 1) {
          return res.status(400).json({
            error: 'Impossible de destituer le dernier administrateur.',
          });
        }
      }

      console.log('FIELDS TO UPDATE:', payload);

      // Mise à jour effective des flags
      await user.update(payload);

      // ✅ Renvoyer un user clean (sans password, etc.)
      const cleanUser = user.toJSON();
      delete cleanUser.password;
      delete cleanUser.code;

      return res.status(200).json({
        message: 'Droits mis à jour avec succès',
        user: cleanUser,
      });
    } catch (error) {
      console.error('updateUserPermissions error:', error);
      return res.status(500).json({
        error: 'Erreur serveur lors de la mise à jour des droits',
      });
    }
  }
};
