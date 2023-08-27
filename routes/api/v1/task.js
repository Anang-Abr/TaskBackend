const express = require('express');
const router = express.Router();
const helper = require(__class_dir + '/helper.class.js');
const m$task = require(__module_dir + '/task.module.js');
const middleware = require(__class_dir + '/middleware.class.js');


router.use('/', (req,res,next) => middleware.auth(req,res,next))
router.post('/', async function (req, res, next) {
    const result = await m$task.add(req.body)
    helper.sendResponse(res, result);
});
router.get('/', async function (req, res, next) {
    const result = await m$task.getAll()
    helper.sendResponse(res, result);
});
router.get('/:id', async function (req, res, next) {
    const result = await m$task.getOne(req.params.id)
    helper.sendResponse(res, result);
});
router.put('/:id', async function (req, res, next) {
    const result = await m$task.update({id:req.params.id, data: req.body})
    helper.sendResponse(res, result);
});
router.delete('/:id', async function (req, res, next) {
    const result = await m$task.delete(req.params.id)
    helper.sendResponse(res, result);
});

module.exports = router;
