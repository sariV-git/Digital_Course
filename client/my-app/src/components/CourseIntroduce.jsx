import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { useEffect, useState } from 'react';
import Register from './Register';
import { setCourse } from "../store/reducer/courseSlice"

const CourseIntroduce = (props) => {

    // const course = props.course

    const course = useSelector(state => state.course.course)
    const dispatch = useDispatch()

    dispatch(setCourse(props.course))

    const [speakerInformation, setSpeakerInformation] = useState(null);
    const [register, setRegister] = useState(false);

    const getSpeakerInformation = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/course/getSpeakerInformation/${course._id}`)
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
            <Button label="כניסה לקורס" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
        </>
    );

    useEffect(() => {
        getSpeakerInformation();
    }, [])

    return (
        <>
            {/* <div className="card flex justify-content-center"> */}

            <Card title={course.name} subTitle={course.information} footer={footer} /*header={header}*/ className="md:w-20rem">
                <br></br>
                {console.log("getSpeakerInformation().informationOnSpeaker")}
                <h2 >
                    {speakerInformation.name.firstName+" "+speakerInformation.lastName}
                </h2>
                {/* {console.log(speakerInformation)}
                <h2>{speakerInformation.name.firstName+" "+speakerInformation.lastName}</h2> */}
                <p>{speakerInformation.information}</p>

            </Card>
            {/* </div> */}

            {register ? <Register /> : ""}

        </>
    )
}
export default CourseIntroduce