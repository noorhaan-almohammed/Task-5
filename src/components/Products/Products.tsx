import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Pagination,
  Spinner,
  Image,
} from "react-bootstrap";
import { useProduct } from "../../hooks/useProduct";
import { type Product } from "../../types/type";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const { getProducts, deleteProduct } = useProduct();

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete.id);
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
    } catch (err) {
      console.error("Error deleting product:", err);
    } finally {
      setShowConfirm(false);
      setProductToDelete(null);
    }
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;

      if (width >= 1000 && width <= 1399) {
        setItemsPerPage(6);
      } else if (width >= 780 && width < 1000) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(8);
      }
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
        // console.log("products:", response);
      } catch (error: any) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  //   const renderPaginationItems = () => {
  //     const items: React.ReactNode[] = [];

  //     if (totalPages <= 1) return items;

  //     let pages: number[] = [];

  //     if (totalPages <= 3) {
  //       pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  //     } else {
  //       if (currentPage <= 2) {
  //         pages = [1, 2, 3];
  //       } else if (currentPage >= totalPages - 1) {
  //         pages = [totalPages - 3, totalPages - 2, totalPages - 1].filter(
  //           (p) => p > 0
  //         );
  //       } else {
  //         pages = [currentPage - 1, currentPage, currentPage + 1];
  //       }
  //     }

  //     pages.forEach((page) => {
  //       items.push(
  //         <Pagination.Item
  //           key={page}
  //           active={currentPage === page}
  //           onClick={() => paginate(page)}
  //         >
  //           {page}
  //         </Pagination.Item>
  //       );
  //     });

  //     items.push(<Pagination.Ellipsis key="ellipsis" disabled className="dots" />);

  //     if (!pages.includes(totalPages)) {
  //       items.push(
  //         <Pagination.Item
  //           key={totalPages}
  //           active={currentPage === totalPages}
  //           onClick={() => paginate(totalPages)}
  //         >
  //           {totalPages}
  //         </Pagination.Item>
  //       );
  //     }

  //     return items;
  //   };
  const renderPaginationItems = () => {
    const items: React.ReactNode[] = [];

    if (totalPages <= 0) return items;

    if (totalPages === 1) {
      items.push(
        <Pagination.Item
          key={1}
          active={currentPage === 1}
          onClick={() => paginate(1)}
        >
          1
        </Pagination.Item>
      );
      return items;
    }

    const middlePages: number[] = [];

    if (totalPages === 2) {
      middlePages.push(1, 2);
    } else if (totalPages === 3) {
      middlePages.push(1, 2);
    } else if (totalPages === 4) {
      middlePages.push(1, 2, 3);
    } else {
      if (currentPage <= 2) {
        middlePages.push(1, 2, 3);
      } else if (currentPage >= totalPages - 1) {
        middlePages.push(totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        middlePages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }

    const filteredPages = Array.from(
      new Set(middlePages.filter((p) => p < totalPages && p > 0))
    );

    filteredPages.forEach((page) => {
      items.push(
        <Pagination.Item
          key={page}
          active={currentPage === page}
          onClick={() => paginate(page)}
        >
          {page}
        </Pagination.Item>
      );
    });

    if (totalPages >= 2) {
      items.push(
        <Pagination.Ellipsis key="ellipsis" disabled className="dots" />
      );

      items.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => paginate(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <>
      {loading ? (
        <div className="minh-100 vw-sm-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="warning" />
        </div>
      ) : (
        <>
          <Container fluid className="pt-4 ps-7 pe-7 minh-100">
            <div className="w-100 d-flex align-items-center justify-content-sm-center justify-content-start">
              <div className="border rounded-2 p-2 w-70 d-flex align-items-center justify-content-center">
                <Form.Control
                  type="text"
                  placeholder="Search product by name"
                  className="search-control w-100 border-0"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <Image
                  src="/searsh.svg"
                  alt="Search"
                  className="pe-2 disabled"
                />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <Button
                onClick={() => navigate("addproduct")}
                className="add-button bg-color-orange br-4 p-4 fs-14 pt-14 pb-14 mt-md-5 mb-md-32 mt-3 mb-3 fw-medium"
              >
                ADD NEW PRODUCT
              </Button>
            </div>
            <Row className="g-4 ">
              {currentProducts.map((product) => (
                <Col
                  key={product.id}
                  xs={12}
                  md={6}
                  lg={4}
                  xxl={3}
                  className="d-flex justify-content-center"
                >
                  <Card
                    className="product-card position-relative border-0 cursor-pointer"
                    onClick={() => navigate(`/dashboard/product/${product.id}`)}
                  >
                    <Card.Img
                      alt="product image"
                      src={product.image_url ?? "/product.webp"}
                      width={200}
                      height={200}
                      className="product-image object-fit-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = "/product.webp";
                        }}
                    />
                    <div className="product-overlay w-100 h-100 position-absolute top-0 start-0 d-flex flex-column justify-content-center align-items-center gap-4">
                      <Card.Title className="fs-2">{product.name}</Card.Title>
                      <div className="w-100 d-flex justify-content-evenly flex-wrap gap-2">
                        <Button
                        onClick={(e)=> {e.stopPropagation(); navigate(`editproduct/${product.id}`)}}
                        className="btn-edit bg-color-orange pt-2 pb-2 ps-4 pe-4 fs-14 br-4 fw-medium">
                          Edit
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(product);
                          }}
                          className="btn-delete pt-2 pb-2 ps-3 pe-3 fs-14 br-4 fw-medium"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-80">
                <Pagination className="custom-pagination">
                  <Pagination.Prev
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {renderPaginationItems()}
                  <Pagination.Next
                    onClick={() =>
                      currentPage < totalPages && paginate(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </Container>
        </>
      )}
      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Are you sure you want to delete the product?"
      />
      
    </>
  );
};

export default Products;
