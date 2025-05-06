import axios from "axios";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./TryIt.css";
import { ProgressBar } from "primereact/progressbar";
import { setCourses } from "../store/reducer/courseSlice";

const CoursesPage = () => {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.course.courses); // Get courses from Redux store
    const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

    const loadDataCourses = async () => {
        try {
            const respond = await axios.get("http://localhost:5000/course");
            if (respond.data && respond.data.length > 0) {
                dispatch(setCourses({ newCourses: respond.data })); // Dispatch the courses to the Redux store
                setErrorMessage(""); // Clear any previous error messages
            } else {
                dispatch(setCourses({ newCourses: [] })); // Set courses to an empty array if no data is returned
                setErrorMessage("No courses available at the moment."); // Set a user-friendly message
            }
        } catch (error) {
            console.error("Error loading courses:", error);
            setErrorMessage("Failed to load courses. Please try again later."); // Set a fallback error message
        }
    };

    useEffect(() => {
        loadDataCourses();
    }, [dispatch]);

    return (
        <>
            {courses ? (
                courses.length > 0 ? (
                    <div className="course-page">
                        <div className="courses-container">
                            {courses.map((course, index) => (
                                <Link
                                    to="/CourseIntroduce"
                                    state={{ course: course }}
                                    key={course._id}
                                >
                                    <Card
                                        key={index}
                                        header={
                                            <img
                                                alt={course.title}
                                                src={`http://localhost:5000/upload/${course.backgroundImage}`}
                                                style={{
                                                    width: "100%",
                                                    height: "150px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        }
                                        style={{
                                            borderRadius: "10px",
                                            overflow: "hidden",
                                            boxShadow:
                                                "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        <div>
                                            <h4
                                                style={{
                                                    margin: "0 0 10px 0",
                                                    fontSize: "1rem",
                                                }}
                                            >
                                                {course.name}
                                            </h4>
                                            <ProgressBar
                                                value={5}
                                                style={{
                                                    height: "10px",
                                                    marginBottom: "10px",
                                                }}
                                            />
                                            <span style={{ fontSize: "0.875rem" }}>
                                                {5}% complete
                                            </span>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="no-courses-message">
                        <h3>{errorMessage}</h3>
                    </div>
                )
            ) : (
                <div>Loading courses...</div>
            )}
        </>
    );
};

export default CoursesPage;