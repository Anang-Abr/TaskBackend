const express = require('express');
const router = express.Router();
const helper = require(__class_dir + '/helper.class.js');
const m$auth = require(__module_dir + '/auth.module.js');

router.post('/login', async function (req, res, next) {
    const result = await m$auth.login(req.body)
    helper.sendResponse(res, result);

});
router.post('/register', async function (req, res, next) {
    const result = await m$auth.register(req.body)
    helper.sendResponse(res, result);
});

module.exports = router;
