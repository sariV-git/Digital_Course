const express=require('express')
const router=express.Router()
const answerController=require('../controllers/answerController')
const verifyJWTspeeker=require('../middleware/verifyJWTspeeker')
const verifyJWTuser=require('../middleware/verifyJWTuser')

router.post('/',verifyJWTuser,answerController.createAnswer)
router.put('/',verifyJWTuser,answerController.updateAnswer)
router.delete('/:_id',verifyJWTspeeker,answerController.deleteAnswer)
router.get('/',verifyJWTspeeker,answerController.getAllAnswers)
router.get('/AccordingQustion/:_id',verifyJWTspeeker,answerController.getAnswersAccordingQuestion)
router.get('/:_id',verifyJWTuser,answerController.getAnswerById)
module.exports=router