// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { Button } from "primereact/button";
// import { Accordion, AccordionTab } from "primereact/accordion";
// import { InputText } from "primereact/inputtext";
// import { ProgressSpinner } from "primereact/progressspinner"; // שיפור חוויית טעינה
// import { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import FileExample from "./File";

// // Introduce all the tasks of one User
// const UserTasks = () => {
//   const location = useLocation();
//   const user_id = location.state?.user_id || null; // בדיקה אם user_id קיים
//   const userName = location.state?.userName || "Unknown User"; // בדיקה אם userName קיים
//   const token = useSelector((state) => state.token?.token || ""); // Redux token
//   const [loading, setLoading] = useState(true); // מצב טעינה
//   const [tabsTask, setTabsTask] = useState([]); // המשימות והמידע
//   const [showInputFeedback, setShowInputFeedback] = useState(false); // טופס פידבק
//   const feedbackText = useRef(null);
//   const lessons = useSelector((state) => state.lesson?.lessons || []); // בדיקה אם lessons קיים
  
//   // טוען את המידע על המשימות של המשתמש
//   useEffect(() => {
//     const loadTasksUserData = async () => {
//       try {
//         // בדיקה אם lessons מכיל פריטים
//         if (!Array.isArray(lessons) || lessons.length === 0) {
//           console.error("No lessons available.");
//           setLoading(false);
//           return;
//         }

//         const finalArray = await Promise.all(
//           lessons.map(async (lesson) => {
//             try {
//               const matchTaskRes = await axios.get(
//                 `http://localhost:5000/task/AccordingLesson/${lesson._id}`,
//                 {
//                   headers: {
//                     Authorization: `Bearer ${token}`,
//                   },
//                 }
//               );
//               const task = matchTaskRes.data;

//               const matchUserTaskRes = await axios.get(
//                 `http://localhost:5000/userTask/getUserTaskAccordingUserAndTask/${user_id}/${task._id}`,
//                 {
//                   headers: {
//                     Authorization: `Bearer ${token}`,
//                   },
//                 }
//               );

//               const userTask = matchUserTaskRes.data?.userTask || null;
//               if (userTask) {
//                 const answers_id = userTask.answers || [];

//                 const answers = await Promise.all(
//                   answers_id.map(async (answer_id) => {
//                     const answerRes = await axios.get(
//                       `http://localhost:5000/answer/${answer_id}`,
//                       {
//                         headers: {
//                           Authorization: `Bearer ${token}`,
//                         },
//                       }
//                     );
//                     return answerRes.data;
//                   })
//                 );

//                 const questionsRes = await axios.get(
//                   `http://localhost:5000/question/AccordingTask/${task._id}`,
//                   {
//                     headers: {
//                       Authorization: `Bearer ${token}`,
//                     },
//                   }
//                 );

//                 const feedback = await axios.get(
//                   `http://localhost:5000/feedback/AccordingUserTask/${userTask._id}`,
//                   {
//                     headers: {
//                       Authorization: `Bearer ${token}`,
//                     },
//                   }
//                 );

//                 return {
//                   exist: true,
//                   userTask_id: userTask._id,
//                   numOfLesson: lesson.numOfLesson,
//                   titleLesson: lesson.name,
//                   titleTask: task.title,
//                   questions: questionsRes.data,
//                   answers: answers,
//                   feedback: feedback.data || {},
//                 };
//               } else {
//                 return null; // משימות שלא בוצעו לא ייכללו
//               }
//             } catch (error) {
//               console.error("Error loading task data:", error);
//               return null;
//             }
//           })
//         );

//         console.log("Final Array:", finalArray);
//         setTabsTask(finalArray.filter((item) => item !== null)); // שמירה של פריטים חוקיים בלבד
//       } catch (e) {
//         console.error("Failed to load user tasks:", e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadTasksUserData();
//   }, [user_id, token, lessons]);

//   // שמירת פידבק חדש
//   const keepFeedback = async (userTask_id) => {
//     const newFeedback = {
//       userTask: userTask_id,
//       text: feedbackText.current.value,
//     };
//     try {
//       const feedbackResponse = await axios.post(
//         "http://localhost:5000/feedback",
//         newFeedback,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("Feedback saved:", feedbackResponse);
//       feedbackText.current.value = "";
//       setShowInputFeedback(false);
//       alert("הפידבק נשמר בהצלחה!");
//     } catch (error) {
//       console.error("Error saving feedback:", error);
//     }
//   };

//   // עדכון פידבק קיים
//   const updateFeedback = async (feedback_id) => {
//     const updatedFeedback = {
//       _id: feedback_id,
//       text: feedbackText.current.value,
//     };
//     try {
//       const feedbackUpdateResponse = await axios.put(
//         "http://localhost:5000/feedback",
//         updatedFeedback,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("Feedback updated:", feedbackUpdateResponse);
//       setShowInputFeedback(false);
//     } catch (error) {
//       console.error("Error updating feedback:", error);
//     }
//   };

