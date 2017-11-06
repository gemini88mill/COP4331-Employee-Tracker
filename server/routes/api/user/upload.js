'use strict'
const router     = require('express').Router(),
      passport   = require('passport'),
      fileUpload = require('express-fileupload')

// Clock in/out
router.post('/', (req, res) => {
  'use strict'

  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // Fetch the uploaded file
  let sampleFile = req.files.sampleFile;

  // TODO(timp): Generate unique filename or directory (perhaps all images)
  //             are stored within a unique directory for each user.
  sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
  if (err)
  return res.status(500).send(err);

  res.send('File uploaded!');
  });


  // TODO

  // Dummy return value
  return res.json({
    type: 'POST',
    message: 'Upload new photo request',
    receivedData: req.body
  })
})

module.exports = router
