// // import axios from "axios";
// // import { Card } from "primereact/card";
// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link } from "react-router-dom";
// // import "./TryIt.css";
// // import { ProgressBar } from "primereact/progressbar";
// // import { setCourses } from "../store/reducer/courseSlice";

// // const CoursesPage = () => {
// //     const dispatch = useDispatch();
// //     const courses = useSelector((state) => state.course.courses); // Get courses from Redux store
// //     const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

// //     const loadDataCourses = async () => {
// //         try {
// //             const respond = await axios.get("http://localhost:5000/course");
// //             if (respond.data && respond.data.length > 0) {
// //                 dispatch(setCourses({ newCourses: respond.data })); // Dispatch the courses to the Redux store
// //                 setErrorMessage(""); // Clear any previous error messages
// //             } else {
// //                 dispatch(setCourses({ newCourses: [] })); // Set courses to an empty array if no data is returned
// //                 setErrorMessage("No courses available at the moment."); // Set a user-friendly message
// //             }
// //         } catch (error) {
// //             console.error("Error loading courses:", error);
// //             setErrorMessage("Failed to load courses. Please try again later."); // Set a fallback error message
// //         }
// //     };

// //     useEffect(() => {
// //         loadDataCourses();
// //     }, [dispatch]);

// //     return (
// //         <>
// //             {courses ? (
// //                 courses.length > 0 ? (
// //                     <div className="course-page">
// //                         <div className="courses-container">
// //                             {courses.map((course, index) => (
// //                                 <Link
// //                                     to="/CourseIntroduce"
// //                                     state={{ course: course }}
// //                                     key={course._id}
// //                                 >
// //                                     <Card
// //                                         key={index}
// //                                         header={
// //                                             <img
// //                                                 alt={course.title}
// //                                                 src={`http://localhost:5000/upload/${course.backgroundImage}`}
// //                                                 style={{
// //                                                     width: "100%",
// //                                                     height: "150px",
// //                                                     objectFit: "cover",
// //                                                 }}
// //                                             />
// //                                         }
// //                                         style={{
// //                                             borderRadius: "10px",
// //                                             overflow: "hidden",
// //                                             boxShadow:
// //                                                 "0px 4px 6px rgba(0, 0, 0, 0.1)",
// //                                         }}
// //                                     >
// //                                         <div>
// //                                             <h4
// //                                                 style={{
// //                                                     margin: "0 0 10px 0",
// //                                                     fontSize: "1rem",
// //                                                 }}
// //                                             >
// //                                                 {course.name}
// //                                             </h4>
// //                                             <ProgressBar
// //                                                 value={5}
// //                                                 style={{
// //                                                     height: "10px",
// //                                                     marginBottom: "10px",
// //                                                 }}
// //                                             />
// //                                             <span style={{ fontSize: "0.875rem" }}>
// //                                                 {5}% complete
// //                                             </span>
// //                                         </div>
// //                                     </Card>
// //                                 </Link>
// //                             ))}
// //                         </div>
// //                     </div>
// //                 ) : (
// //                     <div className="no-courses-message">
// //                         <h3>{errorMessage}</h3>
// //                     </div>
// //                 )
// //             ) : (
// //                 <div>Loading courses...</div>
// //             )}
// //         </>
// //     );
// // };

// // export default CoursesPage;


// import axios from "axios";
// import { Card } from "primereact/card";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { setCourses } from "../store/reducer/courseSlice";

// const CoursesPage = () => {
//     const dispatch = useDispatch();
//     const courses = useSelector((state) => state.course.courses); // Get courses from Redux store
//     const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
//     const [speakers, setSpeakers] = useState({}); // State to store speaker information

//     const loadDataCourses = async () => {
//         try {
//             console.log("in loadDataCourses function");
            
//             const respond = await axios.get("http://localhost:5000/course");
//             if (respond.data && respond.data.length > 0) {
//                 dispatch(setCourses({ newCourses: respond.data })); // Dispatch the courses to the Redux store
//                 setErrorMessage(""); // Clear any previous error messages
//                 console.log("courses", respond.data);
                
