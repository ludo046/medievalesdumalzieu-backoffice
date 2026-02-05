const jwtUtils = require('./jwt.utils');
const models = require('../models');

function permission(requiredFlag, options = {}) {
  const { adminOnly = false } = options;

  return async (req, res, next) => {
    try {
      const headerAuth = req.headers['authorization'];
      const userId = jwtUtils.getUserId(headerAuth);

      if (!userId || userId <= 0) {
        return res.status(401).json({ error: "Non authentifié" });
      }

      const user = await models.User.findByPk(userId);

      if (!user) {
        return res.status(401).json({ error: "Utilisateur introuvable" });
      }

      req.user = user;

      // Lecture : tout user connecté a le droit
      if (
        req.method === 'GET' ||
        req.method === 'HEAD' ||
        req.method === 'OPTIONS'
      ) {
        return next();
      }

      // Écriture : POST / PUT / PATCH / DELETE

      // Admin : full accès
      if (user.isAdmin) {
        return next();
      }

      // Admin-only explicite
      if (adminOnly) {
        return res.status(403).json({
          error: "Accès réservé à l'administrateur",
        });
      }

      // Si on cible un flag précis (troupe, campement, artisan, etc.)
      if (requiredFlag) {
        if (typeof user[requiredFlag] === 'undefined') {
          console.error(`Permission "${requiredFlag}" inexistante sur User`);
          return res.status(500).json({
            error: `Permission "${requiredFlag}" non configurée sur l'utilisateur`,
          });
        }

        if (!user[requiredFlag]) {
          return res.status(403).json({
            error: `Accès refusé : vous n'avez pas les droits pour modifier "${requiredFlag}"`,
          });
        }
      }

      return next();
    } catch (err) {
      console.error("Erreur permission middleware:", err);
      return res.status(500).json({ error: "Erreur serveur (permissions)" });
    }
  };
}

module.exports = permission;
