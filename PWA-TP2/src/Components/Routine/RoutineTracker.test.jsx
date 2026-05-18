// Objetivo: Verificar que el componente RoutineTracker renderiza correctamente con el historial de entrenamientos
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RoutineTracker from "./RoutineTracker";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn((key) => {
    const mockData = {
      workoutHistory: JSON.stringify({
        "2026-05-11": "completed",
        "2026-05-12": "pending",
      }),
      activeRoutine: JSON.stringify(1),
      routines: JSON.stringify([
        {
          id: 1,
          name: "Rutina Test",
          days: ["Lunes", "Miércoles", "Viernes"],
        },
      ]),
    };
    return mockData[key] || null;
  }),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock de lucide-react icons
vi.mock("lucide-react", () => ({
  Check: () => <div data-testid="icon-check">Check</div>,
  CircleDot: () => <div data-testid="icon-circle">Circle</div>,
  Bed: () => <div data-testid="icon-bed">Bed</div>,
  Dumbbell: () => <div data-testid="icon-dumbbell">Dumbbell</div>,
}));

// Mock de utils
vi.mock("../../utils/getDateUtils", () => ({
  getCurrentWeekDates: () => [
    "2026-05-11",
    "2026-05-12",
    "2026-05-13",
    "2026-05-14",
    "2026-05-15",
    "2026-05-16",
    "2026-05-17",
  ],
}));

describe("RoutineTracker component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the component without crashing", () => {
    const { container } = render(<RoutineTracker className="" />);
    expect(container).toBeTruthy();
  });

  it("should render the container with correct base styles", () => {
    const { container } = render(<RoutineTracker className="" />);

    const mainDiv = container.querySelector("div.bg-white");
    expect(mainDiv).toHaveClass("bg-white");
    expect(mainDiv).toHaveClass("w-full");
    expect(mainDiv).toHaveClass("rounded-2xl");
    expect(mainDiv).toHaveClass("h-20");
    expect(mainDiv).toHaveClass("p-4");
  });

  it("should render all 7 days of the week with correct labels", () => {
    render(<RoutineTracker className="" />);

    const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];
    dayLabels.forEach((day) => {
      const elements = screen.getAllByText(day);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it("should render day containers with correct structure", () => {
    const { container } = render(<RoutineTracker className="" />);

    const dayContainers = container.querySelectorAll("div.flex-col");
    expect(dayContainers.length).toBeGreaterThan(0);

    dayContainers.forEach((container) => {
      expect(container).toHaveClass("flex");
      expect(container).toHaveClass("flex-col");
      expect(container).toHaveClass("items-center");
      expect(container).toHaveClass("gap-2");
    });
  });

  it("should apply custom className prop", () => {
    const customClass = "custom-test-class";
    const { container } = render(<RoutineTracker className={customClass} />);

    const mainDiv = container.querySelector("div.bg-white");
    expect(mainDiv).toHaveClass(customClass);
  });

  it("should render day name spans with correct styling", () => {
    const { container } = render(<RoutineTracker className="" />);

    const dayNameSpans = container.querySelectorAll("span.text-xs");
    expect(dayNameSpans.length).toBeGreaterThan(0);

    dayNameSpans.forEach((span) => {
      expect(span).toHaveClass("text-xs");
      expect(span).toHaveClass("font-medium");
      expect(span).toHaveClass("text-stone-600");
    });
  });

  it("should render icon containers with correct dimensions", () => {
    const { container } = render(<RoutineTracker className="" />);

    const iconContainers = container.querySelectorAll("div.w-8");
    expect(iconContainers.length).toBeGreaterThan(0);

    iconContainers.forEach((container) => {
      expect(container).toHaveClass("w-8");
      expect(container).toHaveClass("h-8");
      expect(container).toHaveClass("rounded-full");
      expect(container).toHaveClass("flex");
      expect(container).toHaveClass("items-center");
      expect(container).toHaveClass("justify-center");
    });
  });

  it("should call localStorage.getItem for workoutHistory", () => {
    render(<RoutineTracker className="" />);

    expect(localStorageMock.getItem).toHaveBeenCalledWith("workoutHistory");
  });

  it("should call localStorage.getItem for activeRoutine", () => {
    render(<RoutineTracker className="" />);

    expect(localStorageMock.getItem).toHaveBeenCalledWith("activeRoutine");
  });

  it("should call localStorage.getItem for routines", () => {
    render(<RoutineTracker className="" />);

    expect(localStorageMock.getItem).toHaveBeenCalledWith("routines");
  });

  it("should render flex container with correct layout props", () => {
    const { container } = render(<RoutineTracker className="" />);

    const flexContainer = container.querySelector("div.justify-between");
    expect(flexContainer).toHaveClass("flex");
    expect(flexContainer).toHaveClass("justify-between");
    expect(flexContainer).toHaveClass("items-center");
    expect(flexContainer).toHaveClass("w-full");
  });

  it("should render with empty className when not provided", () => {
    const { container } = render(<RoutineTracker />);

    const mainDiv = container.querySelector("div.bg-white");
    expect(mainDiv).toBeInTheDocument();
  });
});
