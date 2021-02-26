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


function getTableRows(id, type, level=1){
  let data = document.getElementById(id)
  if(!data){
    alert('No data found');
    return;
  }
  var tableRows = document.getElementById(id).rows;

  let rows=[];
  

  for (var i = 0; i < tableRows.length; i++) {
    let childPushed = false;
    var row = [], cols = tableRows[i].querySelectorAll("td, th");
    
    for (var j = 0; j < cols.length; j++) {

      var childTable = document.getElementById(id + '-level-'+level);
      if(cols[j].contains(childTable)){
        let childData = getTableRows(id + '-level-'+level, 'innerText' ,(level + 1));
        for(let cd of childData){
          rows.push(cd); 
          childPushed = true;
        }
      }
      else{
        row.push(cols[j][type]);
      }
    }
    if(!childPushed){
      rows.push(row);  
    }  
  }

  return rows;
}

function exportTableToCsv(filename, title, id,headerRows,headerColums) {
  var csv = [];
    
  let data= getTableRows(id,'innerText');

  if(data){
    for(let row of data){
      csv.push(row.join(","));    
    }
    // Download CSV
    download_csv(csv.join("\n"), filename);
  }
}

function getExcelColumn(column){
  let quotient = column/26;
  
  if(quotient >= 1){
    return getExcelColumn(quotient-1) + String.fromCharCode(column+64);
  }
  
  return String.fromCharCode(column+64);
}

function exportTableToExcel(filename, title, id,headerRows,headerColums) {
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet(title);
  let data= getTableRows(id, 'innerText');
  worksheet.addRow([title]);
  worksheet.mergeCells('A1', getExcelColumn(parseInt(headerColums))+headerRows);
  console.log(data);
  if(data){
    for(let row of data){
      worksheet.addRow(row)
    }

    //worksheet.getRow(1).font = { bold: true };
    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      downloadFile(blob, filename);
    });
  }

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
function printTable(className,  title, id, printStyle){
   let data  = document.getElementById(id);

   if(!data){
    alert('No data of table');   
   }
  
  let myWindow =window.open('','_blank');
  myWindow.document.write(title);
  myWindow.document.write(printStyle);
  myWindow.document.write(data.outerHTML);
  myWindow.focus()
    
  myWindow.document.execCommand('print', false, null)
    
  myWindow.close();
}
//Default table
function ExportTable(props) {
	console.log(props);

  let enableOption = props.enableOption
  const {exportTableId,  header,title} = props;
  const headerRows = props.headerRows || 3;
  const headerColums = props.headerColums || 7;
  const printStyle = props.printStyle || ``;
  return (
    	<>
    	{enableOption && enableOption.indexOf('csv') > -1 && <button onClick={()=> {exportTableToCsv(title+'.csv',header, exportTableId,headerRows,headerColums)}}>Export CSV</button>}
      {enableOption && enableOption.indexOf('print') > -1 && <button onClick={()=> {printTable('export-table', header, exportTableId, printStyle)}}>Print</button>}
      {enableOption && enableOption.indexOf('excel') > -1 && <button onClick={()=> {exportTableToExcel(title+'.xlsx',  header, exportTableId,headerRows,headerColums)}}>Export Excel</button>}
      
      </>
    
  );
}

export default ExportTable;