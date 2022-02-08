function getSettings(req, res, next) {
  res.json({
    email: 'tadash82@gmail.com'
  })
}

module.exports = { getSettings };