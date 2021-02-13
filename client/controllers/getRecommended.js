const axios = require('axios');

const getRecommended = (tracks, accessToken, minEnergy, minDanceability, maxEnergy, maxDanceability) => {
  return axios.get(`https://api.spotify.com/v1/recommendations?limit=35&market=US&seed_tracks=${tracks}&min_energy=${minEnergy}&max_energy=${maxEnergy}&min_danceability=${minDanceability}&max_danceability=${maxDanceability}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
}

module.exports = getRecommended;

