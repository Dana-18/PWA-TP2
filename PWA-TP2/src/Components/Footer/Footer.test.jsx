import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                "footer.contact": "Contacto"
            };
            return translations[key] || key;
        },
    }),
}));

describe("Footer component", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render default group name", () => {
        render(<Footer />);

        expect(screen.getByText(/Dunder Mifflin/i)).toBeInTheDocument();
    });

    it("should render custom group name when passed as props", () => {
        render(<Footer groupName="Gimnasio UNCO" />);

        expect(screen.getByText(/Gimnasio UNCO/i)).toBeInTheDocument();

        expect(screen.queryByText(/Dunder Mifflin/i)).not.toBeInTheDocument();
    });

    it("should correctly configure social media links with target='_blank' and safe rel attributes", () => {
        render(<Footer />);

       
        const fbLink = screen.getByRole("link", { name: /facebook/i });
        const igLink = screen.getByRole("link", { name: /instagram/i });

       
        expect(fbLink).toBeInTheDocument();
        expect(igLink).toBeInTheDocument();

       
        expect(fbLink).toHaveAttribute("href", "https://www.facebook.com/dundermifflin-fake");
        expect(fbLink).toHaveAttribute("target", "_blank");
        expect(fbLink).toHaveAttribute("rel", "noreferrer");

      
        expect(igLink).toHaveAttribute("href", "https://www.instagram.com/dundermifflin-fake");
        expect(igLink).toHaveAttribute("target", "_blank");
        expect(igLink).toHaveAttribute("rel", "noreferrer");
    });
});