//   // מצב טעינה
//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <ProgressSpinner />
//         <p>טוען נתונים...</p>
//       </div>
//     );
//   }

//   // רינדור המשימות
//   return (
//     <>
//       <div
//         className="card"
//         style={{
//           textAlign: "right",
//           backgroundColor: "rgba(252, 237, 253, 0.3)",
//           padding: "20px",
//           borderRadius: "10px",
//         }}
//       >
//         {Array.isArray(tabsTask) && tabsTask.length > 0 ? (
//           <Accordion style={{ direction: "rtl" }}>
//             {tabsTask.map((tabTask, index) => (
//               <AccordionTab
//                 key={index}
//                 header={`lesson : ${tabTask.numOfLesson}. ${tabTask.titleLesson}`}
//               >
//                 <div style={{ padding: "10px", lineHeight: "1.8" }}>
//                   <p style={{ fontWeight: "bold" }}>
//                     משימה: {tabTask?.titleTask}
//                   </p>
//                   {Array.isArray(tabTask?.questions) &&
//                   tabTask?.questions.length > 0 ? (
//                     tabTask?.questions.map((question) => {
//                       const matchAnswer = tabTask.answers.find(
//                         (answer) => answer.question === question._id
//                       );
//                       return (
//                         <div key={question._id} style={{ marginBottom: "10px" }}>
//                           <p style={{ fontWeight: "bold" }}>
//                             שאלה: {question.text}
//                           </p>
//                           <p>
//                             תשובה:{" "}
//                             {matchAnswer
//                               ? matchAnswer.text
//                               : "לא ניתנה תשובה"}
//                           </p>
//                         </div>
//                       );
//                     })
//                   ) : (
//                     <p>אין שאלות זמינות עבור משימה זו.</p>
//                   )}
//                 </div>
//               </AccordionTab>
//             ))}
//           </Accordion>
//         ) : (
//           <p style={{ textAlign: "center", fontWeight: "bold" }}>
//             לא בוצעה אף משימה!
//           </p>
//         )}
//         <FileExample contentFile={tabsTask} userName={userName} />
//       </div>
//     </>
//   );
// };

// export default UserTasks;


import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FileExample from "./File";

