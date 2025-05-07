// import React, { useState, useEffect, useRef } from "react";
// import { Menubar } from "primereact/menubar";
// import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from "react-router-dom";
// import "primereact/resources/themes/saga-purple/theme.css"; // PrimeReact Theme
// import "primereact/resources/primereact.min.css"; // Core CSS
// import "primeicons/primeicons.css"; // Icons
// import { Button } from "primereact/button";
// import { TieredMenu } from "primereact/tieredmenu";
// import { Avatar } from "primereact/avatar";
// // import FileUploadTest from "./FileUploadTest"; 
// import ManagerAddCourse from "./ManagerAddCourse";
// import ManagerAddLesson from "./ManagerAddLesson";
// import image from "./image.png";
// import { useSelector } from "react-redux";

// const MenubarWithEdit = () => {
//   const isManager = useSelector(state => state.token.isManager); // Example: Replace with your logic to check if the user is a manager
//   const token = useSelector(state => state.token.token); // Example: Replace with your authentication logic
//   const user = useSelector(state => state.user.user); // Example user data
// const course=useSelector(state=>state.course.course)
//   const [shortName, setShortName] = useState(null);
//   const [menuItems, setMenuItems] = useState([]);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // State for Edit component
//   const menu = useRef(null);
//   const [isCreateCourse, setIsCreateCourse] = useState(false);
//   const [isCreateLesson, setIsCreateLesson] = useState(false);
//   const [visibleCourse, setVisibleCourse] = useState(false);
//   const [visibleLesson, setVisibleLesson] = useState(false);

//   // Menu items for the TieredMenu in Edit
//   const editMenuItems = [
//     {
//       label: "Course",
//       icon: "pi pi-book",
//       items: [
//         {
//           label: "Create Course",
//           icon: "pi pi-plus",
//           command: () => handleCreate("course"),
//         },
//         {
//           label: "Delete Course",
//           icon: "pi pi-times",
//           command: () => handleDelete("course"),
//         },
//       ],                  
//     },
//     {
//       label: "Lesson",
//       icon: "pi pi-pencil",
//       items: [
//         {
//           label: "Create Lesson",
//           icon: "pi pi-plus",
//           command: () => handleCreate("lesson"),
//         },
//       ],
//     },
//   ];

//   // Update shortName when user logs in or logs out
//   useEffect(() => {
//     if (token && user) {
//       setShortName(
//         `${user.name.firstName.charAt(0)}${user.name.lastName.charAt(0)}`
//       );
//     } else {
//       setShortName(null); // Clear shortName on logout
//     }
//   }, [token, user]);


//   // Update menu items based on role and route
//   useEffect(() => {
//     if (token && isManager) {//-----------for manager
//       // Manager Menu
//       if (location.pathname === "/CourseIntroduce") {
//         setMenuItems([
//           { label: "Home", icon: "pi pi-home", command: () => navigate("/") },
//           {
//             label: "Edit",
//             icon: "pi pi-cog",
//             template: () => (
//               <>
//                 <TieredMenu model={editMenuItems} popup ref={menu} breakpoint="767px" />
//                 <Button
//                   label="Edit"
//                   icon="pi pi-cog"
//                   onClick={(e) => menu.current.toggle(e)}
//                   style={{
//                     backgroundColor: "white",
//                     color: "black",
//                     border: "none",
//                     borderRadius: "8px",
//                     padding: "0.5rem 1rem",
//                   }}
//                 />
//               </>
//             ),
//           },
//           { label: "Users", icon: "pi pi-user", command: () => navigate("/ManagerUsersPage") },
//           { label: "Users Responds ", icon: "pi pi-user", command: () => navigate("/ManagerSetResponds") },
//         ]);
//       }
//       else if (location.pathname === "/") {
//         setMenuItems([
//           { label: "Home", icon: "pi pi-home", command: () => navigate("/") },
//           { label: "Create Course", icon: "pi pi-book", command: () => handleCreate("course") },
//         ]);
//       }
//       else if (location.pathname === "/LessonsList" || location.pathname == './CourseIntroduce') {
//         setMenuItems
//           ([
//             { label: "Home", icon: "pi pi-home", command: () => navigate("/") },
//             { label: "Create Lesson", icon: "pi pi-book ", command: () => handleCreate("lesson") },
//             { label: 'Users Responds ', icon: "pi pi-user", command: () => navigate("/ManagerSetResponds") },
//             { label: "Users", icon: "pi pi-user", command: () => navigate("/ManagerUsersPage"), },
//             { label: 'lessons', icon: "pi pi-book", command: () => navigate("/LessonsList") },
//           ]);
//       }
//       // else if (location.pathname === "/CourseIntroduce") {
//       //??here adding all the rest which i need 
//       else {
//         setMenuItems([{ label: "Home", icon: "pi pi-home", command: () => navigate("/") },
//           { label: 'Users Responds ', icon: "pi pi-user", command: () => navigate("/ManagerSetResponds") },
//         { label: "Users", icon: "pi pi-user", command: () => navigate("/ManagerUsersPage"), },
//         { label: 'lessons', icon: "pi pi-book", command: () => navigate("/LessonsList") }
//         ]);
//       }
//     } else if (token) {
//       // Regular User Menu
//       if (location.pathname == '/')
//         setMenuItems([{ label: 'home', icon: 'pi pi-home', command: () => navigate("/") },]);
//       else if (location.pathname == '/CourseIntroduce')
//         setMenuItems([{ label: 'home', icon: 'pi pi-home', command: () => navigate("/") },
//         { label: '' }]);
//       else
//         setMenuItems([{ label: "UserTasksComplete", icon: "pi pi-book", command: () => navigate("/UserTasksComplete") },
//         { label: "Home", icon: "pi pi-home", command: () => navigate("/") },
//         { label: "lessons", icon: "pi pi-book", command: () => navigate("/LessonsList") },]);

