import { FC } from "react";
import { Controller } from "react-hook-form";
import { FormControl, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface InputFieldProps {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    control: any;
    Icon?: React.ReactNode;
}

export const TextAreaField: FC<InputFieldProps> = ({ name, label, placeholder, control, Icon }) => {
    return (
        <FormItem>
            <p>{label}</p>
            <FormControl>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <div className="relative">
                            <Textarea className={Icon ? 'pl-7' : ''} placeholder={placeholder} {...field} />
                            {Icon}
                        </div>
                    )}
                />
            </FormControl>
        </FormItem>
    );
};
