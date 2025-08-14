import { Home, LineChart, Link2, Settings, LogOut, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { useNavigate } from "@tanstack/react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "./ui/sidebar";
import { logoutUser } from "@/api/user.api";

const items = [
  { title: "Overview", id: "overview", icon: Home },
  { title: "Analytics", id: "analytics", icon: LineChart },
  { title: "Links", id: "links", icon: Link2 },
  // { title: "Settings", id: "settings", icon: Settings },
];

export default function SideBar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Handle navigation to sections within dashboard
  const handleNavigation = (item) => {
    if (item.id === "overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
      // Still logout from Redux even if API call fails
    } finally {
      dispatch(logout());
      localStorage.clear();
      sessionStorage.clear();
      navigate({ to: "/", replace: true });
      console.log("User logged out successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    }
  };

  const getActiveItem = () => {
    return "overview";
  };

  const activeItem = getActiveItem();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 flex items-start group-data-[collapsible=icon]:items-center border-b">
        <div
          onClick={() => navigate({ to: "/" })}
          className="flex items-center gap-2 px-4 py-1.5"
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600 text-white"
            aria-label="SnapURL"
          >
            <Link2 className="h-4 w-4" />
          </div>
          <span className="font-semibold group-data-[collapsible=icon]:hidden">
            SnapURL
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={activeItem === item.id}
                    onClick={() => handleNavigation(item)}
                    className="cursor-pointer"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="group-data-[collapsible=icon]:items-center">
              <SidebarMenuItem>
                <SidebarMenuButton className="cursor-default">
                  <User className="h-4 w-4" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    {user?.user?.name || user?.user?.email || "User"}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="text-xs text-muted-foreground px-2 group-data-[collapsible=icon]:hidden">
          {"© "}
          {new Date().getFullYear()} SnapURL
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
