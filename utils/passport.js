const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
// const { clientID, clientSecret } = require('../config.js');
const { User } = require('../database');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "https://moodlist-heroku.herokuapp.com/auth/spotify/callback"
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      console.log(accessToken, refreshToken, expires_in)
      const { username, displayName, id, profileUrl, photos } = profile;
      const obj = {
        username,
        displayName,
        spotifyId: id,
        profileUrl,
        profilePic: photos[0] ? photos[0].value : 'https://png.pngtree.com/png-vector/20190909/ourlarge/pngtree-outline-user-icon-png-image_1727916.jpg',
        accessToken
      }
      User.findOrCreate({ spotifyId: id}, obj, function(err, user) {
        console.log('user', user)
        return done(err, user);
      });
    }
  )
);