const UserTasks = () => {
  const location = useLocation();

  const user_id = location.state?.user_id || null; // בדיקה אם user_id קיים
  const userName = location.state?.userName || "Unknown User"; // בדיקה אם userName קיים
  const token = useSelector((state) => state.token?.token || ""); // Redux token
  const [loading, setLoading] = useState(true); // מצב טעינה
  const [tabsTask, setTabsTask] = useState([]); // המשימות והמידע
  const [showInputFeedback, setShowInputFeedback] = useState(false); // טופס פידבק
  const feedbackText = useRef(null);
  const lessons = useSelector((state) => state.lesson?.lessons || []); // בדיקה אם lessons קיים

  // טוען את המידע על המשימות של המשתמש
  useEffect(() => {
    const loadTasksUserData = async () => {
      try {
        // בדיקה אם lessons מכיל פריטים
        if (!Array.isArray(lessons) || lessons.length === 0) {
          console.error("No lessons available.");
          setLoading(false);
          return;
        }

        const finalArray = await Promise.all(
          lessons.map(async (lesson) => {
            try {
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

  // const user_id = location.state?.user_id; // Ensure user_id exists
  // const userName = location.state?.userName; // Ensure userName exists
  // const token = useSelector((state) => state.token.token);
  // const lessons = useSelector((state) => state.lesson.lessons);
  // const [loading, setLoading] = useState(true);
  // const [tabsTask, setTabsTask] = useState([]);
  // const [showInputFeedback, setShowInputFeedback] = useState(false);
  // const feedbackText = useRef(null);

  // useEffect(() => {
  //   const loadTasksUserData = async () => {
  //     try {
  //       const finalArray = await Promise.all(
  //         lessons.map(async (lesson) => {
  //           const matchTaskRes = await axios.get(
  //             `http://localhost:5000/task/AccordingLesson/${lesson._id}`,
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //               },
  //             }
  //           );
  //           const task = matchTaskRes.data;

  //           const matchUserTaskRes = await axios.get(
  //             `http://localhost:5000/userTask/getUserTaskAccordingUserAndTask/${user_id}/${task._id}`,
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //               },
  //             }
  //           );

  //           const userTask = matchUserTaskRes.data.userTask;
  //           if (userTask) {
  //             const answers = await Promise.all(
  //               userTask.answers.map(async (answer_id) => {
  //                 const answerRes = await axios.get(
  //                   `http://localhost:5000/answer/${answer_id}`,
  //                   {
  //                     headers: {
  //                       Authorization: `Bearer ${token}`,
  //                     },
  //                   }
  //                 );
  //                 return answerRes.data;
  //               })
  //             );

  //             const questionsRes = await axios.get(
  //               `http://localhost:5000/question/AccordingTask/${task._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const userTask = matchUserTaskRes.data?.userTask || null;
              if (userTask) {
                const answers_id = userTask.answers || [];

                const answers = await Promise.all(
                  answers_id.map(async (answer_id) => {
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
                  feedback: feedback.data || {},
                };
              } else {
                return null; // משימות שלא בוצעו לא ייכללו
              }
            } catch (error) {
              console.error("Error loading task data:", error);
              return null;
            }
          })
        );

        console.log("Final Array:", finalArray);
        setTabsTask(finalArray.filter((item) => item !== null)); // שמירה של פריטים חוקיים בלבד
      } catch (e) {
        console.error("Failed to load user tasks:", e);
      } finally {
        setLoading(false);
      }

      //         const feedback = await axios.get(
      //           `http://localhost:5000/feedback/AccordingUserTask/${userTask._id}`,
      //           {
      //             headers: {
      //               Authorization: `Bearer ${token}`,
      //             },
      //           }
      //         );

      //         return {
      //           exist: true,
      //           userTask_id: userTask._id,
      //           numOfLesson: lesson.numOfLesson,
      //           titleLesson: lesson.name,
      //           titleTask: task.title,
      //           questions: questionsRes.data,
      //           answers: answers,
      //           feedback: feedback.data,
      //         };
      //       } else {
      //         return {
      //           exist: false,
      //           numOfLesson: lesson.numOfLesson,
      //           titleLesson: lesson.name,
      //           titleTask: task.title,
      //           questions: [],
      //           answers: [],
      //           feedback: null,
      //         };
      //       }
      //     })
      //   );
      //   setTabsTask(finalArray);
      // } catch (e) {
      //   console.error("Error loading user tasks:", e);
      // }
      // setLoading(false);
    };

    loadTasksUserData();
  }, [user_id, token, lessons]);

  const keepFeedback = async (userTask_id) => {
    const newFeedback = {
      userTask: userTask_id,
      text: feedbackText.current.value,
    };
    try {
      await axios.post("http://localhost:5000/feedback", newFeedback, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      feedbackText.current.value = "";
      setShowInputFeedback(false);
      alert("Feedback saved successfully!");
    } catch (error) {
      console.error("Error saving feedback:", error);
    }
  };

  const updateFeedback = async (feedback_id) => {
    const updatedFeedback = {
      _id: feedback_id,
      text: feedbackText.current.value,
    };
    try {
      await axios.put("http://localhost:5000/feedback", updatedFeedback, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowInputFeedback(false);
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <ProgressSpinner />
        <p style={{ color: "#8B008B", fontSize: "1.2rem" }}>Loading tasks...</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="card"
        style={{
          textAlign: "right",
          backgroundColor: "rgba(252, 237, 253, 0.3)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        {Array.isArray(tabsTask) && tabsTask.length > 0 ? (
          <Accordion
            style={{ direction: "rtl" }}
            className="custom-accordion"
          >
            {tabsTask.map((tabTask, index) => (
              <AccordionTab
                key={index}
                header={
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ marginRight: "10px" }}>
                      lesson : {tabTask.numOfLesson}. {tabTask.titleLesson}
                    </span>
                  </span>
                }
                style={{
                  fontWeight: "bold",
                  textAlign: "right",
                  padding: "10px",
                }}
              >
                <div style={{ padding: "10px", lineHeight: "1.8" }}>
                  <p style={{ fontWeight: "bold", marginBottom: "8px" }}>
                    משימה: {tabTask?.titleTask}
                  </p>
                  {Array.isArray(tabTask?.questions) &&
                  tabTask?.questions.length > 0 ? (
                    tabTask?.questions.map((question) => {
                      const matchAnswer = tabTask.answers.find(
                        (answer) => answer.question === question._id
                      );
                      return (
                        <div key={question._id} style={{ marginBottom: "10px" }}>
                          <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                            שאלה: {question.text}
                          </p>
                          <p style={{ marginBottom: "5px" }}>
                            תשובה:{" "}
                            {matchAnswer
                              ? matchAnswer.text
                              : "לא ניתנה תשובה"}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <p>אין שאלות זמינות עבור משימה זו.</p>
                  )}
                </div>
              </AccordionTab>
            ))}
          </Accordion>
        ) : (
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "18px",
              marginTop: "20px",
            }}
          >
            לא בוצעה אף משימה!
          </p>
        )}
        <FileExample contentFile={tabsTask} userName={userName} />
      </div>
      <style>
        {`
          .custom-accordion .p-accordion-header .p-accordion-toggle-icon {
            transform: rotate(180deg);
          }
        `}
      </style>
    </>
    // <div className="card" style={{ padding: "20px", backgroundColor: "#F3E5F5" }}>
    //   <h1 style={{ textAlign: "center", color: "#6A1B9A", marginBottom: "20px" }}>
    //     User Tasks for {userName}
    //   </h1>
    //   <Accordion>
    //     {tabsTask.map((tabTask, index) => {
    //       if (!tabTask.exist) {
    //         return (
    //           <AccordionTab
    //             key={index}
    //             header={`Lesson: ${tabTask.numOfLesson}. ${tabTask.titleLesson}`}
    //           >
    //             <p style={{ color: "red", fontWeight: "bold" }}>
    //               {tabTask.titleTask} - No tasks are available for this lesson.
    //             </p>
    //           </AccordionTab>
    //         );
    //       }

    //       return (
    //         <AccordionTab
    //           key={index}
    //           header={`Lesson: ${tabTask.numOfLesson}. ${tabTask.titleLesson}`}
    //         >
    //           <div style={{ padding: "10px", backgroundColor: "#EDE7F6", borderRadius: "8px" }}>
    //             <h3 style={{ color: "#6A1B9A" }}>Task: {tabTask.titleTask}</h3>
    //             {tabTask.questions.map((question) => {
    //               const matchAnswer = tabTask.answers.find(
    //                 (answer) => answer.question === question._id
    //               );
    //               return (
    //                 <div
    //                   key={question._id}
    //                   style={{
    //                     marginBottom: "10px",
    //                     padding: "10px",
    //                     border: "1px solid #D1C4E9",
    //                     borderRadius: "8px",
    //                     backgroundColor: "#FFFFFF",
    //                   }}
    //                 >
    //                   <p style={{ color: "#4A148C", fontWeight: "bold" }}>
    //                     Question: {question.text}
    //                   </p>
    //                   <p style={{ color: "#6A1B9A" }}>
    //                     Answer: {matchAnswer ? matchAnswer.text : "No answer provided"}
    //                   </p>
    //                 </div>
    //               );
    //             })}
    //             {!tabTask.feedback?._id ? (
    //               <>
    //                 <Button
    //                   onClick={() => setShowInputFeedback(true)}
    //                   label="Add Feedback"
    //                   style={{
    //                     backgroundColor: "#8E24AA",
    //                     color: "white",
    //                     borderRadius: "8px",
    //                     marginTop: "10px",
    //                   }}
    //                 />
    //                 {showInputFeedback && (
    //                   <>
    //                     <InputText
    //                       ref={feedbackText}
    //                       placeholder="Enter feedback..."
    //                       style={{
    //                         marginTop: "10px",
    //                         width: "100%",
    //                         border: "1px solid #D1C4E9",
    //                         borderRadius: "8px",
    //                       }}
    //                     />
    //                     <Button
    //                       onClick={() =>
    //                         feedbackText.current.value &&
    //                         keepFeedback(tabTask.userTask_id)
    //                       }
    //                       label="Save"
    //                       style={{
    //                         backgroundColor: "#6A1B9A",
    //                         color: "white",
    //                         borderRadius: "8px",
    //                         marginTop: "10px",
    //                       }}
    //                     />
    //                   </>
    //                 )}
    //               </>
    //             ) : (
    //               <>
    //                 <Button
    //                   onClick={() => setShowInputFeedback(true)}
    //                   label="Update Feedback"
    //                   style={{
    //                     backgroundColor: "#8E24AA",
    //                     color: "white",
    //                     borderRadius: "8px",
    //                     marginTop: "10px",
    //                   }}
    //                 />
    //                 {showInputFeedback && (
    //                   <>
    //                     <InputText
    //                       ref={feedbackText}
    //                       defaultValue={tabTask.feedback.text}
    //                       style={{
    //                         marginTop: "10px",
    //                         width: "100%",
    //                         border: "1px solid #D1C4E9",
    //                         borderRadius: "8px",
    //                       }}
    //                     />
    //                     <Button
    //                       onClick={() =>
    //                         feedbackText.current.value &&
    //                         updateFeedback(tabTask.feedback._id)
    //                       }
    //                       label="Update"
    //                       style={{
    //                         backgroundColor: "#6A1B9A",
    //                         color: "white",
    //                         borderRadius: "8px",
    //                         marginTop: "10px",
    //                       }}
    //                     />
    //                   </>
    //                 )}
    //               </>
    //             )}
    //           </div>
    //         </AccordionTab>
    //       );
    //     })}
    //   </Accordion>
    //   <FileExample contentFile={tabsTask} userName={userName} />
    // </div>
  );
};

export default UserTasks;