const hashFunc = require('./hash.js');

module.exports = validatePwd = (pwd, dbPwd) => {
  return hashFunc(pwd) === dbPwd;
}