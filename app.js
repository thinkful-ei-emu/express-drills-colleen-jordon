'use strict';

const express = require('express')
const morgan = require('morgan')
//invoking express top level function to create the app object

const app = express()
// mounting morgan (middleware forlogging)
app.use(morgan('dev'))
//res: HTTP res is request object to send text to the client
app.get('/', (req, res) => { res.send('Hello Express. I am living inside the computer') })
//listening to a specific port to correctly route request to 
// the server:
app.listen(8000, () => {
  console.log('Express server listening on port 8000')
})


app.get('/burger', (req, res) => {
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

app.get('/icecream', (req, res) => {
  const name = req.query.name
  const race = req.query.race

  if (!name) {
    return res.status(400).send('Please provide a name')
  }
  if (!race) {
    return res.status(400).send('Please provide a race')
  }
  const greeting = `Greetings, ${name} the ${race}, welcome to Express`
  res.send(greeting);
})

app.get('/sum', (req, res) => {
  const textA = req.query.a
  const textB = req.query.b
  const numA = parseInt(textA, 10)
  const numB = parseInt(textB, 10)
  const sum = numA + numB
  const answer = `The sum of ${numA} and ${numB} is ${sum}`
  res.send(answer);
})



app.get('/cipher', (req, res) => {

  const param1 = req.query.text.toUpperCase();
  const param2 = parseInt(req.query.shift, 10);
  let output = '';

  for (let i = 0; i < param1.length; i++) {
    let c = param1[i];
    let code = param1.charCodeAt(i);
    c = String.fromCharCode((((code - 65 + param2) % 26) + 65));
    output += c;
    console.log(output);
  }

  res.send(output);
})