'use strict'
const router     = require('express').Router(),
      passport   = require('passport'),
      fileUpload = require('express-fileupload'),
      path       = require('path')

// Upload image
router.post('/', (req, res) => {
  'use strict'

  // Stub of the uploading functionality
  // NOTE(timp): this is non-functional in its current state
  if (!req.files)
    return res.status(400).send('No files were uploaded.')

  // Fetch the uploaded file
  let sampleFile = req.files.sampleFile

  // TODO(timp): Generate unique filename or directory (perhaps all images)
  //             are stored within a unique directory for each user.
  let fileName = path.join('..', '..', 'public', 'uploads', 'thing.png')
  sampleFile.mv(fileName, function(err) {
    if (err)
      return res.status(500).send(err)
    res.send('Upload successful!')
  })
})

module.exports = router
