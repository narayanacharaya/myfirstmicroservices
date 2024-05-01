const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    try {
        console.log("my post id is ",data.postid)
      await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentModerated', // Corrected typo here
        data: {
          id: data.id,
          postId: data.postid, // Corrected typo here (postid to postId)
          status: status,
          content: data.content
        }
      });

      res.send({});
    } catch (error) {
      console.error('Error sending moderated comment event:', error.message);
      res.status(500).send('Internal Server Error');
    }
  }
});

app.listen(4003, () => {
  console.log('Listening on port 4003');
});
