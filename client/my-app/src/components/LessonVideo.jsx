
import React from 'react';
import { useLocation } from 'react-router-dom';

const LessonVideo = (props) => {
    const location = useLocation()
    const path = location.state.path ? location.state.path : props.path
    console.log('the path of the video', path)
    const videSrc = `http://localhost:5000/upload/${path}`
    console.log('path', path);

    return (
        <div className="card flex justify-content-center">
            <video src={videSrc} width="50%%" alt='Video' controls>
                Your browser does not support the video tag.
            </video>
        </div>
    )
}
export default LessonVideo
