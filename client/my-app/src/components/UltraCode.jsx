import React from "react";
import { Menubar } from "primereact/menubar";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import image from "./image.png"; // Importing the image

const MyCoursesPage = () => {
  const courses = [
    { title: "C language", progress: 0, image: "image.png" },
    { title: "C++ language", progress: 0, image: "image.png" },
    { title: "Computer Vision 2024", progress: 12, image: "image.png" },
    { title: "Introduction to UltraCode Platform", progress: 0, image: "image.png" },
    { title: "Linux 2024", progress: 0, image: "image.png" },
    { title: "Machine Learning Intro", progress: 0, image: "image.png" },
    { title: "אלגברה לינארית 2025", progress: 0, image: "image.png" },
    { title: "מבוא לאלגוריתמים ומבני נתונים א", progress: 0, image: "image.png" },
    { title: "מבוא לאלגוריתמים ומבני נתונים ב", progress: 0, image: "image.png" },
  ];

  const menuItems = [
    { label: "Home" },
    { label: "My courses" },
  ];

  return (
    <div>
      {/* Navigation Bar */}
      <Menubar
        model={menuItems}
        start={
          <img
            src='./image.png'
            alt="Logo"
            style={{ height: "40px" }}
          />
        }
        end={
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              icon="pi pi-bell"
              className="p-button-rounded p-button-text"
            />
            <Avatar
              label="א"
              shape="circle"
              style={{
                backgroundColor: "#f0f0f0",
                color: "#000",
                fontWeight: "bold",
              }}
            />
          </div>
        }
      />

      {/* Courses Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(250px, 1fr))", // Smaller card width
          gap: "20px", // Space between cards
          padding: "0 40px", // Space between cards and edges of the page
        }}
      >
        {courses.map((course, index) => (
          <Card
            key={index}
            header={
              <img
                alt={course.title}
                src={image} // Use the imported image
                style={{
                  width: "100%",
                  height: "150px", // Smaller height for the image
                  objectFit: "cover",
                }}
              />
            }
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add a subtle shadow for better appearance
            }}
          >
            <div>
              <h4 style={{ margin: "0 0 10px 0", fontSize: "1rem" }}>{course.title}</h4>
              <ProgressBar
                value={course.progress}
                style={{ height: "10px", marginBottom: "10px" }}
              />
              <span style={{ fontSize: "0.875rem" }}>{course.progress}% complete</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyCoursesPage;