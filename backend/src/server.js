const database = require('./db');
const app = require('./app');
const settingsRepository = require('./repositories/settingsRepository');
const appEm = require('./app-em');
const appWs = require('./app-ws');

settingsRepository.getDefaulSettings()
  .then(settings => {
     const server = app.listen(process.env.PORTA, () => {
      console.log('App is running in 3001');
    });
    const wss = appWs(server);
    console.log(wss)
    appEm(settings, wss);
  })
  .catch(err => {
    console.error(err);
  })

