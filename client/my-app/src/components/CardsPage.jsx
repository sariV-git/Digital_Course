import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function CourseCard() {
    // Sample course data
    const courseData = {
        title: 'Machine Learning by Stanford University',
        description: 'An in-depth introduction to machine learning from one of the best universities.',
        instructor: 'Andrew Ng',
        imgUrl: 'https://example.com/your-image.jpg', // You can use an actual course image
        link: 'https://www.coursera.org/learn/machine-learning', // Replace with real course link
    };

    const footer = (
        <span>
            <Button label="Start Course" icon="pi pi-play" onClick={() => window.open(courseData.link, '_blank')} />
        </span>
    );

    return (
        <div className="p-d-flex p-jc-center p-p-5">
            <Card
                title={courseData.title}
                subTitle={`Instructor: ${courseData.instructor}`}
                style={{ width: '300px', maxWidth: '100%' }}
                footer={footer}
                header={<img alt="Course Thumbnail" src={courseData.imgUrl} style={{ width: '100%' }} />}
            >
                <p>{courseData.description}</p>
            </Card>
        </div>
    );
}
