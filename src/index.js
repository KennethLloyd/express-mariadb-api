import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import initDB from './db/initialize.js';
import initRouters from './routers/index.js';

const app = express();
const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // allows us to parse the request as json
app.use(cors());
app.use('/apidoc', express.static(path.join(__dirname, '../docs')));

(async () => {
  try {
    initRouters(app);
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