//                 // Fetch speaker information for each course
//                 const speakerPromises = respond.data.map(async(course) =>//the speaker of each course
//                 { console.log(course._id)
                 
//                 const resSpeaker=await axios.get(`http://localhost:5000/course/getSpeakerInformation/${course._id}`)
//                  return resSpeaker.data
//              } );
//                 const speakerResponses = await Promise.all(speakerPromises);
//             console.log("speakerResponses", speakerResponses);
            
//                 // Map course IDs to speaker names
//                 const speakerMap = {};
//                 speakerResponses.forEach((res, index) => {
//                     console.log("res", res);
                    
//                     speakerMap[respond.data[index]._id] = res.name.firstName+" "+res.name.lastName; // Assuming the speaker name is in the response
//                 });
//                 setSpeakers(speakerMap);
//             } else {
//                 dispatch(setCourses({ newCourses: [] })); // Set courses to an empty array if no data is returned
//                 setErrorMessage("No courses available at the moment."); // Set a user-friendly message
//             }
//         } catch (error) {
//             console.error("Error loading courses or speakers:", error);
//             setErrorMessage("Failed to load courses. Please try again later."); // Set a fallback error message
//         }
//     };

//     useEffect(() => {
//         loadDataCourses();
//     }, [dispatch]);

//     return (
//         <div className="courses-page">
//             {courses ? (
//                 courses.length > 0 ? (
//                     <>
//                         <h1 className="page-title">Available Courses</h1>
//                         <div className="courses-grid">
//                             {courses.map((course) => (
//                                 <Link
//                                     to="/CourseIntroduce"
//                                     state={{ course: course }}
//                                     key={course._id}
//                                     className="course-link"
//                                 >
//                                     <Card
//                                         className="course-card"
//                                         header={
//                                             <img
//                                                 alt={course.name}
//                                                 src={`http://localhost:5000/upload/${course.backgroundImage}`}
//                                                 className="course-image"
//                                             />
//                                         }
//                                     >
//                                         <div className="card-content">
//                                             <h3 className="course-title">{course.name}</h3>
//                                             <hr className="card-divider" />
//                                             <p className="course-speaker">
//                                                 Speaker: {speakers[course._id] || "Loading..."}
//                                             </p>
//                                         </div>
//                                     </Card>
//                                 </Link>
//                             ))}
//                         </div>
//                     </>
//                 ) : (
//                     <div className="no-courses-message">
//                         <h3>{errorMessage}</h3>
//                     </div>
//                 )
//             ) : (
//                 <div>Loading courses...</div>
//             )}

//             <style>{`
//                 .courses-page {
//                     padding: 20px;
//                     background-color: #f3e5f5;
//                     min-height: 100vh;
//                 }

//                 .page-title {
//                     text-align: center;
//                     font-size: 2rem;
//                     color: #6a1b9a;
//                     margin-bottom: 20px;
//                 }

//                 .courses-grid {
//                     display: grid;
//                     grid-template-columns: repeat(3, 1fr);
//                     gap: 20px;
//                     justify-items: center;
//                 }

//                 .course-card {
//                     width: 300px;
//                     height: 400px;
//                     border-radius: 10px;
//                     overflow: hidden;
//                     box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//                     transition: transform 0.3s ease, box-shadow 0.3s ease;
//                     cursor: pointer;
//                 }

//                 .course-card:hover {
//                     transform: translateY(-5px);
//                     box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
//                 }

//                 .course-image {
//                     width: 100%;
//                     height: 150px;
//                     object-fit: cover;
//                 }

//                 .card-content {
//                     position: relative;
//                     top: 50px; /* Adjust to position the content in the middle */
//                     text-align: center;
//                 }

//                 .course-title {
//                     font-size: 1.5rem;
//                     font-weight: bold;
//                     color: #6a1b9a;
//                     margin-bottom: 10px;
//                 }

//                 .card-divider {
//                     border: none;
//                     border-top: 2px solid rgba(0, 0, 0, 0.2); /* Slightly darker gray and thicker */
//                     margin: 10px 0;
//                 }

