'use strict'
const router   = require('express').Router(),
      passport = require('passport')

// Clock in/out
router.post('/', (req, res) => {
  'use strict'
  
  // TODO

  // Dummy return value
  return res.json({
    type: 'POST',
    message: 'Clock in/out request',
    receivedData: req.body
  })
})

module.exports = router
