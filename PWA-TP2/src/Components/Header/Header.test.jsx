import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { AuthProvider } from "../../Context/AuthContext";

vi.mock("../LanguageSwitcher/LanguageSwitcher", () => ({
    LanguageSwitcher: () => <div data-testid="language-switcher">Language Switcher</div>
}));

vi.mock("lucide-react", () => ({
    Bell: ({ className }) => <div data-testid="bell-icon" className={className}>Bell</div>,
    User: ({ className }) => <div data-testid="user-icon" className={className}>User</div>,
    House: ({ className }) => <div data-testid="house-icon" className={className}>House</div>
}));

describe("Header component", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render the header element", () => {
        render(
            <AuthProvider>
                <Header />
            </AuthProvider>
        );

        const header = screen.getByRole("banner");
        expect(header).toBeInTheDocument();
    });

    it("should have correct CSS classes for styling and positioning", () => {
        render(
            <AuthProvider>
                <Header />
            </AuthProvider>
        );

        const header = screen.getByRole("banner");

        expect(header).toHaveClass("bg-white");
        expect(header).toHaveClass("sticky");
        expect(header).toHaveClass("top-0");
        expect(header).toHaveClass("z-50");
        expect(header).toHaveClass("w-full");
    });

    it("should render the LanguageSwitcher component", () => {
        render(
            <AuthProvider>
                <Header />
            </AuthProvider>
        );

        const languageSwitcher = screen.getByTestId("language-switcher");
        expect(languageSwitcher).toBeInTheDocument();
    });

    it("should have flex layout with proper gap spacing", () => {
        render(
            <AuthProvider>
                <Header />
            </AuthProvider>
        );

        const header = screen.getByRole("banner");

        expect(header).toHaveClass("flex");
        expect(header).toHaveClass("items-center");
        expect(header).toHaveClass("gap-4");
    });

    it("should have ml-auto class to position content to the right", () => {
        render(
            <AuthProvider>
                <Header />
            </AuthProvider>
        );

        const rightContainer = screen.getByTestId("language-switcher").parentElement;
        expect(rightContainer).toHaveClass("ml-auto");
    });
});
