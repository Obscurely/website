import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/common/ui/card";

describe("Card Components", () => {
  describe("Card", () => {
    it("should render card with correct attributes", () => {
      const { getByTestId } = render(
        <Card data-testid="card">Card Content</Card>
      );
      const card = getByTestId("card");

      expect(card).toBeInTheDocument();
      expect(card.tagName).toBe("DIV");
      expect(card).toHaveAttribute("data-slot", "card");
    });

    it("should apply default classes", () => {
      const { getByTestId } = render(<Card data-testid="card">Content</Card>);
      const card = getByTestId("card");

      expect(card.className).toContain("bg-card");
      expect(card.className).toContain("text-card-foreground");
      expect(card.className).toContain("flex");
      expect(card.className).toContain("flex-col");
      expect(card.className).toContain("gap-6");
      expect(card.className).toContain("rounded-xl");
      expect(card.className).toContain("border");
      expect(card.className).toContain("py-6");
      expect(card.className).toContain("shadow-sm");
    });

    it("should merge custom className", () => {
      const { getByTestId } = render(
        <Card className="custom-card-class" data-testid="card">
          Content
        </Card>
      );
      const card = getByTestId("card");

      expect(card.className).toContain("custom-card-class");
      expect(card.className).toContain("bg-card");
    });

    it("should forward props correctly", () => {
      const { getByTestId } = render(
        <Card id="test-card" aria-label="Test Card" data-testid="card">
          Content
        </Card>
      );
      const card = getByTestId("card");

      expect(card).toHaveAttribute("id", "test-card");
      expect(card).toHaveAttribute("aria-label", "Test Card");
    });
  });

  describe("CardHeader", () => {
    it("should render header with correct attributes", () => {
      const { getByTestId } = render(
        <CardHeader data-testid="header">Header Content</CardHeader>
      );
      const header = getByTestId("header");

      expect(header).toBeInTheDocument();
      expect(header.tagName).toBe("DIV");
      expect(header).toHaveAttribute("data-slot", "card-header");
    });

    it("should apply header classes", () => {
      const { getByTestId } = render(
        <CardHeader data-testid="header">Content</CardHeader>
      );
      const header = getByTestId("header");

      expect(header.className).toContain("@container/card-header");
      expect(header.className).toContain("grid");
      expect(header.className).toContain("auto-rows-min");
      expect(header.className).toContain("grid-rows-[auto_auto]");
      expect(header.className).toContain("items-start");
      expect(header.className).toContain("gap-1.5");
      expect(header.className).toContain("px-6");
    });

    it("should handle grid layout classes", () => {
      const { getByTestId } = render(
        <CardHeader data-testid="header">Content</CardHeader>
      );
      const header = getByTestId("header");

      expect(header.className).toContain(
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]"
      );
    });
  });

  describe("CardTitle", () => {
    it("should render title with correct attributes", () => {
      const { getByTestId } = render(
        <CardTitle data-testid="title">Title Text</CardTitle>
      );
      const title = getByTestId("title");

      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("DIV");
      expect(title).toHaveAttribute("data-slot", "card-title");
    });

    it("should apply title classes", () => {
      const { getByTestId } = render(
        <CardTitle data-testid="title">Title</CardTitle>
      );
      const title = getByTestId("title");

      expect(title.className).toContain("leading-none");
      expect(title.className).toContain("font-semibold");
    });
  });

  describe("CardDescription", () => {
    it("should render description with correct attributes", () => {
      const { getByTestId } = render(
        <CardDescription data-testid="description">
          Description Text
        </CardDescription>
      );
      const description = getByTestId("description");

      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe("DIV");
      expect(description).toHaveAttribute("data-slot", "card-description");
    });

    it("should apply description classes", () => {
      const { getByTestId } = render(
        <CardDescription data-testid="description">Description</CardDescription>
      );
      const description = getByTestId("description");

      expect(description.className).toContain("text-muted-foreground");
      expect(description.className).toContain("text-sm");
    });
  });

  describe("CardAction", () => {
    it("should render action with correct attributes", () => {
      const { getByTestId } = render(
        <CardAction data-testid="action">Action Content</CardAction>
      );
      const action = getByTestId("action");

      expect(action).toBeInTheDocument();
      expect(action.tagName).toBe("DIV");
      expect(action).toHaveAttribute("data-slot", "card-action");
    });

    it("should apply action positioning classes", () => {
      const { getByTestId } = render(
        <CardAction data-testid="action">Action</CardAction>
      );
      const action = getByTestId("action");

      expect(action.className).toContain("col-start-2");
      expect(action.className).toContain("row-span-2");
      expect(action.className).toContain("row-start-1");
      expect(action.className).toContain("self-start");
      expect(action.className).toContain("justify-self-end");
    });
  });

  describe("CardContent", () => {
    it("should render content with correct attributes", () => {
      const { getByTestId } = render(
        <CardContent data-testid="content">Content Text</CardContent>
      );
      const content = getByTestId("content");

      expect(content).toBeInTheDocument();
      expect(content.tagName).toBe("DIV");
      expect(content).toHaveAttribute("data-slot", "card-content");
    });

    it("should apply content classes", () => {
      const { getByTestId } = render(
        <CardContent data-testid="content">Content</CardContent>
      );
      const content = getByTestId("content");

      expect(content.className).toContain("px-6");
    });
  });

  describe("CardFooter", () => {
    it("should render footer with correct attributes", () => {
      const { getByTestId } = render(
        <CardFooter data-testid="footer">Footer Content</CardFooter>
      );
      const footer = getByTestId("footer");

      expect(footer).toBeInTheDocument();
      expect(footer.tagName).toBe("DIV");
      expect(footer).toHaveAttribute("data-slot", "card-footer");
    });

    it("should apply footer classes", () => {
      const { getByTestId } = render(
        <CardFooter data-testid="footer">Footer</CardFooter>
      );
      const footer = getByTestId("footer");

      expect(footer.className).toContain("flex");
      expect(footer.className).toContain("items-center");
      expect(footer.className).toContain("px-6");
      expect(footer.className).toContain("[.border-t]:pt-6");
    });
  });

  describe("Complete Card Structure", () => {
    it("should render complete card structure correctly", () => {
      const { getByText, getByTestId } = render(
        <Card data-testid="complete-card">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>
              <button>Action</button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>This is the main content of the card.</p>
          </CardContent>
          <CardFooter>
            <button>Footer Button</button>
          </CardFooter>
        </Card>
      );

      expect(getByTestId("complete-card")).toBeInTheDocument();
      expect(getByText("Card Title")).toBeInTheDocument();
      expect(getByText("Card Description")).toBeInTheDocument();
      expect(getByText("Action")).toBeInTheDocument();
      expect(
        getByText("This is the main content of the card.")
      ).toBeInTheDocument();
      expect(getByText("Footer Button")).toBeInTheDocument();
    });

    it("should handle nested complex content", () => {
      const { getByTestId, getByText } = render(
        <Card>
          <CardHeader>
            <CardTitle>
              <span data-testid="title-icon">📋</span>
              Complex Title
            </CardTitle>
            <CardDescription>
              <em>Emphasized description</em>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div data-testid="nested-content">
              <h3>Nested Heading</h3>
              <p>Nested paragraph</p>
              <ul>
                <li>List item 1</li>
                <li>List item 2</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      );

      expect(getByTestId("title-icon")).toBeInTheDocument();
      expect(getByText("Complex Title")).toBeInTheDocument();
      expect(getByText("Emphasized description")).toBeInTheDocument();
      expect(getByTestId("nested-content")).toBeInTheDocument();
      expect(getByText("Nested Heading")).toBeInTheDocument();
      expect(getByText("List item 1")).toBeInTheDocument();
    });

    it("should handle empty components gracefully", () => {
      const { container } = render(
        <Card>
          <CardHeader></CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Card>
      );

      const header = container.querySelector('[data-slot="card-header"]');
      const content = container.querySelector('[data-slot="card-content"]');
      const footer = container.querySelector('[data-slot="card-footer"]');

      expect(header).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
      expect(header?.textContent).toBe("");
      expect(content?.textContent).toBe("");
      expect(footer?.textContent).toBe("");
    });

    it("should apply custom classes to all components", () => {
      const { container } = render(
        <Card className="custom-card">
          <CardHeader className="custom-header">
            <CardTitle className="custom-title">Title</CardTitle>
            <CardDescription className="custom-description">
              Desc
            </CardDescription>
            <CardAction className="custom-action">Action</CardAction>
          </CardHeader>
          <CardContent className="custom-content">Content</CardContent>
          <CardFooter className="custom-footer">Footer</CardFooter>
        </Card>
      );

      expect(container.querySelector(".custom-card")).toBeInTheDocument();
      expect(container.querySelector(".custom-header")).toBeInTheDocument();
      expect(container.querySelector(".custom-title")).toBeInTheDocument();
      expect(
        container.querySelector(".custom-description")
      ).toBeInTheDocument();
      expect(container.querySelector(".custom-action")).toBeInTheDocument();
      expect(container.querySelector(".custom-content")).toBeInTheDocument();
      expect(container.querySelector(".custom-footer")).toBeInTheDocument();
    });
  });
});
