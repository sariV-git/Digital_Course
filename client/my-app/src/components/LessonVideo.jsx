
import React from 'react'; 
import { useSelector } from 'react-redux';

const  LessonVideo=()=> {
   const path=useSelector(state=>state.lesson.lesson.path)
  const videSrc=`http://localhost:5000/upload/${path}`
   console.log('path',path);
   
    return (
        <div className="card flex justify-content-center">
            <video src={videSrc} width="50%%"  alt='Video' controls>
                Your browser does not support the video tag.
            </video>
        </div>
    )
}
export default LessonVideo

// export default function PreviewDemo() {
//     return (
//         <div className="card flex justify-content-center">
//             <Image src="https://primefaces.org/cdn/primereact/images/galleria/galleria10.jpg" alt="Image" width="250" preview />
//         </div>
//     )
// }
        
