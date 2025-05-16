import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home({ user, setUser }) {
  return (
    <div className="container mt-3">
      {user ? (
        <>
          <h3>Welcome {user.fullname},</h3>
          <div className="container mt-3">
            <p>
              BlogSphere is a simple and powerful blog publishing platform that
              lets you express yourself, share ideas, and connect with others.
            </p>
            <h6>✨ What you can do here:</h6>
            <ul>
              <li>🖋️ Create and publish blogs with rich content and cover images</li>
              <li>📚 Explore blogs written by others and get inspired</li>
              <li>💬 Leave comments and engage in meaningful discussions</li>
              <li>👤 Secure login & signup to manage your content</li>
              <li>📸 User profile avatars for a personalized experience</li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <Button as={Link} to="/signin" variant="primary">
            Signin
          </Button>
        </>
      )}
    </div>
  );
}

export default Home;
