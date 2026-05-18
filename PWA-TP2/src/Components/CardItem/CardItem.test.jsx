import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardItem from "./CardItem";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn((key) => {
    const mockData = {
      productFavorites: JSON.stringify(["1"]),
    };
    return mockData[key] || null;
  }),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
globalThis.localStorage = localStorageMock;

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        "catalog.button": "View Details",
      };
      return translations[key] || key;
    },
  }),
}));

// Mock react-router
vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
}));

// Mock useFavorites hook
vi.mock("../../Hooks/UseFavorites", () => ({
  useFavorites: () => ({
    favorites: ["1"],
    toggleFavorite: vi.fn(),
  }),
}));

// Mock lucide-react
vi.mock("lucide-react", () => ({
  Heart: ({ size, color, fill }) => (
    <div
      data-testid="heart-icon"
      data-size={size}
      data-color={color}
      data-fill={fill}
    >
      Heart
    </div>
  ),
}));

const mockExercise = {
  id: "1",
  name: "Press de Banca",
  description: "Un ejercicio fundamental para el desarrollo del pectoral superior.",
  image: "https://ejemplo.com/press.jpg",
  difficulty: 2,
  muscular_group: "Pecho",
};

const mockExerciseNoImage = {
  id: "2",
  name: "Sentadillas",
  description: "Ejercicio para fortalecer las piernas.",
  image: null,
  difficulty: 3,
  muscular_group: "Piernas",
};

describe("CardItem component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("should render the component without crashing", () => {
    const { container } = render(<CardItem item={mockExercise} />);
    expect(container).toBeTruthy();
  });

  it("should render the exercise image with correct src and alt attributes", () => {
    render(<CardItem item={mockExercise} />);

    const image = screen.getByAltText("Press de Banca");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://ejemplo.com/press.jpg");
    expect(image).toHaveClass("w-full");
    expect(image).toHaveClass("h-48");
    expect(image).toHaveClass("object-cover");
  });

  it("should render placeholder image when image is not provided", () => {
    render(<CardItem item={mockExerciseNoImage} />);

    const image = screen.getByAltText("Sentadillas");
    expect(image).toHaveAttribute("src", "https://via.placeholder.com/400x200");
  });

  it("should render the exercise name", () => {
    render(<CardItem item={mockExercise} />);

    expect(screen.getByText("Press de Banca")).toBeInTheDocument();
  });

  it("should render the muscular group", () => {
    render(<CardItem item={mockExercise} />);

    expect(screen.getByText("Pecho")).toBeInTheDocument();
  });

  it("should render the exercise description", () => {
    render(<CardItem item={mockExercise} />);

    expect(screen.getByText(/Un ejercicio fundamental para el desarrollo del pectoral superior./i)).toBeInTheDocument();
  });

  it("should render difficulty badge with correct text", () => {
    render(<CardItem item={mockExercise} />);

    expect(screen.getByText("Difficulty: 2")).toBeInTheDocument();
  });


  it("should render the details button with translated text", () => {
    render(<CardItem item={mockExercise} />);

    const button = screen.getByText("View Details");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-teal-600");
    expect(button).toHaveClass("text-white");
    expect(button).toHaveClass("hover:bg-teal-700");
  });

  it("should apply favorite styling when exercise is in favorites", () => {
    render(<CardItem item={mockExercise} />);
    const favoriteButton = screen.getAllByRole("button")[1];
    expect(favoriteButton).toHaveClass("bg-red-100");
    expect(favoriteButton).toHaveClass("text-red-600");
  });

  it("should apply non-favorite styling when exercise is not in favorites", () => {
    render(<CardItem item={mockExerciseNoImage} />);

    const favoriteButton = screen.getAllByRole("button")[1];
    expect(favoriteButton).toHaveClass("bg-teal-600");
    expect(favoriteButton).toHaveClass("text-white");
  });

  it("should render the Heart icon with filled style when favorite", () => {
    render(<CardItem item={mockExercise} />);

    const heartIcon = screen.getByTestId("heart-icon");
    expect(heartIcon).toHaveAttribute("data-color", "#dc2626");
    expect(heartIcon).toHaveAttribute("data-fill", "#dc2626");
  });

  it("should render the Heart icon with outline style when not favorite", () => {
    render(<CardItem item={mockExerciseNoImage} />);

    const heartIcon = screen.getByTestId("heart-icon");
    expect(heartIcon).toHaveAttribute("data-fill", "none");
  });

  it("should apply card container styles", () => {
    const { container } = render(<CardItem item={mockExercise} />);

    const cardContainer = container.querySelector(".max-w-sm");
    expect(cardContainer).toHaveClass("bg-white");
    expect(cardContainer).toHaveClass("border");
    expect(cardContainer).toHaveClass("border-gray-200");
    expect(cardContainer).toHaveClass("rounded-lg");
    expect(cardContainer).toHaveClass("shadow-md");
    expect(cardContainer).toHaveClass("overflow-hidden");
    expect(cardContainer).toHaveClass("hover:shadow-lg");
  });

  it("should render two buttons - details and favorite", () => {
    render(<CardItem item={mockExercise} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("should call onAction when onAction prop is provided and favorite button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnAction = vi.fn();

    render(<CardItem item={mockExercise} onAction={mockOnAction} />);

    const favoriteButton = screen.getAllByRole("button")[1];
    await user.click(favoriteButton);

    expect(mockOnAction).toHaveBeenCalledTimes(1);
  });

  it("should render card with proper container structure", () => {
    const { container } = render(<CardItem item={mockExercise} />);

    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass("max-w-sm");

    const contentDiv = outerDiv.querySelector(".p-5");
    expect(contentDiv).toHaveClass("border");
    expect(contentDiv).toHaveClass("border-gray-200");
    expect(contentDiv).toHaveClass("shadow-sm");
  });

  it("should render flex container for buttons with gap", () => {
    const { container } = render(<CardItem item={mockExercise} />);

    const buttonsContainer = container.querySelector(".flex.items-center.gap-3");
    expect(buttonsContainer).toBeInTheDocument();
  });

  it("should localStorage be mocked correctly", () => {
    expect(localStorage.getItem).toBeDefined();
    expect(localStorage.setItem).toBeDefined();
    expect(localStorage.removeItem).toBeDefined();
    expect(localStorage.clear).toBeDefined();
  });

  it("should render exercise with all properties correctly displayed together", () => {
    render(<CardItem item={mockExercise} />);

    expect(screen.getByText("Press de Banca")).toBeInTheDocument();
    expect(screen.getByAltText("Press de Banca")).toBeInTheDocument();
    expect(screen.getByText("Difficulty: 2")).toBeInTheDocument();
    expect(screen.getByText("Pecho")).toBeInTheDocument();
    expect(screen.getByText(/Un ejercicio fundamental/i)).toBeInTheDocument();
    expect(screen.getByText("View Details")).toBeInTheDocument();
    expect(screen.getByTestId("heart-icon")).toBeInTheDocument();
  });
});
