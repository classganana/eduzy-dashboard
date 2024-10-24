import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import arrow from "../../assets/arrow.png"; // Correct import from your assets folder

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
  attemptedQuestions: number;
  totalScore: string;
  scorePercentage: string;
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
      aria-label="Student Report Table"
      className="min-w-full bg-white shadow-md rounded-lg border border-gray-200"
      style={{ height: "400px", width: "600px" }}
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn
            key={column.key}
            className="text-left text-gray-600 px-4 py-2"
          >
            {column.label}
            {column.sortable && (
              <img
                alt="Sort"
                className="inline-block ml-2 w-4 h-4"
                src={arrow}
              />
            )}
          </TableColumn>
        ))}
      </TableHeader>

      <TableBody>
        {items.map((item) => (
          <TableRow key={item.key} className="hover:bg-gray-100">
            {columns.map((column) => (
              <TableCell key={column.key} className="py-3 px-4">
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
