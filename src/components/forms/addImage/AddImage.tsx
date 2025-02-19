import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FC } from "react";
import { FiDelete } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useForm, FormProvider } from "react-hook-form";
import { InputField } from "../Input/InputField";
import { Pictures } from "@/providers/types";

interface FormData {
  pictures: Pictures[];
}

interface Props {
  setPictures: React.Dispatch<React.SetStateAction<Pictures[]>>;
}

export const AddImage: FC<Props> = ({ setPictures }) => {
  const formMethods = useForm<FormData>({
    defaultValues: {
      pictures: [],
    },
  });
  const { handleSubmit, setValue, watch } = formMethods;

  // Watch the pictures data to dynamically capture updates
  const picturesData = watch("pictures", []);

  // Handle file change (add new files)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // uploadImages(event.target.files[0])
      // console.log(event.target.files[0]);
      const newPictures: Pictures[] = Array.from(event.target.files).map((file) => ({
        img: file,
        desc: "",
        urlImg:""
      }));

      setPictures((prevPics) => {
        const updatedPictures = [...prevPics, ...newPictures];
        setValue("pictures", updatedPictures); // Update the form with new pictures
        return updatedPictures;
      });
    }
  };

  const deleteImg = (index: number) => {
    const updatedPictures = picturesData.filter((_, i) => i !== index);
    setPictures(updatedPictures);
    setValue("pictures", updatedPictures);
  };

  const onSubmit = (data: FormData) => {
    setPictures(data.pictures);
  };

  return (
    <FormProvider {...formMethods}>
      <form onChange={handleSubmit(onSubmit)}>
        <div className="flex gap-2 flex-wrap">
          <div className="gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input
              id="picture"
              type="file"
              multiple
              onChange={handleFileChange} // Handle file change
            />
          </div>

          {picturesData.map((picture, index) => (
            <div key={index} className="relative">
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
                  control={formMethods.control}
                  search={true}
                  Icon={
                    <IoDocumentTextOutline className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2" />
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </form>
    </FormProvider>
  );
};
