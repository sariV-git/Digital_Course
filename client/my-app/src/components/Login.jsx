// // import React, { useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import '../App.css';
// // import { useForm } from "react-hook-form"
// // import axios from 'axios';
// // import { setToken, logOut } from '../store/reducer/tokenSlice'
// // import { setUser } from '../store/reducer/userSlice';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import { setCourse } from '../store/reducer/courseSlice';
// // import { setIsManager } from '../store/reducer/tokenSlice';
// // import { setItemsInTheMenubar } from '../store/reducer/itemsInTheMenubarSlice';
// // import { setBelongToTheCourses} from '../store/reducer/userSlice';

// // const Login = () => {
// //   const location = useLocation()
// //   const course = useSelector(state => state.course.course)
// //   const navigate = useNavigate();
// //   // const token = useSelector(state => state.token.token)
// //   const dispatch = useDispatch()
  
 
// // // const fillArrayWithIdOfCoursesUserBelong = async (user, token) => {
// // //     try {
// // //       const res = await axios.get(`http://localhost:5000/userCourse/accordingUser/${user._id}`, {
// // //         headers: {
// // //           Authorization: `Bearer ${token}`//because only user can get all the courseuser by user
// // //         }
// // //       })
// // //       console.log('usercourse of the user--see in the data',res);
      
// // //       const usercourses = res.data
// // //       if (usercourses) {//all the courses which the user belong to
// // //          const arrayWithIdOfCoursesUserBelong = usercourses.map(usercourse => {
// // //           return usercourse.course
// // //         })
// // //         console.log('arrayWithIdOfCoursesUserBelong',arrayWithIdOfCoursesUserBelong);
// // //         dispatch(setBelongToTheCourses({ newItems: arrayWithIdOfCoursesUserBelong }))
// // //       }
// // //       else
// // //         console.log('usercourses', usercourses);
// // //     } catch (error) {
// // //       console.log('error', error);
// // //     }
// // //   }

// //   const loginUser = async (data) => {

// //     const username = data.username
// //     const password = data.password

// //     try {
// //       const res = await axios.post('http://localhost:5000/auth/login', { username, password})
// //       console.log("the user after do the login: ",res.data.user);
// //       console.log("the courses which the user belong: ",res.data.belongToTheCourses);
      
// //       dispatch(setUser({newUser:res.data.user}))
// //       dispatch(setBelongToTheCourses({newItems:res.data.belongToTheCourses}))
// //       // if (res.data.role != 'Admin')             
// //       //   fillArrayWithIdOfCoursesUserBelong(res.data.user, res.data.accessToken)
      
// //       dispatch(setToken(res.data))
// //       //to cancel the option that the login return user      
// //       if (res.data.role == 'Admin') {
// //         console.log('you are a manager!!!');
// //         dispatch(setIsManager(true))
// //         //i want insert for the menubar some option that only manager can do
// //       }
// //       else
// //       dispatch(setIsManager(false))//can remove it??

// //       //  navigate('/IntroduceCourse',{state:{course:course}})
// //     navigate('/')

// //     }
// //     catch (e) {
// //       navigate('/Register')
// //       console.log('error in login user', e); 
// //       //mabye do here belongtothecourse = null??
// //     }
// //   }
// //   const {
// //     register,
// //     handleSubmit,
// //     watch,
// //     formState: { errors },
// //   } = useForm()


// //   const onSumbit = (data) => {
// //     console.log(data);
// //     //keep the course which the user enter to
// //     loginUser(data);
// //     //check if this user is already find in this course

// //   }


// //   return (
// //     <div className='login'>
// //       <div className="app-container">
// //         <div className="form-container">
// //           <h2 className="form-title">כניסה לקורס</h2>
// //           <form onSubmit={handleSubmit(onSumbit)}>

// //             <div className={`input-group${errors.name ? 'error' : ''}`}>
// //               <label >UserName</label>
// //               <input
// //                 {...register("username", { required: true, minLength: 3, type: "text" })}
// //               />
// //             </div>
// //             <div className={`input-group ${errors.password ? 'error' : ''}`}>
// //               <label >Password *</label>
// //               <input
// //                 type='password'
// //                 {...register("password", { required: true, minLength: 3 })}
// //               />
// //             </div>

// //             <button type="submit" className="submit-btn">Sign in</button>
// //             {/* {token} */}
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;


// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import '../App.css';
// import { useForm } from "react-hook-form"
// import axios from 'axios';
// import { setToken, logOut } from '../store/reducer/tokenSlice';
// import { setUser } from '../store/reducer/userSlice';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { setCourse } from '../store/reducer/courseSlice';
// import { setIsManager } from '../store/reducer/tokenSlice';
// import { setItemsInTheMenubar } from '../store/reducer/itemsInTheMenubarSlice';
// import { setBelongToTheCourses } from '../store/reducer/userSlice';

// const Login = () => {
//   const location = useLocation();
//   const course = useSelector(state => state.course.course);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [errorMessage, setErrorMessage] = useState(""); // State for error message

//   const loginUser = async (data) => {
//     const username = data.username;
//     const password = data.password;

