import { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Blogs() {
  const allBlogurl = "http://localhost:8000/blog/blogs";
  const [blogs, setBlogs] = useState([]);
  const usenavigate = useNavigate();

  const viewBlogs = (id) => {
    usenavigate(`/blogs/${id}`);
  };

  const fetchBlogData = async () => {
    try {
      const response = await fetch(allBlogurl);
      const data = await response.json();
      setBlogs(data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <Row>
          {blogs.map((item, index) => (
            <Col key={index} md={3} className="mb-4">
              <Card style={{ height: "100%" }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:8000${item.coverImageURL}`}
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Button variant="primary" onClick={() => viewBlogs(item._id)}>
                    view
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default Blogs;
