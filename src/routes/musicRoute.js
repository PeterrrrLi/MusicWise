const express = require('express')

const MusicCtrl = require('../controllers/musicCtrl')

const router = express.Router()

router.get('/getTop10FanRank', MusicCtrl.getTop10FanRank)
router.get('/getTop10SpotifyRank', MusicCtrl.getTop10SpotifyRank)
router.get('/getTop10Artists', MusicCtrl.getTop10Artists)
router.get('/getAllSongs', MusicCtrl.getAllSongs)
router.post('/insertUserRanking', MusicCtrl.insertUserRanking)
router.post('/search', MusicCtrl.search); 
router.get('/hello', MusicCtrl.hello)

module.exports = router;
