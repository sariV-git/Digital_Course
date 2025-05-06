import { useEffect, useState } from "react";
import { jsPDF } from "jspdf"; // ספרייה ליצירת קבצי PDF
import "../fonts/Heebo-VariableFont_wght-normal.js"

// פונקציה לעיבוד טקסט מימין לשמאל
const processRTL = (text) => {
    return text.split("\n").map(line => line.split("").reverse().join("")).join("\n");
};


const FileExample = (props) => {
    const userName = props.userName
    const contentFile = props.contentFile;
    const [contentFileReady, setContentFileReady] = useState("")
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        console.log("the content of the file: ", contentFile);

        const readyContent = contentFile.map(userTask => {
            // console.log('the name of the task: \n',userTask.task);
            let sentence = ""
            userTask.questions.forEach(question => {
                sentence += `שאלה: ${question.text}?\n`;
                const matchAnswer = userTask.answers.find(answer => answer.question === question._id)
                sentence += `תשובה: ${matchAnswer?.text || "לא ניתנה תשובה"}\n\n`;
                // console.log("the question and the answer:  \n",sentence);
            })
            return `שם המשימה: ${userTask.task}\n\n` + sentence;
        })

        console.log('the array: ', readyContent);
        setContentFileReady(readyContent)
        setLoading(false)
    }, [contentFile])
    const handleDownload = () => {
        const doc = new jsPDF({ orientation: "portrait" }); // יצירת אובייקט PDF חדש
        doc.setFont("Heebo-VariableFont_wght"); // שימוש בגופן
        doc.setTextColor(40, 40, 40); // צבע טקסט כהה
        doc.setFontSize(16); // הגדרת גודל גופן ???????????????
        doc.text(processRTL(`משימות של המשתמש: ${userName}`), 200, 20, { align: "right" });
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50); 
        let yPosition = 40; // התחלת מיקום Y
        contentFile.forEach((task) => {
            doc.setFontSize(14);
            doc.text(processRTL(`שם המשימה: ${task.task}`), 200, yPosition, { align: "right" });
            yPosition += 10; // ריווח אחרי שם המשימה

            task.questions.forEach((question) => {
                doc.setFontSize(12);
                doc.text(processRTL(`שאלה: ${question.text}`), 200, yPosition, { align: "right" });
                yPosition += 8;

                const answer = task.answers.find((ans) => ans.question === question._id);
                doc.text(
                    processRTL( `תשובה: ${answer?.text || "לא ניתנה תשובה"}`),
                    200,
                    yPosition,
                    { align: "right" }
                );
                yPosition += 12; // ריווח בין השאלות
            });

            yPosition += 10; // ריווח בין משימות
            if (yPosition > 270) {
                // אם עברנו את הגבול של העמוד
                doc.addPage(); // עמוד חדש
                yPosition = 20; // אתחול מיקום Y
            }
        });
 
        doc.save(`${userName}.pdf`); // שמירת הקובץ עם שם המשתמש
    };

    return (
        <>{loading ? <>טוען...</> :
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h1>הורדת קובץ PDF</h1>
                <button
                    style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                        borderRadius: "5px",
                    }}
                    onClick={handleDownload}
                >
                    הורד קובץ
                </button>
            </div>
        }
        </>
    );
}

export default FileExample
