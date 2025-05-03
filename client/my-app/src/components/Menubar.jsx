
// import React, { useEffect, useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setItemsInTheMenubar } from '../store/reducer/itemsInTheMenubarSlice';
import image from './image.png'
// import { Avatar } from 'primereact/avatar';
// import { Button } from 'primereact/button';
// import Login from './Login';
// import { logOut } from '../store/reducer/tokenSlice';
// import LogOut from './LogOut';
// export default function TemplateDemo() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const token = useSelector(state => state.token.token)
//   const user = useSelector(state => state.user.user)



//   // Use useSelector to get the items from the Redux store
//   const itemsInTheMenubar = useSelector(state => state.itemsInTheMenubar.itemsInTheMenubar);

//   // Initialize items if they are not set yet, and do this only once

//   useEffect(() => {
//    if(token)
//    {
//     setShortName(`${user.name.firstName.charAt(0)}${user.name.lastName.charAt(0)}`)
//    }
//   }, [user])


//   return (
//     <div>
//       {itemsInTheMenubar && itemsInTheMenubar.length > 0 ? (
//         <Menubar start={<img src={image} alt="Logo"
//           style={{ height: "40px" }}
//         ></img>}
//           style={{
//             position: "fixed", // Fix the Menubar at the top
//             top: 0, // Align to the top
//             left: 0,
//             width: "100%", // Occupy full width
//             zIndex: 1000, // Ensure it appears above other elements
//           }}
//           end={

//             <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

//               <Button
//                 icon="pi pi-bell"
//                 className="p-button-rounded p-button-text"//mabye can remove this button??
//               />

//               {!token&&<Link to={'/LogIn'}>Login</Link>}
//               {token&&<Button onClick={()=>{setShortName(null);navigate('/LogOut')}}>logout</Button>}
//               {shortName&&<Avatar
//                 label={shortName}
//                 shape="circle"
//                 style={{
//                   backgroundColor: "#f0f0f0",
//                   color: "#000",
//                   fontWeight: "bold",
//                 }}
//               />}
//             </div>

//           }
//           model={menuItems} />
//       ) : (
//         <div>Loading menu items...</div> // Display a loading message or fallback UI
//       )}
//     </div>
//   );
// }

///////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { Menubar } from "primereact/menubar";
// import { BrowserRouter as Router, Route, Routes, useLocation, Link, useNavigate } from "react-router-dom";
// import "primereact/resources/themes/saga-purple/theme.css"; // PrimeReact Theme
// import "primereact/resources/primereact.min.css"; // Core CSS
// import "primeicons/primeicons.css"; // Icons
// import Edit from "./Edit";
// import { useSelector } from "react-redux";
// import { Button } from 'primereact/button';
// import { Avatar } from 'primereact/avatar';
// // import image from "/image.png"

// const TemplateDemo = () => {

//   const isManager = useSelector( state => state.token.isManager)
//   const token = useSelector(state => state.token.token)
//     const [shortName, setShortName] = useState(null)
//   // const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector(state => state.user.user)
//   const [menuItems, setMenuItems] = useState([
//     { label: "Home", icon: "pi pi-home", command: () => (window.location.href = "/") },
//   ]);

//   const location = useLocation();

//    useEffect(() => {
//        if(token)
//        {
//         setShortName(`${user.name.firstName.charAt(0)}${user.name.lastName.charAt(0)}`)
//        }
//       }, [user])

//   useEffect(() => {//here need write about every page which items the user will see in the menubar??

//     if (isManager)//this is a manager
//     {
//       if (location.pathname === '/CourseIntroduce') {
//         setMenuItems([
//           { label: "Home", icon: "pi pi-home", command: () => (window.location.href = "/") },
//           { template: () => { return <div><Edit /></div> } },
//           { label: "users", icon: "pi pi-user", command: () => { window.location.href = "/ManagerUsersPage" } },
//         ])
// }     
//      else if (location.pathname === '/')
//         setMenuItems([{ label: "Home", icon: "pi pi-home", command: () => (window.location.href = "/") }])

//     }

//     else if(token){//this is a user
//       setMenuItems([///mabye the options of pass to the lessons??
//         { label: "Home", icon: "pi pi-home", command: () => (window.location.href = "/") },
//       ])
//     }
//     else{
//       //for someone who is not user??
//     }

//   }, [token,isManager,location.pathname,navigate]);


//   const start = (<img src={image} alt="Logo"
//     style={{ height: "40px" }}
//   ></img>)
     

//   const end = (<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//     <Button
//       icon="pi pi-bell"
//       className="p-button-rounded p-button-text"//mabye can remove this button??
//     />
//     {!token && <Link to={'/LogIn'}>Login</Link>}
//     {token && <Button onClick={() => { setShortName(null); navigate('/LogOut') }}>logout</Button>}
//     {shortName && <Avatar
//       label={shortName}
//       shape="circle"
//       style={{
//         backgroundColor: "#f0f0f0",
//         color: "#000",
//         fontWeight: "bold",
//       }}
//     />}
//   </div>)

//   return (
//     <div>
//       <Menubar model={menuItems}end={end} start={start} style={{
//       position: "fixed", // Fix the Menubar at the top
//       top: 0, // Align to the top
//       left: 0,
//       width: "100%", // Occupy full width
//       zIndex: 1000, // Ensure it appears above other elements
//     }}
//     />
//       <Routes>
//         <Route path='/Edit' element={<Edit />} />
//       </Routes>
//     </div>
//   );
// };
// //mabye can i insert all the route to here??


// export default TemplateDemo;

import React, { useState, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from "react-router-dom";
import "primereact/resources/themes/saga-purple/theme.css"; // PrimeReact Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import Edit from "./Edit";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";

const TemplateDemo = () => {
  const isManager = useSelector((state) => state.token.isManager);
  const token = useSelector((state) => state.token.token);
  const user = useSelector((state) => state.user.user);

  const [shortName, setShortName] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Update shortName when user logs in or logs out
  useEffect(() => {
    if (token && user) {
      setShortName(
        `${user.name.firstName.charAt(0)}${user.name.lastName.charAt(0)}`
      );
    } else {
      setShortName(null); // Clear shortName on logout
    }
  }, [token, user]);

  // Update menu items based on role and route
  useEffect(() => {
    if (token && isManager) {
      // Manager Menu
      if (location.pathname === "/CourseIntroduce") {
        setMenuItems([
          { label: "Home", icon: "pi pi-home", command: () => navigate("/") },
          { template: () => <Edit /> },
          { label: "Users", icon: "pi pi-user", command: () => navigate("/ManagerUsersPage") },
        ]);
      } else if (location.pathname === "/") {
        setMenuItems([
          { label: "Home", icon: "pi pi-home", command: () => navigate("/") },
        ]);
      }
    } else if (token) {
      // Regular User Menu
      setMenuItems([
        { label: "Home", icon: "pi pi-home", command: () => navigate("/") },
      ]);
    } else {
      // Logged Out (Guest)
      setMenuItems([]);
    }
  }, [token, isManager, location.pathname, navigate]);

  const start = (
    <img src={image} alt="Logo" style={{ height: "40px" }} />
  );

  const end = (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button
        icon="pi pi-bell"
        className="p-button-rounded p-button-text"
      />
      {!token && <Link to="/LogIn">Login</Link>}
      {token && (
        <Button onClick={() => {
          setShortName(null); // Clear short name
          navigate("/LogOut"); // Navigate to the logout page
        }}>
          Logout
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
      <Routes>
        <Route path="/Edit" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default TemplateDemo;