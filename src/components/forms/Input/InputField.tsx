import { FC } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormControl, FormItem } from "@/components/ui/form";

interface InputFieldProps {
  name: string;
  label?: string;
  placeholder: string;
  type?: string;
  control: any;
  Icon?: React.ReactNode;
  errors?: string;
  reset?: React.ReactNode;
  search?: boolean;
  value?: string;
}

export const InputField: FC<InputFieldProps> = ({ name, label, placeholder, type = "text", control, Icon, errors, reset, search, value = '' }) => {
  return (
    <FormItem>
      <p>{label}</p>
      <FormControl>
        <Controller
          name={name}
          control={control}
          defaultValue={value}
          render={({ field }) => (
            <div className="relative">
              <Input className={Icon ? 'pl-7' : ''} type={type} placeholder={placeholder} {...field}
                onChange={(e) => {
                  field.onChange(e);
                }} />
              {Icon}
            </div>
          )}
        />
      </FormControl>
      {!search &&
        <div className="min-h-[20px]">
          <p className="text-red-500 text-xs">{errors}</p>
        </div>}
      {reset}
    </FormItem>
  );
};
