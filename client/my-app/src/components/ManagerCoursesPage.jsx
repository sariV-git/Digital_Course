import axios from "axios"
import { useEffect, useState } from "react"


const ManagerCoursesPage=()=>{
    const[course,setCourse]=useState()
   const loadDataCourses=async()=>{
    try {
        const respond=await axios.get('http://localhost:5000/course')
        
    } catch (error) {
        
    }
   }  
   useEffect(()=>{},[])
   return(<>

    </>)
}

export default ManagerCoursesPage