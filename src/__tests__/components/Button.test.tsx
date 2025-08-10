import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Button } from "../../components/common/ui/button";

describe("Button Component", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "bg-gradient-to-r",
      "from-[#0479D1]",
      "to-[#0A6CFF]"
    );
  });

  it("applies variant classes correctly", () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border", "border-slate-700", "bg-transparent");
  });

  it("applies size classes correctly", () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-10", "px-6");
  });

  it("handles click events", async () => {
    const user = userEvent.setup();
    let clicked = false;

    render(
      <Button
        onClick={() => {
          clicked = true;
        }}
      >
        Clickable Button
      </Button>
    );

    await user.click(screen.getByRole("button"));
    expect(clicked).toBe(true);
  });

  it("can be disabled", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });

  it("supports custom className", () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
