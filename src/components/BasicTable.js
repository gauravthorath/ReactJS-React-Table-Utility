import React, { useMemo } from "react"; //for optimization
import { useTable } from "react-table"; //main utility
import MOCK_DATA from "./MOCK_DATA.json"; // our mock data
import { COLUMNS } from "./columns"; // column defination
import "./table.css"; // styles for table

export const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, []); //as per recommended memoized columns
  const data = useMemo(() => MOCK_DATA, []); //as per recommended memoized data

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups, // for header
    footerGroups, //for footer
    rows, //rows
    prepareRow,
  } = useTable({
    columns,
    data,
  }); // main hook which accepts column and data

  return (
    <>
      <table {...getTableProps()}>
        {/* table header */}
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        {/* table body */}
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {/* table footer */}
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};
