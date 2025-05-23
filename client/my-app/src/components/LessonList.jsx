// import axios from "axios";
// import { Button } from "primereact/button";
// import { Column } from "primereact/column";
// import { DataTable } from "primereact/datatable";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setLessons } from "../store/reducer/lessonSlice";
// import ManagerUpdateLesson from "./ManagerUpdateLesson";
// import { useEffect, useState, useRef } from "react";
// import { Toast } from "primereact/toast";

// const LessonList = () => {
//   const dispatch = useDispatch();
//   const [visible, setVisible] = useState(false);
//   const [lessons, setLessonsHere] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [finishCourse, setFinishCourse] = useState(false);
//   const [errors, setErrors] = useState(false); // To show errors in the form
//   const user = useSelector((state) => state.user.user);
//   const token = useSelector((state) => state.token.token);
//   const isManager = useSelector((state) => state.token.isManager);
//   const course = useSelector((state) => state.course.course);
//   const navigate = useNavigate();
//   const toast = useRef(null); // For showing Toast messages
//   const [feedbackMap, setFeedbackMap] = useState({});
//   const [createdRespond, setCreatedRespond] = useState(false);
//   const [showTask, setShowTask] = useState(false)

//   const goToTask = async (lesson) => {
//     try {
//       //load the data about the task
//       const taskResponse = await axios.get(`http://localhost:5000/task/AccordingLesson/${lesson._id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       console.log('taskResponse', taskResponse.data);
//       //load the data about the user


//       console.log('task', taskResponse.data)
//       //load this data to check if already the user did this task
//       const respondUserTask = await axios.get(`http://localhost:5000/userTask/ByUserAndTask/${user._id}/${taskResponse.data._id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       console.log('respondUserTask', respondUserTask.data);

//       if (!respondUserTask.data.userTask) {
//         setShowTask(true)//navigate to see the task???can delete it??
//         navigate('/Task', { state: { task: taskResponse.data } })//??mabye need to pass also the user

//       }
//       else {
//         let arrayAnswers = []
//         console.log('in see the task');
//         // let QuestionsAnswersArray=[]//the array of objects every object look like :{questionText:"  ",answerText:"  "}
//         const answers = respondUserTask.data.userTask.answers//an array of id of the answers of the user
//         console.log('answers Before: ', answers);
//         try {
//           answers.forEach(async answer => {
//             const resAnswer = await axios.get(`http://localhost:5000/answer/${answer}`, {
//               headers: {
//                 Authorization: `Bearer ${token}`
//               }
//             })
//             console.log('resAnswer', resAnswer.data);
//             arrayAnswers.push(resAnswer.data)
//             return (resAnswer.data)
//           })
//           const taskQuestions = await axios.get(`http://localhost:5000/question/AccordingTask/${taskResponse.data._id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           })
//           console.log("anssssswers: ", arrayAnswers, 'qqqqqquestion', taskQuestions);

//           navigate('/UserTask', { state: { questions: taskQuestions.data, answers: arrayAnswers, titleTask: taskResponse.data.title } })

//         } catch (error) {
//           console.log('an error in see all the answers', error);
//         }

//       }
//       //    setUserTask(respondUserTask.data.userTask)//navigate to do the task
//     } catch (error) {
//       console.log('error in loaddata for user in lessonpage', error);
//     }
//   }

//   const fetchFeedbacks = async (lessonsFromLoad) => {
//     try {

//       const feedbacks = {};
//       for (const lesson of lessonsFromLoad) {
//         const taskResponse = await axios.get(
//           `http://localhost:5000/task/AccordingLesson/${lesson._id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const respondUserTask = await axios.get(
//           `http://localhost:5000/userTask/ByUserAndTask/${user._id}/${taskResponse.data._id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (respondUserTask.data.userTask) {
//           try {
//             const feedbackResponse = await axios.get(
//               `http://localhost:5000/feedback/AccordingUserTask/${respondUserTask.data.userTask._id}`,
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );

//             feedbacks[lesson._id] = feedbackResponse.data
//               ? feedbackResponse.data.text
//               : "No feedback";
//           } catch (error) {
//             feedbacks[lesson._id] = "No feedback";
//           }
//         } else {
//           feedbacks[lesson._id] = "No user task";
//         }
//       }
//       setFeedbackMap(feedbacks);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error in fetchFeedbacks:", error);
//     }
//   };

//   const loadDataForUser = async () => {
//     try {

//       console.log("Loading data for user...");
//       console.log("Course ID:", course._id);
//       console.log("User ID:", user._id);



