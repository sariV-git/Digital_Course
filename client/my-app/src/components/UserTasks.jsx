
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { Button } from "primereact/button";
// import { Accordion, AccordionTab } from "primereact/accordion";
// import { InputText } from "primereact/inputtext";
// import { ProgressSpinner } from "primereact/progressspinner";
// import { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import FileExample from "./File";

// const UserTasks = () => {
//   const location = useLocation();
//   const user_id = location.state?.user_id; // Ensure user_id exists
//   const userName = location.state?.userName; // Ensure userName exists
//   const token = useSelector((state) => state.token.token);
//   const lessons = useSelector((state) => state.lesson.lessons);
//   const [loading, setLoading] = useState(true);
//   const [tabsTask, setTabsTask] = useState([]);
//   const [showInputFeedback, setShowInputFeedback] = useState(false);
//   const feedbackText = useRef(null);

//   useEffect(() => {
//     const loadTasksUserData = async () => {
//       try {
//         const finalArray = await Promise.all(
//           lessons.map(async (lesson) => {
//             const matchTaskRes = await axios.get(
//               `http://localhost:5000/task/AccordingLesson/${lesson._id}`,
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );
//             const task = matchTaskRes.data;

//             const matchUserTaskRes = await axios.get(
//               `http://localhost:5000/userTask/getUserTaskAccordingUserAndTask/${user_id}/${task._id}`,
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );

//             const userTask = matchUserTaskRes.data.userTask;
//             if (userTask) {
//               const answers = await Promise.all(
//                 userTask.answers.map(async (answer_id) => {
//                   const answerRes = await axios.get(
//                     `http://localhost:5000/answer/${answer_id}`,
//                     {
//                       headers: {
//                         Authorization: `Bearer ${token}`,
//                       },
//                     }
//                   );
//                   return answerRes.data;
//                 })
//               );

//               const questionsRes = await axios.get(
//                 `http://localhost:5000/question/AccordingTask/${task._id}`,
//                 {
//                   headers: {
//                     Authorization: `Bearer ${token}`,
//                   },
//                 }
//               );

//               const feedback = await axios.get(
//                 `http://localhost:5000/feedback/AccordingUserTask/${userTask._id}`,
//                 {
//                   headers: {
//                     Authorization: `Bearer ${token}`,
//                   },
//                 }
//               );

//               return {
//                 exist: true,
//                 userTask_id: userTask._id,
//                 numOfLesson: lesson.numOfLesson,
//                 titleLesson: lesson.name,
//                 titleTask: task.title,
//                 questions: questionsRes.data,
//                 answers: answers,
//                 feedback: feedback.data,
//               };
//             } else {
//               return {
//                 exist: false,
//                 numOfLesson: lesson.numOfLesson,
//                 titleLesson: lesson.name,
//                 titleTask: task.title,
//                 questions: [],
//                 answers: [],
//                 feedback: null,
//               };
//             }
//           })
//         );
//         setTabsTask(finalArray);
//       } catch (e) {
//         console.error("Error loading user tasks:", e);
//       }
//       setLoading(false);
//     };

//     loadTasksUserData();
//   }, [user_id, token, lessons]);

//   const keepFeedback = async (userTask_id) => {
//     const newFeedback = {
//       userTask: userTask_id,
//       text: feedbackText.current.value,
//     };
//     try {
//       await axios.post("http://localhost:5000/feedback", newFeedback, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       feedbackText.current.value = "";
//       setShowInputFeedback(false);
//       alert("Feedback saved successfully!");
//     } catch (error) {
//       console.error("Error saving feedback:", error);
//     }
//   };

