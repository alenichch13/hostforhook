const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

app.post('/webhook', (req, res) => {
  const timestamp = new Date().toISOString();
  const payload = {
    time: timestamp,
    headers: req.headers,
    body: req.body
  };
  fs.appendFileSync('log.jsonl', JSON.stringify(payload) + '\n');
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Webhook listener running on port ${PORT}`);
});
