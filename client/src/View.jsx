import { useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

function View() {
  const { id } = useParams();
  const allBlogurl = `http://localhost:8000/blog/blogs/${id}`;
  const commentUrl = `http://localhost:8000/blog/comment/${id}`;
  const getCommentUrl = `http://localhost:8000/blog/comments/${id}`;
  const [blogData, setBlogData] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchBlogData = async () => {
    try {
      const response = await fetch(allBlogurl, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setBlogData(data.blog);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComment = async () => {
    try {
      const res = await fetch(getCommentUrl, {
        credentials: "include",
      });
      const data = await res.json();
      setComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComment();
  }, [id]);

  if (!blogData) {
    return <h2>Loading blog...</h2>;
  }
  console.log(blogData);

  const postComment = async () => {
    try {
      await fetch(commentUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment }),
      });
      setComment("");
      fetchComment();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(comment);

  return (
    <>
      <div className="container mt-4 text-center">
        <h1>{blogData.title}</h1>
        <img
          src={`http://localhost:8000${blogData.coverImageURL}`}
          style={{ width: "800px", margin: "20px auto", display: "block" }}
        ></img>
        <div className="container mt-3">
          <p>{blogData.content}</p>
        </div>
      </div>
      <div className="container mt-5">
        <img
          className="rounded-circle me-3"
          src={`http://localhost:8000${blogData.createdBy.profileImage}`}
          width={"40px"}
        ></img>
        <p>{blogData.createdBy.fullname}</p>
      </div>

      <div className="container mt-3 ms-3 text-start col-3">
        <h5>Comments</h5>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="comment">💬</InputGroup.Text>
          <Form.Control
            aria-label="comment"
            aria-describedby="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="primary" type="submit" onClick={postComment}>
            Add
          </Button>
        </InputGroup>
      </div>
      <div className="container mt-1">
        {comments.map((c, index) => (
          <div key={index} className="d-flex mb-4">
      <img 
        src={`http://localhost:8000${blogData.createdBy.profileImage}`} 
        alt="avatar" 
        className="rounded-circle me-3" 
        width="40" 
        height="40" 
      />
          <div key={index} className="mb-3">
            <p className="fw-bold mb-1">{c.createdBy.fullname}</p>
            <p className="mb-0">{c.content}</p>
          </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default View;
