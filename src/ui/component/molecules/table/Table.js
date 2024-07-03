import React from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import Search from './Search';
import 'tailwindcss/tailwind.css';
import styled from 'styled-components';

function BasicTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <>
      <Search onSubmit={setGlobalFilter} />
      <table
        className="border-collapse border border-slate-400"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="my-4 text-base font-semibold text-gray-700"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr className="bg-gray-100" {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td className="text-right p-2" {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

const StyledH3 = styled.h3`
  color: red;
`;
{
  /*<StyledH3>Welcome Home</StyledH3>*/
}

function Table({ columns, data }) {
  return (
    // <div className="my-4 text-2xl font-semibold text-gray-700">
    <div className="bg-white text-gray-700">
      <BasicTable columns={columns} data={data} />
    </div>
  );
}

export default Table;
