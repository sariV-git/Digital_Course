import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { setLessons } from '../store/reducer/lessonSlice';
import ManagerUpdateLesson from "./ManagerUpdateLesson";
import TryIt from "./TryIt";
import { useEffect, useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import RespondUser from "./respondUser";
import { setUser } from "../store/reducer/userSlice";

const LessonList = () => {
    
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [lessons, setLessonsHere] = useState([]);
    const [loading, setLoading] = useState(true)
    const [finishCourse, setFinishCourse] = useState(false)
    const user=useSelector(state=>state.user.user)
    // const [user, setUser] = useState()//??avoid all the request by params??
    const token = useSelector((state) => state.token.token);
    const isManager = useSelector((state) => state.token.isManager);
    const course = useSelector(state => state.course.course);
    const navigate = useNavigate();
    const toast = useRef(null); // For showing Toast messages
    const [showTask, setShowTask] = useState(false)
    const [feedbackMap, setFeedbackMap] = useState({})
   const [createdRespond,setCreatedRespond]=useState(false)

    const fetchFeedbacks = async (lessonsFromLoad) => {
        try {
            const userResponse = await axios.get('http://localhost:5000/user/byToken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('userResponse', userResponse);
            const feedbacks = {};
            for (const lesson of lessonsFromLoad) {
                const taskResponse = await axios.get(`http://localhost:5000/task/AccordingLesson/${lesson._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log('taskRespond', taskResponse);

                const respondUserTask = await axios.get(`http://localhost:5000/userTask/ByUserAndTask/${userResponse.data._id}/${taskResponse.data._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log('respondUserTask', respondUserTask);

                if (respondUserTask.data.userTask)//before all to check that in the server it findone
                {
                    //get the feedback of this task of this user
                    try {
                        const feedbackResponse = await axios.get(`http://localhost:5000/feedback/AccordingUserTask/${respondUserTask.data.userTask._id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })

                        if (feedbackResponse.data) {
                            feedbacks[lesson._id] = feedbackResponse.data.text || 'no feedback'
                        }
                        else {
                            feedbacks[lesson._id] = 'no feedback'
                        }
                    }
                    catch (error) {
                        console.log('error in getfeedback', error);
                        feedbacks[lesson._id] = "no feedback"
                    }
                }
                else {
                    feedbacks[lesson._id] = "no user task"
                }
                console.log('feedbacks', feedbacks)
                setFeedbackMap(feedbacks)
            }
            setLoading(false)
        } catch (error) {
            console.log('an error in fetchFeedbacks', error);
        }
    }

    const loadData = async () => {
        
        try {
            const userResponse = await axios.get('http://localhost:5000/user/byToken', {//??
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUser(userResponse.data)
            const response = await axios.get(
                `http://localhost:5000/lesson/getForUserAccordingCourse/${userResponse.data._id}/${course._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            console.log('the lessons from the new router: ', response.data);
            setLessonsHere(response.data.lessons);//to set another lessons
            dispatch(setLessons({lessons:response.data.lessons}))
            setFinishCourse(response.data.finish)//to know if i need intoduce an respond of user
            if (response.data.lessons.length > 0) {
               
               
                fetchFeedbacks(response.data.lessons)
            }

            if(response.data.finish)//if the user already see all the lesson
            {
                try {
                   const respondUser=await axios.get(`http://localhost:5000/respond/accordingCourseAndUser/${course._id}/${user._id}`,{headers:{
                    Authorization:`Bearer ${token}`
                }}) 

                console.log("there is already respond ",respondUser.data);
                setCreatedRespond(true)
                
                } catch (error) {
                    console.log("the user didnt create respond",error);                  
                }
            }



        } catch (error) {
            console.log('error in lessonlist', error);
            navigate('/Login');
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to load lessons', life: 3000 });
        }
    };

    useEffect(() => {
        console.log("user from the store in lessons list: ",user, "and course : ",course);
        
        loadData();
    }, []);

    const goToLesson = (lesson) => {
        navigate('/Lesson', {
            state: {
                lesson: lesson,
            },
        });
    };

    const deleteLesson = async (lesson_id) => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/lesson/${lesson_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then(() => { setLessonsHere(lessons.filter(lesson => lesson._id !== lesson_id)) });
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Lesson deleted', life: 3000 });
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete lesson', life: 3000 });
        }
    };


    const goToTask = async (lesson) => {
        try {
            //load the data about the task
            const taskResponse = await axios.get(`http://localhost:5000/task/AccordingLesson/${lesson._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('taskResponse', taskResponse.data);
            //load the data about the user
            const userResponse = await axios.get('http://localhost:5000/user/byToken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('userResponse', userResponse);

            console.log('task', taskResponse.data)
            //load this data to check if already the user did this task
            const respondUserTask = await axios.get(`http://localhost:5000/userTask/ByUserAndTask/${userResponse.data._id}/${taskResponse.data._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('respondUserTask', respondUserTask.data);

            if (!respondUserTask.data.userTask) {
                setShowTask(true)//navigate to see the task???can delete it??
                navigate('/Task', { state: { task: taskResponse.data } })//??mabye need to pass also the user

            }
            else {
                let arrayAnswers = []
                console.log('in see the task');
                // let QuestionsAnswersArray=[]//the array of objects every object look like :{questionText:"  ",answerText:"  "}
                const answers = respondUserTask.data.userTask.answers//an array of id of the answers of the user
                console.log('answers Before: ', answers);
                try {
                    answers.forEach(async answer => {
                        const resAnswer = await axios.get(`http://localhost:5000/answer/${answer}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        console.log('resAnswer', resAnswer.data);
                        arrayAnswers.push(resAnswer.data)
                        return (resAnswer.data)
                    })
                    const taskQuestions = await axios.get(`http://localhost:5000/question/AccordingTask/${taskResponse.data._id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    console.log("anssssswers: ", arrayAnswers, 'qqqqqquestion', taskQuestions);

                    navigate('/UserTask', { state: { questions: taskQuestions.data, answers: arrayAnswers ,titleTask:taskResponse.data.title} })

                } catch (error) {
                    console.log('an error in see all the answers', error);
                }

            }
            //    setUserTask(respondUserTask.data.userTask)//navigate to do the task
        } catch (error) {
            console.log('error in loaddata in lessonpage', error);
        }
    }

    const showTaskButton = (rowData) => {
        return <Button label="משימה" onClick={() => { goToTask(rowData) }} className="p-button-rounded p-button-outlined"></Button>
    }
    const updateLesson = (rowData) => {//to fix this function that she will realy update
        dispatch(setLessons({ newLesson: rowData }));
        setVisible(true);
    };

    const showButton = (rowData) => {
        return <Button label="Show" onClick={() => goToLesson(rowData)} className="p-button-rounded p-button-outlined" />;
    };

    const updateButton = (rowData) => {
        return <Button label="Update" onClick={() => updateLesson(rowData)} className="p-button-warning p-button-rounded" />;
    };

    const deleteButton = (rowData) => {
        return <Button label="Delete" onClick={() => deleteLesson(rowData._id)} className="p-button-danger p-button-rounded" />;
    };

    const showFeedback = (rowData) => {
        return <span>{feedbackMap[rowData._id] || 'Loading...'}</span>
    }
    return (
        <>
            <Routes>
                {/* ??//??check how do it */}
                {/* <Route path='/respondUser' element={<RespondUser />} /> */}
            </Routes>

            {loading ? (
                <div style={styles.loadingContainer}>
                    <h2>Loading Lessons...</h2>
                </div>
            ) : (<>
            <Toast ref={toast} />

                <div style={styles.lessonListContainer}>
                    <DataTable value={lessons} paginator rows={5} rowsPerPageOptions={[5, 10, 25]} className="p-datatable-customers" style={styles.dataTable}>
                        <Column header="מספר שיעור" field="numOfLesson" sortable />
                        <Column header="Name" field="name" sortable />
                        <Column header="שיעורים" body={showButton} />
                        {isManager && <Column header="עריכה" body={updateButton} />}
                        {isManager && <Column header="מחיקה" body={deleteButton} />}
                        <Column header="הערת המרצה" body={showFeedback} />
                        <Column header='משימות' body={showTaskButton} />
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
                {(finishCourse&&!createdRespond) && <Button onClick={() => { navigate('/Respond') }}>your respond</Button>}
            </>
            )}
        </>
    );
};

// Inline styles
const styles = {
    lessonListContainer: {
        maxWidth: '1200px',
        margin: 'auto',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
    },
    loadingContainer: {
        textAlign: 'center',
        fontSize: '20px',
        color: '#555',
    },
    dataTable: {
        marginTop: '20px',
    },
};

export default LessonList;
