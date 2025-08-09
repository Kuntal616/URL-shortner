
import { Outlet, useLocation } from "@tanstack/react-router";
import Navbar from "./components/Navbar";

const RootLayout = () => {
  const location = useLocation();
  const navRoutes = ["/"];
  const isNavVisible = navRoutes.includes(location.pathname);
  return (
   <>
   {isNavVisible && <Navbar />}
   <Outlet />

   </>
  );
};

export default RootLayout;
