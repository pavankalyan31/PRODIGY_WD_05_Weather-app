require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000

app.use(cors());

app.get('/weather', async (req, res) => {
  const { lat, lon, q } = req.query;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY; // Use API key from environment variables
  let url = 'https://api.openweathermap.org/data/2.5/weather';

  if (lat && lon) {
    url = `${url}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  } else if (q) {
    url = `${url}?q=${q}&appid=${apiKey}&units=metric`;
  }

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
