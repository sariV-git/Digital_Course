const Question=require('../models/Question')
const funcDeleteAnswer=require('./answerController')
const funcGetByQuestionAnswers=require('./answerController')

//create
const createQuestion=async(req,res)=>{
    const{text,type,options,task,numOfQuestion}=req.body
   console.log({text,type,options,task,numOfQuestion});
   
    if(!text||!type||!task||!numOfQuestion)
        return res.status(400).send('error in create question')
    if(type==='American')
        {
          if(!options)
            return res.status(400).send('error in create question')
        }
    const question=await Question.create({text,type,options,task,numOfQuestion})
if(!question)
    return res.status(400).send('error in create question')
return res.status(200).send('question created')
}

//update
const updateQuestion=async(req,res)=>{
    const{text,options,numOfQuestion,_id}=req.body
if(!id)
    return res.status(400).send('error in update question')
    const question=await Question.findById(_id)
    if(!question)
        return res.status(400).send('error in update question')
     question.text=text?text:question.text
     question.options=options?options:question.options
    question.numOfQuestion=numOfQuestion?numOfQuestion:question.numOfQuestion
    const updated=await question.save()
    if(!updated)
        return res.status(400).send('error in update question')
    return res.status(200).send('question updated')
}
//func delete
const funcDeleteQuestion=async(_id)=>{
    const question=await Question.findById(_id)
    if(!question)
        return res.status(400).send('error in delete question')
        const answers=await funcGetByQuestionAnswers(_id)
     if(answers)
        {
            answers.array.forEach(answer => {
            if(!funcDeleteAnswer(answer._id)) 
            return false
            });
        }
            const deleted=await question.deleteOne()
            if(deleted.deleteCount!=1)
               return false
        
          if(!answers)
            return false
        return true
}

//delete
const deleteQuestion=async(req,res)=>{
    const {_id}=req.params
    if(!_id)
        return res.status(400).send('error in delete question')
   if(!funcDeleteQuestion(_id))
    return res.status(400).send('error in delete question')

return res.status(200).send('question deleted!')
}

//getQuestion According task
const getQuestionsAccordingTask=async(req,res)=>{   
    const{_id}=req.params
    if(!_id)
        return res.status(400).send('error in getQuestion According task')
    const questions=await Question.find({task:_id})
    if(!questions)
        return res.status(400).send('error in getQuestion According task')
    res.json(questions)
}


module.exports={funcDeleteQuestion,createQuestion,updateQuestion,deleteQuestion,getQuestionsAccordingTask}