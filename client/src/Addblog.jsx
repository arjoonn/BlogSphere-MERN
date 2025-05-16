import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Addblog() {
  const usenavigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("coverImageURL", file);

    try {
      const res = await fetch("http://localhost:8000/blog/add-new", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setTitle("");
        setContent("");
        setFile(null);
        usenavigate("/");
      } else {
        console.log("faled to create blog");
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
  };
  return (
    <>
      <div className="mt-3">
        <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="POST"
        >
          <Form.Group className="mb-3" controlId="blogtitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              className="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="blogcontent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Blog
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Addblog;
