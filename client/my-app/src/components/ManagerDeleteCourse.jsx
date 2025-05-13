import axios from "axios";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ManagerDeleteCourse = () => {
    const navigate = useNavigate();
    const course = useSelector((state) => state.course.course);
    const token = useSelector((state) => state.token.token);

    const cancelDelete = () => {
        navigate("/IntroduceCourse", {
            state: { course: course },
        });
    };

    const deleteCourse = async () => {
        try {
            const res = await axios.delete(`http://localhost:5000/course/${course._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Successfully deleted course");
        } catch (error) {
            console.log("Error deleting course", error);
        }
        navigate("/");
    };

    return (
        <div className="delete-course-page">
            <div className="delete-course-container">
                <h2 className="delete-title">מחיקת הקורס</h2>
                <p className="delete-message">האם אתה בטוח שברצונך למחוק קורס זה?</p>
                <div className="button-group">
                    <Button label="כן, מחק" className="delete-button yes" onClick={deleteCourse} />
                    <Button label="לא, חזור" className="delete-button no" onClick={cancelDelete} />
                </div>
            </div>

            <style>{`
                .delete-course-page {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #e8f5e9, #e8f5e9);
                    font-family: Arial, sans-serif;
                }

                .delete-course-container {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    max-width: 400px;
                    width: 100%;
                }

                .delete-title {
                    font-size: 1.8rem;
                    color: #6a1b9a;
                    margin-bottom: 20px;
                }

                .delete-message {
                    font-size: 1.2rem;
                    color: #333;
                    margin-bottom: 30px;
                }

                .button-group {
                    display: flex;
                    justify-content: space-around;
                    gap: 10px;
                }

                .delete-button {
                    width: 45%;
                    font-size: 1rem;
                    padding: 10px 20px;
                    border-radius: 5px;
                    border: none;
                    cursor: pointer;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .delete-button.yes {
                    background-color: #8e24aa;
                    color: white;
                }

                .delete-button.yes:hover {
                    background-color: #6a1b9a;
                    transform: translateY(-3px);
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
                }

                .delete-button.no {
                    background-color: #e1bee7;
                    color: #6a1b9a;
                }

                .delete-button.no:hover {
                    background-color: #d1c4e9;
                    transform: translateY(-3px);
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </div>
    );
};

export default ManagerDeleteCourse;