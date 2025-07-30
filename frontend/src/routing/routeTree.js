import { createRootRoute } from "@tanstack/react-router"
import RootLayout from "../RootLayout"
import { authRoute, dashboardRoute, indexRoute } from "./routing"

export const rootRoute = createRootRoute({
    component: RootLayout
})

export const routeTree = rootRoute.addChildren([indexRoute, authRoute, dashboardRoute])