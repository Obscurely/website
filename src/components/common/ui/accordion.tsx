"use client";

import { ComponentProps, useEffect, useRef } from "react";

import { cn } from "@lib/utils";
import {
  Content,
  Header,
  Item,
  Root,
  Trigger,
} from "@radix-ui/react-accordion";
import { IconChevronDown } from "@tabler/icons-react";

function Accordion({ ...props }: ComponentProps<typeof Root>) {
  return <Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: ComponentProps<typeof Item>) {
  return (
    <Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      data-animation-exclude="true"
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof Trigger>) {
  return (
    <Header className="flex" data-animation-exclude="true">
      <Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        data-animation-exclude="true"
        {...props}
      >
        {children}
        <IconChevronDown className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </Trigger>
    </Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Content>) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    // Check initial state and set overflow accordingly
    const checkInitialState = () => {
      if (element.getAttribute("data-state") === "open") {
        element.style.overflow = "visible";
      }
    };

    // Check immediately and after a short delay for initial render
    checkInitialState();
    const timeoutId = setTimeout(checkInitialState, 100);

    const handleAnimationStart = () => {
      element.style.overflow = "hidden";
    };

    const handleAnimationEnd = () => {
      if (element.getAttribute("data-state") === "open") {
        element.style.overflow = "visible";
      }
    };

    element.addEventListener("animationstart", handleAnimationStart);
    element.addEventListener("animationend", handleAnimationEnd);

    return () => {
      clearTimeout(timeoutId);
      element.removeEventListener("animationstart", handleAnimationStart);
      element.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  return (
    <Content
      ref={contentRef}
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      data-animation-exclude="true"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)} data-animation-exclude="true">
        {children}
      </div>
    </Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
