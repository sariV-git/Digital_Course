import axios from "axios";
import { useEffect, useState } from "react";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'


import { useNavigate } from 'react-router-dom'
import CourseIntroduce from "./CourseIntroduce";
import CoursesPage from "./CoursesPage";
import Nav from "./Nav";
const Home = () => {

    // const navigate = useNavigate()

    const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        try {
            const res = await axios.get('http://localhost:5000/course')
            if (res.status == 200) {
                {
                    // console.log("res.data",res.data);
                    console.log("res",res);
                    setCourses(res.data)
                    console.log("corses",courses);
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCourses()
    }, [])


    return (<>
    <Nav/>
        {courses.length === 1 ? <CourseIntroduce course={courses[0]} /> : <CoursesPage courses={courses} />}
        Home
    </>)
}

export default Home