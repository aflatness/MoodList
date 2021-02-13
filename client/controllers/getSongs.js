const axios = require('axios');

const getSongs = (accessToken) => {
  return axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=50`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
}

module.exports = getSongs;
