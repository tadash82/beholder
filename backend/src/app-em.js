const crypto = require('./utils/crypto')

module.exports = (settings) => {

  if(!settings) throw new Error(`Can't start Exchange Monitor without settings.`)

  settings.secretKey = crypto.decrypt(settings.secretKey);
  const exchange = require('./utils/exchange')(settings);

  exchange.miniTickerStream((markets) => {
    // console.log(markets);
  })
}