import React, { useState, useEffect } from "react";
import DrawerFilters from "./InsetDrawer";

import { useNavigate, Link, useLocation } from "react-router-dom";
import { Badge, Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import SearchBox from "./SearchBox";
import logo from "../assets/logo.png";
import Button from "@mui/joy/Button";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import componentsStyles from "../styles/componentsStyles.css";
import { ListDivider } from "@mui/joy";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [logoVisible, setLogoVisible] = useState(false); // New state

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  useEffect(() => {
    // Trigger logo animation on component mount
    setLogoVisible(true);
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Check if the current route is the homepage
  const isHomePage = location.pathname === "/";

  return (
    <header>
      <Navbar className="custom-navbar" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
          <Navbar.Brand>
  <img
    src={logo}
    alt="Polenia"
    className={`logo ${logoVisible ? "slide-up" : ""}`} // Add dynamic class
  />
</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* Conditionally render cart and sign in buttons based on location */}
              {!(
                location.pathname === "/login" ||
                location.pathname === "/register"
              ) && (
                <>
                  <SearchBox />
                  <Button onClick={toggleDrawer} sx={{ margin: 0.5 }}>
                    <FaShoppingCart sx={{ mr: 1 }} />
                    {cartItems.length > 0 && (
                      <Badge
                        pill
                        id="badge-color"
                        style={{ marginLeft: "5px" }}
                      >
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </Badge>
                    )}
                  </Button>
                  <DrawerFilters
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                  />

                  {userInfo ? (
                    <Dropdown>
                      <MenuButton
                        endDecorator={<ArrowDropDown />}
                        sx={{ margin: 0.5 }}
                      >
                       {userInfo.name}
                      </MenuButton>
                      <Menu size="md" placement="bottom-start">
                        <MenuItem component={Link} to="/profile">
                          Ordenes
                        </MenuItem>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                      </Menu>
                    </Dropdown>
                  ) : (
                    <LinkContainer to="/login">
                      <Button sx={{ margin: 0.5 }}>
                        <FaUser />
                      </Button>
                    </LinkContainer>
                  )}

                  {userInfo && userInfo.isAdmin && (
                    <Dropdown>
                      <MenuButton
                        endDecorator={<ArrowDropDown />}
                        sx={{ margin: 0.5 }}
                      >
                        Admin
                      </MenuButton>
                      <Menu placement="bottom-start">
                        <MenuItem component={Link} to="/admin/productlist">
                          Products
                        </MenuItem>
                        <MenuItem component={Link} to="/admin/promolist">
                          Promos
                        </MenuItem>
                        <MenuItem component={Link} to="/admin/orderlist">
                          Orders
                        </MenuItem>
                        <MenuItem component={Link} to="/admin/userlist">
                          Users
                        </MenuItem>
                      </Menu>
                    </Dropdown>
                  )}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Conditionally render the additional row only on the homepage */}
      {isHomePage && (
        <Row className="additional-links-row justify-content-center mt-3">
          <Container>
            <Col className="text-center">
              <Nav className="justify-content-center">
                <LinkContainer to="/about">
                  <Nav.Link>
                    <h4>About Us</h4>
                  </Nav.Link>
                </LinkContainer>
                <Nav.Link href="#contact">
                  <h4>Contact</h4>
                </Nav.Link>
                <LinkContainer to="/faq">
                  <Nav.Link>
                    <h4>FAQ</h4>
                  </Nav.Link>
                </LinkContainer>
                {/* Add any other links here */}
              </Nav>
              <div id="menu-links-divider"
              />
            </Col>
          </Container>
        </Row>
      )}
    </header>
  );
};

export default Header;
