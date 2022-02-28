const crypto = require("./utils/crypto");
const WebSocket = require("ws");

module.exports = (settings, wss) => {
  if (!settings)
    throw new Error(`Can't start Exchange Monitor without settings.`);

  settings.secretKey = crypto.decrypt(settings.secretKey);
  const exchange = require("./utils/exchange")(settings);

  function broadcast(jsonObject) {
    if (!wss || !wss.clients) return;
    // console.log(wss.clients)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(jsonObject));
      }
    });
  }

  let book = [];
  exchange.bookStream((order) => {
    //console.log(markets);
    if (book.length === 200) {
      broadcast({ book });
      book = [];
    } else book.push({ ...order });
  });

  exchange.miniTickerStream((markets) => {
    //console.log(markets);
    broadcast({ miniTicker: markets });
  });
  console.log(`App Exchange Monitor is running!!`);
};
