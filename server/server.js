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

// db.select('*').from('users').then(data => {
//   console.log(data);
// });

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
    email,
    name,
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
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('Not found');
      }
    })
    .catch(err => res.status(400).json('error getting user'));
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));

});

app.listen(PORT, () => {
  console.log('Server started at port ' + PORT);
});
