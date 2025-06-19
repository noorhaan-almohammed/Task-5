import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
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
export default function SignupForm() {
  const { register } = useAuth();
  // data
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const profileImageRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // errors
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = () => {
    const file = profileImageRef.current?.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const sendData = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      await register({
        first_name: firstNameRef.current!.value,
        last_name: lastNameRef.current!.value,
        user_name: `${firstNameRef.current!.value}_${
          lastNameRef.current!.value
        }`,
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
        password_confirmation: passwordConfirmRef.current!.value,
        profile_image: profileImageRef.current?.files?.[0],
      });

      // console.log("Registered:"); // response will be user
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response && error.response.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert("Failed to Register User");
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
          <h2 className="text-center mb-2 fs-22 fw-semibold">SIGN UP</h2>
          <p className="fw-normal fs-14 fc-gray">
            Fill in the following fields to create an account.
          </p>

          <Form onSubmit={sendData} className="w-100 p-3">
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="first_name">
                  <Form.Label className="fc-gray fs-14 fw-medium">
                    First Name
                  </Form.Label>
                  <Form.Control
                    className="form-border p-15 br-4 fw-normal"
                    type="text"
                    placeholder="First Name"
                    ref={firstNameRef}
                  />
                  {errors.first_name && (
                    <Alert variant="danger">{errors.first_name[0]}</Alert>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="last_name">
                  <Form.Label className="fc-gray fs-14 fw-medium">
                    Last Name
                  </Form.Label>
                  <Form.Control
                    className="form-border p-15 br-4 fw-normal"
                    type="text"
                    placeholder="Last Name"
                    ref={lastNameRef}
                  />
                  {errors.last_name && (
                    <Alert variant="danger">{errors.last_name[0]}</Alert>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label className="fc-gray fs-14 fw-medium">Email</Form.Label>
              <Form.Control
                className="form-border p-15 br-4 fw-normal"
                type="email"
                placeholder="Enter your email"
                ref={emailRef}
              />
              {errors.email && (
                <Alert variant="danger">{errors.email[0]}</Alert>
              )}
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="password">
                  <Form.Label className="fc-gray fs-14 fw-medium">
                    Password
                  </Form.Label>
                  <Form.Control
                    className="form-border p-15 br-4 fw-normal"
                    type="password"
                    placeholder="Enter password"
                    ref={passwordRef}
                  />
                  {errors.password && (
                    <Alert variant="danger">{errors.password[0]}</Alert>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="password_confirmation">
                  <Form.Label className="fc-gray fs-14 fw-medium">
                    Re-enter your password
                  </Form.Label>
                  <Form.Control
                    className="form-border p-15 br-4 fw-normal"
                    type="password"
                    placeholder="Re-enter your password"
                    ref={passwordConfirmRef}
                  />
                  {errors.password_confirmation && (
                    <Alert variant="danger">
                      {errors.password_confirmation[0]}
                    </Alert>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="image" className="mb-4">
              <Form.Label className="fc-gray fs-14 fw-medium">
                Profile Image
              </Form.Label>

              <div
                className="border-dashed square br-4 p-3 text-center bg-color-light-blue cursor-pointer form-border d-flex align-items-center justify-content-center"
                onClick={() => profileImageRef.current?.click()}
              >
                <Form.Control
                  type="file"
                  ref={profileImageRef}
                  className="d-none"
                  onChange={handleImageChange}
                />
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="wh-100" />
                ) : (
                  <img src="/Upload_icon.svg" alt="upload" width="40" />
                )}
              </div>

              {errors.profile_image && (
                <Alert variant="danger">{errors.profile_image[0]}</Alert>
              )}
            </Form.Group>

            <Button
              type="submit"
              className="w-100 br-4 p-15 bg-color-orange fs-14"
              disabled={isSubmitting}
            >
              {isSubmitting ? "SIGNING UP..." : "SIGN UP"}
            </Button>
          </Form>

          <div className="text-center mt-3 fs-14 fw-normal">
            Do you have an account?
            <span> </span>
            <Link className="fc-orange fw-medium" to="/">
              Sign in
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
