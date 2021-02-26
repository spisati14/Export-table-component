import React from 'react';
import ReactDOM from 'react-dom';

import '../App.css';
import  ExpandTable from '../core/expand-table'
import  CSVTable from '../core/csv-table'

import  ExportTable from '../core/export-table'

import {makeData, getAPIdata1} from '../utils/utils' //Dummy data makeData = static data, getAPIdata1= live json data
import Table  from '../core/table'

export default class DataSourceComponent extends React.Component {
    columns =[
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
  ];

    constructor(props){
      super(props)
    }
  

    render(){
      const data = makeData(10, 'person', false)
      const header = "This is test"
      return (

        <div className="App">
          
          <ExportTable 
            enableOption={['csv','excel','print']}
            exportTableId={'exportTable'}
            header={header}
            headerRows={'3'}
            headerColums={'6'}
            title={"Random table"}
          />

          <Table
            className={'csv-table'}
            columns={this.columns}
            data={data}
            id={'exportTable'}
          />
        </div>
      
      );
    }
}


