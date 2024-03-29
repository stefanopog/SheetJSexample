const app = {
  createTable(tableDataString){
    const tableData = JSON.parse(tableDataString);
    const tablearea = document.getElementById('table-container');

    const oldTable = document.getElementById('data-table'); 
    oldTable && tablearea.removeChild(oldTable);

    const table = document.createElement('table');
    table.id = 'data-table';

    tableData.forEach((tableRow) => {
      const tr = document.createElement('tr');
      tableRow.forEach((rowCell, i) => {
        tr.appendChild( document.createElement('td') );
        tr.cells[i].appendChild( document.createTextNode(rowCell));
      });
      table.appendChild(tr);
    });
    tablearea.appendChild(table);
  },

  exportData(tableDataString) {
    app.createTable(tableDataString);
    const elt = document.getElementById('data-table');
    const wb = XLSX.utils.table_to_book(elt, {sheet: "data"});
    XLSX.writeFile(wb, 'export.xlsx');
  },

  importData(data){
    const workbook = XLSX.read(atob(data), {type: "binary"});
    const sheet = workbook.SheetNames[0];
    const excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
    const arg = btoa(unescape(encodeURIComponent(JSON.stringify(excelData))));
    voltmx.evaluateJavaScriptInNativeContext(`utils.getExcelData('${arg}')`);
  }
};
