import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header/Header";
import { onValue, ref, update } from "firebase/database";
import { database } from "@/firebase/firebase";
import { DataProvider } from "@/providers/DataProvider";
import { toast } from "react-toastify";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/providers/types";
import { Button } from "@/components/ui/button";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FilterField } from "@/components/filter/filter";
import { PaginationDemo } from "@/components/pagination/pagination";

const AdminPanel: FC = () => {
  const [data, setData] = useState<any>([]);
  const [filterData, setFilterData] = useState(data);
  const { userState } = useContext(DataProvider);
  const navigate = useNavigate();

  const roles = [Role.Admin, Role.User];

  useEffect(() => {
    const usersRef = ref(database, 'users');
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        const usersArray = [];

        for (const key in users) {
          const user = users[key];
          user.id = key;
          usersArray.push(user);
        }
        setData(usersArray);
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

  const setName = (newName: string) => {
    const arr = data.filter((item: any) =>
      item.email.includes(newName) ||
      item.role.includes(newName) ||
      item.username.toString().includes(newName)
    );
    setFilterData(arr);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

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
            <FilterField setName={setName} />
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
                    <TableCell>{invoice.username}</TableCell>
                    <TableCell>
                      <Select
                        value={''}
                        onValueChange={(newRole) => handleRoleChange(invoice.id, newRole)}
                        disabled={invoice.id === userState.uid}>
                        <SelectTrigger>
                          <SelectValue placeholder={invoice.role} />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell >{invoice.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <PaginationDemo
          currentPage={currentPage}
          totalItems={filterData.length}
          itemsPerPage={itemsPerPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default AdminPanel;
