const Answer = require('../models/Answer')

//create 
const createAnswer = async (req, res) => {

    const { text, question, user } = req.body
    console.log({ text, question, user });

    if (!text || !question || !user)
        return res.status(400).send('error in create answer')
    const answer = await Answer.create({ text, question, user });
    if (!answer)
        return res.status(400).send('error in create answer')
    return res.status(200).json({ _id: answer._id, message: 'created answer!' })
}

//update
const updateAnswer = async (req, res) => {
    const { _id, text, question, user } = req.body
    if (!_id)
        return res.status(400).send('error in update answer')
    const answer = await Answer.create(_id)
    if (!answer)
        return res.status(400).send('error in update answer')
    answer.text = text ? text : answer.text
    answer.question = question ? question : answer.question
    answer.user = user ? user : answer.user
    const updated = await answer.save()
    if (!updated)
        return res.status(400).send('error in update answer')
    return res.status(200).send('answer updated!')
}

//get by id
const getAnswerById = async (req, res) => {
    const { _id } = req.params
    if (!_id)
        return res.status(400).send('error in get by id answer--missing id')
    const answer = await Answer.findById(_id)
    if (!_id)
        return res.status(400).send('error in get by id answer')
    return res.status(200).json(answer)
}

//delete one answer                    
const funcDeleteAnswer = async (_id) => {
    const answer = await Answer.findById(_id)
    if (!answer)
        return false
    const deleted = await answer.deleteOne()
    if (deleted.deleteCount != 1)
        return false
    return true
}
//delete
const deleteAnswer = async (req, res) => {
    const { _id } = req.params
    if (!_id)
        return res.status(400).send('error in delete answer')
    if (!funcDeleteAnser(_id))
        return res.status(400).send('error in delete answer')
    return res.status(200).send('answer deleted!')

}
//getAllAnswers
const getAllAnswers = async (req, res) => {
    const answers = await Answer.find().lean();
    if (!answers)
        return res.status(400).send('error in getAll answers')
    return res.json(answers)
}


const funcGetByQuestionAnswers = async (_id) => {
    const answers = await Answer.find({ question: _id })
    if (!answers)
        return null
    return answers
}
//getAll answers by question
const getAnswersAccordingQuestion = async (req, res) => {
    const { _id } = req.params//the id of the question
    if (!_id)
        return res.status(400).send('error in get answers according question')
    const answers = funcGetByQuestionAnswers(_id).lean()
    if (!answers)
        return res.status(400).send('error in get answers according question or there is no answer according this question')
    return res.json(answers)
}

module.exports = { getAnswerById, funcGetByQuestionAnswers, funcDeleteAnswer, createAnswer, updateAnswer, deleteAnswer, getAllAnswers, getAnswersAccordingQuestion }