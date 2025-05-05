// // import React from "react";
// // import './TryIt.css'; // Importing the CSS for the page styling
// // import { Link } from "react-router-dom";

// import { Button } from "primereact/button";
// import { useState } from "react";

// // const CoursePage = () => {
// //   const courses = [
// //     { title: "Course 1", backgroundImage: courseImage }
// //     // { title: "Course 2", backgroundImage: "https://via.placeholder.com/600x400" },
// //     // { title: "Course 3", backgroundImage: "https://via.placeholder.com/600x400" },
// //     // Add more courses as needed
// //   ];

// //   return (
// //     <div className="course-page">
// //       <div className="courses-container">
// //         {courses.map((course, index) => (
// //              <Link to='/LessonsList'> 
// //           <div
// //             key={index}
// //             className="course-card"
// //             style={{ backgroundImage: `url(${course.backgroundImage})` }}
// //           >
// //             <div className="course-content">
// //               <h2 className="course-title">{course.title}</h2>
// //             </div>

// //             {/* The black ruler positioned in the center */}
// //             <div className="ruler-container">
// //               <div className="black-ruler">
// //               <span className="ruler-text" >COURSE</span>
// //               </div>
// //             </div>
// //           </div></Link>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CoursePage;


// // import React, { useState } from 'react';
// // import { Accordion, AccordionTab } from 'primereact/accordion';

// // export default function DynamicDemo() {
// //     const [tabs] = useState([
// //         {
// //             header: 'Title I',
// //             children: <p className="m-0">Content 1</p>
// //         },
// //         {
// //             header: 'Title II',
// //             children: <p className="m-0">Content 2 </p>
// //         },
// //         {
// //             header: 'Title III',
// //             children: <p className="m-0">Content 3 </p>
// //         }
// //     ]);

// //     const createDynamicTabs = () => {
// //         return tabs.map((tab, i) => {
// //             return (
// //                 // what is??  after the header disabled={tab.disabled}
// //                 <AccordionTab key={tab.header} header={tab.header} >
// //                     {tab.children}
// //                 </AccordionTab>
// //             );
// //         });
// //     };

// //     return (
// //         <div className="card">
// //              <Accordion>{createDynamicTabs()}</Accordion>
// //         </div>
// //     )
// // }
        
// // import React from 'react';
// // import { Card } from 'primereact/card';
// // import { Button } from 'primereact/button';

// // const CourseIntro = () => {
// //   return (
// //     <div className="flex h-screen w-screen bg-gray-100">
// //       {/* Left side - Video */}
// //       <div className="w-1/3 h-full">
// //         <video
// //           className="object-cover w-full h-full"
// //           src="https://www.w3schools.com/html/mov_bbb.mp4" // Replace with your trailer link
// //           controls
// //         />
// //       </div>

// //       {/* Right side - Course Info */}
// //       <div className="w-2/3 p-10 flex items-center justify-center">
// //         <Card
// //           title="🚀 Mastering React: From Zero to Hero"
// //           subTitle="Level up your frontend skills"
// //           className="w-full max-w-3xl shadow-2xl"
// //         >
// //           <p className="text-gray-700 mb-4">
// //             This course covers everything you need to know about modern React development — including hooks, state management, performance optimization, and best practices.
// //           </p>
// //           <ul className="list-disc ml-5 mb-4 text-gray-600">
// //             <li>35+ Hours of Video Content</li>
// //             <li>Real-world Projects</li>
// //             <li>Certificate of Completion</li>
// //             <li>Access to Private Discord</li>
// //           </ul>
// //           <Button label="Enroll Now" icon="pi pi-check" className="p-button-success" />
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CourseIntro;
// // import React, { useState } from 'react';
// // import { Button } from 'primereact/button';

// // const TryIt = () => {
// //   const [clicked, setClicked] = useState(false);

// //   const handleClick = () => {
// //     setClicked(!clicked);
// //   };

// //   return (
// //     <Button
// //       label={clicked ? 'Clicked!' : 'Click Me'}
// //       className={clicked ? 'p-button-success' : 'p-button-primary'}
// //       onClick={handleClick}
// //     />
// //   );
// // };

// // export default TryIt;


        

// import React, { useState } from "react";
// import { RadioButton } from "primereact/radiobutton";

// export default function DynamicDemo() {
//     const categories = [
//         { name: 'Accounting', key: 'A' },
//         { name: 'Marketing', key: 'M' },
//         { name: 'Production', key: 'P' },
//         { name: 'Research', key: 'R' }
//     ];
//     const [selectedCategory, setSelectedCategory] = useState(categories[1]);

//     return (
//         <div className="card flex justify-content-center">
//             <div className="flex flex-column gap-3">
//                 {categories.map((category) => {
//                     return (
//                         <div key={category.key} className="flex align-items-center">
//                             <RadioButton inputId={category.key} name="category" value={category} onChange={(e) => setSelectedCategory(e.value)} checked={selectedCategory.key === category.key} />
//                             <label htmlFor={category.key} className="ml-2">{category.name}</label>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }
        

//it is working!!
// import FileUploadTest from "./FileUploadTest";
// const TryIt = () => {
//     const [visible, setVisible] = useState(false)
//     return(<>
//     <Button label="Click Me" icon="pi pi-check" className="p-button-success" onClick={() => setVisible(true)} />    
//     <FileUploadTest visible={visible} setVisible={setVisible} />
//     </>)
// }
// export default TryIt;
