import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import AddProduct from "./page/AdminProduct/Create/AddProduct";
import ProductListAdmin from "./page/AdminProduct/ProductList/ProductListAdmin";
import UpdateProduct from "./page/AdminProduct/Update/UpdateProduct";
import UserCart from "./page/Cart/Cart";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import ProductDetail from "./page/ProductDetail/ProductDetail";
import ProductList from "./page/ProductList";
import Register from "./page/Register/Register";
function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />
      <Route
        path="/register"
        element={
          <MainLayout>
            <Register />
          </MainLayout>
        }
      />
      {/* {currentUser ? (
        <Route path={`/cart/${currentUser.username}`} element={<UserCart />} />
      ) : (
      )} */}
      <Route
        path={`/cart`}
        element={
          <MainLayout>
            <UserCart />
          </MainLayout>
        }
      />

      {/* <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      /> */}
      <Route
        path="/products"
        element={
          <MainLayout>
            <ProductList />
          </MainLayout>
        }
      />
      <Route
        path="/products/:productId"
        element={
          <MainLayout>
            <ProductDetail />
          </MainLayout>
        }
      />
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminLayout>
            <ProductListAdmin />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/add"
        element={
          <MainLayout>
            <AddProduct />
          </MainLayout>
        }
      />
      <Route
        path="/admin/products/:productId"
        element={
          <MainLayout>
            <UpdateProduct />
          </MainLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <MainLayout>
            <UserCart />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
