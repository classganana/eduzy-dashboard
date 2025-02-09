import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import { LeftArrow } from "./icons";

import { AppTexts } from "@/lib/utils/texts";

// Interface for columns
interface Column {
  key: string;
  label: string;
  sortable?: boolean; // Add sortable property
}

// Interface for each row item
interface RowItem {
  key: string;
  student: string;
  attemptedQuestionsByTotal: string;
  totalScore: number;
  scorePercentage: number;
}

// Interface for the props in ReportTable
interface ReportTableProps {
  columns: Column[];
  items: RowItem[];
}

// Define the ReportTable component with the props interface
const ReportTable: React.FC<ReportTableProps> = ({ columns, items }) => {
  return (
    <Table
      aria-label={AppTexts.reportTableTitle}
      className="min-w-full shadow-md rounded-lg"
      style={{ width: "100%", minHeight: "150px" }}
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn
            key={column.key}
            className="text-left text-gray-600 px-1 py-2"
          >
            {column.label}
            {column.sortable && (
              <LeftArrow className="inline-block ml-2 min-w-1 min-h-1" />
            )}
          </TableColumn>
        ))}
      </TableHeader>

      <TableBody emptyContent={AppTexts.emptyTable}>
        {items.map((item) => (
          <TableRow key={item.key} className="hover:bg-gray-100">
            {columns.map((column) => (
              <TableCell key={column.key} className="py-1 px-4">
                {item[column.key as keyof RowItem]} {/* Direct access */}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReportTable;
