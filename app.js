const express = require('express')
const morgan = require('morgan')
//invoking express top level function to create the app object

const app = express()
// mounting morgan (middleware forlogging)
app.use(morgan('dev'))
//res: HTTP res is request object to send text to the client
app.get('/', (req, res) => {res.send('Hello Express. I am living inside the computer')})
//listening to a specific port to correctly route request to 
// the server:
app.listen(8000, () =>{
  console.log('Express server listening on port 8000')
})

app.get('/burger', (req, res)=>{
  res.send('We have amazing delicious cheeseburgers! ')
})
app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    Body: ${req.body}
  `;
  res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res)=>{
  const name = req.query.name
  const race = req.query.race

  if(!name) {
    return res.status(400).send('Please provide a name')
  }
  if(! race){
    return res.status(400).send('Please provide a race')
  }
  const greeting = `Greetings, ${name} the ${race}, welcome to Express`
  res.send(greeting);
})

app.get('/sum', (req, res)=>{
  const textA = req.query.a
  const textB = req.query.b
  const numA = parseInt(textA, 10)
  const numB = parseInt(textB, 10)
  const sum = numA + numB
  const answer = `The sum of ${numA} and ${numB} is ${sum}`
  res.send(answer);

})