require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Send WhatsApp Message
app.post('/send-message', async (req, res) => {
  const { phone, message } = req.body;

  try {
    const response = await axios.post(
      'https://wasage.com/api/send-message',
      {
        phone,
        message
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.WASAGE_SECRET}`
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
