// Description: This component allows a manager to view, edit, and toggle the visibility of responses to a course.

import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ManagerSetResponds = () => {
    // Redux state selectors
    const course = useSelector((state) => state.course.course);
    const token = useSelector((state) => state.token.token);

    // Local component states
    const [loadData, setLoadData] = useState(true);
    const [responds, setResponds] = useState([]);
    const [editingRespondId, setEditingRespondId] = useState(null); // ID of the response being edited
    const [editedText, setEditedText] = useState(""); // Edited text for the response

    // Load responses from the server
    useEffect(() => {
        const loadResponds = async () => {
            try {
                console.log("Loading responses for course: ", course);

                const resResponds = await axios.get(
                    `http://localhost:5000/respond/accordingCourse/${course._id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setResponds(resResponds.data);
                setLoadData(false);
            } catch (error) {
                console.error("Error loading responses:", error);
            }
        };

        if (course?._id) {
            loadResponds();
        }
    }, [course, token]);

    // Functions for editing responses
    const editRespond = (respond) => {
        setEditingRespondId(respond._id);
        setEditedText(respond.text);
    };

    const cancelEdit = () => {
        setEditingRespondId(null);
        setEditedText("");
    };

    const saveEdit = async (respondId) => {
        try {
            const updatedRespond = { _id: respondId, text: editedText };

            const res = await axios.put("http://localhost:5000/respond", updatedRespond, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Update local state
            const updatedResponds = responds.map((r) =>
                r._id === respondId ? { ...r, text: editedText } : r
            );
            setResponds(updatedResponds);

            // Reset editing state
            setEditingRespondId(null);
            setEditedText("");

            console.log("Response updated successfully:", res);
        } catch (error) {
            console.error("Error updating response:", error);
        }
    };

    // Functions for showing and hiding responses
    const showRespond = async (respond) => {
        await toggleIntroduce(respond, true);
    };

    const hideRespond = async (respond) => {
        await toggleIntroduce(respond, false);
    };

    const toggleIntroduce = async (respond, introduce) => {
        try {
            const newRespond = { _id: respond._id, introduce };

            const res = await axios.put("http://localhost:5000/respond", newRespond, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Update local state
            const updatedResponds = responds.map((r) =>
                r._id === respond._id ? { ...respond, introduce } : r
            );
            setResponds(updatedResponds);

            console.log(`Response ${introduce ? "shown" : "hidden"} successfully:`, res);
        } catch (error) {
            console.error(`Error ${introduce ? "showing" : "hiding"} response:`, error);
        }
    };

    // Render component
    return (
        <div style={{ padding: "20px" }}>
            {loadData ? (
                <div style={{ textAlign: "center" }}>
                    <p>Loading...</p>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {responds.map((respond) => (
                        <Card
                            key={respond._id}
                            style={{
                                textAlign: "right",
                                padding: "20px",
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <p>
                                <strong>שם:</strong> {respond.username}
                            </p>
                            <p>
                                <strong>תגובה:</strong>{" "}
                                {editingRespondId === respond._id ? (
                                    <InputText
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            border: "1px solid #ccc",
                                            borderRadius: "5px",
                                        }}
                                    />
                                ) : (
                                    respond.text
                                )}
                            </p>

                            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                {editingRespondId === respond._id ? (
                                    <>
                                        <Button
                                            label="שמור"
                                            style={{
                                                backgroundColor: "#b39ddb", // סגול בהיר
                                                color: "white",
                                                border: "none",
                                                borderRadius: "5px",
                                                fontWeight: "bold",
                                            }}
                                            onClick={() => saveEdit(respond._id)}
                                        />
                                        <Button
                                            label="בטל"
                                            style={{
                                                backgroundColor: "#f48fb1", // ורוד בהיר
                                                color: "white",
                                                border: "none",
                                                borderRadius: "5px",
                                                fontWeight: "bold",
                                            }}
                                            onClick={cancelEdit}
                                        />
                                    </>
                                ) : (
                                    <Button
                                        label="ערוך"
                                        style={{
                                            backgroundColor: "#ce93d8", // לילך בהיר
                                            color: "white",
                                            border: "none",
                                            borderRadius: "5px",
                                            fontWeight: "bold",
                                        }}
                                        onClick={() => editRespond(respond)}
                                    />
                                )}

                                {respond.introduce ? (
                                    <Button
                                        label="לא להציג"
                                        style={{
                                            backgroundColor: "#ffab91", // כתום בהיר
                                            color: "white",
                                            border: "none",
                                            borderRadius: "5px",
                                            fontWeight: "bold",
                                        }}
                                        onClick={() => hideRespond(respond)}
                                    />
                                ) : (
                                    <Button
                                        label="להציג"
                                        style={{
                                            backgroundColor: "#81d4fa", // תכלת בהיר
                                            color: "white",
                                            border: "none",
                                            borderRadius: "5px",
                                            fontWeight: "bold",
                                        }}
                                        onClick={() => showRespond(respond)}
                                    />
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManagerSetResponds;