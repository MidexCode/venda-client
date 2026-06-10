import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from "@tanstack/react-router";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: Home,
});

const shopRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/shop",
  component: Shop,
});

const productDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/products/$slug",
  component: ProductDetail,
});

const sellerStorefrontRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/sellers/$slug",
  component: () => (
    <div className="p-8 text-navy">Seller Storefront — coming soon</div>
  ),
});

const dealsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/deals",
  component: () => <div className="p-8 text-navy">Deals — coming soon</div>,
});

const cartRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/cart",
  component: () => <div className="p-8 text-navy">Cart — coming soon</div>,
});

const checkoutRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/checkout",
  component: () => <div className="p-8 text-navy">Checkout — coming soon</div>,
});

const orderSuccessRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/order-success",
  component: () => (
    <div className="p-8 text-navy">Order Success — coming soon</div>
  ),
});

const trackOrderRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/track",
  component: () => (
    <div className="p-8 text-navy">Track Order — coming soon</div>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/profile",
  component: () => <div className="p-8 text-navy">Profile — coming soon</div>,
});

const becomeSellerRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/become-seller",
  component: () => (
    <div className="p-8 text-navy">Become a Seller — coming soon</div>
  ),
});

const sellerDashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/seller/dashboard",
  component: () => (
    <div className="p-8 text-navy">Seller Dashboard — coming soon</div>
  ),
});

const sellerProductsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/seller/products",
  component: () => (
    <div className="p-8 text-navy">Manage Products — coming soon</div>
  ),
});

const sellerOrdersRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/seller/orders",
  component: () => (
    <div className="p-8 text-navy">Seller Orders — coming soon</div>
  ),
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/admin/dashboard",
  component: () => (
    <div className="p-8 text-navy">Admin Dashboard — coming soon</div>
  ),
});

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    homeRoute,
    shopRoute,
    productDetailRoute,
    sellerStorefrontRoute,
    dealsRoute,
    cartRoute,
    checkoutRoute,
    orderSuccessRoute,
    trackOrderRoute,
    profileRoute,
    becomeSellerRoute,
    sellerDashboardRoute,
    sellerProductsRoute,
    sellerOrdersRoute,
    adminDashboardRoute,
  ]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
