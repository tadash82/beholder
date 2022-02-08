const database = require('./db');
const app = require('./app');

app.listen(process.env.PORTA, () => {
  console.log('App is running in 3001');
});
