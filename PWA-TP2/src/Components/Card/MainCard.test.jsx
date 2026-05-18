// Objetivo: Verificar que el componente MainCard renderiza correctamente con la rutina activa
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MainCard from "./MainCard";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn((key) => {
    const mockData = {
      routines: JSON.stringify([
        {
          id: 1,
          name: "Rutina Full Body",
          days: ["Lunes", "Miércoles", "Viernes"],
        },
        {
          id: 2,
          name: "Rutina Upper",
          days: ["Martes", "Jueves"],
        },
      ]),
      activeRoutine: JSON.stringify(1),
    };
    return mockData[key] || null;
  }),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock console.log
const mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {});

// Mock de componentes hijos
vi.mock("../Title/Title", () => ({
  default: ({ titulo, className, children }) => (
    <div data-testid="title" className={className}>
      {titulo}
      {children}
    </div>
  ),
}));

vi.mock("../Badge/Badge", () => ({
  default: ({ text, className }) => (
    <span data-testid="badge" className={className}>
      {text}
    </span>
  ),
}));

vi.mock("../Routine/RoutineTracker", () => ({
  default: ({ className }) => (
    <div data-testid="routine-tracker" className={className}>
      Routine Tracker
    </div>
  ),
}));

vi.mock("../Button/Button", () => ({
  default: ({ text, className, children }) => (
    <button data-testid="button" className={className}>
      {text}
      {children}
    </button>
  ),
}));

// Mock lucide-react
vi.mock("lucide-react", () => ({
  SquarePen: ({ className }) => <div data-testid="square-pen-icon" className={className}>✏️</div>,
  ArrowRight: ({ size }) => <div data-testid="arrow-right-icon" data-size={size}>→</div>,
}));