//       const response = await axios.get(
//         // `http://localhost:5000/lesson/getForUserAccordingCourse/${user._id}/${course._id}`,
//         `http://localhost:5000/lesson/getLessonForUserAccordingCourse/${user._id}/${course._id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setLessonsHere(response.data.lessons);

//       dispatch(setLessons({ lessons: response.data.lessons }));
//       setFinishCourse(response.data.finish);

//       if (response.data.lessons.length > 0) {
//         fetchFeedbacks(response.data.lessons);
//       }

//       if (response.data.finish) {
//         try {
//           const respondUser = await axios.get(
//             `http://localhost:5000/respond/accordingCourseAndUser/${course._id}/${user._id}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );

//           setCreatedRespond(true);
//         } catch (error) {
//           console.error("The user didn't create a respond:", error);
//         }
//       }
//     } catch (error) {
//       console.error("Error in loadData for user:", error);
//       setErrors(true);
//       setLoading(false);
//     }
//   };

//   const loadDataForManager = async () => {
//     try {

//       const response = await axios.get(
//         `http://localhost:5000/lesson/getAllLessonsAccordingCourse/${course._id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setLessonsHere(response.data);
//       console.log("the lessons from the new router: ", response.data);

//       dispatch(setLessons({ lessons: response.data }));
//       setLoading(false);
//     } catch (error) {
//       console.error("Error in loadData for manager:", error);
//       setErrors(true);
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     if (isManager)
//       loadDataForManager()
//     else
//       loadDataForUser();
//   }, []);

//   const goToLesson = (lesson) => {
//     navigate("/Lesson", {
//       state: {
//         lesson: lesson,
//       },
//     });
//   };

//   const deleteLesson = async (lesson_id) => {
//     try {
//       await axios
//         .delete(`http://localhost:5000/lesson/${lesson_id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then(() => {
//           setLessonsHere(lessons.filter((lesson) => lesson._id !== lesson_id));
//         });
//       toast.current.show({
//         severity: "success",
//         summary: "Success",
//         detail: "Lesson deleted",
//         life: 3000,
//       });
//     } catch (error) {
//       toast.current.show({
//         severity: "error",
//         summary: "Error",
//         detail: "Failed to delete lesson",
//         life: 3000,
//       });
//     }
//   };

//   const showTaskButton = (rowData) => {
//     return (
//       <Button
//         label="Task"
//         onClick={() => goToTask(rowData)}
//         className="p-button-rounded p-button-outlined"
//       />
//     );
//   };

//   const updateLesson = (rowData) => {
//     dispatch(setLessons({ newLesson: rowData }));
//     setVisible(true);
//   };

//   const showButton = (rowData) => {
//     return (
//       <Button
//         label="Show"
//         onClick={() => goToLesson(rowData)}
//         className="p-button-rounded p-button-outlined"
//       />
//     );
//   };

//   const updateButton = (rowData) => {
//     return (
//       <Button
//         label="Update"
//         onClick={() => updateLesson(rowData)}
//         className="p-button-warning p-button-rounded"
//       />
//     );
//   };

//   const deleteButton = (rowData) => {
//     return (
//       <Button
//         label="Delete"
//         onClick={() => deleteLesson(rowData._id)}
//         className="p-button-danger p-button-rounded"
//       />
//     );
//   };

//   const showFeedback = (rowData) => {
//     return <span>{feedbackMap[rowData._id] || "no feedback"}</span>;
//   };

//   return (
//     <div style={styles.lessonListPage}>
//       {loading ? (
//         <div style={styles.loadingContainer}>
//           <h2>Loading Lessons...</h2>
//         </div>
//       ) : !lessons ? (
//         <div style={styles.noLessonsContainer}>
//           <h2 style={styles.noLessonsMessage}>There are no lessons available.</h2>
//         </div>
//       ) : (
//         <>
//           {errors && <p style={styles.errorMessage}>An error occurred while loading lessons.</p>}
//           <Toast ref={toast} />

//           <div style={styles.lessonListContainer}>
//             <DataTable
//               value={lessons}
//               paginator
//               rows={5}
//               rowsPerPageOptions={[5, 10, 25]}
//               className="p-datatable-customers"
//             >
//               <Column header="Lesson Number" field="numOfLesson" sortable />
//               <Column header="Name" field="name" sortable />
//               <Column header="Lessons" body={showButton} />
//               {isManager && <Column header="Edit" body={updateButton} />}
//               {isManager && <Column header="Delete" body={deleteButton} />}
//               {!isManager && <Column header="Instructor Feedback" body={showFeedback} />}
//               {!isManager && <Column header="Tasks" body={showTaskButton} />}
//             </DataTable>




