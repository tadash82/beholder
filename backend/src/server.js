const database = require('./db');
const app = require('./app');
const settingsRepository = require('./repositories/settingsRepository');
const appEm = require('./app-em');

settingsRepository.getDefaulSettings()
  .then(settings => {
    appEm(settings);

    app.listen(process.env.PORTA, () => {
      console.log('App is running in 3001');
    });
    
  })
  .catch(err => {
    console.error(err);
  })

