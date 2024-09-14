import { ReactNode } from "react";
import uniqid from "uniqid";

interface TableCellProps {
  colSpan?: number;
  rowSpan?: number;
  className?: string;
  disableOnRowClick?: boolean;
  children: ReactNode;
}

type TableCell = TableCellProps | ReactNode | string | number;

interface TableProps {
  columns: Array<string | ReactNode>;
  data: Array<Array<TableCell>>;
  onRowClick?: (index: number) => void;
  isLoadingData?: boolean;
}

export const Table = ({
  columns,
  data,
  onRowClick,
  isLoadingData,
}: TableProps) => {
  if (isLoadingData) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="loader" />
        <p className="text-sm text-gray-500">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-light border border-primary-green rounded-lg">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={uniqid()}
                className="px-6 py-3 text-center text-sm font-bold text-dark bg-light-green uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={uniqid()}
              onClick={onRowClick ? () => onRowClick(rowIndex) : undefined}
              className={`cursor-pointer ${
                onRowClick ? "hover:bg-light-green" : ""
              } transition-colors`}
            >
              {row.map((cell) => {
                if (typeof cell === "object" && "children" in cell) {
                  const { colSpan, rowSpan, className, children } =
                    cell as TableCellProps;
                  return (
                    <td
                      key={uniqid()}
                      colSpan={colSpan}
                      rowSpan={rowSpan}
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-dark ${className || ""}`}
                    >
                      {children}
                    </td>
                  );
                } else {
                  return (
                    <td
                      key={uniqid()}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark"
                    >
                      {cell}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
