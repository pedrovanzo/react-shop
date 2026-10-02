import Button from "../button/button";
import { useTheme } from "../../contexts/themeContext";
import { ThemePreference } from "../../lib/theme";
type OrdinalTheme = "null" | "red" | "blue" | "green";
const themePreferences: { value: ThemePreference; label: string }[] = [
    { value: "system", label: "System" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
];
const ordinalThemes: { value: OrdinalTheme; label: string; className: string }[] = [
    { value: "null", label: "Default", className: "bg-contrast text-default" },
    { value: "red", label: "Red", className: "bg-red-700 text-red-100" },
    { value: "blue", label: "Blue", className: "bg-blue-700 text-blue-100" },
    { value: "green", label: "Green", className: "bg-green-700 text-green-100" },
];
function insertOrdinalTheme(theme: OrdinalTheme) {
    document.documentElement.setAttribute("data-theme-ordinal", theme);
}
export default function ThemeSelector() {
    const { preference, setPreference } = useTheme();
    return (
        <div className="my-2 flex flex-col gap-4 w-fit">
            <div className="flex flex-row gap-2">
                {themePreferences.map(({ value, label }) => (
                    <Button
                        key={value}
                        variant={preference === value ? "solid" : "soft"}
                        onClick={() => setPreference(value)}
                    >
                        {label} Mode
                    </Button>
                ))}
            </div>
            {ordinalThemes.map(({ value, label, className }) => (
                <Button
                    key={value}
                    className={className}
                    onClick={() => insertOrdinalTheme(value)}
                >
                    {label} Mode
                </Button>
            ))}
        </div>
    );
}
