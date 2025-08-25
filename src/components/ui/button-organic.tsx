import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        organic: "bg-gradient-to-r from-primary to-primary-hover text-primary-foreground hover:shadow-lg hover:-translate-y-0.5",
        secondary: "bg-gradient-to-r from-secondary to-secondary-hover text-secondary-foreground hover:shadow-lg hover:-translate-y-0.5",
        accent: "bg-gradient-to-r from-accent to-accent-hover text-accent-foreground hover:shadow-lg hover:-translate-y-0.5",
        outline: "border-2 border-primary text-primary hover:bg-primary-light hover:text-primary",
        ghost: "hover:bg-primary-light hover:text-primary",
        whatsapp: "bg-green-500 hover:bg-green-600 text-white",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "organic",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const ButtonOrganic = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
ButtonOrganic.displayName = "ButtonOrganic"

export { ButtonOrganic, buttonVariants }