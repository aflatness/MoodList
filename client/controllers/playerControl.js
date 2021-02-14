const playerControl = (uris, { _options }) => {
  _options.getOAuthToken(access_token => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${_options.id}`, {
      method: 'PUT',
      body: JSON.stringify({ uris }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
    }).then(console.log).catch(console.log);
  });
};

module.exports = playerControl;