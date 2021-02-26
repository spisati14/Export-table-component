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
import {Workbook } from 'exceljs';
import Table  from '../table'

function exportTableToCsv(data, columns, filename, title) {
  var csv = [];
  
    //for (var i = 0; i < rows.length; i++) {
    for(let row of data){
      var _row = [];
        
      for(let column of columns){
          console.log(column);
        //for (var j = 0; j < columns.length; j++) {
            _row.push(row[column.accessor]);
      }
        
    csv.push(_row.join(","));    
  }
  console.log('csv', csv);
    // Download CSV
    download_csv(csv.join("\n"), filename);
}

function getHeading(columns){
  let array = [];
  for(let column of columns){
    array.push(column.Header);
  }
  return array;
}

function exportTableToExcel(data, columns, filename, title) {
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet(title);
  let header=getHeading(columns);

  worksheet.addRow(header)
  for(let row of data){
      var _row = [];
      for(let column of columns){
          _row.push(row[column.accessor]);
      }
    worksheet.addRow(_row)
  }
  //let headerRow = worksheet.addRow(header);

  let fname="Emp Data Sep 2020"
  worksheet.getRow(1).font = { bold: true };
  //add data and file name and download
  workbook.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    downloadFile(blob, filename);
  });


}

function downloadFile (blobObj, filename){
    let downloadLink;
    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(blobObj);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();

}

function download_csv(csv, filename) {
    
    let csvFile = new Blob([csv], {type: "text/csv"});

    downloadFile(csvFile, filename)
}
function printTable(className, columns, data, title){
   
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
   
  //let dt = Table({className, columns, data});
  title = `<h4>${title}</h4>`
  let dt = renderToString(<Table
        className={'csv-table'}
        columns={columns}
        data={data}
      />);
  dt = `<style>${style}</style>`+ title + dt;  
  console.log(dt);  
  let myWindow =window.open('','_blank');
  myWindow.document.write(dt);
  myWindow.document.execCommand('print', false, null);
}
//Default table
function CSVTable(props) {
	console.log(props);

	let fields = props.tableField.columns;
	let title = props.tableField.title;

	let level = props.level ? props.level :0;
  const columns = [
    ...fields  
    ];
    

  const data = props.data;
  console.log('fields', fields)

  return (
    	<>
    	<button onClick={()=> {exportTableToCsv(data, fields, 'test.csv',title)}}>Export CSV</button>
      <button onClick={()=> {printTable('csv-table', columns, data, title)}}>Print</button>
      <button onClick={()=> {exportTableToExcel(data, fields, 'test.xlsx',  title)}}>Export Excel</button>
      <h4>{title}</h4>
      <Table
      	className={'csv-table'}
        columns={columns}
        data={data}
      />
      </>
    
  );
}

export default CSVTable;