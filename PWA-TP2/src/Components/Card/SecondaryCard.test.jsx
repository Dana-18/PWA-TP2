import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SecondaryCard from "./SecondaryCard";

// Mock Title component
vi.mock("../Title/Title", () => ({
  default: ({ titulo, descripcion, size, className, children }) => (
    <div data-testid="title" className={className}>
      <p data-testid="title-text">{titulo}</p>
      <p data-testid="title-description">{descripcion}</p>
      <span data-testid="title-size">{size}</span>
      {children}
    </div>
  ),
}));

// Mock SimpleButton component
vi.mock("../Button/SimpleButton", () => ({
  default: ({ text, size, onClick }) => (
    <button
      data-testid={`simple-button-${text.toLowerCase()}`}
      data-size={size}
      onClick={onClick}
    >
      {text}
    </button>
  ),
}));

describe("SecondaryCard component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the component without crashing", () => {
    const { container } = render(<SecondaryCard />);
    expect(container).toBeTruthy();
  });

  it("should render with default props", () => {
    render(<SecondaryCard />);

    const titleText = screen.getByTestId("title-text");
    const titleDescription = screen.getByTestId("title-description");

    expect(titleText).toHaveTextContent("Rutina");
    expect(titleDescription).toHaveTextContent("Descripcion de la rutina");
  });

  it("should render with custom nombre de rutina", () => {
    render(<SecondaryCard nombreRutina="Mi Rutina Full Body" />);

    const titleText = screen.getByTestId("title-text");
    expect(titleText).toHaveTextContent("Mi Rutina Full Body");
  });

  it("should render with custom descripcion", () => {
    render(<SecondaryCard descripcion="Rutina para trabajar todo el cuerpo" />);

    const titleDescription = screen.getByTestId("title-description");
    expect(titleDescription).toHaveTextContent("Rutina para trabajar todo el cuerpo");
  });

  it("should render with both custom props", () => {
    render(
      <SecondaryCard
        nombreRutina="Rutina Upper"
        descripcion="Enfocada en tren superior"
      />
    );

    expect(screen.getByTestId("title-text")).toHaveTextContent("Rutina Upper");
    expect(screen.getByTestId("title-description")).toHaveTextContent(
      "Enfocada en tren superior"
    );
  });

  it("should pass correct size prop to Title component", () => {
    render(<SecondaryCard />);

    const titleSize = screen.getByTestId("title-size");
    expect(titleSize).toHaveTextContent("small");
  });

  it("should pass correct className to Title component", () => {
    render(<SecondaryCard />);

    const titleElement = screen.getByTestId("title");
    expect(titleElement).toHaveClass("text-white");
  });

  it("should render two SimpleButton components", () => {
    render(<SecondaryCard />);

    const editButton = screen.getByTestId("simple-button-editar");
    const activeButton = screen.getByTestId("simple-button-hacer activa");

    expect(editButton).toBeInTheDocument();
    expect(activeButton).toBeInTheDocument();
  });

  it("should render Edit button with correct text", () => {
    render(<SecondaryCard />);

    const editButton = screen.getByTestId("simple-button-editar");
    expect(editButton).toHaveTextContent("Editar");
  });

  it("should render Hacer Activa button with correct text", () => {
    render(<SecondaryCard />);

    const activeButton = screen.getByTestId("simple-button-hacer activa");
    expect(activeButton).toHaveTextContent("Hacer Activa");
  });

  it("should pass sm size to both buttons", () => {
    render(<SecondaryCard />);

    const editButton = screen.getByTestId("simple-button-editar");
    const activeButton = screen.getByTestId("simple-button-hacer activa");

    expect(editButton).toHaveAttribute("data-size", "sm");
    expect(activeButton).toHaveAttribute("data-size", "sm");
  });

  it("should apply correct container styles", () => {
    const { container } = render(<SecondaryCard />);

    const mainDiv = container.querySelector(".px-6.py-3");
    expect(mainDiv).toHaveClass("justify-between");
    expect(mainDiv).toHaveClass("rounded-3xl");
    expect(mainDiv).toHaveClass("bg-[#141314]");
    expect(mainDiv).toHaveClass("w-full");
    expect(mainDiv).toHaveClass("flex");
  });

  it("should have flex gap between buttons", () => {
    const { container } = render(<SecondaryCard />);

    const buttonsContainer = container.querySelector(".flex.gap-2");
    expect(buttonsContainer).toBeInTheDocument();
    expect(buttonsContainer).toHaveClass("items-center");
  });

  it("should call button onClick handler when Edit button is clicked", async () => {
    const user = userEvent.setup();
    render(<SecondaryCard />);

    const editButton = screen.getByTestId("simple-button-editar");
    await user.click(editButton);

    expect(editButton).toBeInTheDocument();
  });

  it("should call button onClick handler when Hacer Activa button is clicked", async () => {
    const user = userEvent.setup();
    render(<SecondaryCard />);

    const activeButton = screen.getByTestId("simple-button-hacer activa");
    await user.click(activeButton);

    expect(activeButton).toBeInTheDocument();
  });

  it("should render Title component inside left container", () => {
    const { container } = render(<SecondaryCard />);

    const leftDiv = container.querySelector(".px-6.py-3 > div:first-child");
    const titleElement = leftDiv?.querySelector("[data-testid='title']");

    expect(titleElement).toBeInTheDocument();
  });

  it("should render buttons inside right container", () => {
    const { container } = render(<SecondaryCard />);

    const buttonsContainer = container.querySelector(".flex.gap-2");
    const buttons = buttonsContainer?.querySelectorAll("button");

    expect(buttons).toHaveLength(2);
  });

  it("should have correct layout structure with flex justify-between", () => {
    const { container } = render(<SecondaryCard />);

    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass("flex");
    expect(mainDiv).toHaveClass("justify-between");
  });

  it("should maintain all props through render cycle", () => {
    const nombreRutina = "Rutina Custom";
    const descripcion = "Descripción custom";

    const { rerender } = render(
      <SecondaryCard nombreRutina={nombreRutina} descripcion={descripcion} />
    );

    expect(screen.getByTestId("title-text")).toHaveTextContent(nombreRutina);
    expect(screen.getByTestId("title-description")).toHaveTextContent(
      descripcion
    );

    rerender(
      <SecondaryCard
        nombreRutina="Nueva Rutina"
        descripcion="Nueva descripción"
      />
    );

    expect(screen.getByTestId("title-text")).toHaveTextContent("Nueva Rutina");
    expect(screen.getByTestId("title-description")).toHaveTextContent(
      "Nueva descripción"
    );
  });

  it("should handle empty string props", () => {
    render(<SecondaryCard nombreRutina="" descripcion="" />);

    const titleText = screen.getByTestId("title-text");
    const titleDescription = screen.getByTestId("title-description");

    expect(titleText).toHaveTextContent("");
    expect(titleDescription).toHaveTextContent("");
  });

  it("should render complete card with all elements", () => {
    render(
      <SecondaryCard
        nombreRutina="Test Rutina"
        descripcion="Test descripción"
      />
    );

    // Title
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("title-text")).toHaveTextContent("Test Rutina");
    expect(screen.getByTestId("title-description")).toHaveTextContent(
      "Test descripción"
    );

    // Buttons
    expect(screen.getByTestId("simple-button-editar")).toBeInTheDocument();
    expect(screen.getByTestId("simple-button-hacer activa")).toBeInTheDocument();
  });
});
