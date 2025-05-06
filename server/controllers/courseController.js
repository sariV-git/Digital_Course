const Course = require('../models/Course')
const { funcDeleteLesson } = require('./lessonController')
const Lesson = require('../models/Lesson')
const { funcdDeleteUserCourse } = require('./userCourseController')
const Task = require('../models/Task')
const fs = require('fs');//for delete the video
const path=require('path')


//create
const createCourse = async (req, res) => {
    console.log('in create course!!');
    
    const { name, information, speaker } = req.body   
    const pathTriler = req.files.pathTriler?req.files.pathTriler[0].filename:null
    const backgroundImage = req.files.backgroundImage?req.files.backgroundImage[0].filename:null
  console.log('backgroundImage',backgroundImage);
  
    if(!pathTriler||!backgroundImage)
        return res.status(400).send('need image in createCourse')
    if (!name)
        return res.status(400).send('need name in createCourse')
    const course = await Course.create({ name, speaker, information, pathTriler,backgroundImage })
    if (!course)
        return res.status(400).send('error with create course')
    return res.send('succeed to create course')
}

//getAllLessonsOfThisCourse
const getAllLessonAccordingCourse=async(req,res)=>{

    const {_id}=req.params
    console.log("_id: ", _id);
    
    if(!_id)
        return res.status(400).send('error in getAllLessonAccordingCourse missing an id of course')
    const course=await Course.findById(_id)
    if(!course)
        return res.status(400).send('error in getAllLessonAccordingCourse there is no this course like this _id ')
    const lessons=await Lesson.find({course:_id})
    if(!lessons)
        return res.status(400).send('error in getAllLessonAccordingCourse dont succeed find lessons')
res.json(lessons)
}
//update
const updateCourse = async (req, res) => {
    const { name, information } = req.body
    const course = await Course.findById(_id)
    if (!course)
        return res.status(400).send('error in updateCourse')
    course.name = name ? name : course.name
    course.information = information ? information : course.information
    const updated = await course.save()
    if (!updated)
        return res.status(400).send('error in updateCourse')
    return res.send(`updated course ${_id}`)
}

//getAll
const getAllCourses = async (req, res) => {
    const courses = await Course.find()
    if (!courses)
        return res.status(400).send('error in get AllCourse')
    return res.json(courses)
}

//getbyid
const getCourse = async (req, res) => {
    console.log('in get Course');
    
    const { _id } = req.params
    if (!_id)
        return res.status(400).send('error in getCourse')
    const course = await Course.findById(_id)
    if (!course)
        return res.status(400).send('error in getCourse')

    return res.json(course)
}

const getSpeakerInformationByCoursId = async (req,res) => {
    const { _id } = req.params
    if (!_id) {
        return res.status(400).send('id is required')
    }
    const course = await Course.findById(_id).populate('speaker',{name:1,informationOnSpeaker:1}).lean();
    if (!course) {
        return res.status(400).send('Course not found')
    }
    // const speaker =await course.speaker.populate('User', { name: 1, informationOnSpeaker: 1 })
    console.log("------------------",course.speaker);
    // if (!speaker) {
    //     return res.status(400).send('error in getSpeakerInformation')
    // }
    res.json(course.speaker)
}

//delete
const deleteCourse = async (req, res) => {
    const { _id } = req.params;
    if (!_id) {
        return res.status(400).send('Error in deleteCourse: Missing _id'); // Validate input
    }

    try {
        const course = await Course.findById(_id);
        if (!course) {
            return res.status(400).send('Error in deleteCourse: Course not found'); // Course does not exist
        }

        // Delete all lessons associated with the course
        const lessons = await Lesson.find({ course: _id });
        if (lessons && lessons.length > 0) {
            for (const lesson of lessons) {
                const deleted = await funcDeleteLesson(lesson._id); // Await the result of funcDeleteLesson
                if (!deleted) {
                    console.error(`Failed to delete lesson with ID: ${lesson._id}`);
                    return res.status(400).send('Error in deleteCourse: Failed to delete lessons');
                }
            }
        }

        // Delete the course itself
        const deletedCourse = await course.deleteOne();
        if (!deletedCourse) {
            console.error(`Failed to delete course with ID: ${_id}`);
            return res.status(400).send('Error in deleteCourse: Failed to delete course');
        }

        // Delete the course trailer video
        const absolutePath = path.join(__dirname, '../public/upload', course.pathTriler);
        await fs.promises.unlink(absolutePath).catch((err) => {
            console.error(`Error deleting course trailer video: ${err.message}`);
            throw new Error('Failed to delete course trailer video');
        });

        console.log(`Successfully deleted course with ID: ${_id}`);
        return res.status(200).send(`Course with ID ${_id} deleted successfully!`);
    } catch (error) {
        console.error(`Error in deleteCourse: ${error.message}`);
        return res.status(500).send('Server error in deleteCourse'); // Internal server error response
    }
};




module.exports = { createCourse, updateCourse, getAllCourses, deleteCourse, getCourse, getSpeakerInformationByCoursId ,getAllLessonAccordingCourse}