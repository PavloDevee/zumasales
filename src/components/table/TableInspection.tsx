import { FC, useContext } from "react";

import { ref, remove, update } from "firebase/database";
import { toast } from "react-toastify";
import { DialogCloseButton } from "../modal/Modal";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataProvider } from "@/providers/DataProvider";
import { database } from "@/firebase/firebase";
import { generatePDF } from "@/helpers/download";
import { Inspection, inspectionStatus, Role } from "@/providers/types";
import { FaFilePdf } from "react-icons/fa";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Status } from "../status/Status";

interface Props {
  currentItems: Inspection[],
}

const TableInspection: FC<Props> = ({ currentItems }) => {
  const { userRole } = useContext(DataProvider);
  const statusInspection = Object.values(inspectionStatus);

  const deleteInspection = (userId: string, inspectionId: string) => {
    const inspectionRef = ref(database, `/users/${userId}/inspections/${inspectionId}`);
    remove(inspectionRef)
      .then(() => {
        toast.success("The inspection has been deleted successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleStatusChange = (userId: string, inspectionId: string, status: string) => {
    const userRef = ref(database, `/users/${userId}/inspections/${inspectionId}`);
    update(userRef, { status: status })
      .then(() => {
        toast.success("Status updated successfully!");
      })
      .catch(() => {
        toast.error("Failed to update status");
      });
  };

  return (
    <div className="rounded-xl mt-4 overflow-hidden">
      <Table>
        {!currentItems?.length && <TableCaption>A list of your inspection.</TableCaption>}
        <TableHeader className="bg-black">
          <tr>
            <TableHead>Vendor Email</TableHead>
            <TableHead>Vendor Name </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Quotation Url</TableHead>
            <TableHead>Creation Date & Time</TableHead>
            <TableHead>Vendor ID</TableHead>
            {userRole === Role.Admin && <TableHead>Downloads</TableHead>}
            {userRole === Role.Admin && <TableHead className="text-right">Action</TableHead>}
          </tr>
        </TableHeader>
        <TableBody>
          {currentItems.map((invoice: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-left">{invoice.vendorEmail}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>
                {userRole === Role.Admin ?
                  <Select
                    value={''}
                    onValueChange={(status) => handleStatusChange(invoice.userID, invoice.id, status)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={invoice.status} />
                    </SelectTrigger>
                    <SelectContent>
                      {statusInspection.map((status, index) => (
                        <SelectItem key={index} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select> :
                  <Status variant={invoice.status}>{invoice.status}</Status>
                }
              </TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell>{invoice.createdAt ? new Date(invoice.createdAt).toLocaleString() : "N/A"}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              {userRole === Role.Admin &&
                <TableCell>
                  <div className="flex justify-center">
                    <button onClick={() => { console.log(invoice); generatePDF(invoice) }} type="button">
                      <FaFilePdf size={20} className=" hover:text-green-500 transition-colors duration-300" />
                    </button>
                  </div>
                </TableCell>
              }
              {userRole === Role.Admin &&
                <TableCell className="text-right">
                  <DialogCloseButton
                    variant="delete"
                    handleLogout={() => { deleteInspection(invoice.userID, invoice.id) }}
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
