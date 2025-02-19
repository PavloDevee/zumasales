import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ImExit } from "react-icons/im"
import { FC } from "react"
import { RiDeleteBinLine } from "react-icons/ri";
interface Props {
    handleLogout: () => void;
    confirmBtn: string;
    descText: string;
    open?: boolean;
    setOpen?: (item: boolean) => void;
    variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | "delete";
}

export const DialogCloseButton: FC<Props> = ({ handleLogout, confirmBtn, descText, variant, open, setOpen }) => {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={variant}>
                    {variant === "delete" ? <RiDeleteBinLine /> : <ImExit />}
                    {variant !== "delete" && confirmBtn}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Zuma Sales</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {descText}
                </DialogDescription>
                <DialogFooter className="sm:justify-between">
                    <DialogClose asChild>
                        <Button variant={'delete'} onClick={handleLogout}>
                            <ImExit />
                            {confirmBtn}
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
