const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const {randomBytes} = require('crypto');
 const axios = require('axios');
const { type } = require('os');
app.use(bodyParser.json());
app.use(cors());
const commentByPostId={};
 app.get('/posts/:id/comments', (req, res) => {
     res.send(commentByPostId[req.params.id]||[])
; });
  app.post('/posts/:id/comments',async (req, res) => {
  
     const commentId = randomBytes(4).toString('hex');
      const {content} = req.body;
      const comments= commentByPostId[req.params.id]||[];
    comments.push({commentId: commentId, content: content,status:"Pending"});
    commentByPostId[req.params.id]=comments;
    try {await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data:{
            id:commentId,content:content,postid: req.params.id, status:"Pending"
        }
    })
}
catch (err) { console.log(err) };
     res.status(201).send(comments);
  });
  app.post('/events', async (req, res) => {
     if(req.body.type === 'CommentModerated'){
      const {postId,id, status}= req.body.data;
      comments = commentByPostId[postId]; 
      const comment = comments.find(comment => {
        return comment.id = id;
      });
      console.log("comment status is ",comment.toString
    ());
      console.log("updated  status is ",status);
     //  comment.status= status;
      await axios.post('http://event-bus-srv:4005/events', {
        type:"CommentUpdated",
        data:{
          id,
          status,
          postId
        }
      })
     }
     console.log('apporved from commnet server');
      res.send({})
 });
   app.listen(4001,() => {
    console.log('listening on http://localhost:4001');
   });