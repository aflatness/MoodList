const getSongs = require('./getSongs.js');
const getFeatures = require('./getFeatures.js');
const getRecommended = require('./getRecommended.js');
const addPlaylist = require('./addPlaylist.js');

module.exports = {
  getSongs,
  getFeatures,
  getRecommended,
  addPlaylist
}

//get users top 100 tracks
  //get info of tracks
  //filter with mood
    //get 30 track recommendations based on top track filtered
