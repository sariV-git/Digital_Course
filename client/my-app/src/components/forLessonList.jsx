import axios from "axios"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLesson } from '../store/reducer/lessonSlice'
import ManagerUpdateLesson from "./ManagerUpdateLesson"
//also to get all users
const { useEffect, useState } = require("react")
const LessonList = () => {

    const dispatch=useDispatch()
    const [visible, setVisible] = useState(false)
    const isManager = useSelector(state => state.token.isManager)
    const navigate = useNavigate()
    const course = useSelector(state => state.course.course)
    const [lessons, setLessons] = useState([])
    const [state, setState] = useState({
        loading: true,
        errorMessage: null
    })
    const token = useSelector(state => state.token.token)

    const loadData = async () => {
        try {
            setState({ ...state, loading: true })
            const response = await axios.get(`http://localhost:5000/course/allLessonsAccordingCourse/${course._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status != 200)
                navigate('/Login')
            const results = response.data
            setState({
                ...state, loading: false,
            })
            setLessons(results)

        } catch (error) {
            setState({
                ...state,
                errorMessage: error
            })
        }
    }
    useEffect(() => {
        loadData()
    }, [])

    const display = (row) => {

    }

    const displayImage = (rowData) => {
        return <img src={rowData.picture} />
    }

    const goToLesson = (lesson) => {
        const newLesson = lesson
        navigate('/Lesson', {
            state: {
                lesson: lesson
            }
        })
    }
    const showButton = (rowData) => {
        return <Button onClick={() => goToLesson(rowData)}>press</Button>
    }


    const updateButton = (rowData) => {
        return <Button onClick={() => { updateLesson(rowData) }}>update</Button>
    }

    const deleteLesson = async (lesson_id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/lesson/${lesson_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(() => { setLessons(lessons.filter(lesson => lesson._id != lesson_id)) })
            console.log('succeed delete lesson!');

        } catch (error) {

        }
    }
    //for updateLesson

    const updateLesson = async (rowData) => {
        dispatch(setLesson({newLesson:rowData}))
        setVisible(true)   
       console.log(visible);
            
    }
    return (<>
        {/* {JSON.stringify(state.lessons)} */}
        {state.loading ? <>Loading...</> :
            <div className="grid">
                <div >
                    {/* className="col" to add for the beyond div */}
                    <DataTable value={lessons}>
                        <Column header={'num'} sortable field={'numOfLesson'} />
                        {/* body={display}//for introduc some from the name */}
                        <Column header={'name'} field={'name'} />
                        {/* <Column header={'show'}body={<Button onClick={()=>goToLesson(rowData._id)}>press</Button>} /> */}
                        <Column header={'show'} body={showButton} />

                        {/* <Column field="picture" header="image" body={displayImage}/> */}
                        {/* in user i will do for name: header firstName->fiels{'name.firstName'} */}

                        {isManager && <Column header={'deleteLesson'} body={(rowData) => (<Button onClick={() => { deleteLesson(rowData._id) }}>delete</Button>)} />}
                        {isManager && <Column header={'updateLesson'} body={updateButton} />}
                    </DataTable>
                    {visible  && <ManagerUpdateLesson setLessons={setLessons} lessons={lessons} visible={visible} setVisible={setVisible} />}

                </div>
            </div>
        }

    </>)
}

export default LessonList;