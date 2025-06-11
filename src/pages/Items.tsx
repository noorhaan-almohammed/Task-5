import { Outlet } from "react-router-dom";

function Items() {
 
  return (
    <>
      <h1>Tasks</h1>
      <Outlet />
    </>
  );
}

export default Items;
