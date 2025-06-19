import { useEffect, useState } from "react";
import { Nav, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAuthContext } from "../../context/AuthContext";
import "./SideBar.css";
import "../../css/global.css"
const SideBar = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeLink, setActiveLink] = useState("products"); 
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  const handleNavClick = (key: string) => {
    setActiveLink(key);
    setIsOpen(false);
  };
  return (
    <>
      <Button
        className="d-md-none position-fixed top-0 end-0 m-4 z-3 menu p-3"
        onClick={toggleSidebar}
      >
        ☰
      </Button>

      {isOpen && (
        <div
          className="sidebar-backdrop d-md-none position-fixed w-100 h-100 top-0 start-0 overlay"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`sidebar bg-sidebar p-35 d-flex flex-column align-items-center w-270 minh-100
        ${isOpen ? "d-flex position-fixed" : "d-none"} d-md-flex`}
      >
        <div className="w-100 mb-4 d-flex align-items-center justify-content-center ">
          <Image src="/logo.svg" width={100} />
      
        </div>

        <Image
          src={user?.profile_image_url}
          roundedCircle
          width="135"
          height="135"
          className="mb-3 object-fit-cover"
        />
        <span className="fw-bold">
          {user?.first_name} {user?.last_name}
        </span>

        <Nav
          defaultActiveKey="/products"
          className="d-flex justify-content-center flex-column align-items-center w-100 mt-5"
        >
          <Nav.Link
            href="#products"
            onClick={() => handleNavClick("products")}
            className={`text-black text-center w-100 p-12 br-4 d-flex justify-content-center align-items-center mb-2 fs-14 fw-medium ${
              activeLink === "products" ? "bg-color-orange" : ""
            }`}
          >
            <Image src="/product.svg" className="me-2" /> Products
          </Nav.Link>
          <Nav.Link
            href="#favorites"
            onClick={() => handleNavClick("favorites")}
            className={`text-black text-center w-100 p-12 br-4 d-flex justify-content-center align-items-center mb-2 fs-14 fw-medium ${
              activeLink === "favorites" ? "bg-color-orange" : ""
            }`}
          >
            <Image src="/bookmark.svg" className="me-3" /> Favorites
          </Nav.Link>
          <Nav.Link
            href="#order-list"
            onClick={() => handleNavClick("orders")}
            className={`text-black text-center w-100 p-12 br-4 d-flex justify-content-center align-items-center mb-2 fs-14 fw-medium ${
              activeLink === "orders" ? "bg-color-orange" : ""
            }`}
          >
            <Image src="/bookmark.svg" className="me-3" /> Order List
          </Nav.Link>
        </Nav>

        <div className="mt-auto">
          <Button
            variant="link"
            onClick={logout}
            className="text-black fs-14 fw-medium text-decoration-none d-flex align-items-center"
          >
            Logout <Image src="/sign-out.svg" className="ms-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
