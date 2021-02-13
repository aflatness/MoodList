const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/moodList', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  spotifyId: String,
  username: String,
  displayName: String,
  profileUrl: String,
  profilePic: String,
  moodHistory: [Object],
  accessToken: String
});

const applicationSchmea = new mongoose.Schema({
  company: String,
  location: String,
  date: String,

})

const User = mongoose.model('users', userSchema);

User.findOrCreate = function (condition, obj, cb) {
  this.findOne(condition)
    .then((res) => {
      !res ? this.create(obj).then((data) => cb(null, data)) : this.findOneAndUpdate(condition, obj, {new: true}).then((res) => cb(null, res))
    })
}
module.exports = {
  mongoose,
  User,
}