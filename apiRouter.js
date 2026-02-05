const express = require('express');
const multer = require('./utils/multer-config');
const permission = require('./utils/permission'); // middleware par section

const userCtrl = require('./routes/userCtrl');
const troupeCtrl = require('./routes/troupeCtrl');
const campementCtrl = require('./routes/campementCtrl');
const artisansCtrl = require('./routes/artisansCtrl');
const partenaireCtrl = require('./routes/partenaire.Ctrl');
const animationCtrl = require('./routes/animationCtrl');
const archiveCtrl = require('./routes/archivesCtrl');

exports.router = (function(){ 
  const apiRouter = express.Router();

  // ====== USERS ======
  apiRouter.route('/users/login/').post(userCtrl.login);
  apiRouter.route('/users/register/').post(userCtrl.createUser);
  apiRouter.route('/users/register/createPassword/').put(userCtrl.createPassword);
  apiRouter.route('/users/get/').get(userCtrl.getAllUser);
  apiRouter.route('/users/permissions/:id/')
    .put(userCtrl.updateUserPermissions);

  // ====== TROUPES ======
  // GET publics → SANS middleware
  apiRouter.route('/programme/troupe/get/').get(troupeCtrl.getAllTroupes);
  apiRouter.route('/programme/troupe/get/:id').get(troupeCtrl.getOneTroupe);

  // actions protégées → AVEC middleware "troupe"
  apiRouter.route('/programme/troupe/add/')
    .post(multer, permission('troupe'), troupeCtrl.createTroupe);

  apiRouter.route('/programme/troupe/modify/:id')
    .put(multer, permission('troupe'), troupeCtrl.modifyTroupe);

  apiRouter.route('/programme/troupe/delete/:id')
    .delete(permission('troupe'), troupeCtrl.deleteTroupe);

  // ====== CAMPEMENTS ======
  apiRouter.route('/programme/campement/get/').get(campementCtrl.getAllCampements);
  apiRouter.route('/programme/campement/get/:id').get(campementCtrl.getOneCampement);

  apiRouter.route('/programme/campement/add/')
    .post(multer, permission('campement'), campementCtrl.createCampement);

  apiRouter.route('/programme/campement/modify/:id')
    .put(multer, permission('campement'), campementCtrl.modifyCampement);

  apiRouter.route('/programme/campement/delete/:id')
    .delete(permission('campement'), campementCtrl.deleteCampement);

  // ====== ARTISANS ======
  apiRouter.route('/programme/artisans/get/').get(artisansCtrl.getAllArtisanss);
  apiRouter.route('/programme/artisans/get/:id').get(artisansCtrl.getOneArtisans);

  apiRouter.route('/programme/artisans/add/')
    .post(multer, permission('artisan'), artisansCtrl.createArtisans);

  apiRouter.route('/programme/artisans/modify/:id')
    .put(multer, permission('artisan'), artisansCtrl.modifyArtisans);

  apiRouter.route('/programme/artisans/delete/:id')
    .delete(permission('artisan'), artisansCtrl.deleteArtisans);

  // ====== PARTENAIRES ======
  apiRouter.route('/partenaire/get/').get(partenaireCtrl.getAllPartenaires);
  apiRouter.route('/partenaire/get/:id').get(partenaireCtrl.getOnePartenaire);

  apiRouter.route('/partenaire/add/')
    .post(multer, permission('partenaire'), partenaireCtrl.createPartenaire);

  apiRouter.route('/partenaire/modify/:id')
    .put(multer, permission('partenaire'), partenaireCtrl.modifyPartenaire);

  apiRouter.route('/partenaire/delete/:id')
    .delete(permission('partenaire'), partenaireCtrl.deletePartenaire);

  // ====== ANIMATIONS ======
  apiRouter.route('/programme/animation/get/').get(animationCtrl.getAllAnimations);
  apiRouter.route('/programme/animation/get/:id').get(animationCtrl.getOneAnimation);

  apiRouter.route('/programme/animation/add/')
    .post(multer, permission('animation'), animationCtrl.createAnimation);

  apiRouter.route('/programme/animation/modify/:id')
    .put(multer, permission('animation'), animationCtrl.modifyAnimation);

  apiRouter.route('/programme/animation/delete/:id')
    .delete(permission('animation'), animationCtrl.deleteAnimation);

  // ====== ARCHIVES ======
  // les archives peuvent être publiques en lecture
  apiRouter.route('/archive/get/').get(archiveCtrl.getAllArchives);
  apiRouter.route('/archive/get/:id').get(archiveCtrl.getOneArchive);

  apiRouter.route('/archive/add/')
    .post(multer, permission('admin'), archiveCtrl.createArchive);

  apiRouter.route('/archive/modify/:id')
    .put(multer, permission('admin'), archiveCtrl.modifyArchive);

  apiRouter.route('/archive/delete/:id')
    .delete(permission('admin'), archiveCtrl.deleteArchive);

  return apiRouter;
})();
