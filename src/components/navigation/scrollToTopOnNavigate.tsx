import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router";

// The router keeps the scroll position between pages, so opening a page from halfway down another
// one (e.g. the build from the skills header) would land halfway down too. New pages start at the top.
// Only a new path counts: filter changes (?sort=...) keep the position, and back/forward is left to the browser.
export default function ScrollToTopOnNavigate() {
    const { pathname } = useLocation();
    const navigationType = useNavigationType();
    // The navigation type also changes on the first filter change (initial POP to REPLACE),
    // so compare paths instead of relying on the effect re-running
    const previousPathname = useRef(pathname);
    useLayoutEffect(() => {
        if (previousPathname.current === pathname) return;
        previousPathname.current = pathname;
        if (navigationType !== "POP") window.scrollTo(0, 0);
    }, [pathname, navigationType]);
    return null;
}
