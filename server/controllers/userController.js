const User = require('../models/User')
const UserCourse = require('../models/UserCourse')
const { funcDeleteUserCourse } = require('./userCourseController')
//get by username
// const getUserByUserName= async (req, res) => {
//     const { username } = req.params
//     if (!username )
//         return res.status(400).send('error in getUserByUserNameAndPassword')
//     const foundUser = await User.findOne({ username:username })//we found the user 
//     if (!foundUser)
//         return res.status(401).send('not found user like this username')
//     // if(foundUser.role=='User')
//     // foundUser.role='Speeker'
// // const updated=await foundUser.save()
// // if(!updated)
// //     return res.status(401).send('unauthorized')
// console.log('succeed arive to here',foundUser);

// return res.json(foundUser)
// }

//update

const getUserByUserName = async (req, res) => {
        const { username } = req.params;

        if (!username) {
            return res.status(400).send('error in getUserByUserNameAndPassword');
        }

        const foundUser = await User.findOne({ username });

        if (!foundUser) {
            return res.status(401).send('not found user like this username');
        }

        console.log('headersSent',res.headersSent);
        
        if (!res.headersSent) {
            console.log('succeed arive to here', foundUser);
            return res.json(foundUser);
          }
   
};

const getUserByToken=(req,res)=>{
    if(!req.userMiddleware)
        return res.status(400).send('error in get userbytoken')
    console.log('in get user by token');
    const user=req.userMiddleware
    return res.json(user).status(200)
}

const updateUser = async (req, res) => {
    
    const { phone, email, firstName, lastName, _id } = req.body
    const user = User.findById(_id)
    user.name.firstName = firstName ? firstName : user.firstName
    user.name.lastName = lastName ? lastName : user.lastName
    user.phone = phone ? phone : user.phone
    user.email = email ? email : user.email
    const updateUser = await user.save()
    // if(!updateUser)
    //     return res.send('failed at update user')
    return res.send(`succeed to update user by id ${_id}`)
}

//delete
const deleteUser = async (req, res) => {
    const { _id } = req.params
    if (!_id)
        return res.status(400).send('need  _id in deleteUser user')

    const user = await User.findById(_id).exec()
    const usersCourse = await UserCourse.find({ user: _id })
    if (usersCourse) {
        usersCourse.forEach(async usercourse => {
            if (!await funcDeleteUserCourse(usercourse._id))
                return res.status(400).send('error in deleteUser')
        });
    }
    if (!user)
        return res.status(400).send('User not found')
    const deleted = await user.deleteOne()
    if (deleted.deleteCount != 1)
        return res.status(400).send('error in deleteUser')
    if (!usersCourse)
        return res.status(400).send('error in deleteUser')

    res.send('user deleted!')


}

//getAll 
const getAllUsers = async (req, res) => {
    const users = await User.find({}, { password: 0, username: 0 })
    //  console.log("users",users);
    if (!users)
        return res.status(400).send('failed in getAllUsers')
    return res.json(users)
}


//getById
const getUserById = async (req, res) => {
    const { _id } = req.params
    if (!_id)
        return res.status(400).send('need id in getuserbyid')
    const user = await User.findOne({ _id: _id }, { password: 0 })
    if (!user)
        return res.send('error in getuserbyid').status(400)
    res.json(user)
}



module.exports = {
    deleteUser, getUserByUserName, updateUser, getAllUsers, getUserById,getUserByToken
}

//  const getAllUsersWithCourses = async (req, res) => {
//     const users = await User.find({}, { password: 0, username: 0 }).populate("courses")
//     console.log(users)
//     if (!users)
//         return res.status(400).send('failed in getAllUSers')
//     return res.json(users)
// }