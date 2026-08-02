const express = require('express');
const axios = require('axios');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/message', authenticate, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) return res.status(400).json({ message: 'Message empty' });

    const response = await axios.post(`${process.env.AI_API_BASE_URL}/chat/completions`, {
      model: process.env.AI_MODEL || 'gpt-4',
      messages: [{ role: 'user', content: message }],
      temperature: 0.7,
      max_tokens: 2000
    }, {
      headers: { 'Authorization': `Bearer ${process.env.AI_API_KEY}` },
      timeout: 30000
    });

    const aiResponse = response.data.choices[0]?.message?.content || 'Unable to process';
    res.json({ success: true, message: aiResponse });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error' });
  }
});

router.post('/stream', authenticate, async (req, res) => {
  try {
    const { message } = req.body;
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await axios.post(`${process.env.AI_API_BASE_URL}/chat/completions`, {
      model: process.env.AI_MODEL || 'gpt-4',
      messages: [{ role: 'user', content: message }],
      stream: true
    }, {
      headers: { 'Authorization': `Bearer ${process.env.AI_API_KEY}` },
      responseType: 'stream'
    });

    stream.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      lines.forEach(line => {
        if (line.startsWith('data: ')) res.write(`data: ${line.slice(6)}\n\n`);
      });
    });

    stream.data.on('end', () => { res.write('data: [DONE]\n\n'); res.end(); });
  } catch (error) {
    res.write(`data: {"error": "${error.message}"}\n\n`);
    res.end();
  }
});

module.exports = router;