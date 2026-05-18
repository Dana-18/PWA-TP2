// Este componente que muestra una tarjeta de ejercicio con navegación y manejo de favoritos
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardItem from "./CardItem";
import { Routes } from "../../const/routes";

//Simulaciones necesarias
const navigateMock = vi.fn();
vi.mock("react-router", () => ({
    useNavigate: () => navigateMock,
}));
vi.mock("../../const/routes", () => ({
    Routes: {
        details: "/details/:id",
    },
}));
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                "catalog.button": "Ver más",
            };
            return translations[key] || key;
        },
    }),
}));
const toggleFavoriteMock = vi.fn();
vi.mock("../../Hooks/UseFavorites", () => ({
    useFavorites: () => ({
        favorites: [],
        toggleFavorite: toggleFavoriteMock,
    }),
}));
const itemMock = {
    id: "1",
    name: "Sentadillas",
    description: "Ejercicio para piernas",
    image: "https://example.com/img.jpg",
    difficulty: 2,
    muscular_group: "Piernas",
};
//Para renderizar distintos favoritos
const renderWithFavorites = (favorites = [], item = itemMock, onAction = undefined) => {
    const { useFavorites } = require("../../Hooks/UseFavorites");
    useFavorites.mockReturnValue({ favorites, toggleFavorite: toggleFavoriteMock });
    return render(<CardItem item={item} onAction={onAction} />);
};

describe("Componente CardItem", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });


    it("should render the exercise name", () => {
        render(<CardItem item={itemMock} />);
        expect(screen.getByText("Sentadillas")).toBeInTheDocument();
    });

    it("should render the exercise description", () => {
        render(<CardItem item={itemMock} />);
        expect(screen.getByText("Ejercicio para piernas")).toBeInTheDocument();
    });

    it("should render the muscular group", () => {
        render(<CardItem item={itemMock} />);
        expect(screen.getByText("Piernas")).toBeInTheDocument();
    });

    it("should render the difficulty level", () => {
        render(<CardItem item={itemMock} />);
        expect(screen.getByText(/difficulty:\s*2/i)).toBeInTheDocument();
    });

    it("should render the image with the correct src and alt", () => {
        render(<CardItem item={itemMock} />);
        const img = screen.getByAltText("Sentadillas");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "https://example.com/img.jpg");
    });

    it("should render a placeholder image when image prop is missing", () => {
        const itemSinImagen = { ...itemMock, image: null };
        render(<CardItem item={itemSinImagen} />);
        const img = screen.getByAltText("Sentadillas");
        expect(img).toHaveAttribute("src", "https://via.placeholder.com/400x200");
    });

    it("should render the 'Ver más' button with translated text", () => {
        render(<CardItem item={itemMock} />);
        expect(screen.getByText("Ver más")).toBeInTheDocument();
    });

    it("should apply green color class for difficulty 1", () => {
        const itemFacil = { ...itemMock, difficulty: 1 };
        render(<CardItem item={itemFacil} />);
        const badge = screen.getByText(/difficulty:\s*1/i);
        expect(badge).toHaveClass("bg-green-100");
        expect(badge).toHaveClass("text-green-800");
    });

    it("should apply yellow color class for difficulty 2", () => {
        render(<CardItem item={itemMock} />);
        const badge = screen.getByText(/difficulty:\s*2/i);
        expect(badge).toHaveClass("bg-yellow-100");
        expect(badge).toHaveClass("text-yellow-800");
    });

    it("should apply red color class for difficulty 3", () => {
        const itemDificil = { ...itemMock, difficulty: 3 };
        render(<CardItem item={itemDificil} />);
        const badge = screen.getByText(/difficulty:\s*3/i);
        expect(badge).toHaveClass("bg-red-100");
        expect(badge).toHaveClass("text-red-800");
    });

    it("should apply gray color class for unknown difficulty", () => {
        const itemRaro = { ...itemMock, difficulty: 99 };
        render(<CardItem item={itemRaro} />);
        const badge = screen.getByText(/difficulty:\s*99/i);
        expect(badge).toHaveClass("bg-gray-100");
        expect(badge).toHaveClass("text-gray-800");
    });

    it("should navigate to the correct details route when 'Ver más' is clicked", async () => {
        const user = userEvent.setup();
        render(<CardItem item={itemMock} />);
        await user.click(screen.getByText("Ver más"));
        expect(navigateMock).toHaveBeenCalledWith(
            "/details/1",
            { state: { exercise: itemMock } }
        );
    });

    it("should call toggleFavorite with the item id when heart button is clicked and no onAction is provided", async () => {
        const user = userEvent.setup();
        render(<CardItem item={itemMock} />);
        const heartButton = screen.getByRole("button", { name: "" }); // botón del corazón sin texto
        // Buscamos el segundo botón (el del corazón)
        const buttons = screen.getAllByRole("button");
        await user.click(buttons[1]);
        expect(toggleFavoriteMock).toHaveBeenCalledWith("1");
    });

    it("should call onAction instead of toggleFavorite when onAction prop is provided", async () => {
        const user = userEvent.setup();
        const onActionMock = vi.fn();
        render(<CardItem item={itemMock} onAction={onActionMock} />);
        const buttons = screen.getAllByRole("button");
        await user.click(buttons[1]);
        expect(onActionMock).toHaveBeenCalledTimes(1);
        expect(toggleFavoriteMock).not.toHaveBeenCalled();
    });
});