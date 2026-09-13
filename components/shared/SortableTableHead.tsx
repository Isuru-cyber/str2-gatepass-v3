import { ReactNode } from "react";
import { TableHead } from "@/components/ui/table";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";

interface SortableTableHeadProps {
  label: string;
  field: string;
  currentSortField: string;
  currentSortDirection: "asc" | "desc";
  onSort: (field: any) => void;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SortableTableHead({
  label,
  field,
  currentSortField,
  currentSortDirection,
  onSort,
  align = "left",
  className = "",
}: SortableTableHeadProps) {
  const isSorted = currentSortField === field;
  
  return (
    <TableHead 
      className={`cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
        align === "center" ? "text-center" : align === "right" ? "text-right" : ""
      } ${className}`}
      onClick={() => onSort(field)}
    >
      <div className={`flex items-center gap-1 ${
        align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"
      }`}>
        {label}
        {isSorted ? (
          currentSortDirection === "asc" ? (
            <ChevronUp className="h-3 w-3 text-primary" />
          ) : (
            <ChevronDown className="h-3 w-3 text-primary" />
          )
        ) : (
          <ArrowUpDown className="h-3 w-3 text-muted-foreground opacity-50" />
        )}
      </div>
    </TableHead>
  );
}
