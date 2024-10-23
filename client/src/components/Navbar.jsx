import { Container, Form, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {user ? (
                <Nav.Link as={Link} to="/mypost">
                  My Post
                </Nav.Link>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>

          <Form className="d-flex g-2">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button className="me-2" variant="outline-success">
              Search
            </Button>
            {user ? (
              <Button variant="warning" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="success">Login</Button>
              </Link>
            )}
          </Form>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
