import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import axios from "axios";
import { useEffect, useState } from 'react';

const CourseIntroduce = (props) => {

    const course = props.course

    // let speakerInformation;

    const [speakerInformation, setSpeakerInformation] = useState(null);

    const getSpeakerInformation = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/course/getSpeakerInformation/${course._id}`)
            if (res.status == 200) {
                {
                    console.log("-----------------", res.data);
                    const speaker=res.data
                    return (speaker)
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
            <Button label="רישום לקורס" icon="pi pi-check" />
            <Button label="כניסה לקורס" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
        </>
    );

    useEffect(() => {
        setSpeakerInformation(getSpeakerInformation());
    }, [])

    return (
        <>
            {/* <div className="card flex justify-content-center"> */}
            <Card title={course.name} subTitle={course.information} footer={footer} /*header={header}*/ className="md:w-20rem">
                <br></br>
                {console.log("getSpeakerInformation().informationOnSpeaker")}
                <h2 >
                 {getSpeakerInformation().informationOnSpeaker}
                    {/* {SpeakerInformation.name} */}
                </h2>
                {console.log("555555555555")}
                {/* {console.log(speakerInformation)}
                <h2>{speakerInformation.name.firstName+" "+speakerInformation.lastName}</h2>
                <p>{speakerInformation.information}</p> */}
               
            </Card>
            {/* </div> */}

            {/* {course.name, style{{}}} */}


        </>
    )
}
export default CourseIntroduce