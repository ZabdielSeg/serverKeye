require("dotenv").config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI;
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({
  origin: process.env.FRONTEND_URL_DEVELOPMENT,
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Hola mi server en express')
});

app.use('/user', require('./routes/user.routes'));
app.use('/auth', require('./routes/auth.routes'));

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})