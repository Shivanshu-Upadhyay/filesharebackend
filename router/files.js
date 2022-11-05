const router = require('express').Router()
const fileUpaload = require('../controllers/fileUpload')
const getFile = require('../controllers/getFile')
const sendFileEmail = require('../controllers/sendFileEmail')
router.post('/fileUpload',fileUpaload)
router.get('/getfile/:uuid',getFile)
router.post('/sendFileEmail',sendFileEmail)
module.exports = router