describe("MainCard component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    mockConsoleLog.mockClear();
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should render the component without crashing", () => {
    const { container } = render(<MainCard rutinaActiva={1} />);
    expect(container).toBeTruthy();
  });

  it("should render the main container with correct styles", () => {
    const { container } = render(<MainCard rutinaActiva={1} />);

    const mainDiv = container.querySelector("div.bg-\\[\\#141314\\]");
    expect(mainDiv).toHaveClass("flex");
    expect(mainDiv).toHaveClass("items-center");
    expect(mainDiv).toHaveClass("flex-col");
    expect(mainDiv).toHaveClass("md:w-3/4");
    expect(mainDiv).toHaveClass("w-full");
    expect(mainDiv).toHaveClass("max-w-4xl");
    expect(mainDiv).toHaveClass("rounded-3xl");
    expect(mainDiv).toHaveClass("p-6");
    expect(mainDiv).toHaveClass("shadow-sm");
    expect(mainDiv).toHaveClass("mx-auto");
    expect(mainDiv).toHaveClass("mt-4");
  });

  it("should render the Title with routine name", () => {
    render(<MainCard rutinaActiva={1} />);

    expect(screen.getByText("Rutina Full Body")).toBeInTheDocument();
  });

  it("should render the Badge with ACTIVA text", () => {
    render(<MainCard rutinaActiva={1} />);

    expect(screen.getByTestId("badge")).toBeInTheDocument();
    expect(screen.getByText("ACTIVA")).toBeInTheDocument();
  });

  it("should render the Badge with correct styling", () => {
    render(<MainCard rutinaActiva={1} />);

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("ml-3");
    expect(badge).toHaveClass("bg-[#10B981]");
    expect(badge).toHaveClass("text-white");
  });

  it("should render the SquarePen icon", () => {
    render(<MainCard rutinaActiva={1} />);

    expect(screen.getByTestId("square-pen-icon")).toBeInTheDocument();
  });

  it("should render the SquarePen icon with correct styling", () => {
    render(<MainCard rutinaActiva={1} />);

    const squarePenIcon = screen.getByTestId("square-pen-icon");
    expect(squarePenIcon).toHaveClass("cursor-pointer");
    expect(squarePenIcon).toHaveClass("ml-auto");
    expect(squarePenIcon).toHaveClass("text-[#10B981]");
  });

  it("should render the ESTA SEMANA section", () => {
    render(<MainCard rutinaActiva={1} />);

    expect(screen.getByText("ESTA SEMANA")).toBeInTheDocument();
  });

  it("should render the ESTA SEMANA section with correct styling", () => {
    render(<MainCard rutinaActiva={1} />);

    const estaSemanaSpan = screen.getByText("ESTA SEMANA");
    expect(estaSemanaSpan).toHaveClass("tracking-wide");
    expect(estaSemanaSpan).toHaveClass("text-white");
  });

  it("should render the RoutineTracker component", () => {
    render(<MainCard rutinaActiva={1} />);

    expect(screen.getByTestId("routine-tracker")).toBeInTheDocument();
  });

  it("should render the RoutineTracker with correct className", () => {
    render(<MainCard rutinaActiva={1} />);

    const routineTracker = screen.getByTestId("routine-tracker");
    expect(routineTracker).toHaveClass("mt-2");
  });

  it("should render the Button with Comenzar Sesión text", () => {
    render(<MainCard rutinaActiva={1} />);

    expect(screen.getByTestId("button")).toBeInTheDocument();
    expect(screen.getByText("Comenzar Sesión")).toBeInTheDocument();
  });

  it("should render the Button with correct styling", () => {
    render(<MainCard rutinaActiva={1} />);

    const button = screen.getByTestId("button");
    expect(button).toHaveClass("cursor-pointer");
    expect(button).toHaveClass("mt-4");
    expect(button).toHaveClass("ml-auto");
    expect(button).toHaveClass("rounded-full");
    expect(button).toHaveClass("flex");
    expect(button).toHaveClass("items-center");
    expect(button).toHaveClass("gap-1");
  });

  it("should render the ArrowRight icon inside the button", () => {
    render(<MainCard rutinaActiva={1} />);

    expect(screen.getByTestId("arrow-right-icon")).toBeInTheDocument();
  });

  it("should call localStorage.getItem for routines", () => {
    render(<MainCard rutinaActiva={1} />);

    expect(localStorageMock.getItem).toHaveBeenCalledWith("routines");
  });

  it("should render the Title with emerald-500 color", () => {
    render(<MainCard rutinaActiva={1} />);

    const title = screen.getByTestId("title");
    expect(title).toHaveClass("col-span-3");
    expect(title).toHaveClass("text-emerald-500");
  });

  it("should log the active routine data", () => {
    render(<MainCard rutinaActiva={1} />);

    expect(mockConsoleLog).toHaveBeenCalled();
  });

  it("should find the correct routine by ID", () => {
    render(<MainCard rutinaActiva={2} />);

    expect(screen.getByText("Rutina Upper")).toBeInTheDocument();
  });

  it("should render grid layout for header section", () => {
    const { container } = render(<MainCard rutinaActiva={1} />);

    const gridContainer = container.querySelector("div.grid-cols-4");
    expect(gridContainer).toHaveClass("grid");
    expect(gridContainer).toHaveClass("grid-cols-4");
    expect(gridContainer).toHaveClass("gap-4");
    expect(gridContainer).toHaveClass("items-start");
    expect(gridContainer).toHaveClass("w-full");
  });

  it("should render the main sections in correct structure", () => {
    const { container } = render(<MainCard rutinaActiva={1} />);

    const sections = container.querySelectorAll("div.mt-4");
    expect(sections.length).toBeGreaterThan(0);
  });

  it("should have proper flex layout for button container", () => {
    const { container } = render(<MainCard rutinaActiva={1} />);

    const buttonContainer = container.querySelector("div.w-full.flex");
    expect(buttonContainer).toHaveClass("w-full");
    expect(buttonContainer).toHaveClass("flex");
  });
});
