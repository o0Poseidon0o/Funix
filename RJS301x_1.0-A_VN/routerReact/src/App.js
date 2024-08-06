import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import ProductDetailPage from "./pages/ProductDetail";

// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/products" element={<ProductsPage />} />
//   </Route>
// );
// https://example.com/products
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage></ErrorPage>, //Thay đổi báo lỗi mặc định của REACT
    children: [
      {
        path: "",
        element: (
          <p>
            <HomePage />
          </p>
        ),
      },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:productId", element: <ProductDetailPage /> },
    ],
  },
  // {
  //   path: "/",
  //   element: (
  //     <p>
  //       <HomePage />
  //     </p>
  //   ),
  // },
  // { path: "/products", element: <ProductsPage /> },
]);

// const router = createBrowserRouter(routeDefinitions);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
// Phần comment là cách thứ 2 sử dụng chuyển trang vơi Router
