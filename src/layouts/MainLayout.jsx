import axios from "axios";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { UserInfoContext } from "../context/UserContext";
import { FaShoppingCart } from "react-icons/fa";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, setUserInfo, setIsAuthenticated } =
    useContext(UserInfoContext);
  const handleLogout = () => {
    axios
      .post("http://localhost:8080/api/auth/signout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(() => {
        localStorage.removeItem("access_token");
        setUserInfo(null);
        setIsAuthenticated(false);
        navigate("/login");
      });
  };
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-dark text-light"
        data-bs-theme="light"
        bg="light"
      >
        <Container>
          <Navbar.Brand href="/" className="text-light">
            Simple Cart
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="text-light"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/products" className="text-light">
                Product List
              </Nav.Link>
              {!isAuthenticated ? (
                <>
                  <Nav.Link href="/login" className="text-light">
                    Login
                  </Nav.Link>
                  <Nav.Link href="/register" className="text-light">
                    Signup
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link className="text-light" onClick={handleLogout}>
                    Logout
                  </Nav.Link>
                  <Nav.Link className="text-light" href="/cart">
                    <FaShoppingCart style={{ fontSize: 20, color: "green" }} />
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {children}
      <footer className="bg-body-tertiary text-center py-3">
        Simple cart react hooks example with Spring jwt auth backend
      </footer>
    </>
  );
};

export default MainLayout;
