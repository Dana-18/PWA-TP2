// Objetivo: Verificar que el componente EmptyStateCard renderiza correctamente y navega al crear una rutina
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmptyStateCard from "./EmptyStateCard";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock useTranslation
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: "es" },
  }),
}));

// Mock lucide-react
vi.mock("lucide-react", () => ({
  Plus: () => <div data-testid="plus-icon">+</div>,
}));

describe("EmptyStateCard component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should render the component without crashing", () => {
    const { container } = render(<EmptyStateCard />);
    expect(container).toBeTruthy();
  });

  it("should render the title translation key", () => {
    render(<EmptyStateCard />);

    expect(screen.getByText("emptyCard.title")).toBeInTheDocument();
  });

  it("should render the description translation key", () => {
    render(<EmptyStateCard />);

    expect(screen.getByText("emptyCard.description")).toBeInTheDocument();
  });

  it("should render the Plus icon", () => {
    render(<EmptyStateCard />);

    expect(screen.getByTestId("plus-icon")).toBeInTheDocument();
  });

  it("should apply correct styles to the main container", () => {
    const { container } = render(<EmptyStateCard />);

    const mainDiv = container.querySelector("div.bg-\\[\\#141314\\]");
    expect(mainDiv).toHaveClass("flex");
    expect(mainDiv).toHaveClass("md:w-1/2");
    expect(mainDiv).toHaveClass("flex-col");
    expect(mainDiv).toHaveClass("items-center");
    expect(mainDiv).toHaveClass("h-80");
    expect(mainDiv).toHaveClass("justify-center");
    expect(mainDiv).toHaveClass("gap-4");
    expect(mainDiv).toHaveClass("rounded-4xl");
    expect(mainDiv).toHaveClass("p-6");
    expect(mainDiv).toHaveClass("shadow-md");
  });

  it("should render title with correct styling", () => {
    const { container } = render(<EmptyStateCard />);

    const titleText = screen.getByText("emptyCard.title");
    expect(titleText).toHaveClass("text-3xl");
    expect(titleText).toHaveClass("text-center");
    expect(titleText).toHaveClass("font-semibold");
    expect(titleText).toHaveClass("text-emerald-500");
  });

  it("should render description with correct styling", () => {
    const { container } = render(<EmptyStateCard />);

    const descriptionText = screen.getByText("emptyCard.description");
    expect(descriptionText).toHaveClass("text-center");
    expect(descriptionText).toHaveClass("text-white");
  });

  it("should render the button container with correct styles", () => {
    const { container } = render(<EmptyStateCard />);

    const buttonContainer = container.querySelector("div.bg-emerald-500");
    expect(buttonContainer).toHaveClass("cursor-pointer");
    expect(buttonContainer).toHaveClass("hover:bg-emerald-600");
    expect(buttonContainer).toHaveClass("hover:scale-105");
    expect(buttonContainer).toHaveClass("transition-transform");
    expect(buttonContainer).toHaveClass("w-16");
    expect(buttonContainer).toHaveClass("h-16");
    expect(buttonContainer).toHaveClass("rounded-full");
    expect(buttonContainer).toHaveClass("flex");
    expect(buttonContainer).toHaveClass("items-center");
    expect(buttonContainer).toHaveClass("justify-center");
    expect(buttonContainer).toHaveClass("mt-6");
  });

  it("should navigate to /create-routine when button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<EmptyStateCard />);

    const buttonContainer = container.querySelector("div.bg-emerald-500");
    await user.click(buttonContainer);

    expect(mockNavigate).toHaveBeenCalledWith("/create-routine");
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("should render the Plus icon inside the button container", () => {
    const { container } = render(<EmptyStateCard />);

    const buttonContainer = container.querySelector("div.bg-emerald-500");
    const plusIcon = screen.getByTestId("plus-icon");

    expect(buttonContainer).toContainElement(plusIcon);
  });

  it("should have proper button container dimensions", () => {
    const { container } = render(<EmptyStateCard />);

    const buttonContainer = container.querySelector("div.bg-emerald-500");
    expect(buttonContainer).toHaveClass("w-16");
    expect(buttonContainer).toHaveClass("h-16");
    expect(buttonContainer).toHaveClass("rounded-full");
  });

  it("should render all text content in correct order", () => {
    const { container } = render(<EmptyStateCard />);

    const texts = [
      screen.getByText("emptyCard.title"),
      screen.getByText("emptyCard.description"),
    ];

    texts.forEach((text) => {
      expect(text).toBeInTheDocument();
    });
  });

  it("should have flex layout with proper gap between elements", () => {
    const { container } = render(<EmptyStateCard />);

    const mainDiv = container.querySelector("div.gap-4");
    expect(mainDiv).toHaveClass("gap-4");
    expect(mainDiv).toHaveClass("flex");
    expect(mainDiv).toHaveClass("flex-col");
  });
});
