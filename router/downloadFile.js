const router  = require('express').Router()
const downloadFile = require('../controllers/downloadFile')
router.get('/:uuid',downloadFile)
module.exports = router