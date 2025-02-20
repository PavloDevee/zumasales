import { FC, useContext, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GrNotes } from "react-icons/gr";
import { z } from "zod";
import { HiOutlineMail } from "react-icons/hi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { IoIosAddCircleOutline, IoMdCheckmarkCircleOutline } from "react-icons/io";

import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateForm from "@/components/forms/createform/CreateForm";
import { CreateLoginFormSchema } from "@/components/forms/validations/validations";
import { toast } from "react-toastify";
import { InputField } from "@/components/forms/Input/InputField";
import { TextAreaField } from "@/components/forms/textarea/TextAreaField";
import { database } from "@/firebase/firebase";

import { push, ref, serverTimestamp } from "firebase/database";
import { DataProvider } from "@/providers/DataProvider";
import { inspectionStatus, Machine } from "@/providers/types";
import { uploadImages } from "@/helpers/uploadImg";

import { ClipLoader } from "react-spinners";

const Create: FC = () => {
  const navigate = useNavigate();
  const { userState } = useContext(DataProvider);
  const addButtonRef = useRef<HTMLDivElement | null>(null);

  const [formList, setFormsList] = useState<number[]>([]);
  const [allFormData, setAllFormData] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(false);

  const FormSchema = CreateLoginFormSchema;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      vendorEmail: "",
      note: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (allFormData.length) {
      setLoading(true);

      allFormData.map((machine: any) => {
        if (machine) {
          machine.createdAt = serverTimestamp();
          machine.note = data.note;
          machine.vendorEmail = data.vendorEmail;
          machine.status = inspectionStatus.pending;
        }
      });
      uploadImages(allFormData)
        .then(() => {
          const inspectionsRef = ref(database, `/users/${userState.uid}/inspections`);
          return Promise.all(allFormData.map((obj) => push(inspectionsRef, obj)));
        })
        .then(() => {
          toast.success("Inspections have been created successfully");
          setAllFormData([]);
          setFormsList([]);
          form.reset();
        })
        .catch((error) => {
          toast.error(`Error: ${error.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("Please add some inspection");
    }
  };

  const addMachine = () => {
    setFormsList((prevList) => [...prevList, prevList.length > 0 ? prevList[prevList.length - 1] + 1 : 0]);
  };

  useEffect(() => {
    if (addButtonRef.current) {
      addButtonRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [formList]);

  const deleteMachine = (index: number) => {
    setFormsList((prevList) => prevList.filter((_, i) => i !== index));
    setAllFormData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const collectMachineData = (index: number, data: Machine) => {
    const updatedData = [...allFormData];
    updatedData[index] = data;
    setAllFormData(updatedData);
  };

  return (
    <>
      <Header />
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <ClipLoader color="#00FF7F" size={50} />
        </div>
      )}
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 border border-gray-300 w-full max-w-6xl min-h-screen flex flex-col gap-4">
          <h1 className="text-xl font-bold text-gray-900">Create Inspection</h1>
          <div className="flex justify-between">
            <Button onClick={() => navigate("/inspections")}>
              <RiArrowGoBackFill />
              Table Inspection
            </Button>
            <div className="flex justify-end">
              {formList.length === 0 ? (
                <Button onClick={addMachine}>
                  <IoIosAddCircleOutline style={{ color: "#00FF7F" }} />
                  Add Machine
                </Button>
              ) : null}
            </div>
          </div>

          {formList.map((item, index) => (
            <CreateForm
              key={item}
              formMachine={item}
              index={index}
              onDelete={() => deleteMachine(index)}
              collectMachineData={collectMachineData}
            />
          ))}

          <div className="flex justify-end" ref={addButtonRef}>
            {formList.length !== 0 ? (
              <Button onClick={addMachine}>
                <IoIosAddCircleOutline style={{ color: "#00FF7F" }} />
                Add Machine
              </Button>
            ) : null}
          </div>

          <h2 className="text-lg font-bold text-gray-900">Inspection Details</h2>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid gap-2">
              <InputField
                name="vendorEmail"
                label="Vendor Email"
                placeholder="user@zumasales.com"
                control={form.control}
                errors={form.formState.errors.vendorEmail?.message}
                Icon={<HiOutlineMail className="text-gray-500 absolute top-1/2 left-2 transform -translate-y-1/2" />}
              />
              <TextAreaField
                name="note"
                label="User Note"
                placeholder="Type your message here."
                control={form.control}
                Icon={<GrNotes className="text-gray-500 absolute top-5 left-2 transform -translate-y-1/2" />}
              />
              <div className="flex justify-end">
                <Button type="submit" size="default">
                  <IoMdCheckmarkCircleOutline style={{ color: "#00FF7F" }} />
                  Submit
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};

export default Create;
