import { FC } from "react";
import { Controller } from "react-hook-form";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { SelectField } from "./SelectField";

interface SelectFieldProps {
  name: string;
  label?: string;
  control: any;
  options: string[];
}

export const ControlForm: FC<SelectFieldProps> = ({ name, label, control, options }) => {
  return (
    <FormItem>
      <p>{label}</p>
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <SelectField onChange={field.onChange} defaultValue={field.value} options={options} />
          )}
        />
      </FormControl>
      <div className="min-h-[20px]">
        <FormMessage />
      </div>
    </FormItem>
  );
};
