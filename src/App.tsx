import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { BuildRedirect, ComponentsLibraryRedirect, FeatureFlagRedirect, SkillRedirect, SkillShopRedirect } from "./components/navigation/legacyRedirects";
import { BuildProvider } from "./contexts/build";
import { ThemeProvider } from "./contexts/theme";
import Home from "./pages/home/page";
import NotFound from "./pages/notFound/page";
import SkillShop from "./pages/skillShop/page";
import Options from "./pages/options/page";
import History from "./pages/history/page";
import About from "./pages/about/page";
import Skill from "./pages/skill/page";
import Build from "./pages/build/page";
import Snake from "./pages/snake/page";
import Sandbox from "./pages/sandbox/page";
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
                        <Route path="/feature-flag" element={<FeatureFlagRedirect />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/options" element={<Options />} />
                        <Route path="/components" element={<ComponentsLibraryRedirect />} />
                        <Route path="/components/:section" element={<ComponentsLibraryRedirect />} />
                        {FEATURE_FLAGS.SANDBOX && (
                            <Route path="/sandbox" element={<Sandbox />} />
                        )}
                        {FEATURE_FLAGS.SNAKE && (
                            <Route path="/snake" element={<Snake />} />
                        )}
                    </Routes>
                </BuildProvider>
            </BrowserRouter>
            <ContactWidget />
        </ThemeProvider>
    );
}

export default App;
