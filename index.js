const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3001
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hola mi server en express')
});

app.use('/user', require('./routes/user.routes'))

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})