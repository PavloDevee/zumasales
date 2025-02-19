import { FC } from "react"

import { FormProvider, useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
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
import { FormResetSchema } from "../forms/validations/validations";

interface Props {
  resetPassword: (email: string) => void;
  open:boolean;
  setOpen: (item:boolean)=>void;
}

export const ResetPassword: FC<Props> = ({ resetPassword, open, setOpen}) => {
  const form = useForm<z.infer<typeof FormResetSchema>>({
    resolver: zodResolver(FormResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormResetSchema>) => {
    resetPassword(data.email);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="text-xs font-light text-gray-500 dark:text-gray-400 flex justify-end pb-4">
        <span>Forgot your&nbsp;</span>
          <button
            type="button"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500 flex"
          >
            <MdLockReset size={15} />
            password?
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Zuma Sales</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Do you really want to reset your password?
        </DialogDescription>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid gap-2">
            <div className=" items-center space-x-2">
              <InputField
                name="email"
                label="Email"
                placeholder="user@zumasales.com"
                control={form.control}
                errors={form.formState.errors.email?.message}
                Icon={<HiOutlineMail className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2" />}
              />
            </div>
            <DialogFooter className="sm:justify-between">
              <Button type="submit" variant={'delete'}>
                <MdLockReset size={20} />
                Reset
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