//   const updateFeedback = async (feedback_id) => {
//     const updatedFeedback = {
//       _id: feedback_id,
//       text: feedbackText.current.value,
//     };
//     try {
//       await axios.put("http://localhost:5000/feedback", updatedFeedback, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setShowInputFeedback(false);
//     } catch (error) {
//       console.error("Error updating feedback:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <ProgressSpinner />
//         <p style={{ color: "#8B008B", fontSize: "1.2rem" }}>Loading tasks...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="card" style={{ padding: "20px", backgroundColor: "#F3E5F5" }}>
//       <h1 style={{ textAlign: "center", color: "#6A1B9A", marginBottom: "20px" }}>
//         User Tasks for {userName}
//       </h1>
//       <Accordion
//         className="custom-accordion"
//         style={{
//           direction: "rtl", // יישור לימין של כל הטאב
//         }}
//       >
//         {tabsTask.map((tabTask, index) => {
//           if (!tabTask.exist) {
//             return (
//               <AccordionTab
//                 key={index}
//                 headerStyle={{
//                   textAlign: "right", // יישור כותרת לימין
//                 }}
//                 header={`שיעור  ${tabTask.numOfLesson}:  ${tabTask.titleLesson}`}
//               >
//                 <p style={{ color: "red", fontWeight: "bold", textAlign: "right" }}>
//                   {tabTask.titleTask} - No tasks are available for this lesson.
//                 </p>
//               </AccordionTab>
//             );
//           }

//           return (
//             <AccordionTab
//               key={index}
//               headerStyle={{
//                 textAlign: "right", // יישור כותרת לימין
//               }}
//               header={`שיעור ${tabTask.numOfLesson}:  ${tabTask.titleLesson}`}
//             >
//               <div
//                 style={{
//                   padding: "10px",
//                   backgroundColor: "#EDE7F6",
//                   borderRadius: "8px",
//                   textAlign: "right", // יישור תוכן לימין
//                 }}
//               >
//                 <h3 style={{ color: "#6A1B9A" }}>Task: {tabTask.titleTask}</h3>
//                 {tabTask.questions.map((question) => {
//                   const matchAnswer = tabTask.answers.find(
//                     (answer) => answer.question === question._id
//                   );
//                   return (
//                     <div
//                       key={question._id}
//                       style={{
//                         marginBottom: "10px",
//                         padding: "10px",
//                         border: "1px solid #D1C4E9",
//                         borderRadius: "8px",
//                         backgroundColor: "#FFFFFF",
//                       }}
//                     >
//                       <p
//                         style={{
//                           color: "#4A148C",
//                           fontWeight: "bold",
//                           textAlign: "right", // יישור לימין
//                         }}
//                       >
//                         Question: {question.text}
//                       </p>
//                       <p style={{ color: "#6A1B9A", textAlign: "right" }}>
//                         Answer: {matchAnswer ? matchAnswer.text : "No answer provided"}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </AccordionTab>
//           );
//         })}
//       </Accordion>
//       <FileExample contentFile={tabsTask} userName={userName} />
//       {/* CSS for styling */}
//       <style>
//         {`
//           .custom-accordion .p-accordion-header-link {
//             justify-content: flex-end; /* יישור לימין */
//             gap: 10px; /* רווח בין המשולש לטקסט */
//           }
//           .custom-accordion .p-accordion-tab {
//             margin-bottom: 15px; /* רווח בין הטאבים */
//           }
//              .custom-accordion .p-accordion-toggle-icon {
//              transform: rotate(-180deg); /* סיבוב המשולש ב-180 מעלות */
//         }
//         `}
//       </style>
//     </div>
//   );
// };

// export default UserTasks;

import { useLocation } from "react-router-dom";
import axios from "axios";
import { Accordion, AccordionTab } from "primereact/accordion";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FileExample from "./File";

