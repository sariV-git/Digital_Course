import axios from "axios"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"



const ManagerUsersPage = () => {
    const token=useSelector(state=>state.token.token)
    const[users,setUsers]=useState([])
    const course = useSelector(state => state.course.course)
    const loadDataUsers=async()=>{
        try {
            const res=await axios.get(`http://localhost:5000/userCourse/getUsersAccordingCourse/${course._id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log('users',res.data);
            
            setUsers(res.data)
        } catch (error) {
            console.log('eeee',error);
            
        }
    }
    useEffect(()=>{loadDataUsers()},[])
    
    return (<div >
        {/* className="col" to add for the beyond div */}
        <DataTable value={users}>
            <Column header={'firstName'} sortable field={'name.firstName'} />
            {/* body={display}//for introduc some from the name */}
            <Column header={'lastName'} field={'name.lastName'} />
            <Column header={'phone'} field={'phone'} />
            <Column header={'email'} field={'email'} />
            <Column header={'username'} field={'username'} />
            {/* <Column header={'show'}body={<Button onClick={()=>goToLesson(rowData._id)}>press</Button>} /> */}
            {/* <Column field="picture" header="image" body={displayImage}/> */}
            {/* in user i will do for name: header firstName->fiels{'name.firstName'} */}

        </DataTable>

    </div>)
}

export default ManagerUsersPage