import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import  ExpandTable from '../core/expand-table'
import  CSVTable from '../core/csv-table'

import {makeData, getAPIdata1} from '../utils/utils' //Dummy data makeData = static data, getAPIdata1= live json data

import  ExportTable from '../core/export-table'
export default class ExpandTableComponent extends React.Component {
    columns ={
      title: "Test Table", // title of table
      columns: [
      {
        Header: 'Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Visits',
        accessor: 'visits',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
      },    
    ]
  };



    columns1 ={
      title: null,
      columns: [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'userId',
        accessor: 'userId',
      },
      {
        Header: 'Title',
        accessor: 'title',
      }
    ]
  };

     columns2 ={
       title: "Test",
       columns: [
          {
            Header: 'Pincode',
            accessor: 'pincode',
          },
          {
            Header: 'City',
            accessor: 'city',
          },
          {
            Header: 'State',
            accessor: 'state',
          }
       ]
    }


    constructor(props){
      super(props)
    }

    //Callback function for child table data 
    getChildData = async (row, level) =>{
        console.log('Data', level);
        if(level === 1){
            //return {data: await getAPIdata1(true), column: this.columns1}
            return {data: makeData(3, 'address', false  ), column: this.columns2}
        }
        if(level === 2){
            return {data: makeData(10, 'address', false  ), column: this.columns2}
        }
       
    }
  

    render(){
      const data = makeData(10, 'person', true)
      const header = "Testing expand"
      let style = `
     table {
          width: 100%;
          border-spacing: 0;
          border: 1px solid #cce5e5;
          border-radius: 5px;
      }
      table tr :last-child td{
        
      }

      table th,
      table td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
      }
      table td:last-child {
          border-right: 0;
      }
      table-level-* th{
        font-weight: 500px;
      }

      *[class^="table-level-"] td, *[class^="table-level-"] th{
        padding: 2px !important;
        border-bottom: 1px solid black;
          border-right: 1px solid black;
      }
      *[class^="table-level-"] th{
        font-weight: 500 !important;
      }
      *[class^="table-level-"] thead{
        background: #d9e3ef !important;
        
      }
      *[class^="table-level-"] tr:nth-child(even){
        background: #e8f2fe;
      }

      *[class^="table-level-"] .table-row:hover{
        background: #f9d5a2;
      }

      td[colspan]{
        padding: 2px 20px !important;
      }
      .down-icon{
        padding: 0px 5px 5px 5px;
          background: #c3d7f2;
          border-radius: 4px;
      }

      .up-icon{
        padding: 5px 5px 0px 5px;
          background: #c3d7f2;
          border-radius: 4px;
      }
   `;
      return (

        <div className="App">
          <ExportTable 
            enableOption={['csv','excel','print']}
            exportTableId={'exportTable'}
            header={header}
            headerRows={'3'}
            headerColums={'6'}
            title={"Random table"}
            printStyle={style}
          />

        
          <ExpandTable 
            id={'exportTable'}
            tableField={this.columns} 
            data={data} // Data
            getChildData={this.getChildData} //Callback function for child table data 
            level={0} //Level of  table defaut 0
          />
        </div>
        
      );
    }
}


