const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/moodList', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const historySchema = new mongoose.Schema({
  mood: Number,
  energy: Number,
  date: String,
  playlist: {type: String, default: 'N/A'}
})

const userSchema = new mongoose.Schema({
  spotifyId: String,
  username: String,
  displayName: String,
  profileUrl: String,
  profilePic: String,
  moodHistory: [historySchema],
  accessToken: String
});

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