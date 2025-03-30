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

// import IntroduceLesson from './components/forIntroduceLesson';

function App() {

  return (
    <div >
      {/* <Home/> */}
      {/* <LinearDemo/> */}
      {/* className='bg-blue-600 p-3 text 3xl text-red' //for the menubar!!*/}
      <div className='card'>
        <TemplateDemo/>
      </div>
      <Routes>
        <Route path='/CourseIntroduce' element={<CourseIntroduce />} />
        <Route path='/LessonsList' element={<LessonList />} />
        <Route path='/Lesson' element={<Lesson />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
