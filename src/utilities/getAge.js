module.exports = dob => {
  var ageInMilliseconds = new Date() - new Date(dob);
  return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365);
};
