import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Input } from "../../../components/common/ui/input";

describe("Input", () => {
  it("should render input element with correct attributes", () => {
    const { getByDisplayValue } = render(<Input defaultValue="test value" />);
    const input = getByDisplayValue("test value");

    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
    expect(input).toHaveAttribute("data-slot", "input");
  });

  it("should accept and display different input types", () => {
    const inputTypes = [
      "text",
      "email",
      "password",
      "number",
      "tel",
      "url",
    ] as const;

    inputTypes.forEach((type) => {
      const { getByTestId } = render(
        <Input type={type} data-testid={`input-${type}`} />
      );
      const input = getByTestId(`input-${type}`);

      expect(input).toHaveAttribute("type", type);
    });
  });

  it("should merge custom className with default classes", () => {
    const { getByTestId } = render(
      <Input className="custom-input-class" data-testid="custom-input" />
    );
    const input = getByTestId("custom-input");

    expect(input.className).toContain("custom-input-class");
    expect(input.className).toContain("flex");
    expect(input.className).toContain("h-9");
    expect(input.className).toContain("w-full");
    expect(input.className).toContain("rounded-md");
  });

  it("should handle controlled input correctly", () => {
    const handleChange = vi.fn();
    const { getByDisplayValue } = render(
      <Input value="controlled value" onChange={handleChange} />
    );
    const input = getByDisplayValue("controlled value");

    fireEvent.change(input, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("should handle uncontrolled input correctly", () => {
    const { getByRole } = render(<Input defaultValue="initial value" />);
    const input = getByRole("textbox") as HTMLInputElement;

    expect(input.value).toBe("initial value");

    fireEvent.change(input, { target: { value: "updated value" } });
    expect(input.value).toBe("updated value");
  });

  it("should forward all HTML input props", () => {
    const { getByRole } = render(
      <Input
        id="test-input"
        name="testName"
        placeholder="Enter text here"
        required
        disabled
        aria-label="Test input field"
        maxLength={100}
        minLength={5}
      />
    );
    const input = getByRole("textbox");

    expect(input).toHaveAttribute("id", "test-input");
    expect(input).toHaveAttribute("name", "testName");
    expect(input).toHaveAttribute("placeholder", "Enter text here");
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("disabled");
    expect(input).toHaveAttribute("aria-label", "Test input field");
    expect(input).toHaveAttribute("maxLength", "100");
    expect(input).toHaveAttribute("minLength", "5");
  });

  it("should handle focus and blur events", () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    const { getByRole } = render(
      <Input onFocus={handleFocus} onBlur={handleBlur} />
    );
    const input = getByRole("textbox");

    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it("should apply disabled styling and behavior", () => {
    const { getByRole } = render(<Input disabled />);
    const input = getByRole("textbox");

    expect(input).toBeDisabled();
    expect(input.className).toContain("disabled:opacity-50");
    expect(input.className).toContain("disabled:cursor-not-allowed");
  });

  it("should handle file input type correctly", () => {
    const { getByTestId } = render(
      <Input type="file" data-testid="file-input" accept=".jpg,.png" />
    );
    const input = getByTestId("file-input");

    expect(input).toHaveAttribute("type", "file");
    expect(input).toHaveAttribute("accept", ".jpg,.png");
    expect(input.className).toContain("file:inline-flex");
    expect(input.className).toContain("file:h-7");
  });

  it("should handle validation states with aria-invalid", () => {
    const { getByRole, rerender } = render(<Input />);
    const input = getByRole("textbox");

    expect(input.className).toContain("aria-invalid:border-destructive");

    rerender(<Input aria-invalid={true} />);
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("should handle placeholder text correctly", () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Search for something..." />
    );
    const input = getByPlaceholderText("Search for something...");

    expect(input).toBeInTheDocument();
    expect(input.className).toContain("placeholder:text-muted-foreground");
  });

  it("should handle form integration", () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    const { getByDisplayValue } = render(
      <form onSubmit={handleSubmit}>
        <Input name="username" defaultValue="testuser" />
        <button type="submit">Submit</button>
      </form>
    );

    const input = getByDisplayValue("testuser");
    const form = input.closest("form");

    expect(form).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "username");

    fireEvent.submit(form!);
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("should handle keyboard events", () => {
    const handleKeyDown = vi.fn();
    const handleKeyUp = vi.fn();

    const { getByRole } = render(
      <Input onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
    );
    const input = getByRole("textbox");

    fireEvent.keyDown(input, { key: "Enter" });
    expect(handleKeyDown).toHaveBeenCalled();

    fireEvent.keyUp(input, { key: "Enter" });
    expect(handleKeyUp).toHaveBeenCalled();
  });

  it("should handle input selection", () => {
    const { getByRole } = render(<Input defaultValue="selectable text" />);
    const input = getByRole("textbox") as HTMLInputElement;

    fireEvent.select(input);
    expect(input.className).toContain("selection:bg-primary");
    expect(input.className).toContain("selection:text-primary-foreground");
  });

  it("should handle min/max for number inputs", () => {
    const { getByRole } = render(
      <Input type="number" min={0} max={100} step={5} />
    );
    const input = getByRole("spinbutton");

    expect(input).toHaveAttribute("type", "number");
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "100");
    expect(input).toHaveAttribute("step", "5");
  });

  it("should handle pattern attribute for validation", () => {
    const { getByRole } = render(
      <Input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
    );
    const input = getByRole("textbox");

    expect(input).toHaveAttribute("pattern", "[0-9]{3}-[0-9]{3}-[0-9]{4}");
  });

  it("should handle autoComplete attribute", () => {
    const { getByRole } = render(<Input type="email" autoComplete="email" />);
    const input = getByRole("textbox");

    expect(input).toHaveAttribute("autoComplete", "email");
  });

  it("should handle readOnly attribute", () => {
    const { getByRole } = render(
      <Input defaultValue="readonly value" readOnly />
    );
    const input = getByRole("textbox");

    expect(input).toHaveAttribute("readOnly");
    expect(input).toHaveValue("readonly value");
  });
});
