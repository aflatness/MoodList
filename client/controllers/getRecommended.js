const axios = require('axios');

const getRecommended = (tracks, accessToken, minEnergy, minDanceability, maxEnergy, maxDanceability) => {
  // offset for floating-point error and max of 1
  minEnergy = minEnergy <= 0.0 ? .1 : Math.floor(minEnergy * 100) / 100;
  minDanceability = minDanceability <= 0.0 ? .1 : Math.floor(minDanceability * 100) / 100;

  maxDanceability = maxDanceability >= 1 ? .999 : Math.floor(maxDanceability * 100) / 100;
  maxEnergy = maxEnergy >= 1 ? .999 : Math.floor(maxEnergy * 100) / 100;

  return axios.get(`https://api.spotify.com/v1/recommendations?limit=35&market=US&seed_tracks=${tracks}&min_energy=${minEnergy}&max_energy=${maxEnergy}&min_danceability=${minDanceability}&max_danceability=${maxDanceability}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
}

module.exports = getRecommended;

