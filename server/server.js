const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

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
  database.users.push({
    id: '125',
    name: name,
    email: email,
    // password: password,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
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
