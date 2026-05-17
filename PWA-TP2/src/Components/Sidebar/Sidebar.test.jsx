//Componente que tiene como funcion manejar la apertura/cierre del sidebar en mobile y renderizar el componente sidebaritems
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sidebar from "./Sidebar";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                "sidebar.newRoutine": "Nueva Rutina",
            };
            return translations[key] || key;
        },
    }),
}));
//aislamos sidebar 
vi.mock("./SidebarItems", () => ({
    default: () => <div data-testid="sidebar-items">SidebarItems</div>,
}));


describe("Componente Sidebar", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render the title", () => {
        render(<Sidebar/>);
        expect(screen.getByText("Dunder Mifflin")).toBeInTheDocument();
    });

    it("should render the SidebarItems component", () => {
        render(<Sidebar/>);
        expect(screen.getByTestId("sidebar-items")).toBeInTheDocument();
    })

    it("should render the new routine button with translated text", () => {
        render(<Sidebar/>);
        expect(screen.getByText("Nueva Rutina")).toBeInTheDocument();
    });

    it("should render the hamburger button when sidebar is closed", () => {
        render(<Sidebar/>);
        const hamburger = screen.getByRole("button", {name: "Abrir menú"});
        expect(hamburger).toBeInTheDocument();
    })

    it("should have 'aria-expanded false' on hamburger button when sidebar is closed", () => {
        render(<Sidebar/>);
        const hamburger = screen.getByRole("button", {name: "Abrir menú"});
        expect(hamburger).toHaveAttribute("aria-expanded", "false");
    });

    it("should hide the hamburger button when the sidebar is open", async() => {
        const user = userEvent.setup();
        render(<Sidebar/>);
        const hamburger = screen.getByRole("button", {name: "Abrir menú"});
        await user.click(hamburger);
        expect(screen.queryByRole("button", {name:"Abrir menú"})).not.toBeInTheDocument();
    });

    //Comportamiento mobile
    it("should show the close button when the sidebar is open", async() => {
        const user = userEvent.setup();
        render(<Sidebar/>);
        await user.click(screen.getByRole("button", {name: "Abrir menú"}));
        //El boton no tiene aria-label, lo buscamos por su rol dentro del aside
        const aside = screen.getByRole("navigation");
        const closeButton = aside.querySelector("button");
        expect(closeButton).toBeInTheDocument();
    });

    it("should close the sidebar when the button is clicked", async() => {
        const user = userEvent.setup();
        render(<Sidebar/>);
        await user.click(screen.getByRole("button", {name: "Abrir menú"}));
        const aside = screen.getByRole("navigation");
        const closeButton = aside.querySelector("button");
        await user.click(closeButton);
        expect(screen.getByRole("button", {name: "Abrir menú"}));
    });

    it("should close the sidebar when the backdrop overlay is clicked", async() => {
        const user = userEvent.setup();
        render(<Sidebar/>);
        await user.click(screen.getByRole("button", {name: "Abrir menú"}));
        const overlay = document.querySelector(".bg-black\\/50");
        expect(overlay).toBeInTheDocument();
        await user.click(overlay);
        expect(overlay).not.toBeInTheDocument();
    });

    it("should have role 'Navigate' on the aside element", () => {
        render(<Sidebar/>);
        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("should have 'aria-controls pointing' to the sidebar id on the hamburger button", () => {
        render(<Sidebar/>);
        const hamburger = screen.getByRole("button", {name: "Abrir menú"});
        expect(hamburger).toHaveAttribute("aria-controls", "sidebar");
    });
});