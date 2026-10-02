import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { CartProvider } from "./contexts/cart";
import { ThemeProvider } from "./contexts/theme";
import Home from "./pages/home/page";
import NotFound from "./pages/notFound/page";
import Products from "./pages/products/page";
import Options from "./pages/options/page";
import History from "./pages/history/page";
import ComponentsLibrary from "./pages/components/page";
import Product from "./pages/product/page";
import Cart from "./pages/cart/page";
import Snake from "./pages/snake/page";
import Sandbox from "./pages/sandbox/page";
import FeatureFlag from "./pages/featureFlag/page";
import { FEATURE_FLAGS } from "./lib/featureFlags";
import ContactWidget from "./components/contact/contactWidget";

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <CartProvider>
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/products" element={<Products />} />
                        <Route
                            path="/product/:name"
                            element={<Product />}
                        />
                        <Route path="/history" element={<History />} />
                        <Route path="/options" element={<Options />} />
                        <Route path="/components" element={<ComponentsLibrary />} />
                        <Route
                            path="/components/:section"
                            element={<ComponentsLibrary />}
                        />
                        {FEATURE_FLAGS.SANDBOX && (
                            <Route path="/sandbox" element={<Sandbox />} />
                        )}
                        {FEATURE_FLAGS.SNAKE && (
                            <Route path="/snake" element={<Snake />} />
                        )}
                        {FEATURE_FLAGS.FEATURE_FLAG_MENU && (
                            <Route
                                path="/feature-flag"
                                element={<FeatureFlag />}
                            />
                        )}
                    </Routes>
                </CartProvider>
            </BrowserRouter>
            <ContactWidget />
        </ThemeProvider>
    );
}

export default App;
