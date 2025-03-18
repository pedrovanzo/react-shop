import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FirebaseAuthProvider } from "./contexts/auth";
import { ProductProvider } from "./contexts/cart";
import Home from "./pages/home/page";
import NotFound from "./pages/notFound/page";
import Products from "./pages/products/page";
import Options from "./pages/options/page";
import Product from "./pages/product/page";
import SignIn from "./pages/authentication/signin/page";
import SignUp from "./pages/authentication/signup/page";
import Cart from "./pages/cart/page";
import { Snake } from "./pages/snake/page";
import Sandbox from "./pages/sandbox/page";

// initialize firebase

function App() {
  return (
    <>
      <BrowserRouter>
        <FirebaseAuthProvider>
          <ProductProvider>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/options" element={<Options />} />
              <Route path="/sandbox" element={<Sandbox />} />
              <Route path="/snake" element={<Snake />}/>
              {/* Auth */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </ProductProvider>
        </FirebaseAuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
