import { useRef, useState, type FormEvent } from "react";
import { Form, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { Image } from "react-bootstrap";
import type { ProductFormProps } from "../../types/type";

export default function ProductForm({
  initialValues,
  errors,
  isSubmitting,
  onSubmit,
  submitLabel = "Save",
}: ProductFormProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialValues?.imageUrl ?? null
  );

  const handleImageChange = () => {
    const file = imageRef.current?.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const price = priceRef.current?.value;
    const image = imageRef.current?.files?.[0];

    onSubmit({
      name: name ?? "",
      price: price ?? "",
      image,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mt-6 mb-6">
        <Col lg={6}>
          <Form.Group className="mb-64" controlId="name">
            <Form.Label className="fw-medium fs-2 fc-grey">Name</Form.Label>
            <Form.Control
              className="p-15"
              type="text"
              placeholder="Enter the product name"
              defaultValue={initialValues?.name}
              ref={nameRef}
            />
            {errors.name && <Alert variant="danger">{errors.name[0]}</Alert>}
          </Form.Group>

          <Form.Group className="mb-64" controlId="price">
            <Form.Label className="fw-medium fs-2 fc-grey">Price</Form.Label>
            <Form.Control
              className="p-15"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter the product price"
              defaultValue={initialValues?.price}
              ref={priceRef}
            />
            {errors.price && <Alert variant="danger">{errors.price[0]}</Alert>}
          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group controlId="image">
            <Form.Label className="fw-medium fs-2 fc-grey">Image</Form.Label>
            <Card
              className="border-dashed br-4 p-3 text-center bg-color-light-blue cursor-pointer form-border d-flex align-items-center justify-content-center h-200"
              onClick={() => imageRef.current?.click()}
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Preview"
                  className="maxw-100 maxh-100"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = "/product.webp";
                  }}
                />
              ) : (
                <img src="/Upload_icon.svg" alt="upload icon" />
              )}
              <Form.Control
                type="file"
                accept="image/*"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />
            </Card>
            {errors.image && <Alert variant="danger">{errors.image[0]}</Alert>}
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-center">
        <Button
          type="submit"
          className="w-200 bg-color-orange py-2 px-5 fs-2 fw-medium d-flex justify-content-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing" : submitLabel}
        </Button>
      </div>
    </Form>
  );
}
