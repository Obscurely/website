import { cn, debounce, throttle } from "@lib/utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("cn function", () => {
  it("should merge class names correctly", () => {
    expect(cn("text-red-500", "bg-blue-100")).toBe("text-red-500 bg-blue-100");
  });

  it("should merge tailwind classes properly", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("should handle arrays of classes", () => {
    expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3");
  });

  it("should handle empty inputs", () => {
    expect(cn()).toBe("");
    expect(cn("", null, undefined)).toBe("");
  });
});

describe("throttle function", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("should call function immediately on first invocation", () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 1000);

    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should throttle subsequent calls", () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 1000);

    throttledFn();
    throttledFn();
    throttledFn();

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should execute delayed call after throttle period", () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 1000);

    throttledFn();
    throttledFn();

    vi.advanceTimersByTime(1000);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it("should pass arguments correctly", () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 1000);

    throttledFn("arg1", "arg2", 123);
    expect(mockFn).toHaveBeenCalledWith("arg1", "arg2", 123);
  });

  it("should handle rapid successive calls correctly", () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 1000);

    // First call executes immediately
    throttledFn("call1");
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenLastCalledWith("call1");

    // Rapid calls are throttled
    throttledFn("call2");
    throttledFn("call3");
    throttledFn("call4");
    expect(mockFn).toHaveBeenCalledTimes(1);

    // After delay, last call executes
    vi.advanceTimersByTime(1000);
    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenLastCalledWith("call4");
  });
});

describe("debounce function", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("should delay function execution", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should reset timer on subsequent calls", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();
    vi.advanceTimersByTime(500);

    debouncedFn(); // This should reset the timer
    vi.advanceTimersByTime(500);

    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should only execute the last call after multiple rapid calls", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn("call1");
    debouncedFn("call2");
    debouncedFn("call3");

    vi.advanceTimersByTime(1000);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("call3");
  });

  it("should pass arguments correctly", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn("arg1", "arg2", 123);
    vi.advanceTimersByTime(1000);

    expect(mockFn).toHaveBeenCalledWith("arg1", "arg2", 123);
  });

  it("should handle multiple argument types", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    const obj = { test: "value" };
    const arr = [1, 2, 3];

    debouncedFn(obj, arr, "string", 42, true);
    vi.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledWith(obj, arr, "string", 42, true);
  });
});
