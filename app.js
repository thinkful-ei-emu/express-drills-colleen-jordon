"use strict";

const express = require("express");
const morgan = require("morgan");
//invoking express top level function to create the app object

const app = express();
// mounting morgan (middleware forlogging)
app.use(morgan("dev"));
//res: HTTP res is request object to send text to the client
app.get("/", (req, res) => {
  res.send("Hello Express. I am living inside the computer");
});
//listening to a specific port to correctly route request to
// the server:


app.get("/burger", (req, res) => {
  res.send("We have amazing delicious cheeseburgers! ");
});
app.get("/echo", (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    Body: ${req.body}
  `;
  res.send(responseText);
});

app.get("/queryViewer", (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get("/icecream", (req, res) => {
  const name = req.query.name;
  const race = req.query.race;

  if (!name) {
    return res.status(400).send("Please provide a name");
  }
  if (!race) {
    return res.status(400).send("Please provide a race");
  }
  const greeting = `Greetings, ${name} the ${race}, welcome to Express`;
  res.send(greeting);
});
//drill 1
app.get("/sum", (req, res) => {
  const textA = req.query.a;
  const textB = req.query.b;
  const numA = parseInt(textA, 10);
  const numB = parseInt(textB, 10);
  const sum = numA + numB;
  const answer = `The sum of ${numA} and ${numB} is ${sum}`;
  res.send(answer);
});

//drill 2

app.get("/cipher", (req, res) => {
  const param1 = req.query.text.toUpperCase();
  const param2 = parseInt(req.query.shift, 10);
  let output = "";

  for (let i = 0; i < param1.length; i++) {
    let c = param1[i];
    let code = param1.charCodeAt(i);
    c = String.fromCharCode(((code - 65 + param2) % 26) + 65);
    output += c;
    console.log(output);
  }

  res.send(output);
});

//drill 3

/* To send an array of values to the server via a query string simply repeat the key with different values. For instance, the query string ?arr=1&arr=2&arr=3 results in the query object { arr: [ '1', '2', '3' ] }. Create a new endpoint /lotto that accepts an array of 6 distinct numbers between 1 and 20 named numbers. The function then randomly generates 6 numbers between 1 and 20. Compare the numbers sent in the query with the randomly generated numbers to determine how many match. If fewer than 4 numbers match respond with the string "Sorry, you lose". If 4 numbers match respond with the string "Congratulations, you win a free ticket", if 5 numbers match respond with "Congratulations! You win $100!". If all 6 numbers match respond with "Wow! Unbelievable! You could have won the mega millions!". */

app.get('/lotto', (req, res) => {

  let numbers = req.query.arr;

  function getRandomArbitraryArray(min, max) {
    let lottoNumbers = [];
    let number = 0;
    let newArray = [];

    for (let i = 6; i > 0; i--) {
      number = Math.floor(Math.random() * (max - min) + min);
      lottoNumbers.push(number);
    }

    // console.log(lottoNumbers);
    return lottoNumbers;
  }

  let lottos = getRandomArbitraryArray(1, 20);

  function compareLotto(lottoNumbers, numbers) {
    let winners = 0;
    for (let i = 0; i < numbers.length; i++) {
      let newArray = [];
      newArray.push(parseInt(numbers[i]));

      newArray.forEach(int => {
        for (let j = 0; j < lottoNumbers.length; j++) {
          if (int === lottoNumbers[j]) {
            winners += 1;
          }
        }
      });
    }
    console.log(winners);
    return winners;
  }
  let result = compareLotto(lottos, numbers);
  res.send(result);
});

app.listen(8502, () => {
  console.log("Express server listening on port 8502");
});