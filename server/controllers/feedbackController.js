//VVVVVVVVVVVVVVV
const Feedback=require('../models/Feedback')

//create
const createFeadback=async(req,res)=>{
    const{userTask,text}=req.body
    if(!userTask||!text)
        return res.status(400).send('error in createFeadback')
    const feedback=await Feedback.create({userTask,text})
    if(!feedback)
        return res.status(400).send('error in createFeadback')
    return res.status(400).send('create feedback!')
}
//delete
const deleteFeedback=async(req,res)=>{
    const {_id}=req.params
    if(!_id)
        return res.status(400).send('error in deleteFeedback')
    const feedback=await Feedback.findById(_id)
    if(!feedback)
        return res.status(400).send('error in deleteFeedback')
    const deleted=await feedback.deleteOne()
    if(deleted.deleteCount!=1)
        return res.status(400).send('error in deleteFeedback')
    return res.status(200).send('feedback deleted!')

}
//update
const updateFeedback=async(req,res)=>{
    const{text,_id}=req.body
    if(!text||!_id)
        return res.status(400).send('error in updateFeedback')
const feedback=await Feedback.findById(_id)
if(!feedback)
    return res.status(400).send('error in updateFeedback')
feedback.text=text
const updated=await feedback.save()
if(!updated)
    return res.status(400).send('error in updateFeedback')
return res.status(200).send('feedback updated!')
}
//getFeedbackAccordingUserTask
const getFeedbackAccordingUserTask=async(req,res)=>{
    const{_id}=req.params
    if(!_id)
        return res.status(400).send('error in getFeedbackAccordingUserTask')
    const feedback=await Feedback.find({userTask:_id})
    if(!feedback)
        return res.status(400).send('error in getFeedbackAccordingUserTask')
return res.json(feedback)
}
module.exports={getFeedbackAccordingUserTask,updateFeedback,createFeadback,deleteFeedback}