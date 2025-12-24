import { act, renderHook } from "@testing-library/react";
import {
  MockedFunction,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { usePrefersReducedMotion } from "../../../hooks/common/usePrefersReducedMotion";

// Type definitions for better type safety
interface MockMediaQueryList extends Partial<MediaQueryList> {
  matches: boolean;
  addEventListener: MockedFunction<MediaQueryList["addEventListener"]>;
  removeEventListener: MockedFunction<MediaQueryList["removeEventListener"]>;
}

interface MockNavigatorConnection {
  effectiveType: string;
}

interface MockNavigator extends Partial<Navigator> {
  hardwareConcurrency?: number;
  userAgent?: string;
  deviceMemory?: number;
  connection?: MockNavigatorConnection;
}

describe("usePrefersReducedMotion", () => {
  let mockMatchMedia: MockedFunction<typeof window.matchMedia>;
  let originalNavigator: Navigator;

  beforeEach(() => {
    // Store original navigator
    originalNavigator = window.navigator;

    // Mock matchMedia
    mockMatchMedia = vi.fn();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: mockMatchMedia,
    });

    // Create base mock navigator
    const mockNavigator: MockNavigator = {};

    // Override navigator with proper property definitions
    Object.defineProperty(window, "navigator", {
      writable: true,
      configurable: true,
      value: mockNavigator,
    });

    // Set default values using defineProperty to avoid read-only issues
    Object.defineProperty(window.navigator, "hardwareConcurrency", {
      writable: true,
      configurable: true,
      value: 4,
    });

    Object.defineProperty(window.navigator, "userAgent", {
      writable: true,
      configurable: true,
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    // Restore original navigator
    Object.defineProperty(window, "navigator", {
      writable: true,
      configurable: true,
      value: originalNavigator,
    });
  });

  const createMockMediaQueryList = (matches: boolean): MockMediaQueryList => ({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });

  const setNavigatorProperty = (property: string, value: unknown) => {
    Object.defineProperty(window.navigator, property, {
      writable: true,
      configurable: true,
      value,
    });
  };

  it("should return true when prefers-reduced-motion is set", () => {
    const mockMediaQueryList = createMockMediaQueryList(true);
    mockMatchMedia.mockReturnValue(mockMediaQueryList as MediaQueryList);

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should return false when prefers-reduced-motion is not set and device is high-end", () => {
    const mockMediaQueryList = createMockMediaQueryList(false);
    mockMatchMedia.mockReturnValue(mockMediaQueryList as MediaQueryList);

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(false);
  });

  it("should return true for low-end device based on CPU cores", () => {
    const mockMediaQueryList = createMockMediaQueryList(false);
    mockMatchMedia.mockReturnValue(mockMediaQueryList as MediaQueryList);
    setNavigatorProperty("hardwareConcurrency", 2);

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should return true for low-end device based on device memory", () => {
    const mockMediaQueryList = createMockMediaQueryList(false);
    mockMatchMedia.mockReturnValue(mockMediaQueryList as MediaQueryList);
    setNavigatorProperty("deviceMemory", 2);

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should return true for slow connection", () => {
    const mockMediaQueryList = createMockMediaQueryList(false);
    mockMatchMedia.mockReturnValue(mockMediaQueryList as MediaQueryList);
    setNavigatorProperty("connection", { effectiveType: "2g" });

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should detect low-end Android devices", () => {
    const mockMediaQueryList = createMockMediaQueryList(false);
    mockMatchMedia.mockReturnValue(mockMediaQueryList as MediaQueryList);
    setNavigatorProperty(
      "userAgent",
      "Mozilla/5.0 (Linux; Android 7.0; Moto G (4)) AppleWebKit/537.36"
    );

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should detect low-end iOS devices", () => {
    const mockMediaQueryList = createMockMediaQueryList(false);
    mockMatchMedia.mockReturnValue(mockMediaQueryList as MediaQueryList);
    setNavigatorProperty(
      "userAgent",
      "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X)"
    );

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should handle missing hardwareConcurrency gracefully", () => {
    const mockMediaQueryList = createMockMediaQueryList(false);
    mockMatchMedia.mockReturnValue(mockMediaQueryList as MediaQueryList);
    setNavigatorProperty("hardwareConcurrency", undefined);

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should respond to media query changes", () => {
    const mockMediaQueryList = createMockMediaQueryList(false);
    mockMatchMedia.mockReturnValue(mockMediaQueryList as MediaQueryList);

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(false);

    act(() => {
      const calls = mockMediaQueryList.addEventListener.mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      const changeHandler = calls[0]?.[1];

      if (changeHandler && typeof changeHandler === "function") {
        // Update the source of truth FIRST
        mockMediaQueryList.matches = true;

        // Then signal the change (the event object itself is ignored by getSnapshot,
        // but required to satisfy the type definition of the handler)
        changeHandler({ matches: true } as MediaQueryListEvent);
      }
    });

    expect(result.current).toBe(true);
  });

  it("should remove event listener on unmount", () => {
    const mockMediaQueryList = createMockMediaQueryList(false);
    mockMatchMedia.mockReturnValue(mockMediaQueryList as MediaQueryList);

    const { unmount } = renderHook(() => usePrefersReducedMotion());

    unmount();

    expect(mockMediaQueryList.removeEventListener).toHaveBeenCalled();
  });

  it("should handle various slow connection types", () => {
    const slowConnections = ["slow-2g", "2g", "3g"];

    slowConnections.forEach((connectionType) => {
      const mockMediaQueryList = createMockMediaQueryList(false);
      mockMatchMedia.mockReturnValue(mockMediaQueryList as MediaQueryList);
      setNavigatorProperty("connection", { effectiveType: connectionType });

      const { result, unmount } = renderHook(() => usePrefersReducedMotion());

      expect(result.current).toBe(true);
      unmount();
    });
  });

  it("should not trigger for fast connections", () => {
    const mockMediaQueryList = createMockMediaQueryList(false);
    mockMatchMedia.mockReturnValue(mockMediaQueryList as MediaQueryList);
    setNavigatorProperty("connection", { effectiveType: "4g" });

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(false);
  });

  it("should handle missing connection property", () => {
    const mockMediaQueryList = createMockMediaQueryList(false);
    mockMatchMedia.mockReturnValue(mockMediaQueryList as MediaQueryList);

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(false);
  });

  it("should combine multiple low-end device indicators", () => {
    const mockMediaQueryList = createMockMediaQueryList(true);
    mockMatchMedia.mockReturnValue(mockMediaQueryList as MediaQueryList);
    setNavigatorProperty("hardwareConcurrency", 1);
    setNavigatorProperty("deviceMemory", 1);
    setNavigatorProperty("connection", { effectiveType: "2g" });
    setNavigatorProperty("userAgent", "Mozilla/5.0 (Linux; Android 6.0)");

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
  });

  it("should handle media query change with low-end device detection", () => {
    const mockMediaQueryList = createMockMediaQueryList(false);
    mockMatchMedia.mockReturnValue(mockMediaQueryList as MediaQueryList);
    setNavigatorProperty("hardwareConcurrency", 1);

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);

    act(() => {
      const calls = mockMediaQueryList.addEventListener.mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      const changeHandler = calls[0]?.[1];
      if (changeHandler && typeof changeHandler === "function") {
        changeHandler({ matches: false } as MediaQueryListEvent);
      }
    });

    expect(result.current).toBe(true);
  });
});
