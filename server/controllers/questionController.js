const Answer = require('../models/Answer')
const Question = require('../models/Question')
const {funcDeleteAnswer} = require('./answerController')
const funcGetByQuestionAnswers = require('./answerController')

//create
const createQuestion = async (req, res) => {
    const { text, type, options, task, numOfQuestion } = req.body
    console.log({ text, type, options, task, numOfQuestion });

    if (!text || !type || !task || !numOfQuestion)
        return res.status(400).send('error in create question')
    if (type === 'American') {
        if (!options)
            return res.status(400).send('error in create question')
    }
    const question = await Question.create({ text, type, options, task, numOfQuestion })
    if (!question)
        return res.status(400).send('error in create question')
    return res.status(200).send('question created')
}

//update                                                                                  
const updateQuestion = async (req, res) => {
    const { text, options, numOfQuestion, _id } = req.body
    if (!id)
        return res.status(400).send('error in update question')
    const question = await Question.findById(_id)
    if (!question)
        return res.status(400).send('error in update question')
    question.text = text ? text : question.text
    question.options = options ? options : question.options
    question.numOfQuestion = numOfQuestion ? numOfQuestion : question.numOfQuestion
    const updated = await question.save()
    if (!updated)
        return res.status(400).send('error in update question')
    return res.status(200).send('question updated')
}
//func delete
const funcDeleteQuestion = async (_id) => {
    try {
        const question = await Question.findById(_id);
        if (!question) return true; // No question found, nothing to delete

        // Retrieve and delete all answers associated with the question
        const answers = await Answer.find({ question: _id });
        if (answers && answers.length > 0) {
            for (const answer of answers) {
                const deleted = await funcDeleteAnswer(answer._id); // Use funcDeleteAnswer
                if (!deleted) {
                    console.error(`Failed to delete answer with ID: ${answer._id}`);
                    return false; // If any answer deletion fails, return false
                }
            }
        }

        // Delete the question itself
        const deleted = await question.deleteOne();
        if (!deleted) {
            console.error(`Failed to delete question with ID: ${_id}`);
            return false;
        }

        console.log(`Successfully deleted question with ID: ${_id}`);
        return true; // Question deleted successfully
    } catch (error) {
        console.error(`Error in funcDeleteQuestion: ${error.message}`);
        return false; // Return false if an error occurs
    }
};
//delete
const deleteQuestion = async (req, res) => {
    const { _id } = req.params;
    if (!_id) {
        return res.status(400).send('Error in deleteQuestion: Missing _id');
    }

    const deleted = await funcDeleteQuestion(_id); // Await the result of funcDeleteQuestion
    if (!deleted) {
        return res.status(400).send('Error in deleteQuestion: Failed to delete question');
    }

    return res.status(200).send('Question deleted successfully!');
};

//getQuestion According task
const getQuestionsAccordingTask = async (req, res) => {
    const { _id } = req.params
    if (!_id)
        return res.status(400).send('error in getQuestion According task')
    const questions = await Question.find({ task: _id })
    if (!questions)
        return res.status(400).send('error in getQuestion According task')
    res.json(questions)
}


module.exports = { funcDeleteQuestion, createQuestion, updateQuestion, deleteQuestion, getQuestionsAccordingTask }