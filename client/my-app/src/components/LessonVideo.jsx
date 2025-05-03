
// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const LessonVideo = (props) => {
//     const location = useLocation()
//     const path = location.state.path ? location.state.path : props.path
//     console.log('the path of the video', path)
//     const videSrc = `http://localhost:5000/upload/${path}`
//     console.log('path', path);

//     return (
//         <div className="card flex justify-content-center">
//             <video src={videSrc} width="50%%" alt='Video' controls>
//                 Your browser does not support the video tag.
//             </video>
//         </div>
//     )
// }
// export default LessonVideo


import React from "react";
import { useLocation } from "react-router-dom";

const LessonVideo = (props) => {
  const location = useLocation();
  const path = location.state?.path || props.path;

  const videoSrc = `http://localhost:5000/upload/${path}`;
  console.log("path", path);

  return (
    <div className="flex justify-content-center align-items-center h-screen bg-light-purple">
      <div
        className="card shadow-3"
        style={{
          width: "60%",
          borderRadius: "10px",
          backgroundColor: "white",
          padding: "1rem",
          border: "1px solid #D8BFD8",
          textAlign: "center",
        }}
      >
        <video
          src={videoSrc}
          width="100%"
          controls
          style={{
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default LessonVideo;