import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DetailsCard from "./DetailsCard";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                "detailsPage.level": "Level",
                "detailsPage.button": "Add Exercise",
                "detailsPage.subtitle": "Overview",
                "detailsPage.breathing": "Breathing",
                "detailsPage.metrics.title": "Metrics",
                "detailsPage.metrics.primary": "Primary Group",
                "detailsPage.metrics.target": "Target Intensity",
                "detailsPage.metrics.equipment": "Equipment"
            };
            return translations[key] || key;
        },
    }),
}));


const mockExercise = {
    id: "1",
    name: "Press de Banca",
    description: "Un ejercicio fundamental para el desarrollo del pectoral superior.",
    image: "https://ejemplo.com/press.jpg",
    muscular_group: "Pecho",
    difficulty: 2,
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    details: {
        technique_masterclass: "Mantener los codos a 45 grados respecto al torso.",
        breathing: "Inhala al bajar la barra, exhala al empujar.",
        target_intensity: "Alta",
        equipment: "Barra y Banco plano"
    }
};

describe("DetailsCard component", () => {

    beforeEach(() => {
        vi.clearAllMocks(); 
    });

    it("should show a fallback message if no exercise data is provided", () => {
        render(<DetailsCard exercise={null} />);
        
        expect(screen.getByText(/No exercise data available/i)).toBeInTheDocument();
    });

    it("should correctly render all exercise information and translated fields", () => {
        render(<DetailsCard exercise={mockExercise} />);

        expect(screen.getByRole("heading", { name: /Press de Banca/i })).toBeInTheDocument();
        expect(screen.getByText(/Un ejercicio fundamental para el desarrollo del pectoral superior./i)).toBeInTheDocument();
        expect(screen.getByText(/"Mantener los codos a 45 grados respecto al torso."/i)).toBeInTheDocument();
        
        expect(screen.getByText(/Level 2/i)).toBeInTheDocument();
        expect(screen.getByText(/Add Exercise/i)).toBeInTheDocument();
        expect(screen.getByText(/Overview/i)).toBeInTheDocument();
        
        expect(screen.getByText(/Metrics/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Pecho/i)[0]).toBeInTheDocument(); 
        expect(screen.getByText(/Alta/i)).toBeInTheDocument();
        expect(screen.getByText(/Barra y Banco plano/i)).toBeInTheDocument();
    });

    it("should render the YouTube iframe player with the parsed video ID by default", () => {
        render(<DetailsCard exercise={mockExercise} />);

        const iframe = screen.getByTitle(/Exercise Video/i);
        expect(iframe).toBeInTheDocument();
        

        expect(iframe).toHaveAttribute("src", "https://www.youtube.com/embed/dQw4w9WgXcQ");
    });

    it("should toggle from video iframe to static image preview when clicking the close button", async () => {
        const user = userEvent.setup(); 
        render(<DetailsCard exercise={mockExercise} />);

        expect(screen.getByTitle(/Exercise Video/i)).toBeInTheDocument();

        const botones = screen.getAllByRole("button");
        
        const closeButton = botones[1]; 
        await user.click(closeButton);

        expect(screen.queryByTitle(/Exercise Video/i)).not.toBeInTheDocument();

        const exerciseImage = screen.getByRole("img", { name: /Press de Banca/i });
        expect(exerciseImage).toBeInTheDocument();
        expect(exerciseImage).toHaveAttribute("src", "https://ejemplo.com/press.jpg");
    });
});