import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button component", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render as a button element by default", () => {
        render(<Button text="Click me" />);
        
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button.tagName).toBe("BUTTON");
    });

    it("should render text prop correctly", () => {
        render(<Button text="Submit" />);
        
        expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    it("should render children correctly", () => {
        render(
            <Button>
                <span>Child content</span>
            </Button>
        );
        
        expect(screen.getByText("Child content")).toBeInTheDocument();
    });

    it("should render both text and children together", () => {
        render(
            <Button text="Label: ">
                <span>Value</span>
            </Button>
        );
        
        const button = screen.getByRole("button");
        expect(button.textContent).toContain("Label: ");
        expect(button.textContent).toContain("Value");
    });

    it("should have default Tailwind classes applied", () => {
        render(<Button text="Test" />);
        
        const button = screen.getByRole("button");
        
        expect(button).toHaveClass("bg-[#10B981]");
        expect(button).toHaveClass("text-white");
        expect(button).toHaveClass("px-4");
        expect(button).toHaveClass("py-2");
        expect(button).toHaveClass("hover:bg-emerald-600");
        expect(button).toHaveClass("transition-colors");
    });

    it("should accept and apply custom className", () => {
        render(<Button text="Custom" className="rounded-lg shadow-md" />);
        
        const button = screen.getByRole("button");
        
        expect(button).toHaveClass("rounded-lg");
        expect(button).toHaveClass("shadow-md");
        expect(button).toHaveClass("bg-[#10B981]");
    });

    it("should render as a custom component when 'as' prop is provided", () => {
        const CustomLink = ({ className, children, ...props }) => (
            <a className={className} {...props}>
                {children}
            </a>
        );

        render(<Button as={CustomLink} text="Link Button" href="/test" />);
        
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/test");
        expect(link.tagName).toBe("A");
    });

    it("should pass through additional props to the component", () => {
        render(
            <Button 
                text="Disabled" 
                disabled 
                data-testid="custom-button"
                aria-label="Custom Button"
            />
        );
        
        const button = screen.getByTestId("custom-button");
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute("aria-label", "Custom Button");
    });

    it("should handle click events", async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();
        
        render(<Button text="Click" onClick={handleClick} />);
        
        const button = screen.getByRole("button");
        await user.click(button);
        
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should have correct hover state", () => {
        render(<Button text="Hover" />);
        
        const button = screen.getByRole("button");
        expect(button).toHaveClass("hover:bg-emerald-600");
    });
});
