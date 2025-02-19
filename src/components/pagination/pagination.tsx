import { FC } from "react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export const PaginationDemo: FC<{
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  paginate: (pageNumber: number) => void;
}> = ({ currentPage, totalItems, itemsPerPage, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => currentPage > 1 && paginate(currentPage - 1)} href="#" />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              isActive={currentPage === index + 1}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext onClick={() => currentPage < totalPages && paginate(currentPage + 1)} href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
