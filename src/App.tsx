import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { BuildRedirect, SkillRedirect, SkillShopRedirect } from "./components/navigation/legacyRedirects";
import { BuildProvider } from "./contexts/build";
import { ThemeProvider } from "./contexts/theme";
import Home from "./pages/home/page";
import NotFound from "./pages/notFound/page";
import SkillShop from "./pages/skillShop/page";
import Options from "./pages/options/page";
import History from "./pages/history/page";
import ComponentsLibrary from "./pages/components/page";
import Skill from "./pages/skill/page";
import Build from "./pages/build/page";
import Snake from "./pages/snake/page";
import Sandbox from "./pages/sandbox/page";
import FeatureFlag from "./pages/featureFlag/page";
import { FEATURE_FLAGS } from "./lib/featureFlags";
import ContactWidget from "./components/contact/contactWidget";
import ScrollToTopOnNavigate from "./components/navigation/scrollToTopOnNavigate";

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <ScrollToTopOnNavigate />
                <BuildProvider>
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/build" element={<Build />} />
                        <Route path="/skill-shop" element={<SkillShop />} />
                        <Route
                            path="/skill/:name"
                            element={<Skill />}
                        />
                        {/* Old e-commerce URLs, kept working for links shared before the rename */}
                        <Route path="/products" element={<SkillShopRedirect />} />
                        <Route path="/product/:name" element={<SkillRedirect />} />
                        <Route path="/cart" element={<BuildRedirect />} />
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
                </BuildProvider>
            </BrowserRouter>
            <ContactWidget />
        </ThemeProvider>
    );
}

export default App;
