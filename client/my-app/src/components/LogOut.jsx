import { useEffect } from "react"
import { logOut, setIsManager, setToken } from "../store/reducer/tokenSlice"
import { useDispatch } from "react-redux"
import { setBelongToTheCourses, setUser } from "../store/reducer/userSlice"
import { setCourse } from "../store/reducer/courseSlice"
import { useNavigate } from "react-router-dom"
import { setLesson } from "../store/reducer/lessonSlice"

const LogOut = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const actionsDoInLogOut = () => {
        dispatch(setUser({ newUser: null }))
        dispatch(setBelongToTheCourses({ newItems: [] }))
        dispatch(logOut())
        dispatch(setIsManager(false))
        dispatch(setLesson({newLesson:null}))
        dispatch(setCourse({newCourse:null}))
    }

    useEffect(() => {
        actionsDoInLogOut()
        navigate('/CoursesPage')
    }, [])
    return (<>
    </>)
}

export default LogOut