//             {visible && (
//               <ManagerUpdateLesson
//                 setLessons={setLessonsHere}
//                 lessons={lessons}
//                 visible={visible}
//                 setVisible={setVisible}
//               />
//             )}
//           </div>
//           {!isManager && finishCourse && !createdRespond && (
//             <Button onClick={() => navigate("/Respond")}>Your Respond</Button>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// // Inline styles
// const styles = {
//   lessonListPage: {
//     padding: "20px",
//     background: "linear-gradient(to bottom, #f3e5f5, #e8eaf6)",
//     minHeight: "100vh",
//   },
//   loadingContainer: {
//     textAlign: "center",
//     fontSize: "20px",
//     color: "#6a1b9a",
//   },
//   noLessonsContainer: {
//     textAlign: "center",
//     marginTop: "50px",
//   },
//   noLessonsMessage: {
//     fontSize: "2rem",
//     fontWeight: "bold",
//     color: "#d32f2f",
//     textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
//   },
//   errorMessage: {
//     color: "red",
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   lessonListContainer: {
//     maxWidth: "1200px",
//     margin: "auto",
//     padding: "20px",
//     backgroundColor: "#ffffff",
//     borderRadius: "8px",
//     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//   },
// };

// export default LessonList;


import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLessons } from "../store/reducer/lessonSlice";
import ManagerUpdateLesson from "./ManagerUpdateLesson";
import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";

