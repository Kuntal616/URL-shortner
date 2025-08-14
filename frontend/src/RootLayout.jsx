
import { Outlet, useLocation } from "@tanstack/react-router";
import Navbar from "./components/Navbar";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = () => {
  const location = useLocation();
  const navRoutes = ["/"];
  const isNavVisible = navRoutes.includes(location.pathname);
  return (
   <>
   {isNavVisible && <Navbar />}
   <Toaster />
   <Outlet />

   </>
  );
};

export default RootLayout;
