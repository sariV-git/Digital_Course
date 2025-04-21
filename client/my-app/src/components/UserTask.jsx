import { useLocation } from "react-router-dom"


const UserTask=()=>{
    const location=useLocation()
    const {questions,answers}=location.state
    // const {answers,questions}=location.state

    console.log('in userTask state: ',location.state);
    return (
        <div>
          {questions.map(question => {
            // Find the corresponding answer using the question ID
            const correspondingAnswer = answers.find(answer => answer.question === question._id);
            
            return (
              <div key={question._id}>
                <p>Question: {question.text}</p>
                <p>Answer: {correspondingAnswer ? correspondingAnswer.text : 'No answer provided'}</p>
              </div>
            );
          })}
        </div>
      );
    };
    
export default UserTask
  
//////////
