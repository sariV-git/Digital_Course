// import axios from "axios"
// import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
// import UserTask from './UserTask'


// const UserTasksComplete = () => {
//     const [loading, setLoading] = useState(true)
//     const user = useSelector(state => state.user.user)
//     const token = useSelector(state => state.token.token)
//     const lessons = useSelector(state => state.lesson.lessons)
//     const [userTasks, setUserTasks] = useState([])

//     const loadData = async () => {//wrapping all in try and catch
        
//         try {   
//             const finalArray = await Promise.all(lessons.map(async lesson => {
//                 const matchTaskRes = await axios.get(`http://localhost:5000/task/AccordingLesson/${lesson._id}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 })
//                 const task = matchTaskRes.data
//                 const matchUserTaskRes = await axios.get(`http://localhost:5000/userTask/getUserTaskAccordingUserAndTask/${user._id}/${task._id}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 })

//                 const userTask = matchUserTaskRes.data.userTask
//                 if (userTask) {
//                     const answers_id = userTask.answers

//                     const answers = await Promise.all(answers_id.map(async answer_id => {//the full answers
//                         const answerRes = await axios.get(`http://localhost:5000/answer/${answer_id}`, {
//                             headers: {
//                                 Authorization: `Bearer ${token}`
//                             }
//                         })
//                         return answerRes.data
//                     }))
//                     const questionsRes = await axios.get(`http://localhost:5000/question/AccordingTask/${task._id}`, {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     })

//                     const feedback = await axios.get(`http://localhost:5000/feedback/AccordingUserTask/${userTask._id}`, {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     })
//                     const feedbackText = feedback.data._id ? feedback.data.text : "אין הערה"

//                     return { exist: true, numOfLesson: lesson.numOfLesson, titleTask: task.title, questions: questionsRes.data, answers: answers, feedback: feedbackText }

//                 }
//                 else {//ther is no users tasks
//                     return { exist: false }
//                 }
//             }))
//             console.log("fffffinalArray", finalArray);
//             setUserTasks(finalArray)

//         }
//         catch (e) {
//             console.log("it failed--in load usertasks ", e);
//         }
//         setLoading(false)
//     }

//     useEffect(() => {
//         loadData()
//     }, [])
//     return (<>
//         {
//             loading ? <>Loading</> :
//                 <>
//                     {userTasks.map(userTask => {
//                         if (userTask.exist)
//                             return (<>lesson: {userTask.numOfLesson}<br /><UserTask title={userTask.titleTask} questions={userTask.questions} answers={userTask.answers} />
//                             <br/>
//                             feedback:{userTask.feedback}<br/>
//                             </>)
//                         return <>not found!!</>
//                     })}
//                 </>

//         }
//     </>)
// }

// export default UserTasksComplete

import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import UserTask from './UserTask';

const UserTasksComplete = () => {
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.token.token);
    const lessons = useSelector(state => state.lesson.lessons);
    const [userTasks, setUserTasks] = useState([]);

    // Memoized loadData function to prevent re-creation on every render
    const loadData = useCallback(async () => {
        try {
            const finalArray = await Promise.all(lessons.map(async lesson => {
                try {
                    const matchTaskRes = await axios.get(`http://localhost:5000/task/AccordingLesson/${lesson._id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const task = matchTaskRes.data;

                    const matchUserTaskRes = await axios.get(`http://localhost:5000/userTask/getUserTaskAccordingUserAndTask/${user._id}/${task._id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    console.log("matchUserTaskRes", matchUserTaskRes.data);
                    
                    const userTask = matchUserTaskRes.data.userTask;
                    if (userTask) {
                        const answers = await Promise.all(userTask.answers.map(async answer_id => {
                            const answerRes = await axios.get(`http://localhost:5000/answer/${answer_id}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                            return answerRes.data;
                        }));

                        const questionsRes = await axios.get(`http://localhost:5000/question/AccordingTask/${task._id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });

                        const feedbackRes = await axios.get(`http://localhost:5000/feedback/AccordingUserTask/${userTask._id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });

                        const feedbackText = feedbackRes.data._id ? feedbackRes.data.text : "No feedback";

                        return {
                            exist: true,
                            numOfLesson: lesson.numOfLesson,
                            titleTask: task.title,
                            questions: questionsRes.data,
                            answers: answers,
                            feedback: feedbackText
                        };
                    } else {
                        return { exist: false };
                    }
                } catch (error) {
                    console.error("Error loading task data:", error);
                    return null; // Return null if an error occurs
                }
            }));

            setUserTasks(finalArray.filter(task => task !== null)); // Filter out null values
        } catch (e) {
            console.error("Error loading user tasks:", e);
        }
        console.log("User tasks loaded:", userTasks);
        
        setLoading(false);
    }, [lessons, token, user._id]);

    // Call loadData when the component mounts
    useEffect(() => {
        console.log("Loading user tasks...");
        loadData();
    }, []);

    // Memoize filtered tasks to avoid recalculating on every render
    const filteredTasks = useMemo(() => userTasks.filter(task => task.exist), [userTasks]);

    return (
        <>
            {loading ? (
                <>Loading...</>
            ) : (
                <>
                    {filteredTasks.map((userTask, index) => (
                        <div key={index}>
                            <p>Lesson: {userTask.numOfLesson}</p>
                            <UserTask
                                title={userTask.titleTask}
                                questions={userTask.questions}
                                answers={userTask.answers}
                            />
                            <p>Feedback: {userTask.feedback}</p>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default UserTasksComplete;