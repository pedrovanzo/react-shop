import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./contexts/cart";
import Home from "./pages/home/page";
import NotFound from "./pages/notFound/page";
import Products from "./pages/products/page";
import Options from "./pages/options/page";
import Product from "./pages/product/page";
import Cart from "./pages/cart/page";
import Snake from "./pages/snake/SnakeGame";
import Sandbox from "./pages/sandbox/page";
import { FeatureFlagsProvider } from "./contexts/featureFlag";

function App() {
    return (
        <>
            <BrowserRouter>
                <ProductProvider>
                    <FeatureFlagsProvider>
                        <Routes>
                            <Route path="*" element={<NotFound />} />
                            <Route path="/" element={<Home />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/products" element={<Products />} />
                            <Route
                                path="/product/:name"
                                element={<Product />}
                            />
                            <Route path="/options" element={<Options />} />
                            <Route path="/sandbox" element={<Sandbox />} />
                            <Route path="/snake" element={<Snake />} />
                        </Routes>
                    </FeatureFlagsProvider>
                </ProductProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
