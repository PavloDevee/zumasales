import { FC } from "react";
import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";

interface SelectFieldProps {
  name: string;
  label?: string;
  control: any;
  options: string[];
}

export const SelectField: FC<SelectFieldProps> = ({ name, label, control, options }) => {
  return (
    <FormItem>
      <p>{label}</p>
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option, index) => (
                  <SelectItem key={index} value={option.toLowerCase()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormControl>
      <div className="min-h-[20px]">
        <FormMessage />
      </div>
    </FormItem>
  );
};
