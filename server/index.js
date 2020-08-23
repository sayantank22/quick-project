const express = require('express'); //needed to launch server
var bodyParser = require('body-parser');
const cors = require('cors'); //needed to disable sendgrid security
const sgMail = require('@sendgrid/mail'); //sendgrid library to send emails
require('dotenv').config();

const app = express(); //alias from the express function

//sendgrid api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors()); //utilize Cors so the browser doesn't restrict data, without it Sendgrid will not send!

// Welcome page of the express server:
app.get('/', (req, res) => {
  res.send('Welcome to the Sendgrid Emailing Server');
});

app.post('/send-email', (req, res) => {
  console.log(req.body);

  //Get Variables from query string in the search bar
  // const { recipient, sender, topic, text } = req.body;

  //Sendgrid Data Requirements
  //   const msg = {
  //     to: 'sayantank22@gmail.com',
  //     from: 'karmakarbarun22@gmail.com',
  //     subject: 'Test',
  //     text: 'Hey, it worked!',
  //   };

  const msg = {
    to: req.body.recipient,
    from: req.body.sender,
    subject: req.body.topic,
    text: req.body.text,
  };

  //Send Email
  sgMail.send(msg).then((res) => console.log(res));
});

// to access server run 'nodemon index.js' then click here: http://localhost:4000/
app.listen(4000, () => console.log('Running on Port 4000'));
