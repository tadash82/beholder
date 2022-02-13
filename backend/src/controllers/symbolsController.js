const settingsRepository = require('../repositories/settingsRepository');

async function getSymbols(req, res, next) {
  res.sendStatus(200);
}

async function updateSymbol(req, res, next) {
  res.sendStatus(200);
}

async function getSymbol(req, res, next) {
  res.sendStatus(200);
}

async function syncSymbol(req, res, next) {
  res.sendStatus(200);
}

module.exports = {
  getSymbols,
  updateSymbol,
  getSymbol,
  syncSymbol
  };
