const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type == 'CommentCreated') {
    const { id, content, postid , status } = data;

	
    const post = posts[postid];
    post.comments.push({ id, content,status });
  }
  if (type == 'CommentUpdated') {
    const { id, content, postId , status } = req.body.data;
console.log(req.body.data);
	
    const post = posts[postId];
   const comment= post.comments.find(c => c.id ===id)
   comment.status = status;
   console.log("sucesffuly updated the cmt ")
;


}

  // console.log(posts);

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
