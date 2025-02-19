import { FC } from "react"

import { FormProvider, useForm } from "react-hook-form";
import { MdLockReset } from "react-icons/md";
import { z } from "zod";

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
import { Button } from "@/components/ui/button"
import { InputField } from "../forms/Input/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { NameFormSchema } from "../forms/validations/validations";
import { FaUserEdit } from "react-icons/fa";
import { LuUserRound } from "react-icons/lu";

interface Props {
    setName: (name: string) => void;
    open?: boolean;
    setOpen?: (item: boolean) => void;
}

export const EditUser: FC<Props> = ({ open, setOpen, setName }) => {
    const form = useForm<z.infer<typeof NameFormSchema>>({
        resolver: zodResolver(NameFormSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (data: z.infer<typeof NameFormSchema>) => {
        setName(data.name);
        form.reset();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button type="button"><FaUserEdit size={25} /></button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Zuma Sales</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Do you really want to change your Name?
                </DialogDescription>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid gap-2">
                        <div className=" items-center space-x-2">
                            <InputField
                                name="name"
                                label="Name"
                                placeholder="User Name"
                                control={form.control}
                                errors={form.formState.errors.name?.message}
                                Icon={<LuUserRound className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2" />}
                            />
                        </div>
                        <DialogFooter className="sm:justify-between">
                            <Button type="submit" variant={'delete'}>
                                <MdLockReset size={20} />
                                Change
                            </Button>
                            <DialogClose asChild>
                                <Button type="button">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};
