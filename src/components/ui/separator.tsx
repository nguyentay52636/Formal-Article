"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const separatorVariants = cva(
  "shrink-0 bg-border",
  {
    variants: {
      variant: {
        default: "bg-border",
        muted: "bg-muted",
        primary: "bg-primary",
        secondary: "bg-secondary",
        accent: "bg-accent",
        destructive: "bg-destructive",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        info: "bg-blue-500",
      },
      thickness: {
        thin: "data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px",
        normal: "data-[orientation=horizontal]:h-[1px] data-[orientation=vertical]:w-[1px]",
        thick: "data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5",
        extra: "data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1",
      },
      style: {
        solid: "",
        dashed: "border-dashed border-t data-[orientation=vertical]:border-t-0 data-[orientation=vertical]:border-l",
        dotted: "border-dotted border-t data-[orientation=vertical]:border-t-0 data-[orientation=vertical]:border-l",
        gradient: "bg-gradient-to-r from-transparent via-border to-transparent data-[orientation=vertical]:bg-gradient-to-b from-transparent via-border to-transparent",
      },
      spacing: {
        none: "",
        sm: "my-2 data-[orientation=vertical]:mx-2",
        md: "my-4 data-[orientation=vertical]:mx-4",
        lg: "my-6 data-[orientation=vertical]:mx-6",
        xl: "my-8 data-[orientation=vertical]:mx-8",
      }
    },
    defaultVariants: {
      variant: "default",
      thickness: "normal",
      style: "solid",
      spacing: "none",
    },
  }
)

export interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive.Root>,
  VariantProps<typeof separatorVariants> {
  label?: string
  labelPosition?: "left" | "center" | "right"
  showLabel?: boolean
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({
  className,
  orientation = "horizontal",
  decorative = true,
  variant,
  thickness,
  style,
  spacing,
  label,
  labelPosition = "center",
  showLabel = false,
  ...props
}, ref) => {
  if (showLabel && label) {
    return (
      <div className={cn("flex items-center", spacing, className)}>
        {labelPosition === "left" && (
          <span className="text-sm text-muted-foreground px-2">{label}</span>
        )}
        <SeparatorPrimitive.Root
          ref={ref}
          data-slot="separator"
          decorative={decorative}
          orientation={orientation}
          className={cn(
            separatorVariants({ variant, thickness, style }),
            "flex-1",
            orientation === "horizontal" ? "w-full" : "h-full"
          )}
          {...props}
        />
        {labelPosition === "center" && (
          <span className="text-sm text-muted-foreground px-2">{label}</span>
        )}
        {labelPosition === "right" && (
          <span className="text-sm text-muted-foreground px-2">{label}</span>
        )}
      </div>
    )
  }

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({ variant, thickness, style, spacing }),
        orientation === "horizontal" ? "w-full" : "h-full",
        className
      )}
      {...props}
    />
  )
})

Separator.displayName = SeparatorPrimitive.Root.displayName

// Additional separator components for common use cases
const SectionSeparator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  Omit<SeparatorProps, "variant" | "thickness" | "spacing">
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    variant="muted"
    thickness="thick"
    spacing="lg"
    className={cn("", className)}
    {...props}
  />
))
SectionSeparator.displayName = "SectionSeparator"

const InlineSeparator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  Omit<SeparatorProps, "variant" | "thickness" | "spacing">
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    variant="default"
    thickness="thin"
    spacing="sm"
    className={cn("", className)}
    {...props}
  />
))
InlineSeparator.displayName = "InlineSeparator"

const Divider = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  Omit<SeparatorProps, "variant" | "thickness" | "spacing">
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    variant="primary"
    thickness="normal"
    spacing="md"
    className={cn("", className)}
    {...props}
  />
))
Divider.displayName = "Divider"

export {
  Separator,
  SectionSeparator,
  InlineSeparator,
  Divider,
  separatorVariants
}
