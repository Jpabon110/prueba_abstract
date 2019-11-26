'use strict'

const express = require('express')
const app = express();
const cors = require('cors');
const db = require('./config');
const routesTheEvents = require('./routes/theEvent')
const routesTypeGames = require('./routes/typeGame')
const routesPlayer = require('./routes/player')
const corsOptions = {
    origin: process.env.APP_URL_BASE,
    optionsSuccessStatus: 200
  }

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));


db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


//routes
app.use('/events', routesTheEvents);
app.use('/types-game', routesTypeGames);
app.use('/player', routesPlayer);

module.exports = app;