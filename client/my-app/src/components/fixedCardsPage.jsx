import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const CourseCard = () => {
    // Sample course data (add more courses to display multiple cards)
    const courses = [
        {
            title: 'Machine Learning by Stanford University',
            description: 'An in-depth introduction to machine learning from one of the best universities.',
            instructor: 'Andrew Ng',
            imgUrl: 'https://example.com/your-image.jpg',
            link: 'https://www.coursera.org/learn/machine-learning',
        },
        {
            title: 'Deep Learning Specialization',
            description: 'Master the fundamentals of deep learning, including convolutional networks and GANs.',
            instructor: 'Andrew Ng',
            imgUrl: 'https://example.com/your-image.jpg',
            link: 'https://www.coursera.org/specializations/deep-learning',
        },
        // Add more courses as needed
    ];

    return (
        <div className="p-d-flex p-jc-center p-p-5">
            {/* Use the grid layout system */}
            <div className="p-grid p-nogutter">
                {courses.map((course, index) => (
                    <div key={index} className="p-col-12 p-md-4 p-lg-3">
                        <Card
                            title={course.title}
                            subTitle={`Instructor: ${course.instructor}`}
                            style={{ width: '100%' }}
                            footer={
                                <span>
                                    <Button label="Start Course" icon="pi pi-play" onClick={() => window.open(course.link, '_blank')} />
                                </span>
                            }
                            header={<img alt="Course Thumbnail" src={course.imgUrl} style={{ width: '100%' }} />}
                        >
                            <p>{course.description}</p>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseCard;
