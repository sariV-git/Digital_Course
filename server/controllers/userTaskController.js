const UserTask = require('../models/UserTask')
const { funcDeleteAnswer } = require('./answerController')
const { Feedback } = require('../models/Feedback')
//create-all the answers of one user

const createUserTask = async (req, res) => {
   const { user, task, answers } = req.body
   if (!user || !task || !answers)
      return res.status(400).send('error in createUserTask')
   const userTask = await UserTask.create({ user, task, answers })
   if (!userTask)
      return res.status(400).send('error in createUserTask')
   return res.status(200).send('UserTask created')
}


//delete func
const funcDeleteUserTask = async (_id) => {
   const userTask = await UserTask.findById(_id)
   if (!userTask)
      return true//there is no usertask like this
   const answers = userTask.answers
   if (answers) {
      answers.forEach(answer => { if (!funcDeleteAnswer(answer._id)) return false })
   }
   const feedback = await Feedback.findOne({ userTask: _id })
   if (feedback) {
      const deleted = await feedback.deleteOne()
      if (deleted.deleteCount != 1) {
         console.log('dont succeed delete feedback');
         return false
      }
   }
   const deleted = await userTask.deleteOne()
   if (deleted.deleteCount != 1)
      return false
   return true
}

//delete
const deleteUserTask = async (req, res) => {
   const { _id } = req.body
   if (!_id)
      return res.status(400).send('error in deleteUserTask')
   if (!funcDeleteUserTask(_id))
      res.status(400).send('error in deleteUserTask')
   return res.status(200).send('userTask deleted')
}


//get UserTask by user and task
const getUserTaskByUserAndTask = async (req, res) => {
   const { user, task } = req.params
   if (!user || !task)
      return res.status(400).send('error in getUserTaskByUserAndTask--missing user or task')
   const userTask = await UserTask.findOne({ user: user, task: task })
   const found = userTask ? true : false
   return res.json({ userTask, found }).status(200)
}

//get usersTask by task--??mabye can to erase it becauase ->
const getByTask = async (req, res) => {
   const { task } = req.params
   if (!task)
      return res.status(400).send('error in getBytask in user task--missing task ')
   const usersTask = await UserTask.find({ task: task }).populate('user').populate('answers')
   console.log('in usertask after the populate: ', usersTask);

   return res.json({ usersTask }).status(200)

}
//-->
//get all usertasks according user
const allUserTasksAccordingUser = async (req, res) => {
   const { user } = req.params
   if (!user)
      return res.status(400).send('error in allUserTasksAccordingUser in user task--missing task ')
   const usersTask = await UserTask.find({ user: user }).populate('user')
   console.log('the usersTask: ', usersTask);
   if (!usersTask)
      return res.status(200).send('there is no usertask for this user')
   return res.json({ usersTask }).status(200)
}


// const getByTask = async (req, res) => {
//    const { task } = req.params;

//    if (!task) {
//       return res.status(400).send('Error in getByTask: missing task');
//    }

//    try {
//       const usersTask = await UserTask.find({ task }).populate('user');

//       // Use Promise.all to await all async operations inside map
//       const withAnswers = await Promise.all(
//          usersTask.map(async (userTask) => {
//             // Assuming answers is a populated field reference
//             await userTask.populate('answers.answer');
//             return userTask;
//          })
//       );

//       return res.status(200).json({ usersTask: withAnswers });
//    } catch (err) {
//       console.error('Error in getByTask:', err);
//       return res.status(500).send('Server error');
//    }
// };

module.exports = { allUserTasksAccordingUser,getByTask, getUserTaskByUserAndTask, deleteUserTask, funcDeleteUserTask, createUserTask }