//     } else {
//       // Logged Out (Guest)
//       setMenuItems([{ label: "Home", icon: "pi pi-home", command: () => navigate("/") },
//       ]);
//     }
//   }, [token, isManager, location.pathname, navigate]);

//   // Handle creation of course or lesson
//   const handleCreate = (type) => {
//     if (type === "course") {
//       setVisibleCourse(true);
//       setIsCreateLesson(false);
//       setIsCreateCourse(true);
//     } else if (type === "lesson") {
//       setIsCreateLesson(true);
//       setVisibleLesson(true)
//     }
//   };

//   // Handle deletion of course
//   const handleDelete = (type) => {
//     if (type === "course") {
//       navigate("/ManagerDeleteCourse")
//     }
//   };

//   // const start = (
//   // location.pathname!='/'&& course? <img src={`url(http://localhost:5000/upload/${course.backgroundImage})`} alt="Logo" style={{ height: "40px" }} />:<></>
//   // );

//   const start = (
//   location.pathname !== '/' && course ? (
//     <div style={{ position: "relative", display: "inline-block", width: "120px", height: "40px" }}>
//       {/* Background Image */}
//       <img 
//         src={`http://localhost:5000/upload/${course.backgroundImage}`} 
//         alt="Course Background" 
//         style={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover", // Ensures the image fills the space proportionally
//           borderRadius: "8px", // Rounded corners for a polished look
//         }} 
//       />
//       {/* Course Name Overlay */}
//       <span 
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           color: "white",
//           fontWeight: "bold",
//           fontSize: "14px",
//           textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)", // Shadow for better readability
//           whiteSpace: "nowrap", // Prevent text wrapping
//           textAlign: "center",
//         }}
//       >
//         {course.name}
//       </span>
//     </div>
//   ) : (
//     <></>
//   )
// );

//   const end = (
//     <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//       <Button
//         icon="pi pi-bell"
//         className="p-button-rounded p-button-text"
//       />
//       {!token && <Link to="/LogIn">Login</Link>}
//       {token && (
//         <Button onClick={() => {
//           console.log("the token when you press on the log out is: ", token);

//           setShortName(null); // Clear short name
//           navigate("/LogOut"); // Navigate to the logout page
//         }}>
//           Logout
//         </Button>
//       )}
//       {shortName && (
//         <Avatar
//           label={shortName}
//           shape="circle"
//           style={{
//             backgroundColor: "#f0f0f0",
//             color: "#000",
//             fontWeight: "bold",
//           }}
//         />
//       )}
//     </div>
//   );

//   return (
//     <div>
//       <Menubar
//         model={menuItems}
//         end={end}
//         start={start}
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           zIndex: 1000,
//         }}
//       />
//       <ManagerAddCourse visible={visibleCourse} setVisible={setVisibleCourse} />

//       <ManagerAddLesson visible={visibleLesson} setVisible={setVisibleLesson} />
//     </div>
//   );
// };

// export default MenubarWithEdit;



import React, { useState, useEffect, useRef } from "react";
import { Menubar } from "primereact/menubar";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from "react-router-dom";
import "primereact/resources/themes/saga-purple/theme.css"; // PrimeReact Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import { Button } from "primereact/button";
import { TieredMenu } from "primereact/tieredmenu";
import { Avatar } from "primereact/avatar";
import ManagerAddCourse from "./ManagerAddCourse";
import ManagerAddLesson from "./ManagerAddLesson";
import { useSelector } from "react-redux";

