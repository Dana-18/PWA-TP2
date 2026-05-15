//Objetivo: el componente tiene que mostrar un titulo que llega en forma de texto
import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import  Title  from "./Title";

describe("titulo component", () => {
    it("Render correctly title and description", () => {
        render(<Title titulo="Titulo de prueba" descripcion="Descripcion de prueba"/>);
        expect(screen.getByText("Titulo de prueba")).toBeInTheDocument();
        expect(screen.getByText("Descripcion de prueba")).toBeInTheDocument();
    });

    it("should apply the small class correctly", () => {
        render(<Title titulo="titulo pequenio" size="small"/>);
        const tituloElement = screen.getByText("titulo pequenio");
        expect(tituloElement).toHaveClass("text-xl")
    });

    it("should apply the medium class correctly", () => {
        render(<Title titulo="titulo mediano" size="medium"/>);
        const tituloElement = screen.getByText("titulo mediano");
        expect(tituloElement).toHaveClass("text-2xl");
    });

    it("should apply big size if the value is other than small or medium", () => {
        render(<Title titulo="otro titulo" size="otroSize"/>);
        const tituloElement = screen.getByText("otro titulo");
        expect(tituloElement).toHaveClass("text-6xl");
    });

    it("should render children if they passed one", () => {
        render(<Title titulo="titulo con hijo"> 
                 <span data-testid="child-element"> 🌟</span> 
               </Title>);
        expect(screen.getByTestId("child-element")).toBeInTheDocument();
    });

    it("should apply additional classes passed by prop className", () => {
        const customClass = "clase-especial";
        render(<Title titulo="test clases" className={customClass}/>);
        const container = screen.getByText("test clases").closest('div');
        expect(container).toHaveClass(customClass);
        
    })
});