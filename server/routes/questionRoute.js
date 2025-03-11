const express=require('express')
const router=express.Router()
const questionController=require('../controllers/questionController')
const verifyJWTspeeker=require('../middleware/verifyJWTspeeker')

router.post('/',verifyJWTspeeker,questionController.createQuestion)
router.put('/',verifyJWTspeeker,questionController.updateQuestion)
router.delete('/',verifyJWTspeeker,questionController.deleteQuestion)
router.get('/AccordingTask',verifyJWTspeeker,questionController.getQuestionsAccordingTask)


module.exports=router