const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const initDB = require('./db/initialize');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // allows us to parse the request as json
app.use(cors());
app.use('/apidoc', express.static(path.join(__dirname, '../docs')));

require('./routers')(app);

(async () => {
  try {
    await initDB();
    console.log('Connection to database has been established successfully');
  } catch (error) {
    console.error(`Unable to connect to the database: ${error}`);
  }
})();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('See docs at /apidoc');
});