//     try {
//       const res = await axios.post('http://localhost:5000/auth/login', { username, password });
//       console.log("the user after do the login: ", res.data.user);
//       console.log("the courses which the user belong: ", res.data.belongToTheCourses);

//       dispatch(setUser({ newUser: res.data.user }));
//       dispatch(setBelongToTheCourses({ newItems: res.data.belongToTheCourses }));
//       dispatch(setToken(res.data));

//       if (res.data.role === 'Admin') {
//         console.log('you are a manager!!!');
//         dispatch(setIsManager(true));
//       } else {
//         dispatch(setIsManager(false));
//       }

//       navigate('/');
//     } catch (e) {
//       // Update error message and show options
//       console.log('error in login user', e);
//       setErrorMessage("שם המשתמש או הסיסמה אינם נכונים או שאינך רשום לקורס");
//     }
//   };

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const onSumbit = (data) => {
//     console.log(data);
//     loginUser(data);
//   };

//   return (
//     <div className='login'>
//       <div className="app-container">
//         <div className="form-container">
//           <h2 className="form-title">כניסה לקורס</h2>
//           {errorMessage && (
//             <div className="error-message">
//               <p>{errorMessage}</p>
//               <div className="error-actions">
//                 <button
//                   className="retry-btn"
//                   onClick={() => setErrorMessage("")} // Clear error and allow retry
//                 >
//                   נסה שוב
//                 </button>
//                 <button
//                   className="register-btn"
//                   onClick={() => navigate('/Register')} // Navigate to register page
//                 >
//                   עבור להרשמה
//                 </button>
//               </div>
//             </div>
//           )}
//           {!errorMessage && (
//             <form onSubmit={handleSubmit(onSumbit)}>
//               <div className={`input-group${errors.name ? 'error' : ''}`}>
//                 <label>UserName</label>
//                 <input
//                   {...register("username", { required: true, minLength: 3, type: "text" })}
//                 />
//               </div>
//               <div className={`input-group ${errors.password ? 'error' : ''}`}>
//                 <label>Password *</label>
//                 <input
//                   type='password'
//                   {...register("password", { required: true, minLength: 3 })}
//                 />
//               </div>
//               <button type="submit" className="submit-btn">Sign in</button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { useForm } from "react-hook-form"
import axios from 'axios';
import { setToken, logOut } from '../store/reducer/tokenSlice';
import { setUser } from '../store/reducer/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCourse } from '../store/reducer/courseSlice';
import { setIsManager } from '../store/reducer/tokenSlice';
import { setItemsInTheMenubar } from '../store/reducer/itemsInTheMenubarSlice';
import { setBelongToTheCourses } from '../store/reducer/userSlice';

const Login = () => {
  const location = useLocation();
  const course = useSelector(state => state.course.course);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const loginUser = async (data) => {
    const username = data.username;
    const password = data.password;

    try {
      const res = await axios.post('http://localhost:5000/auth/login', { username, password });
      console.log("the user after do the login: ", res.data.user);
      console.log("the courses which the user belong: ", res.data.belongToTheCourses);

      dispatch(setUser({ newUser: res.data.user }));
      dispatch(setBelongToTheCourses({ newItems: res.data.belongToTheCourses }));
      dispatch(setToken(res.data));

      if (res.data.role === 'Admin') {
        console.log('you are a manager!!!');
        dispatch(setIsManager(true));
      } else {
        dispatch(setIsManager(false));
      }

      navigate('/');
    } catch (e) {
      // Update error message and show options
      console.log('error in login user', e);
      setErrorMessage("שם המשתמש או הסיסמה אינם נכונים או שאינך רשום לקורס");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSumbit = (data) => {
    console.log(data);
    loginUser(data);
  };

  return (
    <div style={{ backgroundColor: '#f7f1fa', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #d8bfd8', width: '30rem' }}>
        <h2 style={{ color: '#8b008b', marginBottom: '20px', textAlign: 'center' }}>כניסה לקורס</h2>
        {errorMessage && (
          <div style={{ backgroundColor: '#ffe6e6', color: '#ff4d4d', padding: '15px', borderRadius: '8px', textAlign: 'center', marginBottom: '20px' }}>
            <p>{errorMessage}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button
                onClick={() => setErrorMessage("")} // Clear error and allow retry
                style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                נסה שוב
              </button>
              <button
                onClick={() => navigate('/Register')} // Navigate to register page
                style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                עבור להרשמה
              </button>
            </div>
          </div>
        )}
        {!errorMessage && (
          <form onSubmit={handleSubmit(onSumbit)}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#8b008b', fontWeight: 'bold' }}>UserName</label>
              <input
                {...register("username", { required: true, minLength: 3, type: "text" })}
                style={{ border: '1px solid #d8bfd8', borderRadius: '8px', padding: '10px', width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#8b008b', fontWeight: 'bold' }}>Password *</label>
              <input
                type='password'
                {...register("password", { required: true, minLength: 3 })}
                style={{ border: '1px solid #d8bfd8', borderRadius: '8px', padding: '10px', width: '100%' }}
              />
            </div>
            <button type="submit" style={{ backgroundColor: '#8b008b', color: 'white', padding: '10px', border: 'none', borderRadius: '8px', width: '100%', cursor: 'pointer' }}>Sign in</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
