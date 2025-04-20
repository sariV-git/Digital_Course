

const express=require('express')
const router=express.Router()
const verifyJWTuser=require('../middleware/verifyJWTuser')
const verifyJWTmanager=require('../middleware/verifyJWTmanager')

const feedbackController=require('../controllers/feedbackController')

router.post('/',verifyJWTmanager,feedbackController.createFeadback)
router.put('/',verifyJWTmanager,feedbackController.updateFeedback)
router.delete('/:_id',verifyJWTmanager,feedbackController.deleteFeedback)
router.get('/AccordingUserTask/:_id',verifyJWTuser,feedbackController.getFeedbackAccordingUserTask)

module.exports=router 