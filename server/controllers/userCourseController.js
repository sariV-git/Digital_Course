const UserCourse = require('../models/UserCourse')

//create
const funcCreateUserCourse = async ({ user, course }) => {
    console.log({ user, course });
    if (!user || !course)
        return false
    const usercourse = await UserCourse.create({ user, course })
    console.log(usercourse);
    if (!usercourse)
        return false
    return true
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
    const userCourse = await UserCourse.findById(_id)
    if (!usercourse)
        return res.status(404).send('error in getById of usercourse')
    res.json(usercourse)
}



//getUserCourseAccordingUser
const getUserCourseAccordingUser = async (req, res) => {
   console.log('in Usercourse---------');
   
    const { _id } = req.params
    if (!_id)
        return res.status(404).send('error in getUserCourseAccordingUser of usercourse')
    const usercourses = await UserCourse.find({ user: _id })
    if (!usercourses)
        return res.status(404).send('error in getUserCourseAccordingUser of usercourse')
    return res.json(usercourses)
}


//get users according a specific courses
const getUsersAccordingCourse = async (req, res) => {
    const { _id } = req.params//the id of the course
    if (!_id)
        return res.status(404).send('error in getUsersAccordingCourse of usercourse')
    //  const usersFound=await UserCourse.find({course:_id}).populate('user',{firstName:1, lastName:1, email:1, username:1, phone:1, _id:1})
    const usersFound = await UserCourse.find({ course: _id })
        .populate('user'); // Populate 'user' field with the full User document

    // Now extract only the user data from each userCourse
    const users = usersFound.map(userCourse => userCourse.user);

    console.log('Users:', users); // Log the user data
    if (!usersFound)
        return res.status(404).send('error in getUsersAccordingCourse of usercourse')
    res.json(users)
}
//update
const updateUserCourse = async (req, res) => {
    const { _id, active, numLesson } = req.body
    if (!_id)
        return res.status(404).send('error in updateUserCourse of usercourse')
    const usercourse = await UserCourse.findById(_id)
    if (!usercourse)
        return res.status(404).send('error in updateUserCourse of usercourse')
    usercourse.numLesson = numLesson ? numLesson : usercourse.numLesson
    if (req.userMiddle.role === 'Admin')
        usercourse.active = active ? active : usercourse.active
    const updated = await UserCourse.save()
    if (!updated)
        return res.status(404).send('error in updateUserCourse of usercourse')
    return res.send('succeed update usercourse')
}


//funcDeleteUseCourse
const funcDeleteUseCourse = async (_id) => {
    const usercourse = await UserCourse.findById(_id)
    if (!usercourse)
        return false
    const deleted = await usercourse.delete()
    if (deleted.deleteCount != 1)
        return false
    return true
}

//delete
const deleteUserCourse = async (_id) => {
    if (!funcDeleteUseCourse(_id))
        return res.status(404).send('error in deleteUserCourse of usercourse')
    return res.send('succeed delete usercourse')
}


module.exports = { getUsersAccordingCourse, getAllUserCourses, getAllUserCourses, getByIdUserCourse, getUserCourseAccordingUser, funcCreateUserCourse, funcDeleteUseCourse, deleteUserCourse, updateUserCourse }
