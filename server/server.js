const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_HOST || '127.0.0.1';

// const USER = process.env.POSTGRES_USER;
// const PASSWORD = process.env.POSTGRES_PASSWORD;
// const DATABASE = process.env.POSTGRES_DB;

// const connConfig = process.env.DATABASE_URL ? {
//                         connectionString: DATABASE_URL,
//                         ssl: true
//                       } :
//                       {
//                         host: DATABASE_URL,
//                         // user: 'sam',
//                         // password: '',
//                         database: 'smart-brain'
//                       };

let connConfig;
if (process.env.POSTGRES_URI) {
  connConfig = process.env.POSTGRES_URI;
} else if (process.env.DATABASE_URL) {
  connConfig = {
    connectionString: DATABASE_URL,
      ssl: true
  };
} else {
  connConfig = {
    host: DATABASE_URL,
    // user: 'sam',
    // password: '',
    database: 'smart-brain'
  };
}

const db = knex({ client: 'pg', connection: connConfig });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('combined'));
app.use(cors());

app.get('/', (req, res) => { res.send('it is working!'); });
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt); });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt); });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db); });
app.post('/profile/:id', (req, res) => { profile.handleProfileUpdate(req, res, db); });
app.put('/image', (req, res) => { image.handleImage(req, res, db); });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res); });

app.listen(PORT, () => {
  console.log('Server started at port ' + PORT);
});
