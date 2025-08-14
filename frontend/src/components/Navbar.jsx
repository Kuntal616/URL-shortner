

// import { Button } from "./ui/button";
// import { Menu, Link2, LogOut } from "lucide-react";
// import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
// import { useState } from "react";
// import { cn } from "@/lib/utils";
// import { Link, useNavigate } from "@tanstack/react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "@/store/slice/authSlice";
// import { logoutUser } from "@/api/user.api";

// export default function Navbar() {
//   const { user,isAuthenticated } = useSelector((state) => state.auth);
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const NavLinks = ({ onClick }) => (
//     <nav className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:gap-6">
//       <Link to="/" onClick={onClick} className="hover:underline underline-offset-4">
//         Home
//       </Link>
//       <Link to="/#features" onClick={onClick} className="hover:underline underline-offset-4">
//         Features
//       </Link>
//       <Link to="/dashboard" onClick={onClick} className="hover:underline underline-offset-4">
//         Dashboard
//       </Link>
//     </nav>
//   );
//   const handleLogout = async () => {
//     try {
//       await logoutUser();
     
//     } catch (error) {
//       console.error('Logout error:', error);
//       // Still logout from Redux even if API call fails
//     }
//     finally {
//       dispatch(logout());
//       localStorage.clear();
//     sessionStorage.clear();
//       navigate({ to: "/" ,replace: true});
//        console.log('User logged out successfully');
//        setTimeout(() => {
//       window.location.href = '/';
//     }, 100);
//   }
//   };

//   return (
//     <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
//       <div className="container mx-auto flex h-14 items-center justify-between px-4">
//         <Link to="/" className="flex items-center gap-2">
//           <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600 text-white">
//             <Link2 className="h-4 w-4" />
//           </div>
//           <span className="font-semibold">Shortify</span>
//         </Link>

//         {/* Desktop Nav */}
//         <div className="hidden items-center gap-6 md:flex">
//           <NavLinks />
//           {isAuthenticated ? (
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-muted-foreground hidden lg:inline">{user.email}</span>
//               <Button variant="secondary" onClick={() => navigate({ to: "/dashboard" })}>
//                 Open Dashboard
//               </Button>
//               <Button variant="outline" onClick={handleLogout}>
//                 <LogOut className="mr-2 h-4 w-4" />
//                 Logout
//               </Button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               <Button variant="outline" onClick={() => navigate({ to: "/auth?mode=login" })}>
//                 Log in
//               </Button>
//               <Button
//                 className={cn("bg-emerald-600 hover:bg-emerald-600/90")}
//                 onClick={() => navigate({ to: "/auth?mode=register" })}
//               >
//                 Sign up
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Mobile Nav */}
//         <div className="md:hidden">
//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild>
//               <Button variant="outline" size="icon" aria-label="Open menu">
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="flex flex-col gap-6">
//               <div className="flex items-center gap-2">
//                 <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600 text-white">
//                   <Link2 className="h-4 w-4" />
//                 </div>
//                 <span className="font-semibold">Shortify</span>
//               </div>
//               <NavLinks onClick={() => setOpen(false)} />
//               {isAuthenticated ? (
//                 <div className="mt-auto grid gap-3">
//                   <Button onClick={() => { navigate({ to: "/dashboard" }); setOpen(false); }}>
//                     Dashboard
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       handleLogout();
//                       setOpen(false);
//                     }}
//                   >
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Logout
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="mt-auto grid gap-3">
//                   <Button onClick={() => { navigate({ to: "/auth?mode=login" }); setOpen(false); }}>
//                     Log in
//                   </Button>
//                   <Button
//                     className="bg-emerald-600 hover:bg-emerald-600/90"
//                     onClick={() => { navigate({ to: "/auth?mode=register" }); setOpen(false); }}
//                   >
//                     Sign up
//                   </Button>
//                 </div>
//               )}
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// }

import { Button } from "./ui/button";
import { Menu, Link2, LogOut, User, Home, BarChart3, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "./ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slice/authSlice";
import { logoutUser } from "@/api/user.api";
import { Separator } from "./ui/separator";

export default function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const NavLinks = ({ onClick, mobile = false }) => {
    const links = [
      { to: "/", label: "Home", icon: Home },
      { to: "/#features", label: "Features", icon: BarChart3 },
      { to: "/dashboard", label: "Dashboard", icon: Settings },
    ];

    if (mobile) {
      return (
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClick}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
      );
    }

    return (
      <nav className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:gap-6">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={onClick}
            className="hover:underline underline-offset-4"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    );
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(logout());
      localStorage.clear();
      sessionStorage.clear();
      navigate({ to: "/", replace: true });
      console.log('User logged out successfully');
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600 text-white">
            <Link2 className="h-4 w-4" />
          </div>
          <span className="font-semibold">Shortify</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          <NavLinks />
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden lg:inline">
                {user?.name || user?.email}
              </span>
              <Button variant="secondary" onClick={() => navigate({ to: "/dashboard" })}>
                Dashboard
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate({ to: "/auth?mode=login" })}>
                Log in
              </Button>
              <Button
                className={cn("bg-emerald-600 hover:bg-emerald-600/90")}
                onClick={() => navigate({ to: "/auth?mode=register" })}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                {/* Header */}
                <SheetHeader className="space-y-0 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600 text-white">
                      <Link2 className="h-4 w-4" />
                    </div>
                    <SheetTitle className="font-semibold">Shortify</SheetTitle>
                  </div>
                </SheetHeader>

                <Separator className="mb-4" />

                {/* Navigation Links */}
                <div className="flex-1">
                  <NavLinks onClick={() => setOpen(false)} mobile={true} />
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t mx-2">
                  {isAuthenticated ? (<>
                  {/* User Info (if authenticated) */}
                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3 mb-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {user?.user?.name || 'User'}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.user?.email}
                        </p>
                      </div>
                    </div>
                    <Separator className="mb-4" />
                    <div className="space-y-3 mb-4">
                      {/* <Button
                        className="w-full justify-start"
                        variant="secondary"
                        onClick={() => {
                          navigate({ to: "/dashboard" });
                          setOpen(false);
                        }}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Open Dashboard
                      </Button> */}
                      <Button
                        className="w-full justify-start  text-red-600 "
                        variant="outline"
                        onClick={() => {
                          handleLogout();
                          setOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-8 w-8" />
                        Logout
                      </Button>
                    </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => {
                          navigate({ to: "/auth?mode=login" });
                          setOpen(false);
                        }}
                      >
                        Log in
                      </Button>
                      <Button
                        className="w-full bg-emerald-600 hover:bg-emerald-600/90"
                        onClick={() => {
                          navigate({ to: "/auth?mode=register" });
                          setOpen(false);
                        }}
                      >
                        Sign up
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}