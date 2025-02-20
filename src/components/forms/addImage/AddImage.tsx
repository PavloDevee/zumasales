import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FC } from "react";
import { FiDelete } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Control, useFormContext } from "react-hook-form";
import { InputField } from "../Input/InputField";
import { Pictures } from "@/providers/types";
import { CreateFormSchema } from "../validations/validations";
import { z } from "zod";

interface Props {
  control: Control<z.infer<typeof CreateFormSchema>>;
  onSubmit:(data:z.infer<typeof CreateFormSchema>) => void;
}

export const AddImage: FC<Props> = ({ control, onSubmit}) => {
  const { setValue, watch } = useFormContext();
  const currentPictures = watch("pictures");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newPictures: Pictures[] = Array.from(event.target.files).map((file) => ({
        img: file,
        desc: "",
        urlImg: ""
      }));
      setValue("pictures", [...currentPictures, ...newPictures]);
    }
  };

  const deleteImg = (index: number) => {
    const updatedPictures = [...currentPictures].filter((_, i) => i !== index);
    setValue("pictures", [...updatedPictures]);
    onSubmit(watch()) //updata useForm
  };

  return (
    <div>
      <div className="mb-4">
        <Label htmlFor="picture">Picture</Label>
        <Input
          id="picture"
          type="file"
          multiple
          onChange={handleFileChange}
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {currentPictures.map((picture: Pictures, index: number) => {
          if (!picture.img) {
            return null;
          }

          return (
            <div key={picture.img.name} className="relative">
              <Button
                type="button"
                className="w-10 absolute right-[5px] top-[5px]"
                size="default"
                variant="delete"
                onClick={() => deleteImg(index)}
              >
                <FiDelete />
              </Button>
              <img
                className="h-[140px] w-[190px] border border-gray-300 rounded-xl overflow-hidden"
                src={URL.createObjectURL(picture.img)}
                alt={`picture-${index}`}
              />
              <div className="absolute bottom-[0] bg-white w-full">
                <InputField
                  name={`pictures[${index}].desc`}
                  placeholder="Note"
                  control={control}
                  Icon={
                    <IoDocumentTextOutline className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2" />
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
