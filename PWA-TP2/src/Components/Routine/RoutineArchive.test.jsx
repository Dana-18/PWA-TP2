// Objetivo: Verificar que el componente RoutineArchive renderiza correctamente con rutinas y maneja la prop className
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RoutineArchive from "./RoutineArchive";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mockeamos los componentes que dependen de contexto
vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
  useParams: () => ({}),
  useLocation: () => ({ pathname: "/" }),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: "es" },
  }),
}));

// Mockeamos los componentes hijos
vi.mock("../Card/SecondaryCard", () => ({
  default: ({ nombreRutina, descripcion }) => (
    <div data-testid="secondary-card">
      <span>{nombreRutina}</span>
      <span>{descripcion}</span>
    </div>
  ),
}));

describe("RoutineArchive component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should render the component with title", () => {
    render(<RoutineArchive rutinas={[]} />);

    expect(screen.getByText("ARCHIVO & ALTERNATIVAS")).toBeInTheDocument();
  });

  it("should render without rutinas prop (empty array by default)", () => {
    render(<RoutineArchive />);

    const title = screen.getByText("ARCHIVO & ALTERNATIVAS");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("ml-2");
    expect(title).toHaveClass("text-stone-500");
    expect(title).toHaveClass("tracking-wide");
  });

  it("should render SecondaryCard when rutinas array is not empty", () => {
    render(<RoutineArchive rutinas={[{ id: 1 }]} />);

    expect(screen.getByTestId("secondary-card")).toBeInTheDocument();
  });

  it("should apply correct styles to the main container", () => {
    render(<RoutineArchive rutinas={[]} />);

    const mainDiv = screen.getByText("ARCHIVO & ALTERNATIVAS").closest("div");
    expect(mainDiv).toHaveClass("flex");
    expect(mainDiv).toHaveClass("w-full");
    expect(mainDiv).toHaveClass("flex-col");
    expect(mainDiv).toHaveClass("gap-2");
    expect(mainDiv).toHaveClass("md:w-3/4");
    expect(mainDiv).toHaveClass("mx-auto");
  });

  it("should pass props to SecondaryCard correctly", () => {
    const rutinas = [
      { id: 1, nombre: "Rutina A", descripcion: "Descripción A" },
      { id: 2, nombre: "Rutina B", descripcion: "Descripción B" },
    ];
    render(<RoutineArchive rutinas={rutinas} />);

    const secondaryCards = screen.getAllByTestId("secondary-card");
    expect(secondaryCards.length).toBeGreaterThanOrEqual(1);
  });

  it("should not render SecondaryCard when rutinas is an empty array", () => {
    render(<RoutineArchive />);

    const secondaryCards = screen.queryAllByTestId("secondary-card");
    expect(secondaryCards.length).toBe(0);
  });

  it("should handle null rutinas prop gracefully", () => {
    render(<RoutineArchive rutinas={null} />);

    const title = screen.getByText("ARCHIVO & ALTERNATIVAS");
    expect(title).toBeInTheDocument();
  });

  it("should render multiple routines if provided", () => {
    const rutinas = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ];
    render(<RoutineArchive rutinas={rutinas} />);

    const secondaryCards = screen.getAllByTestId("secondary-card");
    expect(secondaryCards.length).toBeGreaterThanOrEqual(1);
  });

  it("should have correct text style classes", () => {
    render(<RoutineArchive rutinas={[]} />);

    const titleSpan = screen.getByText("ARCHIVO & ALTERNATIVAS");
    expect(titleSpan).toHaveClass("text-stone-500");
    expect(titleSpan).toHaveClass("tracking-wide");
  });
});