const UserTasks = () => {
  const location = useLocation();
  const user_id = location.state?.user_id; // Ensure user_id exists
  const userName = location.state?.userName; // Ensure userName exists
  const token = useSelector((state) => state.token.token);
  const lessons = useSelector((state) => state.lesson.lessons);
  const [loading, setLoading] = useState(true);
  const [tabsTask, setTabsTask] = useState([]);
  const feedbackText = useRef(null);

  useEffect(() => {
    const loadTasksUserData = async () => {
      try {
        const finalArray = await Promise.all(
          lessons.map(async (lesson) => {
            const matchTaskRes = await axios.get(
              `http://localhost:5000/task/AccordingLesson/${lesson._id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const task = matchTaskRes.data;

            const matchUserTaskRes = await axios.get(
              `http://localhost:5000/userTask/getUserTaskAccordingUserAndTask/${user_id}/${task._id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const userTask = matchUserTaskRes.data.userTask;
            if (userTask) {
              const answers = await Promise.all(
                userTask.answers.map(async (answer_id) => {
                  const answerRes = await axios.get(
                    `http://localhost:5000/answer/${answer_id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  return answerRes.data;
                })
              );

              const questionsRes = await axios.get(
                `http://localhost:5000/question/AccordingTask/${task._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const feedback = await axios.get(
                `http://localhost:5000/feedback/AccordingUserTask/${userTask._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              return {
                exist: true,
                userTask_id: userTask._id,
                numOfLesson: lesson.numOfLesson,
                titleLesson: lesson.name,
                titleTask: task.title,
                questions: questionsRes.data,
                answers: answers,
                feedback: feedback.data,
              };
            } else {
              return {
                exist: false,
                numOfLesson: lesson.numOfLesson,
                titleLesson: lesson.name,
                titleTask: task.title,
                questions: [],
                answers: [],
                feedback: null,
              };
            }
          })
        );
        setTabsTask(finalArray);
      } catch (e) {
        console.error("Error loading user tasks:", e);
      }
      setLoading(false);
    };

    loadTasksUserData();
  }, [user_id, token, lessons]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <ProgressSpinner />
        <p style={{ color: "#8B008B", fontSize: "1.2rem" }}>טוען משימות...</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: "20px", backgroundColor: "#F3E5F5" }}>
      <h1 style={{ textAlign: "center", color: "#6A1B9A", marginBottom: "20px" }}>
        משימות משתמש עבור {userName}
      </h1>
      <Accordion
        className="custom-accordion"
        style={{
          direction: "rtl", // יישור לימין של כל הטאב
        }}
      >
        {tabsTask.map((tabTask, index) => {
          if (!tabTask.exist) {
            return (
              <AccordionTab
                key={index}
                header={`שיעור ${tabTask.numOfLesson}: ${tabTask.titleLesson}`}
              >
                <p style={{ color: "red", fontWeight: "bold", textAlign: "right" }}>
                  {tabTask.titleTask} - אין משימות זמינות לשיעור זה.
                </p>
              </AccordionTab>
            );
          }

          return (
            <AccordionTab
              key={index}
              header={`שיעור ${tabTask.numOfLesson}: ${tabTask.titleLesson}`}
            >
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#EDE7F6",
                  borderRadius: "8px",
                  textAlign: "right", // יישור תוכן לימין
                }}
              >
                <h3 style={{ color: "#6A1B9A" }}>משימה: {tabTask.titleTask}</h3>
                {tabTask.questions.map((question) => {
                  const matchAnswer = tabTask.answers.find(
                    (answer) => answer.question === question._id
                  );
                  return (
                    <div
                      key={question._id}
                      style={{
                        marginBottom: "10px",
                        padding: "10px",
                        border: "1px solid #D1C4E9",
                        borderRadius: "8px",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      <p
                        style={{
                          color: "#4A148C",
                          fontWeight: "bold",
                          textAlign: "right", // יישור לימין
                        }}
                      >
                        שאלה: {question.text}
                      </p>
                      <p style={{ color: "#6A1B9A", textAlign: "right" }}>
                        תשובה: {matchAnswer ? matchAnswer.text : "לא סופקה תשובה"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </AccordionTab>
          );
        })}
      </Accordion>
      <FileExample contentFile={tabsTask} userName={userName} />
      {/* CSS for styling */}
      <style>
        {`
          .custom-accordion .p-accordion-header-link {
            justify-content: flex-end; /* יישור לימין */
            gap: 10px; /* רווח בין המשולש לטקסט */
          }
          .custom-accordion .p-accordion-tab {
            margin-bottom: 15px; /* רווח בין הטאבים */
          }
          .custom-accordion .p-accordion-toggle-icon {
            transform: rotate(-180deg); /* סיבוב המשולש ב-180 מעלות */
          }
        `}
      </style>
    </div>
  );
};

export default UserTasks;
