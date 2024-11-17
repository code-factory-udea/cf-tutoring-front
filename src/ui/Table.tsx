import { ReactNode } from "react";
import uniqid from "uniqid";
import { Spinner } from "./Spinner";
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
  onRowClick?: (row: Array<TableCell>) => void;
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
        <Spinner />
      </div>
    );
  }
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center py-4">
        <p className="text-primary-green text-xl font-bold">
          No se encontraron resultados
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto h-screen">
      <table className="min-w-full bg-light border border-primary-green rounded-lg">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={uniqid()}
                className="px-6 py-3 text-center text-sm font-bold text-light bg-primary-green uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={uniqid()}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`cursor-pointer ${
                onRowClick ? "hover:bg-light-green/30" : ""
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
                      className={`px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-dark ${className || ""}`}
                    >
                      {children}
                    </td>
                  );
                } else {
                  return (
                    <td
                      key={uniqid()}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark text-center"
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
