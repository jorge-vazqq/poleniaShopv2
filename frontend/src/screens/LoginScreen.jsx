import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Button from "@mui/joy/Button";
import Card from '@mui/joy/Card';
import { ListDivider } from "@mui/joy";


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div id="login-container">
      <FormContainer>
        <Card id="login-card" sx={{ mt: 8 }}>
          <h1 id="login-title">Entrar a Polenia</h1>
          <ListDivider id="login-divider" />
  
          <Form onSubmit={submitHandler} id="login-form">
            <Form.Group controlId="email" className="form-group">
              <Form.Label>Cuenta de correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
  
            <Form.Group controlId="password" className="form-group">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
  
            <Button type="submit" disabled={isLoading} id="login-button">
              Entrar
            </Button>
  
            {isLoading && <Loader />}
          </Form>
  
          <Row className="py-3" id="register-link">
            <Col>
              Nuevo cliente?{" "}
              <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                Registrate
              </Link>
            </Col>
          </Row>
        </Card>
      </FormContainer>
    </div>
  );
  
};

export default LoginScreen;
