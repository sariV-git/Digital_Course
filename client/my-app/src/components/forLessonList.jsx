import axios from "axios"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import{setLesson} from '../store/reducer/lessonSlice'
//also to get all users
const { useEffect, useState } = require("react")

const LessonList = () => {
    const navigate=useNavigate()

    const [course, setCourse] = useState(useSelector(state => state.course.course._id))
    const [state, setState] = useState({
        loading: true,
        lessons: [],
        errorMessage: null
    })
    const [token, setToken] = useState(useSelector(state => state.token.token))

    const loadData = async () => {
        try {
            setState({ ...state, loading: true })
            const response = await axios.get(`http://localhost:5000/course/allLessonsAccordingCourse/${course}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const results = response.data
            setState({
                ...state, loading: false,
                lessons: results
            })
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

    const goToLesson=(lesson)=>{
    const newLesson=lesson
      navigate('/Lesson',{
        state:{
            lesson:lesson
        }
      })
    }
    const showButton=(rowData)=>{
        return<Button onClick={()=>goToLesson(rowData)}>press</Button>
    }
    return (<>
        {/* {JSON.stringify(state.lessons)} */}
        {state.loading ? <>Loading...</> :
            <div className="grid">
                <div >
                    {/* className="col" to add for the beyond div */}
                        <DataTable value={state.lessons}>
                        <Column header={'num'} sortable field={'numOfLesson'} />
                        {/* body={display}//for introduc some from the name */}
                        <Column header={'name'} field={'name'} />
                        {/* <Column header={'show'}body={<Button onClick={()=>goToLesson(rowData._id)}>press</Button>} /> */}
                        <Column header={'show'}body={showButton}/>

                        {/* <Column field="picture" header="image" body={displayImage}/> */}
                        {/* in user i will do for name: header firstName->fiels{'name.firstName'} */}
                    </DataTable>
                </div>
            </div>
        }

    </>)
}

export default LessonList;