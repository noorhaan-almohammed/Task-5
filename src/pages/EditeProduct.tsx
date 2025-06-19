import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ProductForm from "../components/ProductForm/ProductForm";
import { useProduct } from "../hooks/useProduct";
import { type Product } from "../types/type";
import "../css/global.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showProduct, updateProduct } = useProduct();
  const [product, setProduct] = useState<Product | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      const result = await showProduct(Number(id));
      setProduct(result);
      setLoading(false);
    };
    fetch();
  }, [id, showProduct]);

  const handleSubmit = async ({ name, price, image }: any) => {
    setErrors({});
    setIsSubmitting(true);

    if (!name || !price) {
      setErrors({
        name: !name ? ["Name is required."] : [],
        price: !price ? ["Price is required."] : [],
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await updateProduct(Number(id), { name, price, image });
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert("Failed to update product.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="minh-100 vw-sm-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

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
          <h2 className="fs-7 fw-semibold">EDIT PRODUCT</h2>
          <ProductForm
            initialValues={{
              name: product!.name,
              price: product!.price.toString(),
              imageUrl: product!.image_url,
            }}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            submitLabel="Update"
          />
        </Col>
      </Row>
    </Container>
  );
}
