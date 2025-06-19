// src/pages/ShowProduct.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Image, Spinner } from "react-bootstrap";
import "../css/global.css";
import { useProduct } from "../hooks/useProduct";
import type { Product } from "../types/type";

const ShowProduct = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { showProduct } = useProduct();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const data = await showProduct(Number(id));
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className=" minh-100 vw-sm-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <div className=" minh-100 vw-sm-100 flex-column d-flex justify-content-center align-items-center">
          <Image
            src="/product.webp"
            alt="default product image"
            width={100}
            height={100}
          ></Image>
          <p className="text-center text-danger">Product not found</p>;
        </div>
      </>
    );
  }

  return (
    <Container
      fluid
      className="pt-4 ps-6 pe-6 minh-100 vw-sm-100 show-product-container"
    >
      <div
        onClick={() => navigate("/dashboard")}
        className="border border-1 border-black cursor-pointer rounded-circle back-button d-flex align-items-center justify-content-center mb-4 "
      >
        <img alt="back arraw" src="/back.svg" />
      </div>

      <h1 className="fs-7 fw-semibold ">{product.name}</h1>

      <div className="text-center mt-40 mb-40">
        <Image
          src={product.image_url ?? "/product.webp"}
          alt={product.name}
          className="product-image-large rounded-4"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = "/product.webp";
          }}
        />
      </div>

      <div className="d-flex flex-wrap justify-content-xl-between justify-content-center gap-40 mb-40">
        <h3 className="d-flex align-items-center justify-content-center gap-1 flex-sm-row flex-column fw-semibold">
          <span className="fs-7">Price: </span>
          <span className="text-grey fs-xl-1 fs-md-2 fs-sm-3">
            {product.price}$
          </span>
        </h3>
        <h3 className="d-flex align-items-center justify-content-center gap-1 flex-sm-row flex-column fw-semibold">
          <span className="fs-7">Added At: </span>
          <span className="text-grey fs-xl-1 fs-md-2 fs-sm-3">
            {new Date(product.created_at).toLocaleDateString()}
          </span>
        </h3>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        <h3 className="d-flex align-items-center justify-content-center gap-1 flex-sm-row flex-column fw-semibold">
          <span className="fs-7">Updated At: </span>
          <span className="text-grey fs-xl-1 fs-md-2 fs-sm-3">
            {new Date(product.updated_at).toLocaleDateString()}
          </span>
        </h3>
      </div>
    </Container>
  );
};

export default ShowProduct;
