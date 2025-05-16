import { Nav, Dropdown, Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ user, setUser }) {
  const usenavigate = useNavigate();
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/user/logout", {
        credentials: "include",
      });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      usenavigate("/");
    } catch (error) {
      console.log("logout failed", error);
    }
  };
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>BlogSphere</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/blogs">
                   Blogs
                  </Nav.Link>
                  <Nav.Link as={Link} to="/add-new">
                    Add Blog
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/signup">
                    Signup
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signin">
                    Signin
                  </Nav.Link>
                </>
              )}
            </Nav>

            {user && (
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {user.fullname}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/logout" onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
