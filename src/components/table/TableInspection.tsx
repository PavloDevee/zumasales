import { FC, useContext, useState } from "react";
import { ref, remove, update } from "firebase/database";
import { toast } from "react-toastify";
import { DialogCloseButton } from "../modal/Modal";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataProvider } from "@/providers/DataProvider";
import { database } from "@/firebase/firebase";
import { generatePDF } from "@/helpers/download";
import { Inspection, inspectionStatus, Role } from "@/providers/types";
import { FaFilePdf } from "react-icons/fa";
import { Status } from "../status/Status";
import { SelectField } from "../forms/select/SelectField";
import { ClipLoader } from "react-spinners";
import { endpoint } from "@/firebase/endpoint";

interface Props {
  currentItems: Inspection[],
}

const TableInspection: FC<Props> = ({ currentItems }) => {
  const { userRole } = useContext(DataProvider);
  const statusInspection = Object.values(inspectionStatus);
  const access = userRole === Role.Admin || userRole === Role.Moderator ? true : false;
  const [loadingState, setLoadingState] = useState<{ [key: string]: boolean }>({});

  const deleteInspection = (userId: string, inspectionId: string) => {
    const inspectionRef = ref(database, endpoint.getUserInspection(userId,inspectionId));
    remove(inspectionRef)
      .then(() => {
        toast.success("The inspection has been deleted successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleStatusChange = (userId: string, inspectionId: string, status: string) => {
    const userRef = ref(database, endpoint.getUserInspection(userId,inspectionId));
    update(userRef, { status: status })
      .then(() => {
        toast.success("Status updated successfully!");
      })
      .catch(() => {
        toast.error("Failed to update status");
      });
  };

  const handleGeneratePDF = async (invoice: Inspection) => {
    setLoadingState(prevState => ({
      ...prevState,
      [invoice.id]: true,
    }));

    try {
      await generatePDF(invoice);
    } catch (error) {
      toast.error("Failed to generate PDF");
    } finally {
      setLoadingState(prevState => ({
        ...prevState,
        [invoice.id]: false,
      }));
    }
  };

  return (
    <div className="rounded-xl mt-4 overflow-hidden">
      <Table>
        {!currentItems?.length && <TableCaption>A list of your inspection.</TableCaption>}
        <TableHeader className="bg-black">
          <tr>
            <TableHead>Vendor Email</TableHead>
            <TableHead>Vendor Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Quotation Url</TableHead>
            <TableHead>Creation Date & Time</TableHead>
            <TableHead>Vendor ID</TableHead>
            {access && <TableHead>Downloads</TableHead>}
            {userRole === Role.Admin && <TableHead className="text-right">Action</TableHead>}
          </tr>
        </TableHeader>
        <TableBody>
          {currentItems.map((invoice: Inspection, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-left">{invoice.vendorEmail}</TableCell>
              <TableCell>{invoice.custom}</TableCell>
              <TableCell>
                {access ?
                  <SelectField
                    value=""
                    options={statusInspection}
                    onChange={(status) => handleStatusChange(invoice.uid, invoice.id, status)}
                    placeholder={invoice.status}
                  />
                  :
                  <Status variant={invoice.status as inspectionStatus}>{invoice.status}</Status>
                }
              </TableCell>
              <TableCell>{invoice.model}</TableCell>
              <TableCell>{invoice.createdAt ? new Date(invoice.createdAt).toLocaleString() : "N/A"}</TableCell>
              <TableCell>{invoice.custom}</TableCell>
              {access &&
                <TableCell>
                  <div className="flex justify-center relative">
                    {loadingState[invoice.id] && <ClipLoader className="absolute left-[10px]" color="#00FF7F" size={20} />}
                    <button onClick={() => handleGeneratePDF(invoice)} type="button">
                      <FaFilePdf size={20} className=" hover:text-green-500 transition-colors duration-300" />
                    </button>
                  </div>
                </TableCell>
              }
              {userRole === Role.Admin &&
                <TableCell className="text-right">
                  <DialogCloseButton
                    variant="delete"
                    handleLogout={() => { deleteInspection(invoice.uid, invoice.id) }}
                    confirmBtn="Delete"
                    descText="Do you really want to delete inspection?" />
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableInspection;
