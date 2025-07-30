import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import AuthContainer from "../pages/AuthContainer";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

export const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/auth",
    component:  AuthContainer,
})

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component:  Home,
})

export const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/dashboard",
    component:  Dashboard,
})