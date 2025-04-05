// import axios from "axios"
// import { Button } from "primereact/button"
// import { Column } from "primereact/column"
// import { DataTable } from "primereact/datatable"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { setLesson } from '../store/reducer/lessonSlice'
// import ManagerUpdateLesson from "./ManagerUpdateLesson"
// import TryIt from "./TryIt"
// //also to get all users
// const { useEffect, useState } = require("react")
// const LessonList = () => {

//     const dispatch=useDispatch()
//     const [visible, setVisible] = useState(false)
//     const isManager = useSelector(state => state.token.isManager)
//     const navigate = useNavigate()
//     const course = useSelector(state => state.course.course)
//     const [lessons, setLessons] = useState([])
//     const [state, setState] = useState({
//         loading: true,
//         errorMessage: null
//     })
//     const token = useSelector(state => state.token.token)

//     const loadData = async () => {
//         console.log('isManager',isManager);

//         try {
//             setState({ ...state, loading: true })
//             const response = await axios.get(`http://localhost:5000/course/allLessonsAccordingCourse/${course._id}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })

//             if (response.status != 200)
//                 navigate('/Login')
//             const results = response.data
//             setState({
//                 ...state, loading: false,
//             })
//             setLessons(results)

//         } catch (error) {
//             setState({
//                 ...state,
//                 errorMessage: error
//             })
//         }
//     }
//     useEffect(() => {
//         loadData()
//     }, [])

//     const display = (row) => {

//     }

//     const displayImage = (rowData) => {
//         return <img src={rowData.picture} />
//     }

//     const goToLesson = (lesson) => {
//         const newLesson = lesson
//         navigate('/Lesson', {
//             state: {
//                 lesson: lesson
//             }
//         })
//     }
//     const showButton = (rowData) => {
//         return <Button onClick={() => goToLesson(rowData)}>press</Button>
//     }


//  const manyOptions=(rowData)=>{
//     return(<TryIt/>)
//  }

//     const updateButton = (rowData) => {
//         return <Button onClick={() => { updateLesson(rowData) }}>update</Button>
//     }

//     const deleteLesson = async (lesson_id) => {
//         try {
//             const res = await axios.delete(`http://localhost:5000/lesson/${lesson_id}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }).then(() => { setLessons(lessons.filter(lesson => lesson._id != lesson_id)) })
//             console.log('succeed delete lesson!');

//         } catch (error) {

//         }
//     }
//     //for updateLesson

//     const updateLesson = async (rowData) => {
//         dispatch(setLesson({newLesson:rowData}))
//         setVisible(true)   
//        console.log(visible);

//     }
//     return (<>
//         {/* {JSON.stringify(state.lessons)} */}
//         {state.loading ? <>Loading...</> :
//             <div className="grid">
//                 <div >
//                     {/* className="col" to add for the beyond div */}
//                     <DataTable value={lessons}>
//                         <Column header={'num'} sortable field={'numOfLesson'} />
//                         {/* body={display}//for introduc some from the name */}
//                         <Column header={'name'} field={'name'} />
//                         {/* <Column header={'show'}body={<Button onClick={()=>goToLesson(rowData._id)}>press</Button>} /> */}
//                         <Column header={'show'} body={showButton} />

//                         {/* <Column field="picture" header="image" body={displayImage}/> */}
//                         {/* in user i will do for name: header firstName->fiels{'name.firstName'} */}

//                         {isManager && <Column header={'deleteLesson'} body={(rowData) => (<Button onClick={() => { deleteLesson(rowData._id) }}>delete</Button>)} />}
//                         {isManager && <Column header={'updateLesson'} body={updateButton} />}
//                         {isManager && <Column header={'manyOptions'} body={manyOptions} />}
//                     </DataTable>
//                     {visible  && <ManagerUpdateLesson setLessons={setLessons} lessons={lessons} visible={visible} setVisible={setVisible} />}

//                 </div>
//             </div>
//         }

//     </>)
// }

// export default LessonList;

import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLesson } from '../store/reducer/lessonSlice';
import ManagerUpdateLesson from "./ManagerUpdateLesson";
import TryIt from "./TryIt";
import { useEffect, useState, useRef } from "react";
import { Toast } from 'primereact/toast';

const LessonList = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [lessons, setLessons] = useState([]);
    //   const [state, setState] = useState({
    //     loading: true,
    //     errorMessage: null,
    //   });
    const [loading, setLoading] = useState(true)
    const token = useSelector((state) => state.token.token);
    const isManager = useSelector((state) => state.token.isManager);
    const course = useSelector((state) => state.course.course);
    const navigate = useNavigate();
    const toast = useRef(null); // For showing Toast messages

    const loadData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(
                `http://localhost:5000/course/allLessonsAccordingCourse/${course._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const results = response.data;
            setLessons(results);
            setLoading(false)
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
    return (
        <>
            <Toast ref={toast} />
            {loading ? (
                <div style={styles.loadingContainer}>
                    <h2>Loading Lessons...</h2>
                </div>
            ) : (
                <div style={styles.lessonListContainer}>
                    <DataTable value={lessons} paginator rows={5} rowsPerPageOptions={[5, 10, 25]} className="p-datatable-customers" style={styles.dataTable}>
                        <Column header="Number" field="numOfLesson" sortable />
                        <Column header="Name" field="name" sortable />
                        <Column header="Show" body={showButton} />
                        {isManager && <Column header="Update" body={updateButton} />}
                        {isManager && <Column header="Delete" body={deleteButton} />}
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
