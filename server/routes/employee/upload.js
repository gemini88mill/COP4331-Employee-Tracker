'use strict'
const router     = require('express').Router(),
      passport   = require('passport'),
      path       = require('path'),
      del        = require('del'),
      fs         = require('fs'),
      User       = require('../../models/user.js')

router.post('/', (req, res) => {
  'use strict'

  // Make directory if it doesn't exist
  let uploadDir = path.join('public', 'img', 'uploads')
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)
  let dir = path.join('public', 'img', 'uploads', req.body.username)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)

  // // Check file type
  // if (!req.body.fileType.match(/\.(jpg|jpeg|png)$/)) {
  //   req.fileValidationError = 'Invalid file type. Acceptable file types: jpg, jpeg, png'
  //   return
  // }
  let fileName = (new Date) + '.' + req.body.fileType
  let fileLocation = path.join(dir, fileName)

  User.findOneAndUpdate( { username: req.body.username }, { picture: path.join('img', 'uploads', req.body.username, fileName) }, {upsert: true}, (err, user) => {
    if (err) {
      res.status(500).json({ message: 'Picture NOT changed.', error: err })
    } else {
      var bitmap = new Buffer(req.body.file, 'base64')
      fs.writeFileSync(fileLocation, bitmap)
      res.status(200).json({ message: 'Picture changed to ' + req.body.picture, data: req.body })
    }
  })
})

module.exports = router
