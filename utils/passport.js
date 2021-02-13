const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const { clientID, clientSecret } = require('../config.js');
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
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: "http://localhost:3000/auth/spotify/callback"
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      console.log(accessToken, refreshToken, expires_in)
      const { username, displayName, id, profileUrl, photos } = profile;
      const obj = {
        username,
        displayName,
        spotifyId: id,
        profileUrl,
        profilePic: photos[0].value,
        accessToken
      }
      User.findOrCreate({ spotifyId: id}, obj, function(err, user) {
        console.log('user', user)
        return done(err, user);
      });
    }
  )
);