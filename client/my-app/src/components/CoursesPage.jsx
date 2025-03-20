

const CoursesPage=(props)=>{

    const courses=props.course

    return(
        <>
        {courses.forEach(course => {
            //View each course on the card
        })}
        in CoursesPage
        </>
    )
}

export default CoursesPage