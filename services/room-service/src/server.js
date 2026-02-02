require('dotenv').config();
require('./config/database'); 

const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log('Room service started');
});
