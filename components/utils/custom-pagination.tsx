import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        {/* Bouton Précédent */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className={
              currentPage === 1
                ? "text-gray-400 pointer-events-none"
                : "hover:text-primary"
            }
          >
            Précédente
          </PaginationPrevious>
        </PaginationItem>

        {/* Numéros de page */}
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(i + 1)}
              className={currentPage === i + 1 ? "font-bold text-primary" : ""}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis (si nécessaire) */}
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Bouton Suivant */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className={
              currentPage === totalPages
                ? "text-gray-400 pointer-events-none"
                : "hover:text-primary"
            }
          >
            Suivant
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
