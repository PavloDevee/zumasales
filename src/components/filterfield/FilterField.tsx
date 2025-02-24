import { FC } from "react"

import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import { InputField } from "../forms/Input/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldFormSchema } from "../forms/validations/validations";
import { RiMenuSearchLine } from "react-icons/ri";
import { LuDelete } from "react-icons/lu";
import { Inspection } from "@/providers/types";

interface Props {
  setFilterData?: (field: Inspection[]) => void;
  onFieldChange: (field: string) => void;
  onClearField:() => void;
}

export const FilterField: FC<Props> = ({ onFieldChange, onClearField }) => {

  const form = useForm<z.infer<typeof FieldFormSchema>>({
    resolver: zodResolver(FieldFormSchema),
    defaultValues: {
      field: "",
    },
  });

  const onSubmit = (formData: z.infer<typeof FieldFormSchema>) => {
    const field = formData.field ? formData.field : '';
    onFieldChange(field);
  }

  const clear = () => {
    form.reset();
    onClearField();
  }

  return (
    <FormProvider {...form}>
      <form onChange={form.handleSubmit(onSubmit)} className="flex gap-2 items-center">
        <div className="max-w-xs">
          <InputField
            name="field"
            placeholder="Search"
            control={form.control}
            search={true}
            Icon={<RiMenuSearchLine className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2" />}
          />
        </div>
        <div className="pt-1">
          <Button type="button" onClick={clear}>
            <LuDelete size={20} className="text-red-500" />
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
