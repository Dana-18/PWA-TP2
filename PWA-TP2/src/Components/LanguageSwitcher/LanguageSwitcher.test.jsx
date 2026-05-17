//Componente que simula clics en los botones y verifica que la funcion cambiar de idioma funcione
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageSwitcher } from "./LanguageSwitcher";

//hacemos las simulaciones necesarias para que funcione
const changeLanguageMock = vi.fn();
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        i18n: {
            changeLanguage: changeLanguageMock,
            language: "es",
            
        },
    }),
}));
vi.mock("../../services/localStorage", () => ({
   setLocalStorage: vi.fn(), 
}));


describe("LanguageSwitcher component", () => {
    it("should show language buttons", () => {
        render(<LanguageSwitcher/>);
        expect(screen.getByText("ES")).toBeInTheDocument();
        expect(screen.getByText("EN")).toBeInTheDocument();
    });

    it("should call to changeLanguage when user click the button", () => {
        render(<LanguageSwitcher />);
        const enButton = screen.getByText("EN");
        const esButton = screen.getByText("ES");
        fireEvent.click(enButton);
        fireEvent.click(esButton);
        expect(changeLanguageMock).toHaveBeenCalledWith("en");
        expect(changeLanguageMock).toHaveBeenCalledWith("es")
    });

    it("should have class green background active with the actual language (ES)", () => {
        render(<LanguageSwitcher/>);
        const esButton = screen.getByText("ES");
        expect(esButton).toHaveClass("bg-teal-600");
    });
});