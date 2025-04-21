import { Card } from 'primereact/card';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { useEffect, useState } from 'react';
import { setCourse } from "../store/reducer/courseSlice"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setItemsInTheMenubar } from '../store/reducer/itemsInTheMenubarSlice';
import LessonVideo from "./LessonVideo";
import RespondsAccordingCourse from './RespondsAccordingCourse';
const CourseIntroduce = () => {

    const isManager = useSelector(state => state.token.isManager)
    const location = useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const belongToTheCourses = useSelector(state => state.user.belongToTheCourses)//??treat at this??
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




    const checkIfUserActive = () => {
        if (belongToTheCourses) {
            console.log('belongToTheCourses', belongToTheCourses);

            const specificCourse = belongToTheCourses.filter(courseId => {
                return course._id == courseId
            })
            console.log('specificCourse', specificCourse);

            if (specificCourse.length != 0)//the user already did login to this course
                setUserActiveInThisCourse(true)
        }
        else// the user didnt do login
            console.log('belongToTheCourses is ', belongToTheCourses);

    }

    const optionForManager = () => {

        dispatch(setItemsInTheMenubar({
            newItems: [{ label: 'Edit Lessons', icon: 'pi pi user', to: '/ManagerAddLesson' },
            { label: 'Edit Course', icon: 'pi pi-user', to: '/ManagerAddCourse' }, {
                label: 'Users Page', icon: 'pi pi-user', to: '/ManagerUsersPage'
            }, { label: 'DeleteCourse', to: "/ManagerDeleteCourse" }, { label: 'ManagerSetResponds', to: '/ManagerSetResponds' }, { label: 'LogOut', to: '/LogOut' }
            ]
        }))
    }

    useEffect(() => {

        // if(!token)
        //     navigate('/Login')
        const loadUserAndSpeeker = async () => {
            try {
                const speekerResponse = await axios.get(`http://localhost:5000/course/getSpeakerInformation/${course._id}`)
                setSpeakerInformation(speekerResponse.data)
                console.log('speekerResponse: ', speekerResponse.data);
                console.log('toooooken', token);

                // ????
                // const userResponse = await axios.get('http://localhost:5000/user/byToken', {
                //     headers: {
                //         Authorization: `Bearer ${token}`
                //     }
                // });
                // setUser(userResponse.data)
                // console.log('uuuser in intr..course', userResponse.data)
                //???
                
            } catch (error) {
                console.log('error in get user', error);
            }
            setLoading(false)
        }
        loadUserAndSpeeker()

        if (!course) navigate('/PageNotFound')//------check how can i do it
        dispatch(setCourse({ newCourse: course }))
        if (user) {
            checkIfUserActive()
        }
        console.log('isuseractive?', user, userActiveInThisCourse);

    }, [])



    return (
        <>
            {loading ? <>Loading...</> : <>
                {isManager && optionForManager()}
                {/* at the menubar: */}
                {user && user.name.firstName}
                {/* {do here something important} */}
                {!userActiveInThisCourse && checkIfUserActive()}
                {course &&
                    <div className='flex h-screen w-screen bg-gray-100'>
                        <div className="w-1/3 h-full">
                            <LessonVideo path={course.pathTriler} />
                        </div>
                        <div className="w-2/3 p-10 flex items-center justify-center">

                            <Card title={course.name} subTitle={course.information} footer={footer}
                                className="w-full max-w-3xl shadow-2xl">
                                <p className="text-gray-700 mb-4">
                                    name of speeker:  {speakerInformation && speakerInformation.name.firstName + " " + speakerInformation.name.lastName}
                                </p>
                                about the course:{course.information}
                                {speakerInformation && <p>information:{speakerInformation.information}</p>}
                                <Link to={'/LessonVideo'} state={{ path: course.pathTriler }} >see the triler</Link>
                                <>responds of the other users about this course:</>
                                <RespondsAccordingCourse course={course} />
                            </Card>
                        </div>
                    </div>}
                {/* {userActiveInThisCourse ? <Link to={'/LessonsList'}>see the lessons</Link> : <>nothing</>} */}
                {/* // setItemsInTheMenubar({newItems:[{ label: 'LogIn' },{label:'HomePage'}]})} */}
            </>}</>
    )
}
export default CourseIntroduce




