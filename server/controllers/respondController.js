const Respond=require('../models/Respond')


//create for user
const createRespond=async(req,res)=>{
    
    const{text,course,user,username}=req.body
    console.log({text,course,user,username});
    
    if(!text||!course||!user)
        return res.status(400).send("error in create respond")
    
    const name=username?username:'ע"ש'
    const respond=await Respond.create({text,course,user,username:name})
    if(!respond)
        return res.status(400).send("error in create respond")
return res.status(201).send('new respond created')
}

//update for manager
const updateRespond=async(req,res)=>{
    const{text,introduce,username,_id}=req.body
    if(!_id)
        return res.status(400).send('error in update respond-missing _id')
    const respond=await Respond.findById(_id)
    if(!respond)
        return res.status(400).send('error in update respond-there is no respond like this')
    respond.text=text?text:respond.text
    respond.introduce=introduce
    respond.username=username?username:respond.username
    const update=respond.save();
    if(!update)
        return res.status(400).send('error in update respond-dont succeed to update')
return res.status(201).json(respond)
}

//delete for manager
const deleteRespond=async(req,res)=>{
    const {_id}=req.params
    if(!_id)
        return res.status(400).send('error in delete respond')
     const respond=await Respond.findById(_id)
     if(!respond)
        return res.status(400).send('error in update respond')
     const deleted= await respond.deleteOne()
     if(deleted.deleteCount!=1)
        return res.status(400).send('error in update respond')
     return res.status(201).send('respond deleted')
}

//getAll for manager
const getAllRespondsAccordingCourse=async(req,res)=>{
    const{course} =req.params
    const responds=await Respond.find({course:course}).lean()
    if(!responds)
        return res.status(400).send('error in get all responds')
    res.json(responds)
}

//getByIntroduce for user
const getAccordingIntroduce=async(req,res)=>{
   console.log('hhhhhhhhhhhhhhhhherehhhhhhhh');
   
   
    const{course} =req.params
    if(!course)
        return res.status(400).send('error in get by introduce responds or there is no one that answer on this condition')

    const responds=await Respond.find({introduce:true,course:course}).lean()
     if(!responds)
        return res.status(400).send('error in get by introduce responds or there is no one that answer on this condition')
return res.json(responds)
}

module.exports={createRespond,updateRespond,deleteRespond,getAccordingIntroduce,getAllRespondsAccordingCourse}