import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
// import LinearDemo from './components/forManagerRespond';
import Counter from './components/forCounter';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import LessonList from './components/forLessonList';
import { Route, Routes } from 'react-router-dom';
import CourseIntroduce from './components/CourseIntroduce';
import Lesson from './components/Lesson';
import { useState } from 'react';
import TemplateDemo from './components/Menubar';
import IntroduceUsers from './components/forIntroduceUsers';
import CourseCard from './components/fixedCardsPage';
import CourseModuleList from './components/pageListLessons';
import Task from './components/taskPage';
import CoursesPage from './components/CoursesPage';
import ManagerAddLesson from './components/ManagerAddLesson';
import ChooseVideo from './components/forChooseVideo';
import ManagerAddTask from './components/ManagerAddTask';
import ManagerAddQuestions from './components/ManagerAddQuestions';
// import IntroduceLesson from './components/forIntroduceLesson';

function App() {

  return (
    <div >
      {/* <Home/> */}
      {/* <LinearDemo/> */}
      {/* className='bg-blue-600 p-3 text 3xl text-red' //for the menubar!!*/}
      <TemplateDemo />
      {/* <ChooseVideo/> */}
      {/* <CoursesPage/---put in the menubar */}
      {/* <IntroduceUsers/> //for users!!*/}
      {/* <CourseCard/> for the page of all the courses and not take the fixed */}
      {/* <CourseModuleList/> for the page of all the lessons*/}
      <Routes>
        <Route path='/CourseIntroduce' element={<CourseIntroduce />} />
        <Route path='/LessonsList' element={<LessonList />} />
        <Route path='/Lesson' element={<Lesson />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Task' element={<Task />} />
        <Route path='/IntroduceCourse' element={<CourseIntroduce />} />
        <Route path='/CoursesPage' element={<CoursesPage />} />
        <Route path='/ManagerAddLesson' element={<ManagerAddLesson />} />
        <Route path='/ManagerAddTask' element={<ManagerAddTask />} />
        <Route path='/ManagerAddQuestions' element={<ManagerAddQuestions />} />
      </Routes>
    </div>
  );
}

export default App;
