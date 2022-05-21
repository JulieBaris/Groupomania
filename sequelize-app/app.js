const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path');


// router import
const validateToken = require('./middleware/auth')
const auth = require('./routes/auth')
const user = require('./routes/user')
const post = require('./routes/post')
const comment = require('./routes/comment')

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json())
app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

// Routing
app.use('/api', auth)
app.use('/api', user)
app.use('/api', post)
app.use('/api', comment)


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur le réseau social Groupomania" });
});


// set port, listen for requests
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});