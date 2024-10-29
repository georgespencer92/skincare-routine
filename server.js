require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Update CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  methods: 'GET,POST',
  credentials: true
}));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log('OpenAI client initialized successfully');

app.post('/api/generate-routine', async (req, res) => {
  const { gender, currentRoutine, budget, skinType, concerns, sensitivity, climate, sunExposure, age } = req.body;

  const prompt = `
    Based on the following skin profile:
    - Gender: ${gender}
    - Current Skincare Routine: ${currentRoutine}
    - Budget: ${budget}
    - Skin Type: ${skinType}
    - Main Concerns: ${concerns}
    - Sensitivity: ${sensitivity}
    - Climate: ${climate}
    - Sun Exposure: ${sunExposure}
    - Age Range: ${age}

    Please recommend a personalized skincare routine including suitable products, their ingredients, and how often they should be used. Consider the user's current routine level and budget when making recommendations.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful skincare expert assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const routine = response.choices[0].message.content.trim();
    res.status(200).json({ routine });
  } catch (error) {
    console.error('Error generating routine:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate skincare routine' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});