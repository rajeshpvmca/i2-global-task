import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Card } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Notes() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [notes, setNotes] = useState([]);
    const [notesData, setNotesData] = useState(null);
    const [quillValue, setQuillValue] = useState("");
    const userName = localStorage.getItem('firstName');

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(savedNotes);
    }, []);

    const saveToLocalStorage = (updatedNotes) => {
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                const updatedNotes = [...notes];
                if (notesData !== null) {
                    updatedNotes[notesData] = {
                        ...updatedNotes[notesData],
                        description: quillValue,
                    };
                    setNotesData(null);
                } else {
                    updatedNotes.push({ ...values, description: quillValue });
                }
                setNotes(updatedNotes);
                saveToLocalStorage(updatedNotes);
                setIsModalVisible(false);
                form.resetFields();
                setQuillValue("");
            })
            .catch((info) => {
                console.log("Validation Failed:", info);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setQuillValue("");
        setNotesData(null);
    };

    const handleEdit = (index) => {
        setNotesData(index);
        form.setFieldsValue({
            description: notes[index].description,
        });
        setQuillValue(notes[index].description);
        setIsModalVisible(true);
    };

    const handleDelete = (index) => {
        Modal.confirm({
            title: "Are you sure you want to delete this note?",
            okText: "Yes",
            cancelText: "No",
            onOk: () => {
                const updatedNotes = notes.filter((_, i) => i !== index);
                setNotes(updatedNotes);
                saveToLocalStorage(updatedNotes);
            },
        });
    };

    return (
        <HelmetProvider>
        <Helmet>
          <title>Notes | Assessment</title>
          <meta
            name="description"
            content="Assessment Task: SEO content"
            data-rh="true"
          />
          <link rel="canonical" href="https://i2global.com/notes"></link>
        </Helmet>
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h2>{getGreeting()} {userName}!</h2>
                <Button type="primary" onClick={showModal}>
                    Add Notes
                </Button>
            </div>
            <div className="container px-0 mt-4">
                <div className="row">
                    {notes.map((note, index) => (
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-4" key={index}>
                            <Card
                                title={note.title}
                                extra={
                                    <>
                                        <EditFilled
                                            className="me-2 text-success"
                                            onClick={() => handleEdit(index)}
                                        />
                                        <DeleteFilled
                                            className="me-2 text-danger"
                                            onClick={() => handleDelete(index)}
                                        />
                                    </>
                                }
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: note.description,
                                    }}
                                />
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <Modal
                title={notesData !== null ? "Edit Note" : "Add Note"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={notesData !== null ? "Update" : "Add"}
                cancelText="Close"
            >
                <Form form={form} layout="vertical" name="notes_form">
                    {notesData === null && (
                        <Form.Item
                            label="Title"
                            name="title"
                            className="w-100"
                            rules={[{ required: true, message: "Please enter a title!" }]}>
                            <Input placeholder="Enter Title" />
                        </Form.Item>
                    )}
                    <Form.Item
                        label="Description"
                        name="description"
                        className="w-100"
                        rules={[
                            {
                                validator: (_, value) =>
                                    quillValue ? Promise.resolve() : Promise.reject("Please enter some notes!"),
                            },
                        ]}
                    >
                        <ReactQuill
                            theme="snow"
                            value={quillValue}
                            onChange={setQuillValue}
                            placeholder="Enter your notes here"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
        </HelmetProvider>
    );
}
