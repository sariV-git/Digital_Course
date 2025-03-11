const UserCourse = require('../models/UserCourse')

//create
const funcCreatUserCourse = async ({ user, course }) => {
    if (!user || !course)
        return false
    const usercourse = await UserCourse.create({ user, course })
    if (!usercourse)
        return null
    return usercourse._id
}


//getAll
const getAllUserCourses = async (req, res) => {
    const usercourses = await UserCourse.find()
    if (!usercourses)
        return res.status(404).send('error in getAll of usercourse')
    return res.json(usercourses)
}

//getById
const getByIdUserCourse = async (req, res) => {
    const { _id } = req.params
    if (!_id)
        return res.status(404).send('error in getById of usercourse')
const userCourse=await UserCourse.findById(_id)
if(!usercourse)
    return res.status(404).send('error in getById of usercourse')
res.json(usercourse)
}


//getUserCourseAccordingUser
const getUserCourseAccordingUser=async(req,res)=>{
    const{_id}=req.params
    if(!_id)
        return res.status(404).send('error in getUserCourseAccordingUser of usercourse')
    const usercourses=await UserCourse.find({user:_id})
    if(!usercourses)
        return res.status(404).send('error in getUserCourseAccordingUser of usercourse')
return res.json(usercourses)
}


//update
const updateUserCourse=async(req,res)=>{
    const {_id,active,numLesson}=req.body
    if(!_id)
        return res.status(404).send('error in updateUserCourse of usercourse')
    const usercourse=await UserCourse.findById(_id)
    if(!usercourse)
        return res.status(404).send('error in updateUserCourse of usercourse')
    usercourse.numLesson=numLesson?numLesson:usercourse.numLesson
    if(req.userMiddle.role==='Admin')
    usercourse.active=active?active:usercourse.active
    const updated=await UserCourse.save()
    if(!updated)
        return res.status(404).send('error in updateUserCourse of usercourse')
return res.send('succeed update usercourse')
}


//funcDeleteUseCourse
const funcDeleteUseCourse=async(_id)=>{
    const usercourse=await UserCourse.findById(_id)
    if(!usercourse)
        return false
    const deleted=await usercourse.delete()
    if(deleted.deleteCount!=1)
        return false
    return true
}

//delete
const deleteUserCourse=async(_id)=>{
    if(!funcDeleteUseCourse(_id))
        return res.status(404).send('error in deleteUserCourse of usercourse')
return res.send('succeed delete usercourse')
}
module.exports = {getAllUserCourses,getAllUserCourses,getByIdUserCourse,getUserCourseAccordingUser,funcCreatUserCourse,funcDeleteUseCourse,deleteUserCourse,updateUserCourse}
