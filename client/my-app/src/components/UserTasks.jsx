


import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner"; // שיפור חוויית טעינה
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FileExample from "./File";

// Introduce all the tasks of one User
const UserTasks = () => {
  const location = useLocation();
  const user_id = location.state.user_id; // TODO: ודא שהנתון הזה קיים ב-location.state
  const userName = location.state.userName; // TODO: ודא שהנתון הזה קיים ב-location.state
  const token = useSelector((state) => state.token.token); // Redux token
  const [loading, setLoading] = useState(true); // מצב טעינה
  const [tabsTask, setTabsTask] = useState([]); // המשימות והמידע
  const [showInputFeedback, setShowInputFeedback] = useState(false); // טופס פידבק
  const feedbackText = useRef(null);
 const lessons=useSelector(state=>state.lesson.lessons)
  // טוען את המידע על המשימות של המשתמש
  
  
  useEffect(() => {//settabstask
  const loadTasksUserData=async()=>{
    try {
      console.log("lessons", lessons);
      
      const finalArray = await Promise.all(lessons.map(async lesson => {
          const matchTaskRes = await axios.get(`http://localhost:5000/task/AccordingLesson/${lesson._id}`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
          const task = matchTaskRes.data
          const matchUserTaskRes = await axios.get(`http://localhost:5000/userTask/getUserTaskAccordingUserAndTask/${user_id}/${task._id}`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })

          const userTask = matchUserTaskRes.data.userTask
          if (userTask) {
              const answers_id = userTask.answers

              const answers = await Promise.all(answers_id.map(async answer_id => {//the full answers
                  const answerRes = await axios.get(`http://localhost:5000/answer/${answer_id}`, {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  })
                  return answerRes.data
              }))
              const questionsRes = await axios.get(`http://localhost:5000/question/AccordingTask/${task._id}`, {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              })

              const feedback = await axios.get(`http://localhost:5000/feedback/AccordingUserTask/${userTask._id}`, {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              })
              // const feedbackText = feedback.data._id ? feedback.data.text : "אין הערה"

              return { exist: true, userTask_id:userTask._id,numOfLesson: lesson.numOfLesson,titleLesson:lesson.name, titleTask: task.title, questions: questionsRes.data, answers: answers, feedback: feedback.data }

          }
          else {//ther is no users tasks
              return { exist: false, numOfLesson: lesson.numOfLesson,titleLesson:lesson.name, titleTask: task.title, questions: [], answers: [], feedback: null }
          }
      }))
      console.log("fffffinalArray", finalArray);
      setTabsTask(finalArray)

  }
  catch (e) {
      console.log("it failed--in load usertasks ", e);
  }
  setLoading(false)
  }

    loadTasksUserData();
  }, [user_id, token]); // TODO: ודא שהמשתנים האלה נכונים להקשר שלך

  // שמירת פידבק חדש
  const keepFeedback = async (userTask_id) => {
    const newFeedback = {
      userTask: userTask_id,
      text: feedbackText.current.value,
    };
    try {
      const feedbackResponse = await axios.post(
        "http://localhost:5000/feedback",
        newFeedback,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Feedback saved:", feedbackResponse);
      feedbackText.current.value = "";
      setShowInputFeedback(false);
      alert("הפידבק נשמר בהצלחה!");
    } catch (error) {
      console.error("Error saving feedback:", error);
    }
  };

  // עדכון פידבק קיים
  const updateFeedback = async (feedback_id) => {
    const updatedFeedback = {
      _id: feedback_id,
      text: feedbackText.current.value,
    };
    try {
      const feedbackUpdateResponse = await axios.put(
        "http://localhost:5000/feedback",
        updatedFeedback,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Feedback updated:", feedbackUpdateResponse);
      setShowInputFeedback(false);
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  // מצב טעינה
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <ProgressSpinner />
        <p>טוען נתונים...</p>
      </div>
    );
  }

  // רינדור המשימות
  return (
    <>
      <div className="card">
       
        <Accordion>
  {tabsTask.map((tabTask, index) => {
    if (!tabTask.exist) {
      // If exist is false, return an AccordionTab with a message
      return (
        <AccordionTab key={index} header={`Lesson: ${tabTask.numOfLesson}. ${tabTask.titleLesson}--missing task`}>
          <p>{tabTask.titleTask}-No tasks are available for this lesson.</p>
        </AccordionTab>
      );
    }

    // If exist is true, render the normal AccordionTab
    return (
      <AccordionTab
        key={index}
        header={`Lesson: ${tabTask.numOfLesson}. ${tabTask.titleLesson}`}
      >
        <>Task: {tabTask.titleTask}</>
        <br />
        {tabTask.questions.map((question) => {
          const matchAnswer = tabTask.answers.find(
            (answer) => answer.question === question._id
          );
          return (
            <div key={question._id}>
              <p>Question: {question.text}</p>
              <p>Answer: {matchAnswer ? matchAnswer.text : "No answer provided"}</p>
            </div>
          );
        })}
        {!tabTask.feedback._id ? (
          <>
            <Button
              onClick={() => setShowInputFeedback(true)}
              label="Add Feedback"
            />
            {showInputFeedback && (
              <>
                <InputText
                  ref={feedbackText}
                  placeholder="Enter feedback..."
                />
                <Button
                  onClick={() =>
                    feedbackText.current.value &&
                    keepFeedback(tabTask.userTask_id)
                  }
                  label="Save"
                />
              </>
            )}
          </>
        ) : (
          <>
            <Button
              onClick={() => setShowInputFeedback(true)}
              label="Update Feedback"
            />
            {showInputFeedback && (
              <>
                <InputText
                  ref={feedbackText}
                  defaultValue={tabTask.feedback.text}
                />
                <Button
                  onClick={() =>
                    feedbackText.current.value &&
                    updateFeedback(tabTask.feedback._id)
                  }
                  label="Update"
                />
              </>
            )}
          </>
        )}
      </AccordionTab>
    );
  })}
</Accordion>
        <FileExample contentFile={tabsTask} userName={userName} />
      </div>
    </>
  );
};

export default UserTasks;

