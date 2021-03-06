const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const { User } = require('./database');
const passport = require('passport');
require('./utils/passport.js');

const app = express();
const PORT = process.env.PORT || 3000;

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
  scope: ['user-library-read', 'user-top-read', 'streaming', 'user-read-private', 'user-read-email', 'user-read-currently-playing', 'user-modify-playback-state', 'playlist-modify-private']
}));

app.get('/auth/spotify/callback', passport.authenticate('spotify', {failureRedirect: 'https://moodlist-heroku.herokuapp.com/'}),
  function (req, res) {
    console.log('successful login');
    res.cookie('spotify-auth-session', JSON.stringify(req.user._id), {expires: new Date(Date.now() + 3600000)}).redirect('https://moodlist-heroku.herokuapp.com/');
  }
);

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
    const user = await User.findById(req.params.id)
    user.moodHistory[user.moodHistory.length - 1].playlist = req.body.url;
    await user.save();
    res.status(202).send(user);
  } catch (err) {
    res.status(404).send();
  }
})

app.listen(PORT, console.log(`Listening on port ${PORT}`));