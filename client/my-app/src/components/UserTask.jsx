import { useLocation } from "react-router-dom"

const UserTask = () => {

  const location = useLocation()
  const { questions, answers, titleTask } = location.state
  // const {answers,questions}=location.state

  console.log('in userTask state: ', location.state);
  return (
    <div style={{ fontFamily: '"Poppins", "Nunito", "Lato", Arial, sans-serif', padding: '20px', direction: 'rtl', textAlign: 'right', backgroundColor: '#f7faff' }}>
      <h1 style={{ color: '#2b6cb0', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>{titleTask}</h1>
      {questions.map(question => {
        // Find the corresponding answer using the question ID
        const correspondingAnswer = answers.find(answer => answer.question === question._id);

        return (
          <div key={question._id} style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#edf2f7', border: '1px solid #cbd5e0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>

            <p style={{ margin: '0 0 10px', fontWeight: 'bold', color: '#2d3748' }}>שאלה: {question.text}</p>
            <p style={{ margin: '0', color: correspondingAnswer ? '#4a5568' : '#a0aec0' }}>
              תשובה: {correspondingAnswer ? correspondingAnswer.text : 'לא ניתנה תשובה'}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default UserTask
