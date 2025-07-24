
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Allow only Netlify frontend
const corsOptions = {
  origin: 'https://moonlit-alpaca-07650f.netlify.app',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Send WhatsApp Message using Wasage OTP API
app.post('/send-message', async (req, res) => {
  const { phone, message } = req.body;

  const payload = new URLSearchParams({
    Username: process.env.WASAGE_USERNAME,
    Password: process.env.WASAGE_PASSWORD,
    Reference: phone,
    Message: message
  });

  try {
    const response = await axios.post(
      'https://wasage.com/api/otp/?',
      payload.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
