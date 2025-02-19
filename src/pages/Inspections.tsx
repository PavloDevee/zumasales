import { FC, useContext, useEffect, useState } from "react";

import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import Header from "@/components/header/Header";
import TableInspection from "@/components/table/TableInspection";
import { Button } from "@/components/ui/button";
import { FilterField } from "@/components/filter/filter";
import { DataProvider } from "@/providers/DataProvider";
import { PaginationDemo } from "@/components/pagination/pagination";
import { Inspection } from "@/providers/types";

const Inspections: FC = () => {
  const navigate = useNavigate();
  const { data } = useContext(DataProvider);
  const [filterData, setFilterData] = useState(data);

  const setName = (newName: string) => { //Search table
    const arr = data.filter((item: Inspection) =>
      item.email?.includes(newName) ||
      item.vendorEmail.includes(newName) ||
      item.createdAt.toString().includes(newName)
    );
    setFilterData(arr);
  }

  useEffect(() => {
    setFilterData(data);
  }, [data]);

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
            <Button onClick={() => navigate('/inspections/create')}>
              <IoIosAddCircleOutline style={{ color: '	#00FF7F' }} />
              Create Inspection
            </Button>
            <FilterField setName={setName} />
          </div>
          <TableInspection currentItems={currentItems} />
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

export default Inspections;
