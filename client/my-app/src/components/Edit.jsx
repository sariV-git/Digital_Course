import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';
import ManagerAddCourse from './ManagerAddCourse';
import ManagerAddLesson from './ManagerAddLesson';
// import FileUploadTest from './FileUploadTest'; // Import your file upload component
export default function Edit() {
    console.log("rendering edit");
    
    const menu = useRef(null); // Reference for the menu
    const [isCreateCourse, setIsCreateCourse] = useState(false)
    const [isCreateLesson, setIsCreateLesson] = useState(false)
    const [isDeleteCourse, setIsDeleteCourse] = useState(false)

    const [visibleCourse, setVisibleCourse] = useState(false)
    const [visibleLesson, setVisibleLesson] = useState(false)
    // Menu items with nested sub-options
    const items = [
        {
            label: 'Course',
            icon: 'pi pi-book',
            items: [
                {
                    label: 'Create Course',
                    icon: 'pi pi-plus',
                    command: () => handleCreate('course') // Automatically handle creation for course
                },
                {
                    label: 'Delete Course',
                    icon: 'pi pi-times',
                    command: () => handleDelete('course') // Automatically handle deletion for course
                }
            ]
        },
        {
            label: 'Lesson',
            icon: 'pi pi-pencil',
            items: [
                {
                    label: 'Create Lesson',
                    icon: 'pi pi-plus',
                    command: () => handleCreate('lesson') // Automatically handle creation for lesson
                }
            ]
        }
    ];

    // Function to handle creation of course or lesson
    const handleCreate = (type) => {

        // Add your logic for creating a course or lesson here
        if (type === 'course') {
            setVisibleCourse(true)
            setIsCreateLesson(false)
            setIsCreateCourse(true)
            // return (<ManagerAddCourse setVisible={setVisible} visible={visible} />)
        } else if (type === 'lesson') {
            setIsCreateLesson(true)
            setIsCreateCourse(false)
            setIsCreateLesson(true)
        }
    };

  
    // Function to handle deletion of course
    const handleDelete = (type) => {
        console.log(`Deleting a ${type}...`);
        // Add your logic for deleting a course here
        if (type === 'course') {
            alert('Course deleted successfully!');
        }
    }

    return (<>
        {/* TieredMenu for the Edit options */}
        <TieredMenu model={items} popup ref={menu} breakpoint="767px" />

        {/* Button to show the Edit menu */}
        <Button
                label="Edit"
                icon="pi pi-cog"
                onClick={(e) => menu.current.toggle(e)} // Open the menu on button click
                style={{
                    backgroundColor: '#8B008B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem'
                }}
            />
        {/* {isCreateCourse && <ManagerAddCourse visible={visible} setVisible={setVisible} />} */}
        {/* <FileUploadTest visible={visibleCourse} setVisible={setVisibleCourse} /> */}
        {isCreateLesson && <ManagerAddLesson visible={visibleLesson} setVisible={setVisibleLesson} />}
    </>);
}