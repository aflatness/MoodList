const axios = require('axios');

const playerControl = (uris, { _options }) => {
  _options.getOAuthToken(access_token => {
    axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${_options.id}`, {
      context_uri: uris[0]
    },
    { headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
    }).then(console.log).catch(console.log);
  });
};

module.exports = playerControl;