const express = require('express');
const router = express.Router();

const {checkuser,createuser,fetchuser,updateuser} = require('../controllers/User');
const {site,sites,createsite,deletesite,renamesite,duplicateSite} = require('../controllers/Site');

router.post('/checkuser', checkuser);
router.post('/createuser', createuser);
router.post('/fetchuser', fetchuser);
router.post('/updateuser', updateuser);
router.post('/sites', sites);
router.post('/site', site);
router.post('/createsite', createsite);
router.post('/deletesite', deletesite);
router.post('/renamesite', renamesite);
router.post('/duplicateSite', duplicateSite);

module.exports = router;