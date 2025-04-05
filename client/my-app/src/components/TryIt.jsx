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
