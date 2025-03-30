import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { useEffect, useState } from 'react';
import Register from './Register';
import { setCourse } from "../store/reducer/courseSlice"
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const CourseIntroduce = (props) => {
    const navigate=useNavigate();
    // const course = props.course
    const dispatch = useDispatch()
    const location = useLocation()
    const[loading,setLoading]=useState(true)
    const [token,setToken]=useState(useSelector(state=>state.token.token))
    const [course,setCourseState]=useState(useSelector(state=>state.course.course))
//   const { course } = location.state || {}
//     dispatch(setCourse(props.course))//you can do it in the courses page when the user press on one course



    const [speakerInformation, setSpeakerInformation] = useState(null);
    const [register, setRegister] = useState(false);
    const getSpeakerInformation = async () => {
        
        try {
            console.log('token',token)
            const res = await axios.get(`http://localhost:5000/course/getSpeakerInformation/${location.state.course._id}`,{
                headers:{
                    Authorization:`Bearer ${token})}`
                }
            })
            if (res.status == 200) {
                {
                    console.log("-----------------", res.data);
                    const speaker = res.data
                    setSpeakerInformation(speaker)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }


    // const header = (
    //     <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    // );
    const footer = (
        <>
            <Button label="רישום לקורס" icon="pi pi-check" onClick={() => setRegister(true)} />
            <Button label="כניסה לקורס" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }}
            onClick={navigate('/LessonsList')} />
        </>
    );

   const loadSpeeker=async()=>{
    const newCourse=location.state.course
    dispatch(setCourse({newCourse}))
    await getSpeakerInformation();
    setLoading(false)
   }
    useEffect(() => {
        loadSpeeker()
    }, [])



    return (
        <>
          {/* <div className="card flex justify-content-center"> */}
          {loading?<>Loading...</>:
            <Card title={course.name} subTitle={course.information} footer={footer} /*header={header}*/ className="md:w-20rem">
                <br></br>
                {/* {console.log("getSpeakerInformation().informationOnSpeaker")} */}
                <h2>
               {speakerInformation.name.firstName+" "+speakerInformation.name.lastName}
                </h2>
                {/* {console.log(speakerInformation)} */}
                {/* <h2>{speakerInformation.name.firstName+" "+speakerInformation.name.lastName}</h2> */}
                <p>information:{speakerInformation.information}</p>

            </Card>}
            {/* </div> */}

            {register ? <Register /> : ""}

        </>
    )
}
export default CourseIntroduce