import axios from "axios"
import { Button } from "primereact/button"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ManagerDeleteCourse=()=>{
    const navigate=useNavigate()
    const course=useSelector(state=>state.course.course)
    const token=useSelector(state=>state.token.token)
    const cancelDelete=()=>{
        navigate('/IntroduceCourse',{
            state:{course:course}
        })
    }

    const deleteCourse=async()=>{
try {
    const res=await axios.delete(`http://localhost:5000/course/${course._id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    console.log('succeed delete course');
    
} catch (error) {
    console.log('an error with delete course',error);
    console.log('tttttttt',token);
    
}
navigate('/')
    }
    return (<>
    <p>Are you sure that you want to delete this course?</p>
<Button onClick={deleteCourse}>yes </Button>   
<Button onClick={cancelDelete}>no</Button> </>)
}
export default ManagerDeleteCourse