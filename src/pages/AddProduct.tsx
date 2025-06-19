import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProductForm from "../components/ProductForm/ProductForm";
import { useProduct } from "../hooks/useProduct";
import "../css/global.css";

export default function AddProduct() {
  const { addProduct } = useProduct();
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async ({ name, price, image }: any) => {
    setErrors({});
    setIsSubmitting(true);

    if (!name || !price || !image) {
      setErrors({
        name: !name ? ["Name is required."] : [],
        price: !price ? ["Price is required."] : [],
        image: !image ? ["Image is required."] : [],
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await addProduct({ name, price, image });
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert("Failed to add product.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid className="pt-4 ps-6 pe-6 minh-100 vw-sm-100 show-product-container">
      <div
        onClick={() => navigate("/dashboard")}
        className="border border-1 border-black cursor-pointer rounded-circle back-button d-flex align-items-center justify-content-center mb-4 "
      >
        <img alt="back arrow" src="/back.svg" />
      </div>

      <Row className="justify-content-between">
        <Col>
          <h2 className="fs-7 fw-semibold">ADD NEW ITEM</h2>
          <ProductForm
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            submitLabel="Save"
          />
        </Col>
      </Row>
    </Container>
  );
}
