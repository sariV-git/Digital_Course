
// import axios from "axios";
// import { Button } from "primereact/button";
// import { Column } from "primereact/column";
// import { DataTable } from "primereact/datatable";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const ManagerUsersPage = () => {
//     const navigate = useNavigate();
//     const token = useSelector((state) => state.token.token);
//     const [users, setUsers] = useState([]);
//     const course = useSelector((state) => state.course.course);

//     const loadDataUsers = async () => {
//         try {
//             const res = await axios.get(
//                 `http://localhost:5000/userCourse/getUsersAccordingCourse/${course._id}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             console.log("users", res.data);
//             setUsers(res.data);
//         } catch (error) {
//             console.log("eeee", error);
//         }
//     };

//     useEffect(() => {
//         loadDataUsers();
//     }, []);

//     // Render the "showTasks" button for each user
//     const showButtonTasks = (userData) => {
//         return (
//             <Button
//                 label="הצג משימות"
//                 onClick={() => {
//                     navigate("/UserTasks", {
//                         state: {
//                             user_id: userData._id,
//                             userName: `${userData.name.firstName} ${userData.name.lastName}`,
//                         },
//                     });
//                 }}
//                 style={{
//                     backgroundColor: "#8E24AA",
//                     color: "white",
//                     borderRadius: "8px",
//                     border: "none",
//                     padding: "8px 12px",
//                 }}
//             ></Button>
//         );
//     };

//     return (
//         <div
//             style={{
//                 backgroundColor: "#F3E5F5",
//                 minHeight: "100vh",
//                 padding: "20px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//             }}
//         >
//             <div
//                 style={{
//                     width: "90%",
//                     maxWidth: "1200px",
//                     backgroundColor: "white",
//                     borderRadius: "10px",
//                     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//                     padding: "20px",
//                 }}
//             >
//                 <h1
//                     style={{
//                         textAlign: "center",
//                         color: "#6A1B9A",
//                         marginBottom: "20px",
//                     }}
//                 >
//                     ניהול משתמשים בקורס
//                 </h1>
//                 <DataTable
//                     value={users}
//                     paginator
//                     rows={10}
//                     style={{ borderRadius: "10px", overflow: "hidden" }}
//                     headerStyle={{ backgroundColor: "#6A1B9A", color: "white" }}
//                 >
//                     <Column
//                         header="שם פרטי"
//                         sortable
//                         field="name.firstName"
//                         style={{ textAlign: "center" }}
//                     />
//                     <Column
//                         header="שם משפחה"
//                         field="name.lastName"
//                         style={{ textAlign: "center" }}
//                     />
//                     <Column
//                         header="טלפון"
//                         field="phone"
//                         style={{ textAlign: "center" }}
//                     />
//                     <Column
//                         header="אימייל"
//                         field="email"
//                         style={{ textAlign: "center" }}
//                     />
//                     <Column
//                         header="שם משתמש"
//                         field="username"
//                         style={{ textAlign: "center" }}
//                     />
//                     <Column
//                         header="משימות"
//                         body={showButtonTasks}
//                         style={{ textAlign: "center" }}
//                     />
//                 </DataTable>
//             </div>
//         </div>
//     );
// };

// export default ManagerUsersPage;


import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ManagerUsersPage = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.token.token);
    const [users, setUsers] = useState([]);
    const course = useSelector((state) => state.course.course);

    const loadDataUsers = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/userCourse/getUsersAccordingCourse/${course._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("users", res.data);
            setUsers(res.data);
        } catch (error) {
            console.log("eeee", error);
        }
    };

    useEffect(() => {
        loadDataUsers();
    }, []);

    // Render the "showTasks" button for each user
    const showButtonTasks = (userData) => {
        return (
            <Button
                label="הצג משימות"
                onClick={() => {
                    navigate("/UserTasks", {
                        state: {
                            user_id: userData._id,
                            userName: `${userData.name.firstName} ${userData.name.lastName}`,
                        },
                    });
                }}
                style={{
                    backgroundColor: "#8E24AA",
                    color: "white",
                    borderRadius: "8px",
                    border: "none",
                    padding: "8px 12px",
                }}
            ></Button>
        );
    };

    return (
        <div
            style={{
                backgroundColor: "#F3E5F5",
                minHeight: "100vh",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: "90%",
                    maxWidth: "1200px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        color: "#6A1B9A",
                        marginBottom: "20px",
                    }}
                >
                    ניהול משתמשים בקורס
                </h1>
                <DataTable
                    value={users}
                    paginator
                    rows={10}
                    style={{ borderRadius: "10px", overflow: "hidden" }}
                    // headerStyle={{ backgroundColor: "#6A1B9A", color: "white" }}
                >
                    {/* Reverse the order of columns */}
                    <Column
                        header="משימות"
                        body={showButtonTasks}
                        style={{ textAlign: "center" }}
                    />
                    <Column
                        header="שם משתמש"
                        field="username"
                        style={{ textAlign: "center" }}
                    />
                    <Column
                        header="אימייל"
                        field="email"
                        style={{ textAlign: "center" }}
                    />
                    <Column
                        header="טלפון"
                        field="phone"
                        style={{ textAlign: "center" }}
                    />
                    <Column
                        header="שם משפחה"
                        field="name.lastName"
                        style={{ textAlign: "center" }}
                    />
                    <Column
                        header="שם פרטי"
                        sortable
                        field="name.firstName"
                        style={{ textAlign: "center" }}
                    />
                </DataTable>
            </div>
        </div>
    );
};

export default ManagerUsersPage;



