import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExerciseGallery from "./CatalogFilter";


vi.mock("react-router", () => ({
    useNavigate: () => vi.fn(),
}));


vi.mock("../../Hooks/UseFavorites", () => ({
    useFavorites: () => ({
        favorites: [], 
        toggleFavorite: vi.fn(),
    }),
}));


vi.mock("../../services/localStorage", () => ({
   setLocalStorage: vi.fn(), 
   getLocalStorage: vi.fn(() => null),
}));


const changeLanguageMock = vi.fn();
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (str) => str,
        i18n: {
            changeLanguage: changeLanguageMock,
            language: "es",
        },
    }),
}));


const mockEjerciciosAPI = [
    { id: "1", name: "Press de Banca", muscular_group: "Pecho", description: "Ejercicio para pectoral", difficulty: 2 },
    { id: "2", name: "Cruces de Polea", muscular_group: "Pecho", description: "Aperturas en polea alta", difficulty: 1 },
    { id: "3", name: "Dominadas", muscular_group: "Espalda", description: "Ejercicio de tracción", difficulty: 3 },
];

global.fetch = vi.fn();

const datosInicialesProporcionados = [
    { id: "10", name: "Sentadillas", muscular_group: "Piernas", description: "Ejercicio de piernas", difficulty: 2 },
    { id: "11", name: "Curl de Biceps", muscular_group: "Biceps", description: "Flexión de brazos", difficulty: 1 },
];

describe("ExerciseGallery (CatalogFilter) component", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        
        global.fetch.mockResolvedValue({
            json: async () => mockEjerciciosAPI,
        });
    });

    it("should show all category buttons", () => {
        render(<ExerciseGallery datos={datosInicialesProporcionados} />);
        
        const categorias = ['Todos', 'Pecho', 'Espalda', 'Hombros', 'Piernas', 'Biceps', 'Triceps'];
        
        categorias.forEach(cat => {
            expect(screen.getByRole("button", { name: cat })).toBeInTheDocument();
        });
    });

    it("should show initial data when active category is 'Todos'", () => {
        render(<ExerciseGallery datos={datosInicialesProporcionados} />);
        
        expect(screen.getByText("Sentadillas")).toBeInTheDocument();
        expect(screen.getByText("Curl de Biceps")).toBeInTheDocument();
    });

    it("should fetch external API and filter items when a category button is clicked", async () => {
        const user = userEvent.setup();
        render(<ExerciseGallery datos={datosInicialesProporcionados} />);

        const botonPecho = screen.getByRole("button", { name: "Pecho" });
        await user.click(botonPecho);

        expect(global.fetch).toHaveBeenCalledWith(
            "https://69e6e0ca68208c1debe8004e.mockapi.io/api/v1/ejercicios?limit=1000&page=1"
        );

        await waitFor(() => {
            expect(screen.getByText("Press de Banca")).toBeInTheDocument();
            expect(screen.getByText("Cruces de Polea")).toBeInTheDocument();
        });

        expect(screen.queryByText("Dominadas")).not.toBeInTheDocument();
        expect(screen.queryByText("Sentadillas")).not.toBeInTheDocument();
    });

    it("should disable other category buttons while fetching data from API", async () => {
        global.fetch.mockReturnValue(
            new Promise((resolve) => setTimeout(() => resolve({ json: async () => mockEjerciciosAPI }), 100))
        );

        const user = userEvent.setup();
        render(<ExerciseGallery datos={datosInicialesProporcionados} />);

        const botonEspalda = screen.getByRole("button", { name: "Espalda" });
        const botonPecho = screen.getByRole("button", { name: "Pecho" });
        const botonHombros = screen.getByRole("button", { name: "Hombros" });

    
        await user.click(botonEspalda);


        expect(botonPecho).toBeDisabled();
        expect(botonHombros).toBeDisabled();

   
        const botonTodos = screen.getByRole("button", { name: "Todos" });
        expect(botonTodos).not.toBeDisabled();

        await waitFor(() => {
            expect(botonPecho).not.toBeDisabled();
        });
    });
});
