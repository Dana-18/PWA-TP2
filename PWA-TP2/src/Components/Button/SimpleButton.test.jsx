import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SimpleButton from "./SimpleButton";

describe("SimpleButton component", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render button with text prop", () => {
        render(<SimpleButton text="Click me" />);
        
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Click me");
    });

    it("should apply md size classes by default", () => {
        render(<SimpleButton text="Default" />);
        
        const button = screen.getByRole("button");
        

        expect(button).toHaveClass("px-4");
        expect(button).toHaveClass("py-2");
        expect(button).toHaveClass("text-base");
    });

    it("should apply sm size classes when size='sm' is provided", () => {
        render(<SimpleButton text="Small" size="sm" />);
        
        const button = screen.getByRole("button");
        
        expect(button).toHaveClass("px-2");
        expect(button).toHaveClass("py-2");
        expect(button).toHaveClass("text-[12px]");
    });

    it("should apply md size classes when size='md' is provided", () => {
        render(<SimpleButton text="Medium" size="md" />);
        
        const button = screen.getByRole("button");
        
        expect(button).toHaveClass("px-4");
        expect(button).toHaveClass("py-2");
        expect(button).toHaveClass("text-base");
    });

    it("should apply lg size classes when size='lg' is provided", () => {
        render(<SimpleButton text="Large" size="lg" />);
        
        const button = screen.getByRole("button");
        
        expect(button).toHaveClass("px-5");
        expect(button).toHaveClass("py-3");
        expect(button).toHaveClass("text-lg");
    });

    it("should have common styling classes applied", () => {
        render(<SimpleButton text="Styled" />);
        
        const button = screen.getByRole("button");
        

        expect(button).toHaveClass("rounded-xl");
        expect(button).toHaveClass("bg-gray-200");
        expect(button).toHaveClass("hover:bg-gray-300");
        expect(button).toHaveClass("active:bg-gray-400");
        expect(button).toHaveClass("hover:shadow-md");
        expect(button).toHaveClass("active:scale-95");
        expect(button).toHaveClass("text-gray-800");
        expect(button).toHaveClass("transition-all");
        expect(button).toHaveClass("duration-300");
        expect(button).toHaveClass("cursor-pointer");
    });

    it("should handle click events", async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();
        
        render(<SimpleButton text="Click" onClick={handleClick} />);
        
        const button = screen.getByRole("button");
        await user.click(button);
        
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should be clickable multiple times", async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();
        
        render(<SimpleButton text="Multi Click" onClick={handleClick} />);
        
        const button = screen.getByRole("button");
        await user.click(button);
        await user.click(button);
        await user.click(button);
        
        expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it("should render with invalid size and fallback to md", () => {
        render(<SimpleButton text="Invalid Size" size="invalid" />);
        
        const button = screen.getByRole("button");
        

        expect(button).toHaveClass("px-4");
        expect(button).toHaveClass("py-2");
        expect(button).toHaveClass("text-base");
    });

    it("should have md:h-fit and md:text-sm for responsive design", () => {
        render(<SimpleButton text="Responsive" size="sm" />);
        
        const button = screen.getByRole("button");
        

        expect(button).toHaveClass("md:h-fit");
        expect(button).toHaveClass("md:text-sm");
        expect(button).toHaveClass("md:p-3");
    });
});
