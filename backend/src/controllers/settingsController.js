const settingsRepository = require('../repositories/settingsRepository');

async function getSettings(req, res, next) {
  const id = res.locals.token.id;
  // console.log(id)
  const settings = await settingsRepository.getSettings(id)
  // console.log(settings)
  res.json(settings);
}

async function updateSettings(req, res, next) {
  const id = res.locals.token.id;
  const newSettings = req.body;
  settingsRepository.updeteSettings(id, newSettings);
  res.sendStatus(200);
}

module.exports = {
   getSettings,
   updateSettings
  };