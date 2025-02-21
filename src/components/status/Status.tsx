import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { IoMdInformationCircleOutline } from "react-icons/io"
import { cn } from "@/lib/utils"
import { inspectionStatus } from "@/providers/types"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { FiAlertTriangle } from "react-icons/fi"
import { getHoverCardContent, getIcon } from "./helpers"

const statusVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-default capitalize w-full",
  {
    variants: {
      variant: {
        pending: "bg-white text-yellow-500 border border-yellow-500",
        progress: "bg-white text-blue-500 border border-blue-500",
        completed: "bg-white text-green-500 border border-green-500",
        canceled: "bg-white text-red-500 border border-red-500",
        review: "bg-white text-orange-500 border border-orange-500",
      },
      size: {
        default: "h-9 px-3 py-2 text-md w-[120px]",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "pending",
      size: "default",
    },
  }
)

export interface StatusProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof statusVariants> {
  variant: inspectionStatus;
  asChild?: boolean;
}

const Status = React.forwardRef<HTMLSpanElement, StatusProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span"
    const { title, description } = getHoverCardContent(variant)

    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Comp
            className={`${cn(statusVariants({ variant, size, className }))} cursor-pointer`}
            ref={ref}
            {...props}
          >
            <span className="text-black flex-1">{props.children}</span>
            {variant ? getIcon(variant) : <IoMdInformationCircleOutline className="text-inherit" size={20} />}
          </Comp>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <FiAlertTriangle size={50} />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{title}</h4>
              <p className="text-sm">{description}</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    )
  }
)
Status.displayName = "Status"

export { Status, statusVariants }
