const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const Url = require('./models/Url');
const { randomString } = require('./utils/random');
const port = 3000;

app.use(bodyParser.json());

try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('successfuly connected to db');
} catch (error) {
  console.error(error);
}

//Desc: GET ROUTE
// Route: /api/shortit
app.get('/api/shortit', [body('shortURL').isURL()], async (req, res) => {
  // Check if it's a valid URL
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // Get the random string end of the URL
  const randomString = req.body.shortURL.split('/').pop();

  // Try to find the URL
  try {
    const url = await Url.findOne({
      shortURL: randomString,
    });
    res.redirect(url.baseURL);
  } catch (error) {
    return res.status(404).json({
      error: 'not found',
    });
  }
});

// Desc: POST ROUTE
// Route: /api/shortit
app.post('/api/shortit', [body('baseURL').isURL()], async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Example app listening at http://127.0.0.1:${port}`);
});
