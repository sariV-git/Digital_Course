const bcrypt = require('bcrypt')
const User = require('../models/User')
const UserCourse = require('../models/UserCourse')
const jwt = require('jsonwebtoken')
const { funcCreateUserCourse } = require('./userCourseController')

//register
const register = async (req, res) => {
    const { username, password, firstName, lastName, email, phone, course } = req.body

    if (!firstName || !username || !password || !email || !course)
        return res.status(400).send('all field are required')
    debugger
    const duplicate = await User.findOne({ username: username })

    if (duplicate)//i need check his password and if she incorrect don't allow him register 
    //after check if this user is already registered for this course and send for him failure
    {
        const match = await bcrypt.compare(password, duplicate.password)
        if (!match)
            return res.status(409).send('duplicate username')
        const alreadyRegistered = UserCourse.find({ user: duplicate._id, course: course })

        if (alreadyRegistered)
            {
                console.log("already registered for this course", alreadyRegistered);
                
                return res.status(401).send('you already regestered for this course')
            }
        const usercourse_id = await funcCreateUserCourse({ user: duplicate._id, course: course })
        if (!usercourse_id)
            return res.status(400).send('failed in create usercourse in register')

        // duplicate.course = [...duplicate.course, course_id]
        return res.status(200).send('you succeed register for addition course')

    }
    const hashedPwd = await bcrypt.hash(password, 10)

    const user = await User.create({ username, password: hashedPwd, name: { firstName: firstName, lastName: lastName }, email, phone })
    if (user) {
        const usercourse_id = funcCreateUserCourse({ user: user._id, course: course })
        if (!usercourse_id)
            return res.status(400).send('failed in create usercourse in register')
        return res.status(200).send('new user created')
    }

    else
        return res.status(400).send('invalid user recieved')
}
const registerManager=async(req,res)=>{
    const { username, password, firstName, lastName, email, phone } = req.body
    const hashedPwd = await bcrypt.hash(password, 10)

    const user = await User.create({ username, password: hashedPwd, name: { firstName: firstName, lastName: lastName }, email, phone })
    if (user) {    
        return res.status(200).send('new user created')
    }

    else
        return res.status(400).send('invalid user recieved')
}

const login = async (req, res) => {
//here i want to return for the user all the courses which he belong to
    const { username, password } = req.body
    console.log({ username, password })
    if (!username || !password)
        return res.status(400).json({ success: false })

    const foundUser = await User.findOne({ username }).lean()//we found the user 


    if (!foundUser)
        return res.status(401).json({ success: false })
                     

    const match = await bcrypt.compare(password, foundUser.password)
    if (!match)
        return res.status(401).json({ success: false })

    //we need check if this user is already find in this specific course and his active equal true

    //to check if the course is exist in this user:
        const userscourses = await UserCourse.find({ user: foundUser._id })

        const belongToTheCourses=userscourses.map(userCourse=>userCourse.course)
        // const course_i = userscourses.filter(uc =>   
        //     uc.course == course && uc.active
        // )
    //     if (course_i.length == 0)
    //         return res.status(401).json({ success: false })//can remove it meyutar???
    
    //relate to the token

    const userInfo = { _id: foundUser._id, name: foundUser.name, role: foundUser.role, username: foundUser.username, email: foundUser.email, phone: foundUser.phone }

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN)
    return res.json({ accessToken: accessToken, success: true, role: foundUser.role ,user:userInfo,belongToTheCourses:belongToTheCourses})//treat at it??

}
//??can remove this function??
const loginManager = async (req, res) => {
    
    const { username, password } = req.body

    if (!username || !password)
        return res.status(400).send('all field are required')

    const foundUser = await User.findOne({ username }).lean()//we found the user 
    console.log(foundUser);

    if (!foundUser)
        return res.status(401).send('unauthorized')


    const match = await bcrypt.compare(password, foundUser.password)
    if (!match)
        return res.status(401).send('unauthorized')

    //relate to the token
    const userInfo = { _id: foundUser._id, name: foundUser.name, role: foundUser.role, username: foundUser.username, email: foundUser.email, phone: foundUser.phone, courses: foundUser.courses }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN)
    res.json({ accessToken: accessToken })
}
module.exports = { login, register, loginManager,registerManager }