import axios from "axios"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setItemsInTheMenubar } from "../store/reducer/itemsInTheMenubarSlice"
// import './CoursePage.css'; // Import the CSS file for styling??????????
import './TryIt.css'
const CoursesPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [courses, setCourses] = useState(null)

    const loadDataCourses = async () => {
        try {
            const respond = await axios.get('http://localhost:5000/course')
            setCourses(respond.data)
           
        } catch (error) {
            console.error("Error loading courses:", error);
        }
    }

    //-----------------------------------------
    //i think that this function relate to the introduceCoursePage
    // const goToLoginBeforeIntroduceCourse = (course) => [
    //     navigate('/Login', { state: { course: course } })
    // ]

    useEffect(() => {
       dispatch(setItemsInTheMenubar({newItems:[]})) 
        console.log('in course page');
        loadDataCourses()
    }, [])


    return (<>
        {courses ?
            <div className="course-page">
                <div className="courses-container">
                    {courses.map((course, index) => (
                        <Link to='/CourseIntroduce' state={{ course: course }} key={course._id}>
                            <div 
                                key={index}
                                className="course-card"
                                style={{ backgroundImage: `url(http://localhost:5000/upload/${course.backgroundImage})` }}
                            >
                                <div className="course-content">
                                    <h2 className="course-title">{course.title}</h2>
                                </div>

                                {/* The black ruler positioned in the center */}
                                <div className="ruler-container">
                                    <div className="black-ruler">
                                        <span className="ruler-text" >COURSE</span>
                                    </div>
                                </div>
                            </div></Link>
                    ))}
                </div>
            </div> : <>Loading courses...</>}
    </>
    );
};

export default CoursesPage