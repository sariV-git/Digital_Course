import { Card } from 'primereact/card';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { useEffect, useState } from 'react';
import { setCourse } from "../store/reducer/courseSlice"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
import { setItemsInTheMenubar } from '../store/reducer/itemsInTheMenubarSlice';
import RespondsAccordingCourse from './RespondsAccordingCourse';
import LessonVideo from './LessonVideo';

const CourseIntroduce = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation()
    const course = location.state.course
    const isManager = useSelector(state => state.token.isManager)//??to check that at login i update the ismanager and i can to do his acts in the regular useeffect
    const belongToTheCourses = useSelector(state => state.user.belongToTheCourses)//??treat at this??-------need do it at the login if the user succeed do the login
    const token = useSelector(state => state.token.token)//if the token is null the user need do login
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)//??need it to show at the menubar the name of the user??try to put him at the store here--??
    const [speakerInformation, setSpeakerInformation] = useState(null);
    const [userActiveInThisCourse, setUserActiveInThisCourse] = useState(false)

    //if the user need to login:
    const handleLogInAction = () => {
        if (!isManager)
            dispatch(setItemsInTheMenubar({ newItems: [{ label: 'HomePage', to: '/CoursesPage' }, { label: 'LogIn', to: '/Login' }] }))
    }
    //if the user already logined
    const handleLogOutAction = () => {
        if (!isManager)
            dispatch(setItemsInTheMenubar({ newItems: [{ label: 'HoemPage', to: '/CoursesPage' }, { label: 'LogOut', to: '/Logout' }] }))
    }

    //??put him more down at the code
    const footer = (<>
        {course && <>
            {(userActiveInThisCourse || isManager) && <><Link to="/LessonsList">לצפיה בשיעורים</Link></>}
            {/* to check if the user is already registered to this course then bring him to enter else to register */}
        </>}
    </>
    );


    //this function check if the user is already did login and relate to this specific course
    const checkIfUserActive = async () => {//only for user
        if (belongToTheCourses) {

            console.log('the id of the courses which this user is registered', belongToTheCourses);
            const specificCourse = belongToTheCourses.find(courseId =>
                course._id == courseId
            )
            console.log('specificCourse', specificCourse);
            if (specificCourse)//the user already did login to this course
            {
                console.log('this user active it this course');

                setUserActiveInThisCourse(true)
            }
            else// the user didnt do login
            {

                console.log('you dont register to this course ', belongToTheCourses);
            }
        }
        else {
            console.log('you didnt do login');
        }
        setLoading(false)

    }

    const optionForManager = async () => {//here do all the options for manager--??try do the option of adding course also in the course page
        console.log('iiiiin option for manger');

        dispatch(setItemsInTheMenubar({
            newItems: [{ label: 'קורסים', to: '/CoursesPage' }, { label: 'הוספת שיעורים', icon: 'pi pi-plus-circle', to: '/ManagerAddLesson' },
            { label: 'הוספת קורס', icon: 'pi pi-plus-circle', to: '/ManagerAddCourse' }, {
                label: 'משתמשים', icon: 'pi pi-user', to: '/ManagerUsersPage'
            }, { label: 'מחיקת הקורס', icon: 'pi pi-trash', to: "/ManagerDeleteCourse" }, { label: 'עריכת תגובות על הקורס', icon: 'pi pi-pencil', to: '/ManagerSetResponds' }, { label: 'LogOut', to: '/LogOut' }
            ]
        }))
        setLoading(false)

    }


    useEffect(() => {
        console.log('the user belong to the courses: ', belongToTheCourses);
        dispatch(setCourse({ newCourse: course }))
        //here need to use with useSelector to update the course
        const loadSpeeker = async () => {//????i think to load the user in the login and then put him at the store
            try {
                const speekerResponse = await axios.get(`http://localhost:5000/course/getSpeakerInformation/${course._id}`)
                setSpeakerInformation(speekerResponse.data)
                console.log('speekerResponse: ', speekerResponse.data);
            } catch (error) {
                console.log('error in get speeker information', error);
            }
        }
        const loadAll = async () => {
            loadSpeeker();//load the speaker
            if (isManager) {
                optionForManager()

            }
            else {
                checkIfUserActive()//check if the user active
            }
        }
        loadAll()
    }, [])

    useEffect(() => {
        console.log("at the second useEffect --userActiveInThisCourse ", userActiveInThisCourse);

        if (userActiveInThisCourse) {
            handleLogOutAction()
        }
        else {
            handleLogInAction()
        }
    }, [userActiveInThisCourse])



    useEffect(() => {//tidy the code and check every thing and if i need erase something


    }, [isManager, userActiveInThisCourse])

    return (
        <>
            <div className="flex flex-column align-items-center justify-content-center min-h-screen"   >
                {/* <div className="flex flex-column align-items-center justify-content-center min-h-screen"> */}
                {/* ?? i want that the loading will include all the things he can */}
                {loading ? <>Loading...</> : <>
                    {/* {isManager && optionForManager()} */}
                    {/* at the menubar: */}
                    {user && user.name.firstName}
                    {/* {do here something important} */}
                    {/* {!userActiveInThisCourse && checkIfUserActive()} */}
                    {course &&
                        <div className='flex h-screen w-screen bg-gray-100' style={{
                            textAlign: 'center', display: 'flex',
                            justifyContent: 'center'
                        }}>
                            {/* <div className="w-1/3 h-full">
                                { <LessonVideo path={course.pathTriler} /> }
                            </div> */}
                            {/* <div className="w-2/3 p-10 flex items-center justify-center" > */}

                            <Card title={<div style={{ display: "flex", alignItems: "center", justifyContent: "center",marginTop:"20px" }}>
                                <span style={{ marginRight: "10px" }}>{course.name}</span>
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "30%",
                                        backgroundImage: `url(http://localhost:5000/upload/${course.backgroundImage})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                ></div>
                            </div>} subTitle={course.information} footer={footer}
                                className="shadow-2xl" style={{ width: "92%", margin: "0 auto", overflow: "hidden", backgroundColor: "rgba(252, 237, 253, 0.3)"  }}>

                                <h4 /*className="text-gray-700 mb-4"*/>
                                    מרצה: {speakerInformation && speakerInformation.name.firstName + " " + speakerInformation.name.lastName}
                                </h4>
                                {/* about the course:{course.information} */}
                                {speakerInformation && <p style={{marginLeft:"10%",marginRight:"10%"}}> <span  style={{fontWeight: "bold" }}> אודות המרצה: </span>{speakerInformation.informationOnSpeaker}</p>}
                                {<br></br>}
                                <Link to={'/LessonVideo'} state={{ path: course.pathTriler }} >לצפיה בטרילר</Link>
                                {<br></br>}
                                <br></br>
                                {(userActiveInThisCourse || isManager) ? <></> : <Button label="לכניסה" text raised onClick={() => navigate('/Login')} style={{ margin: "10px" }} />}
                                {(userActiveInThisCourse || isManager) ? <Button label="לצפיה בשיעורים" text raised onClick={() => navigate('/LessonsList')} /> : <Button label="להרשמה" text raised onClick={() => navigate('/Register')} style={{ margin: "10px" }} />}
                                <span style={{ textAlign: "left", display: "block", marginLeft: "auto", marginRight: "auto", width: "60%" }}><h3>:תגובות של משתתפים בקורס</h3></span>
                                <br></br>
                                {/* <div className="w-1/3 h-full">
                                { <LessonVideo path={course.pathTriler} /> }
                            </div> */}
                                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                                    <RespondsAccordingCourse course={course} />
                                </div>
                                 
                            </Card>
                            {/* </div> */}
                        </div>}
                    {/* {userActiveInThisCourse ? <Link to={'/LessonsList'}>see the lessons</Link> : <>nothing</>} */}
                    {/* // setItemsInTheMenubar({newItems:[{ label: 'LogIn' },{label:'HomePage'}]})} */}
                </>}
            </div>
        </>
    )
}
export default CourseIntroduce


