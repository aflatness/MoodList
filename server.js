const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const { User } = require('./database');
const hashFunc = require('./utils/hash.js');
const validatePwd = require('./utils/validatePwd.js');
const passport = require('passport');
require('./utils/passport.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
  name: 'spotify-auth-session',
  keys: 'user'
}))

app.use(express.static(path.join(__dirname, 'public')));

app.get('/auth/spotify', passport.authenticate('spotify', {
  scope: ['user-library-read', 'user-top-read', ]
}));

app.get('/auth/spotify/callback', passport.authenticate('spotify', {failureRedirect: '/'}),
  function (req, res) {
    console.log(req.user);
    res.cookie('spotify-auth-session', JSON.stringify(req.user), { expires: new Date(Date.now() + 3600) }).redirect('/');
  }
);

// app.get('/login', (req, res) => res.send());
// app.get('/loggedIn', (req, res) => res.send());

app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    console.log(err)
    res.status(404).send(err)
  }
});

app.put('/api/user/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {$push: {moodHistory: req.body}});
    res.status(201).send();
  } catch (err) {
    res.status(404).send();
  }
})

app.put('/api/playlists/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {$push: {playlists: req.body.playlist}})
    res.status(202).send();
  } catch (err) {
    res.status(404).send();
  }
})

app.listen(PORT, console.log(`Listening on port ${PORT}`));