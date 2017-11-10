'use strict'
const router     = require('express').Router(),
      passport   = require('passport'),
      path       = require('path'),
      del        = require('del'),
      multer     = require('multer'),
      fs         = require('fs')


router.post('/', (req, res) => {
  'use strict'

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
      console.log(file);
    }
  })

  console.log(storage);

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

var imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false)
    }
    cb(null, true)
}

var cleanFolder = function (folderPath) {
    // delete files inside folder but not the folder itself
    del.sync([`${folderPath}/**`, `!${folderPath}`])
}
























// Upload image
// router.post('/', (req, res) => {
//   'use strict'
//
//   // Stub of the uploading functionality
//   // NOTE(timp): this is non-functional in its current state
//   if (!req.files)
//     return res.status(400).json({ message: 'Image file was not found.' })
//
//   // Fetch the uploaded file
//   let sampleFile = req.files.sampleFile
//
//   // TODO(timp): Generate unique filename or directory (perhaps all images)
//   //             are stored within a unique directory for each user.
//   let fileName = path.join('..', '..', 'public', 'uploads', 'thing.png')
//   sampleFile.mv(fileName, function(err) {
//     if (err)
//       return res.status(500).json({ message: err })
//     res.status(200).send({ message: 'Upload successful!' })
//   })
// })
//
// router.post('/', function(req, res) {
//   console.log(req.files);
//
//   if (!req.files)
//     return res.status(400).send('No files were uploaded.');
//
//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   let sampleFile = req.files.sampleFile;
//   console.log(sampleFile);
//
//   // Use the mv() method to place the file somewhere on your server
//   let fileName = path.join('..', '..', 'public', 'uploads', 'thing.png')
//   sampleFile.mv(fileName, function(err) {
//     if (err)
//       return res.status(500).send(err);
//
//     res.send('File uploaded!');
//   });
// });

// route.post('/', (req, res, next) => {
//   var fstream
//   req.pip(req.busboy)
//   req.busboy.on('file', (fieldname, file, filename) => {
//     console.log('Uploading: ' + filename)
//
//     // Path where image will be uploaded
//     fstream = fs.createWriteStream(path.join('..', '..', 'public', 'uploads', filename))
//     file.pipe(fstream)
//     fstream.on('clone', () => {
//       console.log('Upload finished of ' + filename)
//       res.redirect('back')
//     })
//   })
// })
//


module.exports = router
