const UserTask = require('../models/UserTask')
const { funcDeleteAnswer } = require('./answerController')
const  Feedback  = require('../models/Feedback')
const { funcDeleteFeedback } = require('./feedbackController')
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
   try {
      const userTask = await UserTask.findById(_id);
      if (!userTask) return true; // No user task found, nothing to delete

      // Delete all answers associated with the user task
      const answers = userTask.answers;
      if (answers && answers.length > 0) {
         for (const answer of answers) {
            const deleted = await funcDeleteAnswer(answer._id); // Await the result of funcDeleteAnswer
            if (!deleted) {
               console.error(`Failed to delete answer with ID: ${answer._id}`);
               return false; // If any answer deletion fails, return false
            }
         }
      }

      // Delete feedback associated with the user task using funcDeleteFeedback
      const feedback = await Feedback.findOne({ userTask: _id });
      if (feedback) {
         const deletedFeedback = await funcDeleteFeedback(feedback._id); // Use funcDeleteFeedback
         if (!deletedFeedback) {
            console.error(`Failed to delete feedback for userTask ID: ${_id}`);
            return false;
         }
      }

      // Delete the user task itself
      const deletedUserTask = await userTask.deleteOne();
      if (!deletedUserTask) {
         console.error(`Failed to delete user task with ID: ${_id}`);
         return false;
      }

      console.log(`Successfully deleted user task with ID: ${_id}`);
      return true; // All deletions were successful
   } catch (error) {
      console.error(`Error in funcDeleteUserTask: ${error.message}`);
      return false; // Return false if an error occurs
   }
};

//delete
const deleteUserTask = async (req, res) => {
   const { _id } = req.body; // Extract the user task ID from the request body
   if (!_id) {
      return res.status(400).send('Error in deleteUserTask: Missing _id'); // Validate input
   }

   try {
      const deleted = await funcDeleteUserTask(_id); // Await the result of funcDeleteUserTask
      if (!deleted) {
         return res.status(400).send('Error in deleteUserTask: Failed to delete user task'); // Handle failure
      }

      return res.status(200).send('UserTask deleted successfully!'); // Success response
   } catch (error) {
      console.error(`Error in deleteUserTask: ${error.message}`); // Log unexpected errors
      return res.status(500).send('Server error in deleteUserTask'); //

   }
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
   const userTasks = await UserTask.find({ user: user }).populate('user')
   console.log('the usersTask: ', userTasks);
   if (!userTasks)
      return res.status(200).send('there is no usertask for this user')
   return res.json({ userTasks }).status(200)
}

const getUserTaskAccordingUserAndTask = async (req, res) => {
   const { user, task } = req.params
   if (!user || !task)
      return res.status(400).send('error in getUserTaskAccordingUserAndTask in user task--missing task ')
   const userTask = await UserTask.findOne({ user: user, task: task }).populate('user')
   console.log('the usersTask: ', userTask);
   if (!userTask)
      return res.status(200).send('there is no usertask for this user')//??
   return res.json({ userTask }).status(200)
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

module.exports = { getUserTaskAccordingUserAndTask, allUserTasksAccordingUser, getByTask, getUserTaskByUserAndTask, deleteUserTask, funcDeleteUserTask, createUserTask }