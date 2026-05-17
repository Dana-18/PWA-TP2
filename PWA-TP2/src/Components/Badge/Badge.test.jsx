//Componente que renderiza el badge con texto y clases personalizables
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Componente Badge", () => {
    it("should render the text passed as prop", () => {
        render(<Badge text="Fuerza"/>);
        expect(screen.getByText("Fuerza")).toBeInTheDocument();
    });

    it("should render a span element", () => {
        render(<Badge text="Cardio"/>);
        const span = screen.getByText("Cardio");
        expect(span.tagName).toBe("SPAN");
    });

    it("should apply the className prop to the span", () => {
       render(<Badge text="Yoga" className="bg-green-500 text-white" />);
        const span = screen.getByText("Yoga");
        expect(span).toHaveClass("bg-green-500");
        expect(span).toHaveClass("text-white");
    });
 
    it("should always have the base Tailwind classes", () => {
        render(<Badge text="Test" />);
        const span = screen.getByText("Test");
        expect(span).toHaveClass("text-sm");
        expect(span).toHaveClass("font-semibold");
        expect(span).toHaveClass("text-center");
        expect(span).toHaveClass("p-2");
        expect(span).toHaveClass("rounded-2xl");
    });
 
    it("should render with no className if the prop is not passed", () => {
        render(<Badge text="Sin clase" />);
        expect(screen.getByText("Sin clase")).toBeInTheDocument();
    });
 
    it("should render different texts correctly", () => {
        const { rerender } = render(<Badge text="Piernas" />);
        expect(screen.getByText("Piernas")).toBeInTheDocument();
 
        rerender(<Badge text="Espalda" />);
        expect(screen.getByText("Espalda")).toBeInTheDocument();
    });
})