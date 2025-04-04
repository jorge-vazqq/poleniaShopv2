import React, { useState, useEffect } from "react";
import DrawerFilters from "./InsetDrawer";
import { useMediaQuery } from 'react-responsive';
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

  const isMobile = useMediaQuery({query: '(max-width:767px)'});



const buttonStyles = {
  margin: 0.5,
  padding: "8px 16px",
  fontSize: "1rem",
  fontWeight: "bold",
  textTransform: "none",
  borderRadius: "8px",
  color: "#fff",
  backgroundColor: "#007bff",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
};

const menuItemStyles = {
  padding: "8px 16px",
  fontSize: "1rem",
  fontWeight: "normal",
  color: "#333",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
};

return (
  <header>
    <Navbar className="custom-navbar" expand="md" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src={logo}
              alt="Polenia"
              className={`logo ${logoVisible ? "slide-up" : ""}`}
            />
          </Navbar.Brand>
        </LinkContainer>
        
        {/*<Navbar.Toggle aria-controls="basic-navbar-nav" />*/}

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!(
              location.pathname === "/login" ||
              location.pathname === "/register"
            ) && (
              <>
                {isMobile ? (
                  // Mobile-specific content: maybe a simplified menu or different layout
                  <>


                  {/*
                    <Button onClick={toggleDrawer} sx={buttonStyles}>
                      <FaShoppingCart sx={{ mr: 1 }} />
                      {cartItems.length > 0 && (
                        <Badge pill id="badge-color" style={{ marginLeft: "5px" }}>
                          {cartItems.reduce((a, c) => a + c.qty, 0)}
                        </Badge>
                      )}
                    </Button>
                    <DrawerFilters
                      open={drawerOpen}
                      onClose={() => setDrawerOpen(false)}
                    />
                    */}
                  </>
                ) : (
                  // Desktop-specific content
                  <>
                    <Button onClick={toggleDrawer} sx={buttonStyles}>
                      <FaShoppingCart sx={{ mr: 1 }} />
                      {cartItems.length > 0 && (
                        <Badge pill id="badge-color" style={{ marginLeft: "5px" }}>
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
                          variant="soft"
                          endDecorator={<ArrowDropDown />}
                          sx={buttonStyles}
                        >
                          {userInfo.name}
                        </MenuButton>
                        <Menu size="md" placement="bottom-start">
                          <MenuItem component={Link} to="/profile" sx={menuItemStyles}>
                            Ordenes
                          </MenuItem>
                          <MenuItem onClick={logoutHandler} sx={menuItemStyles}>
                            Logout
                          </MenuItem>
                        </Menu>
                      </Dropdown>
                    ) : (
                      <LinkContainer to="/login">
                        <Button sx={buttonStyles}>
                          <FaUser />
                        </Button>
                      </LinkContainer>
                    )}
                    {userInfo && userInfo.isAdmin && (
                      <Dropdown>
                        <MenuButton
                          variant="soft"
                          endDecorator={<ArrowDropDown />}
                          sx={buttonStyles}
                        >
                          Admin
                        </MenuButton>
                        <Menu placement="bottom-start">
                          <MenuItem component={Link} to="/admin/productlist" sx={menuItemStyles}>
                            Products
                          </MenuItem>
                          <MenuItem component={Link} to="/admin/promolist" sx={menuItemStyles}>
                            Promos
                          </MenuItem>
                          <MenuItem component={Link} to="/admin/orderlist" sx={menuItemStyles}>
                            Orders
                          </MenuItem>
                          <MenuItem component={Link} to="/admin/userlist" sx={menuItemStyles}>
                            Users
                          </MenuItem>
                        </Menu>
                      </Dropdown>
                    )}
                  </>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
);
};

export default Header;
