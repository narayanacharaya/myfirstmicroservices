const express = require('express');
const bodyParser = require('body-parser');
 const {randomBytes} = require('crypto');
  const axios = require('axios');
  const cors = require('cors');
const app = express();
 app.use(cors());
app.use(bodyParser.json());
 const post={}
 app.get('/posts', (req, res) => {
     res.send(post);
 })
 app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title}=req.body;
    post[id]={id,title};
   await  axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data:{
        id,title
    }
   })
     res.status(201).send(post)[id];
})


 app.post('/events', async (req, res) => {
    console.log(req.body.type);
     res.send({});
 });
 app.listen(4000, () => {
     console.log('Server is running on port 4000');
 })