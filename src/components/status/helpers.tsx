import { IoMdCheckmarkCircleOutline, IoMdInformationCircleOutline } from "react-icons/io"
import { MdOutlineCancel, MdOutlinePending } from "react-icons/md"
import { inspectionStatus } from "@/providers/types"

export const getIcon = (variant: inspectionStatus) => {
  switch (variant) {
    case inspectionStatus.pending:
      return <MdOutlinePending className="text-inherit" size={20} />;
    case inspectionStatus.completed:
      return <IoMdCheckmarkCircleOutline className="text-inherit" size={20} />;
    case inspectionStatus.canceled:
      return <MdOutlineCancel className="text-inherit" size={20} />;
    default:
      return <IoMdInformationCircleOutline className="text-inherit" size={20} />;
  }
}

export const getHoverCardContent = (variant: inspectionStatus) => {
  switch (variant) {
    case inspectionStatus.pending:
      return {
        title: "Pending Inspection",
        description: "This inspection is awaiting processing. Please check back later for updates.",
      };
    case inspectionStatus.progress:
      return {
        title: "Inspection In Progress",
        description: "The inspection is currently in progress. Check back for updates once completed.",
      };
    case inspectionStatus.completed:
      return {
        title: "Inspection Completed",
        description: "The inspection has been completed successfully. All necessary actions have been taken.",
      };
    case inspectionStatus.canceled:
      return {
        title: "Inspection Canceled",
        description: "The inspection has been canceled. Please contact support for more details.",
      };
    case inspectionStatus.review:
      return {
        title: "Review Pending",
        description: "The inspection results are under review. It will be finalized soon.",
      };
    default:
      return {
        title: "Inspection Status",
        description: "This is the current status of the inspection.",
      };
  }
}