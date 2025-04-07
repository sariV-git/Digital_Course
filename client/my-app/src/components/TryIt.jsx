// import React from "react";
// import './TryIt.css'; // Importing the CSS for the page styling
// import { Link } from "react-router-dom";

// const CoursePage = () => {
//   const courses = [
//     { title: "Course 1", backgroundImage: courseImage }
//     // { title: "Course 2", backgroundImage: "https://via.placeholder.com/600x400" },
//     // { title: "Course 3", backgroundImage: "https://via.placeholder.com/600x400" },
//     // Add more courses as needed
//   ];

//   return (
//     <div className="course-page">
//       <div className="courses-container">
//         {courses.map((course, index) => (
//              <Link to='/LessonsList'> 
//           <div
//             key={index}
//             className="course-card"
//             style={{ backgroundImage: `url(${course.backgroundImage})` }}
//           >
//             <div className="course-content">
//               <h2 className="course-title">{course.title}</h2>
//             </div>

//             {/* The black ruler positioned in the center */}
//             <div className="ruler-container">
//               <div className="black-ruler">
//               <span className="ruler-text" >COURSE</span>
//               </div>
//             </div>
//           </div></Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CoursePage;


import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

export default function DynamicDemo() {
    const [tabs] = useState([
        {
            header: 'Title I',
            children: <p className="m-0">Content 1</p>
        },
        {
            header: 'Title II',
            children: <p className="m-0">Content 2 </p>
        },
        {
            header: 'Title III',
            children: <p className="m-0">Content 3 </p>
        }
    ]);

    const createDynamicTabs = () => {
        return tabs.map((tab, i) => {
            return (
                // what is??  after the header disabled={tab.disabled}
                <AccordionTab key={tab.header} header={tab.header} >
                    {tab.children}
                </AccordionTab>
            );
        });
    };

    return (
        <div className="card">
             <Accordion>{createDynamicTabs()}</Accordion>
        </div>
    )
}
        
