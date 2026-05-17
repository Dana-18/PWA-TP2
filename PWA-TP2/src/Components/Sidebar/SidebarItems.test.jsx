//Este componente nos ayuda a generar los botones del sidebar y nos da las rutas de donde tiene que ser enviado
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SidebarItems from "./SidebarItems";
import { Routes } from "../../const/routes";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

//Simulamos lo necesario (en especial las rutas fijas) y mapeamos las llaves con un texto fijo para poder buscarlas en el test
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                'sidebar.dashboard': 'Inicio',
                'sidebar.favorites': 'Favoritos',
                'sidebar.catalog': 'Catalogo'
            };
            return translations[key] || key;
        },
    }),
}));
const navigateMock = vi.fn();
vi.mock("react-router", () => ({
    useNavigate: () => navigateMock,
}));
vi.mock("../../const/routes", () => ({
    Routes: {
        home: "/home",
        favorites: "/favorites",
        catalog: "/catalog",
    },
}));

describe("Componente SidebarItems", () => {
    //beforeEach nos ayuda a limpiar los mocks antes de cada test para evitar interferencias
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render all menu's buttons with their translate texts", () => {
        render(<SidebarItems/>);
        expect(screen.getByText("Inicio")).toBeInTheDocument();
        expect(screen.getByText("Favoritos")).toBeInTheDocument();
        expect(screen.getByText("Catalogo")).toBeInTheDocument();
    });

    it("should redirect to the correct path when user do click in the corresponding button (Inicio)", async () => {
        const user = userEvent.setup();
        render(<SidebarItems/>);
        const homeButton = screen.getByText("Inicio");
        await user.click(homeButton);
        expect(navigateMock).toHaveBeenCalledWith(Routes.home);
    });

    it("should redirect to the correct path when user do click in the corresponding button (Favoritos)", async () => {
        const user = userEvent.setup();
        render(<SidebarItems/>);
        const favoriteButton = screen.getByText("Favoritos");
        await user.click(favoriteButton);
        expect(navigateMock).toHaveBeenCalledWith(Routes.favorites);
    });
    it("should redirect to the correct path when user do click in the corresponding button (Catalogo)", async () => {
        const user = userEvent.setup();
        render(<SidebarItems/>);
        const catalogButton = screen.getByText("Catalogo");
        await user.click(catalogButton);
        expect(navigateMock).toHaveBeenCalledWith(Routes.catalog);
    });
})