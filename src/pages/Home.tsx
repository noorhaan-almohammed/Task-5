import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  const { logout } = useAuth();
  return (
    <div>
     
      <button onClick={logout}>logout</button>
     
        <Outlet />
   
    </div>
  );
}

export default Home;
