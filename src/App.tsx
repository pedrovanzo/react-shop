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
import { FirebaseAuthProvider, useFirebaseAuth } from "./contexts/auth";

// initialize firebase

function App() {
  return (
    <>
      <BrowserRouter>
        <FirebaseAuthProvider>
          <Navbar />
          <UseremailFB />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/options" element={<Options />} />
            {/* Auth */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </FirebaseAuthProvider>
      </BrowserRouter>
    </>
  );
}

function UseremailFB() {
  const user = useFirebaseAuth();
  return <div>{user?.email || "unauthenticated"}</div>;
}

export default App;
