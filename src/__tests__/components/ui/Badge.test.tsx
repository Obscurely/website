import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge, badgeVariants } from "../../../components/common/ui/badge";

describe("Badge", () => {
  it("should render with default variant", () => {
    const { getByText } = render(<Badge>Test Badge</Badge>);
    const badge = getByText("Test Badge");

    expect(badge).toBeInTheDocument();
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveAttribute("data-slot", "badge");
  });

  it("should merge custom className with variant classes", () => {
    const { getByText } = render(
      <Badge variant="secondary" className="custom-class">
        Test Badge
      </Badge>
    );
    const badge = getByText("Test Badge");

    expect(badge.className).toContain("custom-class");
    expect(badge.className).toContain("bg-slate-800");
  });

  it("should render as child component when asChild is true", () => {
    const { getByRole } = render(
      <Badge asChild>
        <button>Button Badge</button>
      </Badge>
    );
    const button = getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("data-slot", "badge");
  });

  it("should forward props to underlying element", () => {
    const { getByText } = render(
      <Badge id="test-badge" aria-label="Test Label">
        Badge Content
      </Badge>
    );
    const badge = getByText("Badge Content");

    expect(badge).toHaveAttribute("id", "test-badge");
    expect(badge).toHaveAttribute("aria-label", "Test Label");
  });

  it("should render with children", () => {
    const { getByText, getByTestId } = render(
      <Badge>
        <span data-testid="icon">🎉</span>
        Badge with icon
      </Badge>
    );

    expect(getByText("Badge with icon")).toBeInTheDocument();
    expect(getByTestId("icon")).toBeInTheDocument();
  });

  it("should handle empty content", () => {
    const { container } = render(<Badge />);
    const badge = container.querySelector('[data-slot="badge"]');

    expect(badge).toBeInTheDocument();
    expect(badge?.textContent).toBe("");
  });

  it("should work with complex nested content", () => {
    const { getByText, getByTestId } = render(
      <Badge variant="info">
        <div data-testid="nested-div">
          <strong>Important:</strong> This is a complex badge
        </div>
      </Badge>
    );

    expect(getByTestId("nested-div")).toBeInTheDocument();
    expect(getByText("Important:")).toBeInTheDocument();
    expect(getByText("This is a complex badge")).toBeInTheDocument();
  });

  it("should apply hover and focus styles correctly", () => {
    const { getByText } = render(<Badge variant="default">Hover me</Badge>);
    const badge = getByText("Hover me");

    // Check that hover classes are present
    expect(badge.className).toContain("hover:shadow-md");
    expect(badge.className).toContain("hover:brightness-110");
  });

  it("should maintain accessibility attributes", () => {
    const { getByText } = render(
      <Badge
        role="status"
        aria-live="polite"
        aria-describedby="badge-description"
      >
        Status Badge
      </Badge>
    );
    const badge = getByText("Status Badge");

    expect(badge).toHaveAttribute("role", "status");
    expect(badge).toHaveAttribute("aria-live", "polite");
    expect(badge).toHaveAttribute("aria-describedby", "badge-description");
  });
});

describe("badgeVariants", () => {
  it("should generate correct class names for variants", () => {
    expect(badgeVariants({ variant: "default" })).toContain("from-cyan-500");
    expect(badgeVariants({ variant: "secondary" })).toContain("bg-slate-800");
    expect(badgeVariants({ variant: "destructive" })).toContain("from-red-500");
    expect(badgeVariants()).toContain("from-cyan-500"); // default variant
  });

  it("should include base classes in all variants", () => {
    const baseClasses = [
      "inline-flex",
      "items-center",
      "justify-center",
      "gap-1",
      "rounded-full",
      "px-2",
      "py-0.5",
      "text-xs",
      "font-medium",
    ];

    const allVariants = [
      "default",
      "secondary",
      "destructive",
      "success",
      "warning",
      "info",
      "outline",
      "ghost",
    ] as const;

    allVariants.forEach((variant) => {
      const classes = badgeVariants({ variant });
      baseClasses.forEach((baseClass) => {
        expect(classes).toContain(baseClass);
      });
    });
  });
});
