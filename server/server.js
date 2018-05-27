const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const app = express();
const PORT = 3000;

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'sam',
    password: '',
    database: 'smart-brain'
  }
});

db.select('*').from('users').then(data => {
  console.log(data);
});

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@test.com',
      password: 'password',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Jim',
      email: 'sam@test.com',
      password: 'password',
      entries: 0,
      joined: new Date()
    },
  ]
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
    // res.json('success');
    res.json(database.users[0]);
  } else {
    res.status(400).json('error logging in');
  }
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  db('users')
  .returning('*')
  .insert({
    email: email,
    name: name,
    joined: new Date()
  })
  .then(user => {
    res.json(user[0]);
  })
    .catch(err => {
      res.status(400).json('unable to register');
    });
});

app.get('/profile/:id', (req, res) => {
  let userFound = false;
  const { id } = req.params;

  database.users.forEach(user => {
    if (user.id === id) {
      userFound = true;
      return res.json(user);
    }
  });

  if (!userFound) {
    res.status(400).json('user not found');
  }
});

app.put('/image', (req, res) => {
  let userFound = false;
  const { id } = req.body;

  database.users.forEach(user => {
    if (user.id === id) {
      userFound = true;
      user.entries++;
      return res.json(user.entries);
    }
  });

  if (!userFound) {
    res.status(400).json('user not found');
  }
});

app.listen(PORT, () => {
  console.log('Server started at port ' + PORT);
});