const LessonList = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [lessons, setLessonsHere] = useState([]);
  const [loading, setLoading] = useState(true);
  const [finishCourse, setFinishCourse] = useState(false);
  const [errors, setErrors] = useState(false);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token);
  const isManager = useSelector((state) => state.token.isManager);
  const course = useSelector((state) => state.course.course);
  const navigate = useNavigate();
  const toast = useRef(null);
  const [feedbackMap, setFeedbackMap] = useState({});
  const [createdRespond, setCreatedRespond] = useState(false);
  const [showTask, setShowTask] = useState(false);

  const goToTask = async (lesson) => {
    try {
      const taskResponse = await axios.get(`http://localhost:5000/task/AccordingLesson/${lesson._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const respondUserTask = await axios.get(`http://localhost:5000/userTask/ByUserAndTask/${user._id}/${taskResponse.data._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!respondUserTask.data.userTask) {
        setShowTask(true);
        navigate('/Task', { state: { task: taskResponse.data } });
      } else {
        let arrayAnswers = [];
        const answers = respondUserTask.data.userTask.answers;
        try {
          answers.forEach(async (answer) => {
            const resAnswer = await axios.get(`http://localhost:5000/answer/${answer}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            arrayAnswers.push(resAnswer.data);
            return resAnswer.data;
          });
          const taskQuestions = await axios.get(`http://localhost:5000/question/AccordingTask/${taskResponse.data._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          navigate('/UserTask', { state: { questions: taskQuestions.data, answers: arrayAnswers, titleTask: taskResponse.data.title } });
        } catch (error) {
          console.log('an error in see all the answers', error);
        }
      }
    } catch (error) {
      console.log('error in loaddata for user in lessonpage', error);
    }
  };

  const fetchFeedbacks = async (lessonsFromLoad) => {
    try {
      const feedbacks = {};
      for (const lesson of lessonsFromLoad) {
        const taskResponse = await axios.get(
          `http://localhost:5000/task/AccordingLesson/${lesson._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const respondUserTask = await axios.get(
          `http://localhost:5000/userTask/ByUserAndTask/${user._id}/${taskResponse.data._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (respondUserTask.data.userTask) {
          try {
            const feedbackResponse = await axios.get(
              `http://localhost:5000/feedback/AccordingUserTask/${respondUserTask.data.userTask._id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            feedbacks[lesson._id] = feedbackResponse.data
              ? feedbackResponse.data.text
              : "אין משוב";
          } catch (error) {
            feedbacks[lesson._id] = "אין משוב";
          }
        } else {
          feedbacks[lesson._id] = "אין משימת משתמש";
        }
      }
      setFeedbackMap(feedbacks);
      setLoading(false);
    } catch (error) {
      console.error("שגיאה ב-fetchFeedbacks:", error);
    }
  };

  const loadDataForUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/lesson/getLessonForUserAccordingCourse/${user._id}/${course._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLessonsHere(response.data.lessons);
      dispatch(setLessons({ lessons: response.data.lessons }));
      setFinishCourse(response.data.finish);

      if (response.data.lessons.length > 0) {
        fetchFeedbacks(response.data.lessons);
      }

      if (response.data.finish) {
        try {
          await axios.get(
            `http://localhost:5000/respond/accordingCourseAndUser/${course._id}/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCreatedRespond(true);
        } catch (error) {
          console.error("המשתמש לא יצר תגובה:", error);
        }
      }
    } catch (error) {
      console.error("שגיאה ב-loadData למשתמש:", error);
      setErrors(true);
      setLoading(false);
    }
  };

  const loadDataForManager = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/lesson/getAllLessonsAccordingCourse/${course._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLessonsHere(response.data);
      dispatch(setLessons({ lessons: response.data }));
      setLoading(false);
    } catch (error) {
      console.error("שגיאה ב-loadData למנהל:", error);
      setErrors(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isManager) loadDataForManager();
    else loadDataForUser();
  }, []);

  const goToLesson = (lesson) => {
    navigate("/Lesson", {
      state: {
        lesson: lesson,
      },
    });
  };

  const deleteLesson = async (lesson_id) => {
    try {
      await axios
        .delete(`http://localhost:5000/lesson/${lesson_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setLessonsHere(lessons.filter((lesson) => lesson._id !== lesson_id));
        });
      toast.current.show({
        severity: "success",
        summary: "הצלחה",
        detail: "השיעור נמחק",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "שגיאה",
        detail: "מחיקת השיעור נכשלה",
        life: 3000,
      });
    }
  };

  const showTaskButton = (rowData) => {
    return (
      <Button
        label="משימה"
        onClick={() => goToTask(rowData)}
        className="p-button-rounded p-button-outlined"
      />
    );
  };

  const updateLesson = (rowData) => {
    dispatch(setLessons({ newLesson: rowData }));
    setVisible(true);
  };

  const showButton = (rowData) => {
    return (
      <Button
        label="הצג"
        onClick={() => goToLesson(rowData)}
        className="p-button-rounded p-button-outlined"
      />
    );
  };

  const updateButton = (rowData) => {
    return (
      <Button
        label="עדכון"
        onClick={() => updateLesson(rowData)}
        className="p-button-warning p-button-rounded"
      />
    );
  };

  const deleteButton = (rowData) => {
    return (
      <Button
        label="מחיקה"
        onClick={() => deleteLesson(rowData._id)}
        className="p-button-danger p-button-rounded"
      />
    );
  };

  const showFeedback = (rowData) => {
    return <span>{feedbackMap[rowData._id] || "אין משוב"}</span>;
  };

  return (
    <div style={styles.lessonListPage}>
      {loading ? (
        <div style={styles.loadingContainer}>
          <h2>טוען שיעורים...</h2>
        </div>
      ) : !lessons ? (
        <div style={styles.noLessonsContainer}>
          <h2 style={styles.noLessonsMessage}>אין שיעורים זמינים.</h2>
        </div>
      ) : (
        <>
          {errors && <p style={styles.errorMessage}>אירעה שגיאה בעת טעינת השיעורים.</p>}
          <Toast ref={toast} />
          <div style={styles.lessonListContainer}>
            <DataTable
              value={lessons}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25]}
              className="p-datatable-customers"
            >
              
              {!isManager && <Column header="משוב מדריך" body={showFeedback} />}
              {!isManager && <Column header="משימה" body={showTaskButton} />}
              {isManager && <Column header="מחיקה" body={deleteButton} />}
              {isManager && <Column header="עדכון" body={updateButton} />}
              <Column header="שיעורים" body={showButton} />
              <Column header="שם" field="name" sortable />
              <Column header="מספר שיעור" field="numOfLesson" sortable  style={{textAlign:"center"}}/>
            </DataTable>

            {visible && (
              <ManagerUpdateLesson
                setLessons={setLessonsHere}
                lessons={lessons}
                visible={visible}
                setVisible={setVisible}
              />
            )}
          </div>
          {!isManager && finishCourse && !createdRespond && (
            <Button onClick={() => navigate("/Respond")}>התגובה שלך</Button>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  lessonListPage: {
    padding: "20px",
    background: "#e8f5e9", // צבע ירוק בהיר מאוד
    minHeight: "100vh",
  },
  loadingContainer: {
    textAlign: "center",
    fontSize: "20px",
    color: "#6a1b9a",
  },
  noLessonsContainer: {
    textAlign: "center",
    marginTop: "50px",
  },
  noLessonsMessage: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#d32f2f",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginBottom: "20px",
  },
  lessonListContainer: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default LessonList;