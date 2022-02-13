const settingsRepository = require('../repositories/settingsRepository');

async function getSettings(req, res, next) {
  const id = res.locals.token.id;
  // console.log(id)
  const settings = await settingsRepository.getSettings(id)
  console.log(settings)
  res.json(settings);
}

module.exports = { getSettings };