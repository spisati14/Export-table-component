import React from 'react';
import ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types'
//import ReactTable from 'react-table';

//import BTable from 'react-bootstrap/Table';
import { useTable, useExpanded } from 'react-table'
import ReactTable from "react-table";
import './index.css'
// get our fontawesome imports
import { faSortDown,  faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table  from '../table'
// This could be inlined into SubRowAsync, this this lets you reuse it across tables

//Child table
function SubRowAsync({ row, rowProps, visibleColumns, getChildData, level,id }) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [column, setColumn] = React.useState([]);
  	console.log('row',row);
	  React.useEffect(() => {
	    //const timer = setTimeout(() => {
	    	(async function getData() {
	      		const {data, column} = await getChildData(row,level);
		      	setData(data);
		      	setColumn(column);
		     	setLoading(false);
	    	})();
	  }, []);

  return (<tr>
  		<td colSpan={row.allCells.length}>
    {loading ? 'Loading' : <ExpandTable
      id={id+'-level-'+level}
      tableField={column}
      data={data}
      loading={loading}
      level={level}
      getChildData={getChildData}
    />}
    </td>
    </tr>
  );
}


//Default table
function ExpandTable(props) {
	console.log(props);

	let fields = props.tableField.columns;
	let title = props.tableField.title;

	let level = props.level ? props.level :0;
  const columns = [
      {
        // Make an expander cell
        Header: () => null, // No header
        id: 'expander', // It needs an ID
        Cell: ( cell ) => {
        	const {row} = cell;
        	console.log('row',row);
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          //{row.isExpanded ? '👇' : '👉'}
          return row && row.original && row.original.haveChild && <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? <FontAwesomeIcon className="up-icon" icon={faSortUp} /> : <FontAwesomeIcon className="down-icon" icon={faSortDown} />}
          </span>
        },
        // We can override the cell renderer with a SubCell to be used with an expanded row
        SubCell: () => null // No expander on an expanded row
      },
    ...fields  
    ];
    

  const data = props.data;

  // Create a function that will render our row sub components
  const renderRowSubComponent = React.useCallback(
    ({ row, rowProps, visibleColumns }) => (
      <SubRowAsync
        row={row}
        rowProps={rowProps}
        visibleColumns={visibleColumns}
        getChildData={props.getChildData}
        level={(level + 1)}
        id={props.id}
      />
    ),
    []
  );

  return (
    	<>
    	<h4>{title}</h4>
      <Table
        id={props.id}
      	className={'table-level-'+level}
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
      </>
    
  );
}

export default ExpandTable;