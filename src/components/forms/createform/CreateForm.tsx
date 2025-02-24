import { FC, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FiDelete } from "react-icons/fi";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../Input/InputField";
import { CreateFormSchema } from "../validations/validations";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Machine } from "@/providers/types";
import { AddImage } from "../addImage/AddImage";
import { ControlForm } from "../select/ControlForm";

interface CreateFormProps {
  onDelete: () => void;
  formMachine: number;
  index: number;
  collectMachineData: (index: number, data: Machine) => void;
}

const CreateForm: FC<CreateFormProps> = ({ onDelete, formMachine, collectMachineData, index }) => {
  const formMethods = useForm<z.infer<typeof CreateFormSchema>>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      make: "",
      model: "",
      serialnumber: "",
      yearmake: "",
      condition: "",
      machinetype: "",
      custom: "",
      batteries: "",
      tires: "",
      pictures: [],
    },
  });

  const onSubmit = (data: z.infer<typeof CreateFormSchema>) => {; 
    collectMachineData(index, data);
  };

  useEffect(() => {
    formMethods.reset();
  }, [formMethods.reset]);

  return (
    <div className="w-full">
      <p className="text-2xl font-bold text-center uppercase">Machine {formMachine + 1}</p>

      <FormProvider {...formMethods}>
        <form
          className="w-full grid gap-2 border-y border-black py-4"
          onChange={formMethods.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-4">
            <InputField
              name="make"
              label="Make"
              placeholder="Make"
              control={formMethods.control}
              Icon={<IoDocumentTextOutline className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2" />}
            />
            <InputField
              name="model"
              label="Model"
              placeholder="Model"
              control={formMethods.control}
              Icon={<IoDocumentTextOutline className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2" />}
            />
            <InputField
              name="serialnumber"
              label="Serial Number"
              placeholder="Serial Number"
              control={formMethods.control}
              Icon={<IoDocumentTextOutline className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2" />}
            />
            <ControlForm
              name="condition"
              label="Condition"
              control={formMethods.control}
              options={["New", "Used"]}
            />
            <InputField
              name="yearmake"
              label="Year Make"
              placeholder="Year Make"
              control={formMethods.control}
              Icon={<IoDocumentTextOutline className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2" />}
            />
            <ControlForm
              name="machinetype"
              label="Machine Type"
              control={formMethods.control}
              options={["Scissor lifts","Boom Lifts","Trailers","Telehandlers","Telehandler Attachments","Towble Booms","Other"]}
            />
            <InputField
              name="custom"
              label="Custom Machine Type"
              placeholder="Custom Machine Type"
              control={formMethods.control}
              Icon={<IoDocumentTextOutline className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2" />}
            />
            <InputField
              name="batteries"
              label="Batteries Percentage"
              placeholder="Batteries Percentage"
              control={formMethods.control}
              Icon={<IoDocumentTextOutline className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2" />}
            />
            <InputField
              name="tires"
              label="Tires"
              placeholder="Tires"
              control={formMethods.control}
              Icon={<IoDocumentTextOutline className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2" />}
            />
          </div>
          <AddImage
            control={formMethods.control}
            onSubmit={onSubmit}
          />
          <div className="grid gap-2 max-w-[250px] w-full mx-auto">
            <Button type="button" className="w-full" size="default" variant={'delete'} onClick={() => onDelete()}>
              <FiDelete />
              Delete Machine
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateForm;
