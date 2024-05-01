const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
const handelEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, status } = data;
    const postId = data.postId; // Assuming postId is present in the data
    const post = posts[postId];
    const comment = post.comments.find(c => c.id === id);
    if (comment) {
      comment.status = status;
      console.log("Successfully updated the comment.");
    } else {
      console.log("Comment not found.");
    }
  }
};

app.get('/posts', (req, res) => {
  const {type,data}=req.body; 
  handelEvent(type,data)  
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

 
  // console.log(posts);

  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002');
   const res= await axios.get('http://event-bus-srv:4005/events'
);
for(let event of res.data){
  handelEvent(event.type,event.data)
}
});
