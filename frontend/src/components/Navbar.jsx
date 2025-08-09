

import { Button } from "./ui/button";
import { Menu, Link2, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slice/authSlice";
import { logoutUser } from "@/api/user.api";

export default function Navbar() {
  const { user,isAuthenticated } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const NavLinks = ({ onClick }) => (
    <nav className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:gap-6">
      <Link to="/" onClick={onClick} className="hover:underline underline-offset-4">
        Home
      </Link>
      <Link to="/#features" onClick={onClick} className="hover:underline underline-offset-4">
        Features
      </Link>
      <Link to="/dashboard" onClick={onClick} className="hover:underline underline-offset-4">
        Dashboard
      </Link>
    </nav>
  );
  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate({ to: "/" });
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout from Redux even if API call fails
      dispatch(logout());
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
              <span className="text-sm text-muted-foreground hidden lg:inline">{user.email}</span>
              <Button variant="secondary" onClick={() => navigate({ to: "/dashboard" })}>
                Open Dashboard
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
            <SheetContent side="right" className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600 text-white">
                  <Link2 className="h-4 w-4" />
                </div>
                <span className="font-semibold">Shortify</span>
              </div>
              <NavLinks onClick={() => setOpen(false)} />
              {isAuthenticated ? (
                <div className="mt-auto grid gap-3">
                  <Button onClick={() => { navigate({ to: "/dashboard" }); setOpen(false); }}>
                    Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="mt-auto grid gap-3">
                  <Button onClick={() => { navigate({ to: "/auth?mode=login" }); setOpen(false); }}>
                    Log in
                  </Button>
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-600/90"
                    onClick={() => { navigate({ to: "/auth?mode=register" }); setOpen(false); }}
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
