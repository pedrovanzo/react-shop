import { useEffect, useState } from "react";
// There is no real backend; loading states are simulated to showcase loading feedback
export const SIMULATED_DELAY = 300;
export function useSimulatedLoading(delay: number = SIMULATED_DELAY) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), delay);
        return () => clearTimeout(timeout);
    }, [delay]);
    return isLoading;
}
