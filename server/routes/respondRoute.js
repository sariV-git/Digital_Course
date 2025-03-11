

const express=require('express')
const router=express.Router()
const verifyJWTuser=require('../middleware/verifyJWTuser')
const verifyJWTmanager=require('../middleware/verifyJWTmanager')

const respondController=require('../controllers/respondController')

router.post('/',verifyJWTuser,respondController.createRespond)
router.put('/',verifyJWTuser,respondController.updateRespond)
router.delete('/:_id',verifyJWTmanager,respondController.deleteRespond)
router.get('/getAccordingIntroduce',verifyJWTuser,respondController.getAccordingIntroduce)
router.get('/',verifyJWTmanager,respondController.getAllResponds)

module.exports=router