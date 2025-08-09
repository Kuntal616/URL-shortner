import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import AuthContainer from "../pages/AuthContainer";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import { checkAuth } from "../utils/helper";
import HomePage from "@/pages/HomePage";

export const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/auth",
    validateSearch: (search) => ({
    mode: search.mode , // default to login
  }),
    component:  AuthContainer,
})

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component:  HomePage,
})

export const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/dashboard",
    beforeLoad: checkAuth,
    component:  Dashboard
})