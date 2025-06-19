import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, type FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  Form,
  Alert,
  Button,
  Col,
  Container,
  Row,
  Image,
} from "react-bootstrap";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // data
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  // errors
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const sendData = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    try {
      const response = await login({
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      });
      navigate("/dashboard");
      console.log("Login:", response); // response will be user
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response && error.response.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert("Failed to Login User");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <Row className="w-475 bg-white br-20 ptb-42 form-border box-shadow">
        <Col className="d-flex flex-column align-items-center justify-content-center">
          <Image src="/logo.svg" alt="logo" className="mb-42" />
          <h2 className="text-center mb-2 fs-22 fw-semibold">SIGN IN</h2>
          <p className="fw-normal fs-14 fc-gray">
            Enter your credentials to access your account
          </p>
          <Form onSubmit={sendData} className="w-100 p-3">
            <Form.Group controlId="email" className="mb-3">
              <Form.Label className="fc-gray fs-14 fw-medium">Email</Form.Label>
              <Form.Control
              className="form-border p-15 br-4 fw-normal"
                type="email"
                placeholder="Enter your email"
                ref={emailRef}
              />
              {errors.email && (
                <Alert variant="danger" className="mt-2">
                  {errors.email[0]}
                </Alert>
              )}
            </Form.Group>

            <Form.Group controlId="password" className="mb-30">
              <Form.Label className="fc-gray fs-14 fw-medium">Password</Form.Label>
              <Form.Control
              className="form-border p-15 br-4 fw-normal"
                type="password"
                placeholder="Enter your password"
                ref={passwordRef}
              />
              {errors.password && (
                <Alert variant="danger" className="mt-2">
                  {errors.password[0]}
                </Alert>
              )}
            </Form.Group>

            <Button
              type="submit"
              className="w-100 br-4 p-15 bg-color-orange fs-14"
              disabled={isSubmitting}
            >
              {isSubmitting ? "SIGNING IN..." : "SIGN IN"}
            </Button>
          </Form>

          <div className="text-center mt-3 fs-14 fw-normal">
            Don't have an account?
            <span> </span>
            <Link className="fc-orange fw-medium" to="/signup">Create one</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
