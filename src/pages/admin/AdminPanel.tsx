import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header/Header";
import { onValue, ref, update } from "firebase/database";
import { database } from "@/firebase/firebase";
import { DataProvider } from "@/providers/DataProvider";
import { toast } from "react-toastify";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Role } from "@/providers/types";
import { Button } from "@/components/ui/button";
import { RiArrowGoBackFill } from "react-icons/ri";
import { PaginationDemo } from "@/components/pagination/pagination";
import { SelectField } from "@/components/forms/select/SelectField";
import { FilterField } from "@/components/filterfield/FilterField";

const AdminPanel: FC = () => {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState<any>([]);
  const { userState, userRole } = useContext(DataProvider);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const roles = Object.values(Role);

  useEffect(() => {
    const usersRef = ref(database, 'users');
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        const usersArray = [];

        for (const key in users) {
          const user = users[key];
          user.uid = key;
          usersArray.push(user);
        }
        console.log(usersArray)
        setFilterData(usersArray);
      } else {
        toast.error("No users data available");
      }
    });
  }, []);

  const handleRoleChange = (userId: string, newRole: string) => {
    const userRef = ref(database, `users/${userId}`);
    update(userRef, { role: newRole })
      .then(() => {
        toast.success("Role updated successfully!");
      })
      .catch(() => {
        toast.error("Failed to update role");
      });
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  // Calculate the current page's data slice
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);
  // Pagination logic to change pages
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-white p-8 border border-gray-300 w-full max-w-6xl mx-auto flex flex-col justify-between flex-grow">
        <div className="h-full">
          <div className="flex items-center justify-between">
            <Button onClick={() => navigate('/inspections')}>
              <RiArrowGoBackFill />
              Table Inspection
            </Button>
            <FilterField setFilterData={setFilterData} />
          </div>
          <div className="mt-4">
            <Table>
              {!currentItems?.length && <TableCaption>A list of your inspection.</TableCaption>}
              <TableHeader className="bg-black">
                <tr>
                  <TableHead className="text-left">User Email</TableHead>
                  <TableHead>User Name </TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>User ID</TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                {currentItems.map((invoice: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-left">{invoice.email}</TableCell>
                    <TableCell>{invoice.displayName}</TableCell>
                    <TableCell>
                      <SelectField
                        value=""
                        options={roles}
                        onChange={(newRole) => handleRoleChange(invoice.uid, newRole)}
                        placeholder={invoice.role}
                        disabled={invoice.uid === userState.uid || userRole === Role.Moderator ? true : false}
                      />
                    </TableCell>
                    <TableCell >{invoice.uid}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="relative">
          <PaginationDemo
            currentPage={currentPage}
            totalItems={filterData.length}
            itemsPerPage={itemsPerPage}
            paginate={paginate}
          />
          <div className="w-[70px] absolute end-[0] top-[0]">
            <SelectField
              value={String(itemsPerPage)}
              options={['5', '10', '30', '50', '100']}
              onChange={handleItemsPerPageChange}
              placeholder="Items per page"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
