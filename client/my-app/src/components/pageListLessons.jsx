// import React from 'react';
// import { Accordion, AccordionTab } from 'primereact/accordion';
// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';

// const CourseModuleList = () => {
//     // Sample data for the lessons
//     const lessons = [
//         {
//             title: 'Introduction to Unsupervised Learning',
//             description: 'Learn the basics of unsupervised learning, its applications, and importance.',
//             details: 'In this lesson, we will explore what unsupervised learning is, its types, and key algorithms like K-Means and hierarchical clustering.',
//         },
//         {
//             title: 'K-Means Clustering',
//             description: 'Understanding K-Means, one of the most popular clustering algorithms.',
//             details: 'Learn how to apply K-Means clustering to categorize data points into different clusters based on similarity.',
//         },
//         {
//             title: 'K-Nearest Neighbors (KNN)',
//             description: 'Learn the concept of KNN algorithm used for classification tasks.',
//             details: 'In this lesson, we will implement KNN and explore its applications for classification problems.',
//         },
//         {
//             title: 'Dimensionality Reduction',
//             description: 'Explore techniques for reducing the number of features in your dataset.',
//             details: 'This lesson covers methods like PCA (Principal Component Analysis) to reduce the complexity of your data.',
//         },
//         // Add more lessons here as needed
//     ];

//     return (
//         <div className="p-d-flex p-jc-center p-p-5">
//             <Card style={{ width: '100%', maxWidth: '900px' }}>
//                 <h2>Course Modules</h2>
//                 <Accordion>
//                     {lessons.map((lesson, index) => (
//                         <AccordionTab header={lesson.title} key={index}>
//                             <p>{lesson.description}</p>
//                             <Button 
//                                 label="View Details" 
//                                 icon="pi pi-arrow-right" 
//                                 onClick={() => alert(lesson.details)} 
//                             />
//                         </AccordionTab>
//                     ))}
//                 </Accordion>
//             </Card>
//         </div>
//     );
// };

// export default CourseModuleList;
