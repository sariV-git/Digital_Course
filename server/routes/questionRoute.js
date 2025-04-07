const express=require('express')
const router=express.Router()
const questionController=require('../controllers/questionController')
const verifyJWTspeeker=require('../middleware/verifyJWTspeeker')
const verifyJWTuser=require('../middleware/verifyJWTuser')

router.post('/',verifyJWTspeeker,questionController.createQuestion)
router.put('/',verifyJWTspeeker,questionController.updateQuestion)
router.delete('/',verifyJWTspeeker,questionController.deleteQuestion)
router.get('/AccordingTask/:_id',questionController.getQuestionsAccordingTask)


module.exports=router  

            