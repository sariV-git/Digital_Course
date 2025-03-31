import axios from "axios"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setItemsInTheMenubar } from "../store/reducer/itemsInTheMenubarSlice"
const CoursesPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [courses, setCourses] = useState()

    const loadDataCourses = async () => {
        try {
            const respond = await axios.get('http://localhost:5000/course')
            console.log('courses', respond.data);
            setCourses(respond.data)

        } catch (error) {

        }
    }
    const goToLoginBeforeIntroduceCourse = (course) => [
        navigate('/Login', { state: { course: course } })
    ]
    useEffect(() => {
        loadDataCourses()
    }, [])
    return (<>{courses ? <>{courses.map(course => {
        return (<Card>
            <h1>name:{course.name}</h1>
            <Button onClick={() => goToLoginBeforeIntroduceCourse(course)}>pass to specific course</Button>
        </Card>)
    })}</> : <>Loading...</>}
    </>)
}


export default CoursesPage