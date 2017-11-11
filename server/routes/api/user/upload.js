'use strict'
const router     = require('express').Router(),
      passport   = require('passport'),
      path       = require('path'),
      del        = require('del'),
      multer     = require('multer'),
      fs         = require('fs')

router.post('/', (req, res) => {
  'use strict'
  let imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false)
    }
    cb(null, true)
  }

  let cleanFolder = function (folderPath) {
    // delete files inside folder but not the folder itself
    del.sync([`${folderPath}/**`, `!${folderPath}`])
  }

  // TODO(timp): replace the final string in the directory with the
  // unique username of the user so that the name of the image can be
  // randomized. After that, make sure to find the user in the database and
  // update the url for their profile image
  let dir = path.join('public', 'img', 'uploads', '')
  // Make directory if it doesn't exist
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
  let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, dir)
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname + '')
    }
  })

  let upload = multer({
    dest: dir,
    storage: storage,
    fileFilter: imageFilter,
    cleanFolder: cleanFolder
  }).single('file')
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      return res.status(500).json({ message: 'File could not be uploaded.', error: err })
    }
    res.status(200).json({ message: 'File was uploaded successfully.' })
    // Everything went fine
  })
})
module.exports = router