//                 .course-speaker {
//                     font-size: 1rem;
//                     color: #333;
//                     text-align: center;
//                     margin-top: 10px;
//                 }

//                 .course-link {
//                     text-decoration: none;
//                 }

//                 .no-courses-message {
//                     text-align: center;
//                     margin-top: 50px;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default CoursesPage;


import axios from "axios";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCourses } from "../store/reducer/courseSlice";

const CoursesPage = () => {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.course.courses); // Get courses from Redux store
    const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
    const [speakers, setSpeakers] = useState({}); // State to store speaker information

    const loadDataCourses = async () => {
        try {
            const respond = await axios.get("http://localhost:5000/course");
            if (respond.data && respond.data.length > 0) {
                dispatch(setCourses({ newCourses: respond.data })); // Dispatch the courses to the Redux store
                setErrorMessage(""); // Clear any previous error messages
                
                // Fetch speaker information for each course
                const speakerPromises = respond.data.map(async (course) => {
                    const resSpeaker = await axios.get(`http://localhost:5000/course/getSpeakerInformation/${course._id}`);
                    return resSpeaker.data;
                });
                const speakerResponses = await Promise.all(speakerPromises);
                
                // Map course IDs to speaker names
                const speakerMap = {};
                speakerResponses.forEach((res, index) => {
                    speakerMap[respond.data[index]._id] = res.name.firstName + " " + res.name.lastName;
                });
                setSpeakers(speakerMap);
            } else {
                dispatch(setCourses({ newCourses: [] }));
                setErrorMessage("אין קורסים זמינים כרגע.");
            }
        } catch (error) {
            console.error("Error loading courses or speakers:", error);
            setErrorMessage("טעינת הקורסים נכשלה. אנא נסה שוב מאוחר יותר.");
        }
    };

    useEffect(() => {
        loadDataCourses();
    }, [dispatch]);

    return (
        <div className="courses-page">
            {courses ? (
                courses.length > 0 ? (
                    <>
                        <h1 className="page-title">קורסים זמינים</h1>
                        <div className="courses-grid">
                            {courses.map((course) => (
                                <Link
                                    to="/CourseIntroduce"
                                    state={{ course: course }}
                                    key={course._id}
                                    className="course-link"
                                >
                                    <Card
                                        className="course-card"
                                        header={
                                            <img
                                                alt={course.name}
                                                src={`http://localhost:5000/upload/${course.backgroundImage}`}
                                                className="course-image"
                                            />
                                        }
                                    >
                                        <div className="card-content">
                                            <h3 className="course-title">{course.name}</h3>
                                            <hr className="card-divider" />
                                            <p className="course-speaker">
                                                מרצה: {speakers[course._id] || "טוען..."}
                                            </p>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="no-courses-message">
                        <h3>{errorMessage}</h3>
                    </div>
                )
            ) : (
                <div>טוען קורסים...</div>
            )}

            <style>{`
                .courses-page {
                    padding: 20px;
                    background-color:#e8f5e9;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .page-title {
                    text-align: center;
                    font-size: 2rem;
                    color: #6a1b9a;
                    margin-bottom: 20px;
                }

                .courses-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr); /* 3 cards in each row */
                    gap: 20px; /* Small space between cards */
                    justify-content: center; /* Center all cards horizontally */
                    align-items: center; /* Center all cards vertically */
                }

                .course-card {
                    width: 300px;
                    height: 350px;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    cursor: pointer;
                }

                .course-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
                }

                .course-image {
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                }

                .card-content {
                    text-align: center;
                    padding: 10px 0;
                }

                .course-title {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: #6a1b9a;
                    margin-bottom: 10px;
                }

                .card-divider {
                    border: none;
                    border-top: 2px solid rgba(0, 0, 0, 0.2); /* Slightly darker gray and thicker */
                    margin: 10px 0;
                }

                .course-speaker {
                    font-size: 1rem;
                    color: #333;
                    text-align: center;
                    margin-top: 10px;
                }

                .course-link {
                    text-decoration: none;
                }

                .no-courses-message {
                    text-align: center;
                    margin-top: 50px;
                }
            `}</style>
        </div>
    );
};

export default CoursesPage;