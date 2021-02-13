const axios = require('axios');

const getFeatures = (tracks, accessToken) => {
  console.log(tracks)
  return axios.get(`https://api.spotify.com/v1/audio-features?ids=${tracks}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
}

module.exports = getFeatures;