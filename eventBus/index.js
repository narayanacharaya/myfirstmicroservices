const  express =  require('express')
 const  bodyParser = require('body-parser');
 const {randomBytes} = require('crypto');
 const axios = require('axios');
 const app = express();

 app.use(bodyParser.json());
 const events=[]
 app.post('/events', async (req, res) => {
  events.push(event); 
     const event = req.body
      try{
        await axios.post('http://localhost:4000/events', event)
        await axios.post('http://localhost:4001/events', event)
        await axios.post('http://localhost:4002/events', event)
        await axios.post('http://localhost:4003/events', event)
      }
      catch(err){
        console.log(err.message);
      }
  
      res.status(200).send({status: 'success'});
 })
app.get('/events', function(req, res){
res.send(events)
});
 app.listen(4005, () => {
     console.log('Listening on port 4005');
 })

