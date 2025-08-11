import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useIsMobile } from "../../hooks/common/useIsMobile";

describe("useIsMobile Hook", () => {
  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it("returns false for desktop width", () => {
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true for mobile width", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 600,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("handles resize events", async () => {
    const { result, rerender } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        value: 600,
      });

      window.dispatchEvent(new Event("resize"));
    });

    rerender();

    // Wait for the effect to update
    await vi.waitFor(() => {
      expect(result.current).toBe(true);
    });
  });
});
