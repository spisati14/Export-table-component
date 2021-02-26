import React from 'react';
import ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types'
//import ReactTable from 'react-table';
import { renderToString } from 'react-dom/server'

//import BTable from 'react-bootstrap/Table';
import { useTable, useExpanded } from 'react-table'
import ReactTable from "react-table";
import './index.css';
// get our fontawesome imports
import { faSortDown,  faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



// A simple way to support a renderRowSubComponent is to make a render prop
// This is NOT part of the React Table API, it's merely a rendering
// option we are creating for ourselves in our table renderer
function Table({ className: className, columns: userColumns, data , renderRowSubComponent=null, id=null}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { expanded }
  } = useTable(
    {
      columns: userColumns,
      data
    },
    useExpanded // We can useExpanded to track the expanded state
    // for sub components too!
  );

  return (
    <>
      
      <table id={id} className={className} {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => {
              return (<th {...column.getHeaderProps()}>{column.render('Header')}</th>)
            })}
          </tr>
        ))}
        </thead>
        
        {rows.map((row, i) => {
          prepareRow(row);
          const rowProps = row.getRowProps();

          
          return (
            // Use a React.Fragment here so the table markup is still valid
            <React.Fragment key={rowProps.key}>
              <tr className={'table-row'} {...rowProps}>
                {row.cells.map(cell => {
                  return (
                    <td  {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
              {/* We could pass anything into this */}
              {row.isExpanded &&
                renderRowSubComponent({ row, rowProps, visibleColumns })}
            </React.Fragment>
          );
        })}
        
      </table>
      
    </>
  );
}



export default Table;