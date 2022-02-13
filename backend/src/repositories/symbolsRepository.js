const symbolModel = require('../models/symbolModel');

function getSymbols() {
  return symbolModel.findAll();
}

function getSymbol(symbol) {
  return symbolModel.findOne({ where: { symbol } });
}

async function updateSymbol(symbol, newSymbol) {
  const currentSymbol = await getSettings(symbol);

  if(newSymbol.basePrecision !== currentSymbol.basePrecision) {
    currentSymbol.basePrecision = newSymbol.basePrecision;
  }
  if(newSymbol.quotePrecision !== currentSymbol.quotePrecision) {
    currentSymbol.quotePrecision = newSymbol.quotePrecision;
  }
  if(newSymbol.minNotional !== currentSymbol.minNotional) {
    currentSymbol.minNotional = newSymbol.minNotional;
  }
  if(newSymbol.minLotSize !== currentSymbol.minLotSize) {
    currentSymbol.minLotSize = newSymbol.minLotSize;
  }
  if(newSymbol.isFavorite !== currentSymbol.isFavorite) {
    currentSymbol.isFavorite = newSymbol.isFavorite;
  }
  
  await currentSymbol.save();
}

async function syncSymbols(symbols) {

}

module.exports = { 
  getSymbols,
  getSymbol,
  updateSymbol
}