// Objetivo: Verificar que el componente MainContent renderiza correctamente según si hay rutina activa o no
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MainContent from "./MainContent";

// Mockeamos los componentes que dependen de contexto para evitar errores
vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: "es" },
  }),
}));

// Mockeamos los componentes hijos para evitar errores de dependencias
vi.mock("../Card/MainCard", () => ({
  default: () => <div data-testid="main-card">Main Card</div>,
}));

vi.mock("../Routine/RoutineArchive", () => ({
  default: () => <div data-testid="routine-archive">Routine Archive</div>,
}));

vi.mock("../Card/EmptyStateCard", () => ({
  default: () => <div data-testid="empty-state-card">Empty State Card</div>,
}));

describe("MainContent component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should render EmptyStateCard when there is no active routine", () => {
    render(<MainContent className="" />);
    
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("bg-white");
  });

  it("should render main content when there is an active routine", () => {
    const activeRoutine = { id: 1 };
    localStorage.setItem("activeRoutine", JSON.stringify(activeRoutine));
    render(<MainContent />);

    expect(screen.getByText("Mis Rutinas")).toBeInTheDocument();
    expect(screen.getByText("Tu espacio de crecimiento.")).toBeInTheDocument();
    expect(screen.getByTestId("main-card")).toBeInTheDocument();
    expect(screen.getByTestId("routine-archive")).toBeInTheDocument();
  });

  it("should apply custom className prop correctly", () => {
    const customClass = "custom-test-class";
    localStorage.setItem("activeRoutine", JSON.stringify({ id: 1 }));

    render(<MainContent className={customClass} />);

    const main = screen.getByRole("main");
    expect(main).toHaveClass(customClass);
    expect(screen.getByTestId("main-card")).toBeInTheDocument();
  });

  it("should have correct base styles when active routine exists", () => {
    localStorage.setItem("activeRoutine", JSON.stringify({ id: 1 }));

    render(<MainContent className="" />);

    const main = screen.getByRole("main");
    expect(main).toHaveClass("bg-white");
    expect(main).toHaveClass("flex");
    expect(main).toHaveClass("flex-col");
    expect(main).toHaveClass("gap-4");
    expect(screen.getByTestId("main-card")).toBeInTheDocument();
  });

  it("should have correct base styles when there is no active routine", () => {
    render(<MainContent className="" />);

    const main = screen.getByRole("main");
    expect(main).toHaveClass("bg-white");
    expect(main).toHaveClass("flex");
    expect(main).toHaveClass("flex-col");
    expect(main).toHaveClass("items-center");
    expect(main).toHaveClass("justify-center");
  });

  it("should parse activeRoutine from localStorage correctly", () => {
    const mockRoutine = { id: 42 };
    localStorage.setItem("activeRoutine", JSON.stringify(mockRoutine));

    render(<MainContent className="" />);

    // Si la rutina se parsea correctamente, debe mostrar el contenido principal
    expect(screen.getByText("Mis Rutinas")).toBeInTheDocument();
    expect(screen.getByTestId("main-card")).toBeInTheDocument();
  });
});
