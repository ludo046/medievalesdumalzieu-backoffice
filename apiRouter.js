//imports
const express = require('express');
const multer = require('./utils/multer-config');

const userCtrl = require('./routes/userCtrl');
const troupeCtrl = require('./routes/troupeCtrl');
const campementCtrl = require('./routes/campementCtrl');
const artisansCtrl = require('./routes/artisansCtrl');
const partenaireCtrl = require('./routes/partenaire.Ctrl');
const animationCtrl = require('./routes/animationCtrl');
const archiveCtrl = require('./routes/archivesCtrl');

exports.router = (function(){ 

    const apiRouter = express.Router();

    apiRouter.route('/users/login/').post(userCtrl.login);
    apiRouter.route('/users/register/').post(userCtrl.createUser);
    apiRouter.route('/users/register/createPassword/').put(userCtrl.createPassword);
    apiRouter.route('/users/get/').get(userCtrl.getAllUser);

    apiRouter.route('/programme/troupe/add/').post(multer, troupeCtrl.createTroupe);
    apiRouter.route('/programme/troupe/get/').get(troupeCtrl.getAllTroupes);
    apiRouter.route('/programme/troupe/get/:id').get(troupeCtrl.getOneTroupe);
    apiRouter.route('/programme/troupe/modify/:id').put(multer, troupeCtrl.modifyTroupe);
    apiRouter.route('/programme/troupe/delete/:id').delete(troupeCtrl.deleteTroupe);

    apiRouter.route('/programme/campement/add/').post(multer, campementCtrl.createCampement);
    apiRouter.route('/programme/campement/get/').get(campementCtrl.getAllCampements);
    apiRouter.route('/programme/campement/get/:id').get(campementCtrl.getOneCampement);
    apiRouter.route('/programme/campement/modify/:id').put(multer, campementCtrl.modifyCampement);
    apiRouter.route('/programme/campement/delete/:id').delete(campementCtrl.deleteCampement);

    apiRouter.route('/programme/artisans/add/').post(multer, artisansCtrl.createArtisans);
    apiRouter.route('/programme/artisans/get/').get(artisansCtrl.getAllArtisanss);
    apiRouter.route('/programme/artisans/get/:id').get(artisansCtrl.getOneArtisans);
    apiRouter.route('/programme/artisans/modify/:id').put(multer, artisansCtrl.modifyArtisans);
    apiRouter.route('/programme/artisans/delete/:id').delete(artisansCtrl.deleteArtisans);

    apiRouter.route('/partenaire/add/').post(multer, partenaireCtrl.createPartenaire);
    apiRouter.route('/partenaire/get/').get(partenaireCtrl.getAllPartenaires);
    apiRouter.route('/partenaire/get/:id').get(partenaireCtrl.getOnePartenaire);
    apiRouter.route('/partenaire/modify/:id').put(multer, partenaireCtrl.modifyPartenaire);
    apiRouter.route('/partenaire/delete/:id').delete(partenaireCtrl.deletePartenaire);

    apiRouter.route('/programme/animation/add/').post(multer, animationCtrl.createAnimation);
    apiRouter.route('/programme/animation/get/').get(animationCtrl.getAllAnimations);
    apiRouter.route('/programme/animation/get/:id').get(animationCtrl.getOneAnimation);
    apiRouter.route('/programme/animation/modify/:id').put(multer, animationCtrl.modifyAnimation);
    apiRouter.route('/programme/animation/delete/:id').delete(animationCtrl.deleteAnimation);
    
    apiRouter.route('/archive/add/').post(multer, archiveCtrl.createArchive);
    apiRouter.route('/archive/get/').get(archiveCtrl.getAllArchives);
    apiRouter.route('/archive/get/:id').get(archiveCtrl.getOneArchive);
    apiRouter.route('/archive/modify/:id').put(multer, archiveCtrl.modifyArchive);
    apiRouter.route('/archive/delete/:id').delete(archiveCtrl.deleteArchive);

    return apiRouter
})();
