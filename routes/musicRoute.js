const express = require('express')

const MusicCtrl = require('../controllers/musicCtrl')

const router = express.Router()

// Calculates the total maximum rewards points earned for the month 
//      and the maximum reward points applied for each transaction
router.get('/getTop10', MusicCtrl.getTop10)

module.exports = router;
