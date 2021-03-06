const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { body, param, validationResult } = require('express-validator');
const Url = require('./models/Url');
const { randomString } = require('./utils/random');
const port = 3000;

app.use(bodyParser.json());

app.use(cors());

try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('successfuly connected to db');
} catch (error) {
  console.error(error);
}

// Desc: GET ROUTE
// Route: /api/shortit
app.get(
  '/api/shortit/:shortURL',
  [
    param('shortURL').isAlphanumeric(),
    param('shortURL').isLength({
      min: process.env.RANDOM_CHAR,
      max: process.env.RANDOM_CHAR,
    }),
  ],
  async (req, res) => {
    // Check if the provided value is correct
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Get the random string end of the URL
    const randomString = req.params.shortURL.split('/').pop();

    // Try to find the URL
    try {
      const url = await Url.findOne({
        shortURL: randomString,
      });

      return res.send(url.baseURL);
    } catch (error) {
      return res.status(404).json({
        error: 'not found',
      });
    }
  }
);

// Desc: POST ROUTE
// Route: /api/shortit
app.post(
  '/api/shortit',
  [
    body('baseURL')
      .isURL()
      .custom((value) => {
        // Check wether or not the URL is http or https
        const urlSplit = value.split(':');
        if (urlSplit[0] !== 'https' && urlSplit[0] !== 'http') {
          throw new Error('The URL needs to start by either http or https');
        }

        return true;
      }),
  ],
  async (req, res) => {
    // Check if it's a valid URL
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Check if randomString already exists in the database
    // while shortURL finds and entry in the database it keeps generating a new one
    let urlString = '';
    let shortURL = '';
    do {
      try {
        // Generate a random string for the url
        urlString = randomString(process.env.RANDOM_CHAR);

        shortURL = await Url.findOne({
          shortURL: urlString,
        });
      } catch (error) {
        console.error(error);
      }
    } while (shortURL);

    // Insert to DB
    try {
      const url = new Url({
        baseURL: req.body.baseURL,
        shortURL: urlString,
      });

      await url.save();

      return res.send(process.env.SHORTENER_PATH + url.shortURL);
    } catch (error) {
      res.status(400).json({
        error: error,
      });
      console.error(error);
    }
  }
);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://127.0.0.1:${port}`);
});
