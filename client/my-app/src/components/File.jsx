import { useEffect, useState } from "react";

const FileExample = (props) => {
    const userName = props.userName
    const contentFile = props.contentFile;
    const[contentFileReady,setContentFileReady]=useState("")
    const[loading,setLoading]=useState(true)
    useEffect(() => {
          console.log("the content of the file: ",contentFile);
          
        const readyContent = contentFile.map(userTask => {
            // console.log('the name of the task: \n',userTask.task);
            let sentence =""
            userTask.questions.forEach(question => {
                sentence += `question-${question.text}? \n`
                const matchAnswer = userTask.answers.find(answer => answer.question === question._id)
                sentence += `answer-${matchAnswer?.text}\n\n`
                // console.log("the question and the answer:  \n",sentence);
            })
            return `the name of the task:'${userTask.task}\n\n`+sentence
        })

        console.log('the array: ', readyContent);
        setContentFileReady(readyContent)
        setLoading(false)
    }, [])
    const handleDownload = () => {
        // const content = 'Hello, this will be saved to a file.';
        const blob = new Blob([contentFileReady], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = userName; // The name of the file to be downloaded
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up
    };

    return (
       <>{loading?<>Loading</>:
       <div>
            <h1>Download File Example</h1>
            <button onClick={handleDownload}>Download File</button>
        </div>}</>
    );
}

export default FileExample
