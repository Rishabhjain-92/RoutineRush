import express from 'express';
import protect from '../middleware/auth.js';
import Groq from 'groq-sdk';

const router = express.Router();

// @route   POST /api/ai/suggest
// @desc    Generate routine task suggestions using Groq AI
// @access  Private
router.post('/suggest', protect, async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ message: 'AI service is not configured (missing GROQ_API_KEY)' });
  }

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a highly efficient productivity assistant. The user will give you a goal (e.g., "morning routine", "study for exams"). Your job is to output a JSON array of objects representing tasks. Each object must have exactly two keys: "name" (a short task name, max 4 words) and "time" (an optional suggested time in 24-hour HH:MM format, or empty string). DO NOT output any other text, just the raw JSON array. Example: [{"name": "Wake Up", "time": "06:00"}, {"name": "Drink Water", "time": "06:05"}]',
        },
        {
          role: 'user',
          content: `Goal: ${prompt}`,
        },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 1024,
    });

    let aiText = completion.choices[0]?.message?.content || '[]';
    
    // Attempt to extract JSON if the AI wrapped it in markdown code blocks
    if (aiText.includes('```json')) {
      aiText = aiText.split('```json')[1].split('```')[0].trim();
    } else if (aiText.includes('```')) {
      aiText = aiText.split('```')[1].split('```')[0].trim();
    }

    const tasks = JSON.parse(aiText);
    res.json({ tasks });
  } catch (error) {
    console.error('AI Suggestion Error:', error);
    res.status(500).json({ message: 'Failed to generate suggestions. Please try again later.' });
  }
});

export default router;
