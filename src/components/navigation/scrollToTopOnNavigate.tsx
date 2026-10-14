import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router";

// The router keeps the scroll position between pages, so opening a page from halfway down another
// one (e.g. the build from the skills header) would land halfway down too. New pages start at the top,
// or at the section named in the URL hash (e.g. /options#feature-flags).
// Only a new path counts: filter changes (?sort=...) keep the position, and back/forward is left to the browser.
export default function ScrollToTopOnNavigate() {
    const { pathname, hash } = useLocation();
    const navigationType = useNavigationType();
    // The navigation type also changes on the first filter change (initial POP to REPLACE),
    // so compare paths instead of relying on the effect re-running
    const previousPathname = useRef(pathname);
    useLayoutEffect(() => {
        if (previousPathname.current === pathname) return;
        previousPathname.current = pathname;
        if (navigationType === "POP") return;
        const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
        if (target) target.scrollIntoView();
        else window.scrollTo(0, 0);
    }, [pathname, hash, navigationType]);
    // On a fresh load the page renders after the browser looked for the hash target, so jump to it now
    useEffect(() => {
        if (!hash) return;
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
        // Only the first render's hash
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return null;
}
