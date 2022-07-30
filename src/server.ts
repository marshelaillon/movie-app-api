import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const cors = require('cors');
const morgan = require('morgan');
const corsOptions = require('./config/corsOptions');
const routes = require('./routes');
const db = require('./config/db');
const app = express();
require('./models');

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

// Routes
app.use('/api', routes);

// Start server
(async () => {
  try {
    await db.sync({ force: false });
    app.listen(process.env.PORT, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
  } catch (e) {
    console.log('Unable to connect to the database', (e as Error).message);
  }
})();
