const express = require('express')

const MusicCtrl = require('../controllers/musicCtrl')

const router = express.Router()

router.get('/getTop10FanRank', MusicCtrl.getTop10FanRank)
router.get('/getTop10SpotifyRank', MusicCtrl.getTop10SpotifyRank)

router.get('/hello', MusicCtrl.hello)

module.exports = router;
