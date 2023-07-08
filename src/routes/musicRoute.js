const express = require('express')

const MusicCtrl = require('../controllers/musicCtrl')

const router = express.Router()

router.get('/getTop10', MusicCtrl.getTop10)
router.get('/getTop10Artists', MusicCtrl.getTop10Artists)
router.get('/getAllSongs', MusicCtrl.getAllSongs)

router.get('/hello', MusicCtrl.hello)

module.exports = router;
