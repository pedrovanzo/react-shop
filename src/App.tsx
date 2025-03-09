import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/page";
import NotFound from "./pages/notFound/page";
import Products from "./pages/products/page";
import Options from "./pages/options/page";
import Navbar from "./components/navigation/navbar";
import Product from "./pages/product/page";
import SignIn from "./pages/authentication/signin/page";
import SignUp from "./pages/authentication/signup/page";
import { FirebaseAuthProvider } from "./contexts/auth";
import Sandbox from "./pages/sandbox/page";

// initialize firebase

function App() {
  return (
    <>
      <BrowserRouter>
        <FirebaseAuthProvider>
          <Navbar />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/options" element={<Options />} />
            <Route path="/sandbox" element={<Sandbox />} />
            {/* Auth */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </FirebaseAuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
