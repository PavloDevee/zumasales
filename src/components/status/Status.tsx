import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { IoMdCheckmarkCircleOutline, IoMdInformationCircleOutline } from "react-icons/io"
import { cn } from "@/lib/utils"
import { MdOutlineCancel, MdOutlinePending } from "react-icons/md"
import { inspectionStatus } from "@/providers/types"

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

    const getIcon = (variant: inspectionStatus) => {
      switch (variant) {
        case 'pending':
          return <MdOutlinePending className="text-inherit" size={20}/>;
        case 'completed':
          return <IoMdCheckmarkCircleOutline className="text-inherit" size={20}/>;
        case 'canceled':
          return <MdOutlineCancel className="text-inherit" size={20}/>;
        default:
          return <IoMdInformationCircleOutline className="text-inherit" size={20} />;
      }
    }

    return (
      <Comp
        className={cn(statusVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="text-black flex-1">{props.children}</span>
        {variant ? getIcon(variant): <IoMdInformationCircleOutline className="text-inherit" size={20} /> }
      </Comp>
    )
  }
)
Status.displayName = "Status"

export { Status, statusVariants }
