// import { useDispatch, useSelector } from "react-redux"
// import { useLocation, useNavigate } from "react-router-dom";
// import { setLesson } from "../store/reducer/lessonSlice";
// import { useEffect, useState } from "react";
// import LessonVideo from "./LessonVideo";
// import { Button } from "primereact/button";
// import axios from "axios";
// const Lesson = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const location = useLocation()
//   // const [task, setTask] = useState(null)
//   const token = useSelector(state => state.token.token)
//   const lesson = location.state.lesson
//   // const [user, setUser] = useState(null);
//   // const [showTask, setShowTask] = useState(false)
//   // const [userTask, setUserTask] = useState(null)


//   useEffect(() => {
//     dispatch(setLesson({ newLesson: lesson }))//??realy need it??

//     // const loadData = async () => {
//     //   try {
//     //     //load the data about the task
//     //     const taskResponse = await axios.get(`http://localhost:5000/task/AccordingLesson/${lesson._id}`, {
//     //       headers: {
//     //         Authorization: `Bearer ${token}`
//     //       }
//     //     })
//     //     //load the data about the user
//     //     const userResponse = await axios.get('http://localhost:5000/user/byToken', {
//     //       headers: {
//     //         Authorization: `Bearer ${token}`
//     //       }
//     //     });
//     //     setUser(userResponse.data)
//     //     console.log('userResponse', userResponse);

//     //     setTask(taskResponse.data)
//     //     console.log('task', taskResponse.data)
//     //     //load this data to check if already the user did this task
//     //     const respondUserTask = await axios.get(`http://localhost:5000/userTask/ByUserAndTask/${userResponse.data._id}/${taskResponse.data._id}`, {
//     //       headers: {
//     //         Authorization: `Bearer ${token}`
//     //       }
//     //     })
//     //     console.log('respondUserTask', respondUserTask.data);

//     //     if (!respondUserTask.data.userTask)
//     //       setShowTask(true)
//     //     else
//     //       setUserTask(respondUserTask.data.userTask)
//     //   } catch (error) {
//     //     console.log('error in loaddata in lessonpage', error);
//     //   }
//     // }
//     // loadData()

//   }, [])

//   // const goToTask = () => {
//   //   navigate('/Task', { state: { task: task } })
//   // }

//   // const seeTheTask = async () => {
//   //   let arrayAnswers = []
//   //   console.log('in see the task');
//   //   // let QuestionsAnswersArray=[]//the array of objects every object look like :{questionText:"  ",answerText:"  "}
//   //   const answers = userTask.answers//an array of id of the answers of the user
//   //   console.log('answers Before: ', answers);
//   //   try {
//   //     answers.forEach(async answer => {
//   //       const resAnswer = await axios.get(`http://localhost:5000/answer/${answer}`, {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`
//   //         }
//   //       })
//   //       console.log('resAnswer', resAnswer.data);
//   //       arrayAnswers.push(resAnswer.data)
//   //       return (resAnswer.data)
//   //     })
//   //     const taskQuestions = await axios.get(`http://localhost:5000/question/AccordingTask/${task._id}`, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`
//   //       }
//   //     })
//   //     console.log("anssssswers: ",arrayAnswers,'qqqqqquestion',taskQuestions);

//   //     navigate('/UserTask', { state: {  questions: taskQuestions.data ,answers:arrayAnswers} })

//   //   } catch (error) {
//   //     console.log('an error in see all the answers', error);
//   //   }


//   // }


//   return (<>
//     <h2>Lesson:{lesson.name}</h2>
//     <LessonVideo path={lesson.path} />
//     {/* {task && task.title} */}
//     {/* {(showTask && task) ? <Button onClick={() => { goToTask() }}>do the task</Button> : <Button onClick={() => seeTheTask()}>see your task</Button>} */}
//     {/* <Button onClick={() => { navigate('/ManagerUsersAnswers', { state: { lesson: lesson } }) }}>usersTask</Button> */}
//   </>)
// }

// export default Lesson


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setLesson } from "../store/reducer/lessonSlice";

const Lesson = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const lesson = location.state?.lesson;

  useEffect(() => {
    dispatch(setLesson({ newLesson: lesson })); // Save the lesson in the Redux store
  }, [dispatch, lesson]);

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <h1 className="lesson-title">{lesson?.name}</h1>
      </header>
      <div className="lesson-video-container">
        <video
          src={`http://localhost:5000/upload/${lesson?.path}`}
          controls
          className="lesson-video"
        />
      </div>
    </div>
  );
};

export default Lesson;

// CSS for styling
const css = `
/* General page styling */
.lesson-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  background: linear-gradient(to bottom, #f3e5f5, #e8eaf6);
  min-height: 100vh;
}

/* Header styling */
.lesson-header {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  padding: 20px 0;
  background: linear-gradient(to right, #8e24aa, #6a1b9a);
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.lesson-title {
  font-size: 3rem;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-family: "Poppins", sans-serif;
  margin: 0;
}

/* Video container styling */
.lesson-video-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 20px;
}

.lesson-video {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
`;

// Inject CSS into the document
const style = document.createElement("style");
style.textContent = css;
document.head.appendChild(style);