
import { Outlet } from "@tanstack/react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const RootLayout = () => {
  return (
   <>
   <Navbar/>
   <Outlet />   
   </>
  );
};

export default RootLayout;
