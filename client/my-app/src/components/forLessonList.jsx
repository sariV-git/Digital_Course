import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
//also to get all users
const { useEffect,useState } = require("react")

const LessonList=()=>{
    const [state,setState]=useState({
        loading:false,
        lessons:[],
        errorMessage:null
    })

    useEffect(()=>{
        try {
            setState({...state,loading:true})
            //const response=await axios.get()
    //    const results=response.data
    const results=[{num:1,name:"a",course:3},{num:1,name:"a",course:3},{num:1,name:"a",course:3}]
    setState({...state,loding:false,
    lessons:results})

        } catch (error) {
            setState({
                ...state,
                errorMessage:error
            })
        }
    },[])
    const display=(row)=>{
      
    }

    const displayImage=(rowData)=>{
        return <img src={rowData.picture} />
    }
    return(<>
    {/* {JSON.stringify(state.lessons)} */}
    <div className="grid">
        <div >
            {/* className="col" to add for the beyond div */}
        <DataTable value={state.lessons}>
         <Column header={'num'}sortable field ={'num'}/>
         {/* body={display}//for introduc some from the name */}
         <Column header={'name'}field={'name'}/>
         {/* <Column field="picture" header="image" body={displayImage}/> */}
       {/* in user i will do for name: header firstName->fiels{'name.firstName'} */}
        </DataTable>
        </div>
    </div>
    </>)
}

export default LessonList;