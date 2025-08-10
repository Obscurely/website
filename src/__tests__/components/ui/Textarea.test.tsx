import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Textarea } from "../../../components/common/ui/textarea";

describe("Textarea", () => {
  it("should render textarea element with correct attributes", () => {
    const { getByDisplayValue } = render(
      <Textarea defaultValue="test content" />
    );
    const textarea = getByDisplayValue("test content");

    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveAttribute("data-slot", "textarea");
  });

  it("should merge custom className with default classes", () => {
    const { getByTestId } = render(
      <Textarea
        className="custom-textarea-class"
        data-testid="custom-textarea"
      />
    );
    const textarea = getByTestId("custom-textarea");

    expect(textarea.className).toContain("custom-textarea-class");
    expect(textarea.className).toContain("flex");
    expect(textarea.className).toContain("min-h-16");
    expect(textarea.className).toContain("w-full");
    expect(textarea.className).toContain("rounded-md");
  });

  it("should handle controlled textarea correctly", () => {
    const handleChange = vi.fn();
    const { getByDisplayValue } = render(
      <Textarea value="controlled content" onChange={handleChange} />
    );
    const textarea = getByDisplayValue("controlled content");

    fireEvent.change(textarea, { target: { value: "new content" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("should handle uncontrolled textarea correctly", () => {
    const { getByRole } = render(<Textarea defaultValue="initial content" />);
    const textarea = getByRole("textbox") as HTMLTextAreaElement;

    expect(textarea.value).toBe("initial content");

    fireEvent.change(textarea, { target: { value: "updated content" } });
    expect(textarea.value).toBe("updated content");
  });

  it("should forward all HTML textarea props", () => {
    const { getByRole } = render(
      <Textarea
        id="test-textarea"
        name="testName"
        placeholder="Enter your message here"
        required
        disabled
        aria-label="Test textarea field"
        maxLength={500}
        minLength={10}
        rows={5}
        cols={50}
      />
    );
    const textarea = getByRole("textbox");

    expect(textarea).toHaveAttribute("id", "test-textarea");
    expect(textarea).toHaveAttribute("name", "testName");
    expect(textarea).toHaveAttribute("placeholder", "Enter your message here");
    expect(textarea).toHaveAttribute("required");
    expect(textarea).toHaveAttribute("disabled");
    expect(textarea).toHaveAttribute("aria-label", "Test textarea field");
    expect(textarea).toHaveAttribute("maxLength", "500");
    expect(textarea).toHaveAttribute("minLength", "10");
    expect(textarea).toHaveAttribute("rows", "5");
    expect(textarea).toHaveAttribute("cols", "50");
  });

  it("should handle focus and blur events", () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    const { getByRole } = render(
      <Textarea onFocus={handleFocus} onBlur={handleBlur} />
    );
    const textarea = getByRole("textbox");

    fireEvent.focus(textarea);
    expect(handleFocus).toHaveBeenCalled();

    fireEvent.blur(textarea);
    expect(handleBlur).toHaveBeenCalled();
  });

  it("should apply disabled styling and behavior", () => {
    const { getByRole } = render(<Textarea disabled />);
    const textarea = getByRole("textbox");

    expect(textarea).toBeDisabled();
    expect(textarea.className).toContain("disabled:opacity-50");
    expect(textarea.className).toContain("disabled:cursor-not-allowed");
  });

  it("should handle validation states with aria-invalid", () => {
    const { getByRole, rerender } = render(<Textarea />);
    const textarea = getByRole("textbox");

    expect(textarea.className).toContain("aria-invalid:border-destructive");
    expect(textarea.className).toContain("aria-invalid:ring-destructive/20");

    rerender(<Textarea aria-invalid={true} />);
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });

  it("should handle placeholder text correctly", () => {
    const { getByPlaceholderText } = render(
      <Textarea placeholder="Write your thoughts here..." />
    );
    const textarea = getByPlaceholderText("Write your thoughts here...");

    expect(textarea).toBeInTheDocument();
    expect(textarea.className).toContain("placeholder:text-muted-foreground");
  });

  it("should handle form integration", () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    const { getByDisplayValue } = render(
      <form onSubmit={handleSubmit}>
        <Textarea name="message" defaultValue="test message" />
        <button type="submit">Submit</button>
      </form>
    );

    const textarea = getByDisplayValue("test message");
    const form = textarea.closest("form");

    expect(form).toBeInTheDocument();
    expect(textarea).toHaveAttribute("name", "message");

    fireEvent.submit(form!);
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("should handle keyboard events", () => {
    const handleKeyDown = vi.fn();
    const handleKeyUp = vi.fn();

    const { getByRole } = render(
      <Textarea onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
    );
    const textarea = getByRole("textbox");

    fireEvent.keyDown(textarea, { key: "Enter" });
    expect(handleKeyDown).toHaveBeenCalled();

    fireEvent.keyUp(textarea, { key: "Enter" });
    expect(handleKeyUp).toHaveBeenCalled();
  });

  it("should handle text selection", () => {
    const { getByRole } = render(
      <Textarea defaultValue="selectable text content" />
    );
    const textarea = getByRole("textbox") as HTMLTextAreaElement;

    fireEvent.select(textarea);
    expect(textarea.className).not.toContain("selection"); // No selection classes in this component
  });

  it("should handle readOnly attribute", () => {
    const { getByRole } = render(
      <Textarea defaultValue="readonly content" readOnly />
    );
    const textarea = getByRole("textbox");

    expect(textarea).toHaveAttribute("readOnly");
    expect(textarea).toHaveValue("readonly content");
  });

  it("should handle wrap attribute", () => {
    const { getByRole } = render(<Textarea wrap="soft" />);
    const textarea = getByRole("textbox");

    expect(textarea).toHaveAttribute("wrap", "soft");
  });

  it("should handle autoComplete attribute", () => {
    const { getByRole } = render(<Textarea autoComplete="off" />);
    const textarea = getByRole("textbox");

    expect(textarea).toHaveAttribute("autoComplete", "off");
  });

  it("should handle spellCheck attribute", () => {
    const { getByRole } = render(<Textarea spellCheck={false} />);
    const textarea = getByRole("textbox");

    expect(textarea).toHaveAttribute("spellCheck", "false");
  });

  it("should handle resize functionality", () => {
    const { getByRole } = render(<Textarea />);
    const textarea = getByRole("textbox");

    // Check that field-sizing-content class is applied for auto-resize
    expect(textarea.className).toContain("field-sizing-content");
  });

  it("should apply focus styling correctly", () => {
    const { getByRole } = render(<Textarea />);
    const textarea = getByRole("textbox");

    expect(textarea.className).toContain("focus-visible:border-ring");
    expect(textarea.className).toContain("focus-visible:ring-ring/50");
    expect(textarea.className).toContain("focus-visible:ring-[3px]");
  });

  it("should handle dark mode classes", () => {
    const { getByRole } = render(<Textarea />);
    const textarea = getByRole("textbox");

    expect(textarea.className).toContain("dark:bg-input/30");
    expect(textarea.className).toContain(
      "dark:aria-invalid:ring-destructive/40"
    );
  });

  it("should handle multiline content correctly", () => {
    const multilineContent = "Line 1\nLine 2\nLine 3";
    const { container } = render(<Textarea defaultValue={multilineContent} />);
    const textarea = container.querySelector(
      '[data-slot="textarea"]'
    ) as HTMLTextAreaElement;

    expect(textarea.value).toBe(multilineContent);
    expect(textarea.value.split("\n")).toHaveLength(3);
  });

  it("should handle empty content", () => {
    const { container } = render(<Textarea />);
    const textarea = container.querySelector(
      '[data-slot="textarea"]'
    ) as HTMLTextAreaElement;

    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe("");
  });

  it("should handle large text content", () => {
    const largeContent = "A".repeat(1000);
    const { getByDisplayValue } = render(
      <Textarea defaultValue={largeContent} />
    );
    const textarea = getByDisplayValue(largeContent) as HTMLTextAreaElement;

    expect(textarea.value).toHaveLength(1000);
  });
});
