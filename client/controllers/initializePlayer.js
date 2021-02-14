const initializePlayer = async (accessToken) => {
  const playerInstance = new Spotify.Player({
    name: 'moodList',
    getOAuthToken: cb => cb(accessToken)
  })

  playerInstance.addListener('initialization_error', ({ message }) => { console.error(message); });
  playerInstance.addListener('authentication_error', ({ message }) => { console.error(message); });
  playerInstance.addListener('account_error', ({ message }) => { console.error(message); });
  playerInstance.addListener('playback_error', ({ message }) => { console.error(message); });

  playerInstance.addListener('ready', ({ device_id }) => { console.log('Player is ready: ', device_id) });
  playerInstance.addListener('not_ready', ({ device_id }) => { console.log('Device ID has gone offline', device_id) });

  const done = await playerInstance.connect();
  return playerInstance;
}

export default initializePlayer;