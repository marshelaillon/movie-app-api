const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const corsOptions = require('./config/corsOptions');
const dotenv = require('dotenv');
const routes = require('./routes');
const db = require('./config/db');
const app = express();
dotenv.config();

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
  } catch (error) {
    console.log('Unable to connect to the database', error.message);
  }
})();
