const express = require('express');
const app = express();
const port = 3000;

let currentMessageId = '';
let currentMessage = '';

app.use(express.json());
app.use(express.static(__dirname));


app.post('/webhook', (req, res) => {
  const { message_id, message } = req.body;
  console.log(`Received webhook payload (${message_id}):`, message);
  
  if (message_id !== currentMessageId) {
    currentMessageId = message_id;
    currentMessage = message;
    console.log('Message updated');
  } else {
    console.log('Same message as before');
  }

  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/message', (req, res) => {
  res.json({ message_id: currentMessageId, message: currentMessage });
});

app.listen(port, () => {
  console.log(`Webhook server listening on port ${port}`);
});