const MenubarWithEdit = () => {
  const isManager = useSelector((state) => state.token.isManager);
  const token = useSelector((state) => state.token.token);
  const user = useSelector((state) => state.user.user);
  const course = useSelector((state) => state.course.course);
  const [shortName, setShortName] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const menu = useRef(null);
  const [isCreateCourse, setIsCreateCourse] = useState(false);
  const [isCreateLesson, setIsCreateLesson] = useState(false);
  const [visibleCourse, setVisibleCourse] = useState(false);
  const [visibleLesson, setVisibleLesson] = useState(false);

  const editMenuItems = [
    {
      label: "קורס",
      icon: "pi pi-book",
      items: [
        {
          label: "יצירת קורס",
          icon: "pi pi-plus",
          command: () => handleCreate("course"),
        },
        {
          label: "מחיקת קורס",
          icon: "pi pi-times",
          command: () => handleDelete("course"),
        },
      ],
    },
    {
      label: "שיעור",
      icon: "pi pi-pencil",
      items: [
        {
          label: "יצירת שיעור",
          icon: "pi pi-plus",
          command: () => handleCreate("lesson"),
        },
      ],
    },
  ];

  useEffect(() => {
    if (token && user) {
      setShortName(
        `${user.name.firstName.charAt(0)}${user.name.lastName.charAt(0)}`
      );
    } else {
      setShortName(null);
    }
  }, [token, user]);

  useEffect(() => {
    if (token && isManager) {
      if (location.pathname === "/CourseIntroduce") {
        setMenuItems([
          { label: "בית", icon: "pi pi-home", command: () => navigate("/") },
          { label: "שיעורים", icon: "pi pi-book", command: () => navigate("/LessonsList") },

          {
            label: "עריכה",
            icon: "pi pi-cog",
            template: () => (
              <>
                <TieredMenu model={editMenuItems} popup ref={menu} breakpoint="767px" />
                <Button
                  label="עריכה"
                  icon="pi pi-cog"
                  onClick={(e) => menu.current.toggle(e)}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                  }}
                />
              </>
            ),
          },
          { label: "משתמשים", icon: "pi pi-user", command: () => navigate("/ManagerUsersPage") },
          { label: "תגובות משתמשים", icon: "pi pi-user", command: () => navigate("/ManagerSetResponds") },
        ]);
      } else if (location.pathname === "/") {
        setMenuItems([
          { label: "בית", icon: "pi pi-home", command: () => navigate("/") },
          { label: "יצירת קורס", icon: "pi pi-book", command: () => handleCreate("course") },
        ]);
      } else if (location.pathname === "/LessonsList" || location.pathname === "/CourseIntroduce") {
        setMenuItems([
          { label: "בית", icon: "pi pi-home", command: () => navigate("/") },
          { label: "יצירת שיעור", icon: "pi pi-book", command: () => handleCreate("lesson") },
          { label: "תגובות משתמשים", icon: "pi pi-user", command: () => navigate("/ManagerSetResponds") },
          { label: "משתמשים", icon: "pi pi-user", command: () => navigate("/ManagerUsersPage") },
        ]);
      } else {
        setMenuItems([
          { label: "בית", icon: "pi pi-home", command: () => navigate("/") },
          { label: "תגובות משתמשים", icon: "pi pi-user", command: () => navigate("/ManagerSetResponds") },
          { label: "משתמשים", icon: "pi pi-user", command: () => navigate("/ManagerUsersPage") },
          { label: "שיעורים", icon: "pi pi-book", command: () => navigate("/LessonsList") },
        ]);
      }
    } else if (token) {
      if (location.pathname === "/") {
        setMenuItems([{ label: "בית", icon: "pi pi-home", command: () => navigate("/") }]);
      } else {
        setMenuItems([
          { label: "משימות", icon: "pi pi-book", command: () => navigate("/UserTasksComplete") },
          { label: "בית", icon: "pi pi-home", command: () => navigate("/") },
          { label: "שיעורים", icon: "pi pi-book", command: () => navigate("/LessonsList") },
        ]);
      }
    } else {
      setMenuItems([{ label: "בית", icon: "pi pi-home", command: () => navigate("/") }]);
    }
  }, [token, isManager, location.pathname, navigate]);

  const handleCreate = (type) => {
    if (type === "course") {
      setVisibleCourse(true);
      setIsCreateLesson(false);
      setIsCreateCourse(true);
    } else if (type === "lesson") {
      setIsCreateLesson(true);
      setVisibleLesson(true);
    }
  };

  const handleDelete = (type) => {
    if (type === "course") {
      navigate("/ManagerDeleteCourse");
    }
  };

  const start = (
    location.pathname !== "/" && course ? (
      <div style={{ position: "relative", display: "inline-block", width: "120px", height: "40px" }}>
        <img
          src={`http://localhost:5000/upload/${course.backgroundImage}`}
          alt="רקע הקורס"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontWeight: "bold",
            fontSize: "14px",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          {course.name}
        </span>
      </div>
    ) : (
      <></>
    )
  );

  const end = (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button icon="pi pi-bell" className="p-button-rounded p-button-text" />
      {!token && <Link to="/LogIn">התחבר</Link>}
      {token && (
        <Button
          onClick={() => {
            setShortName(null);
            navigate("/LogOut");
          }}
        >
          התנתק
        </Button>
      )}
      {shortName && (
        <Avatar
          label={shortName}
          shape="circle"
          style={{
            backgroundColor: "#f0f0f0",
            color: "#000",
            fontWeight: "bold",
          }}
        />
      )}
    </div>
  );

  return (
    <div>
      <Menubar
        model={menuItems}
        end={end}
        start={start}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      />
      <ManagerAddCourse visible={visibleCourse} setVisible={setVisibleCourse} />
      <ManagerAddLesson visible={visibleLesson} setVisible={setVisibleLesson} />
    </div>
  );
};

export default MenubarWithEdit;