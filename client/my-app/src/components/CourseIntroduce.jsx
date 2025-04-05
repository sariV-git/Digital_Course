import { Card } from 'primereact/card';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { useEffect, useState } from 'react';
import { setCourse } from "../store/reducer/courseSlice"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setItemsInTheMenubar } from '../store/reducer/itemsInTheMenubarSlice';

const CourseIntroduce = () => {

    const isManager = useSelector(state => state.token.isManager)
    const location = useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const user = useSelector(state => state.user.user)
    const belongToTheCourses = useSelector(state => state.user.belongToTheCourses)
    const token = useSelector(state => state.token.token)

    const course = location.state.course
    const [speakerInformation, setSpeakerInformation] = useState(null);
    const [userActiveInThisCourse, setUserActiveInThisCourse] = useState(false)



    //if the user need to login:
    const handleLogInAction = () => {
        dispatch(setItemsInTheMenubar({ newItems: [{ label: 'HomePage', to: '/CoursesPage' }, { label: 'LogIn', to: '/Login' }] }))
    }
    //if the user already logined
    const handleLogOutAction = () => {
        dispatch(setItemsInTheMenubar({ newItems: [{ label: 'HoemPage', to: '/CoursesPage' }, { label: 'LogOut', to: '/Logout' }] }))
    }


    const footer = (<>
        {course && <>
            {userActiveInThisCourse || isManager ? <><Link to="/LessonsList">pass to the lesson</Link>{handleLogOutAction()}</> : <>{handleLogInAction()}</>}
            {/* to check if the user is already registered to this course then bring him to enter else to register */}

        </>}
    </>
    );

    const getSpeakerInformation = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/course/getSpeakerInformation/${course._id}`)
            setSpeakerInformation(res.data)
        } catch (err) {
            console.log('error with get speekerInformation', err)
        }
    }
    const loadSpeeker = async () => {
        await getSpeakerInformation();
        setLoading(false)
    }

    const checkIfUserActive = () => {
        if (belongToTheCourses) {
            console.log('belongToTheCourses', belongToTheCourses);

            const specificCourse = belongToTheCourses.filter(courseId => {
                return course._id == courseId
            })
            if (specificCourse.length != 0)//the user already did login to this course
                setUserActiveInThisCourse(true)
        }
        else// the user didnt do login
            console.log('belongToTheCourses is undefign');

    }

    const optionForManager = () => {

        dispatch(setItemsInTheMenubar({
            newItems: [{ label: 'Edit Lessons', icon: 'pi pi user', to: '/ManagerAddLesson' },
            { label: 'Edit Course', icon: 'pi pi-user', to: '/ManagerAddCourse' }, {
                label: 'Users Page', icon: 'pi pi-user', to: '/ManagerUsersPage'
            }, { label: 'DeleteCourse', to: "/ManagerDeleteCourse" }, { label: 'LogOut', to: '/LogOut' }
            ]
        }))
    }

    useEffect(() => {
        console.log('uuuser in intr..course', user)

        if (!course) navigate('/PageNotFound')//------check how can i do it
        dispatch(setCourse({ newCourse: course }))
        loadSpeeker()
        if (user) {
            checkIfUserActive()
        }
        console.log('isuseractive?', user, userActiveInThisCourse);

    }, [])



    return (
        <>
            {isManager && optionForManager()}
            {user && user.name.firstName}
            {/* {do here something important} */}
            {!userActiveInThisCourse && checkIfUserActive()}
            {course &&
                <Card title={course.name} subTitle={course.information} footer={footer}
                    className="p-shadow-4">
                    <h2>
                        {speakerInformation && speakerInformation.name.firstName + " " + speakerInformation.name.lastName}
                    </h2>
                    about the course:{course.information}
                    {speakerInformation && <p>information:{speakerInformation.information}</p>}
                    <Link to={'/LessonVideo'} state={{ path: course.pathTriler }} >see the triler</Link></Card>}
            {/* {userActiveInThisCourse ? <Link to={'/LessonsList'}>see the lessons</Link> : <>nothing</>} */}
            {/* // setItemsInTheMenubar({newItems:[{ label: 'LogIn' },{label:'HomePage'}]})} */}
        </>
    )
}
export default CourseIntroduce




