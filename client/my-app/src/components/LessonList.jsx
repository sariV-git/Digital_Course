
import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { setLesson } from '../store/reducer/lessonSlice';
import ManagerUpdateLesson from "./ManagerUpdateLesson";
import TryIt from "./TryIt";
import { useEffect, useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import RespondUser from "./respondUser";

const LessonList = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true)
    const [finishCourse, setFinishCourse] = useState(false)
    const [user, setUser] = useState()//??avoid all the request by params??
    const token = useSelector((state) => state.token.token);
    const isManager = useSelector((state) => state.token.isManager);
    const course = useSelector(state => state.course.course);
    const navigate = useNavigate();
    const toast = useRef(null); // For showing Toast messages
    const [feedbackMap, setFeedbackMap] = useState({})

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
                        console.log('feedbackResponse', feedbackResponse);

                        if (feedbackResponse.data) {
                            console.log('feedbackResponse', feedbackResponse);

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
            const userResponse = await axios.get('http://localhost:5000/user/byToken', {
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
            setLessons(response.data.lessons);
            setFinishCourse(response.data.finish)//to know if i need intoduce an respond of user
            if (response.data.lessons.length > 0) {
                console.log('go to fetchfeedback');
                fetchFeedbacks(response.data.lessons)
            }

        } catch (error) {
            console.log('error in lessonlist', error);
            navigate('/Login');
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to load lessons', life: 3000 });
        }
    };


    useEffect(() => {
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
            ).then(() => { setLessons(lessons.filter(lesson => lesson._id !== lesson_id)) });
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Lesson deleted', life: 3000 });
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete lesson', life: 3000 });
        }
    };

    const updateLesson = (rowData) => {
        dispatch(setLesson({ newLesson: rowData }));
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
        console.log('feedbackMap', feedbackMap);

        return <span>{feedbackMap[rowData._id] || 'Loading...'}</span>
    }
    return (
        <>
            <Routes>
                {/* ??//??check how do it */}
                {/* <Route path='/respondUser' element={<RespondUser />} /> */}
            </Routes>

            <Toast ref={toast} />
            {loading ? (
                <div style={styles.loadingContainer}>
                    <h2>Loading Lessons...</h2>
                </div>
            ) : (<>

                <div style={styles.lessonListContainer}>
                    <DataTable value={lessons} paginator rows={5} rowsPerPageOptions={[5, 10, 25]} className="p-datatable-customers" style={styles.dataTable}>
                        <Column header="Number" field="numOfLesson" sortable />
                        <Column header="Name" field="name" sortable />
                        <Column header="Show" body={showButton} />
                        {isManager && <Column header="Update" body={updateButton} />}
                        {isManager && <Column header="Delete" body={deleteButton} />}
                        <Column header="Feedback" body={showFeedback} />
                    </DataTable>

                    {visible && (
                        <ManagerUpdateLesson
                            setLessons={setLessons}
                            lessons={lessons}
                            visible={visible}
                            setVisible={setVisible}
                        />
                    )}
                </div>
                {finishCourse && <Button onClick={() => { navigate('/respondUser', { state: { user: user._id, course: course._id } }) }}>your respond</Button>}

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
