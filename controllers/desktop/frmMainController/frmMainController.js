define({ 
  getExcel: function () {
    var config = {
      selectMultipleFiles: false,
      filter: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]
    };
    let jsonWidget = this.view.txtAreaJSON;
    voltmx.io.FileSystem.browse(config, event => {
      voltmx.print('Parsing ' + event.target.files[0].name + 'file...');
      voltmx.print(JSON.stringify(event, ' ', 2));
      const reader = new FileReader();
      reader.onload = (e) => {
        let data = e.target.result;
        let workbook = XLSX.read(data, {
          type: "binary"
        });
        voltmx.print('Workbook succesfully imported !');
        //
        //	cleaning the Flex Container
        //
        this.view.flxExcelData.removeAll();
        //
        //	parsing the excel content
        //
        workbook.SheetNames.forEach(sheet => {
          //
          //	Get each Shhet in the Workbook
          //
          let excelSheet = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
          //
          //	putting raw sheet in the Text area
          //
          jsonWidget.text = JSON.stringify(excelSheet, ' ', 4);
          if (excelSheet.length > 0){
            //
            //	getting each row in the sheet
            //
            excelSheet.forEach((rowObject, index) => {
              if(index === 0){
                //
                //	Probably the header ?
                //
                const rowHeader = new com.hcl.sheetJS.Row({
                  id: `row${new Date().getTime()}`
                });
                rowHeader.removeAllCells();
                Object.keys(rowObject).forEach((cellName) => {
                  rowHeader.addCell(cellName);
                });
                rowHeader.doLayout = () => {
                  const rowHeight = rowHeader.frame.height;
                  if (rowHeight){
                    rowHeader.getCells().forEach((cell) => {
                      cell.skin = 'skinHeader';
                      cell.height = `${rowHeight}dp`;
                    });
                  }
                };
                voltmx.print('Adding the Header....');
                this.view.flxExcelData.add(rowHeader);
              }
              const row = new com.hcl.sheetJS.Row({
                id: `row${new Date().getTime()}`
              });
              row.removeAllCells();
              Object.keys(rowObject).forEach((cellName) => {
                row.addCell(rowObject[cellName]);
              });
              row.doLayout = () => {
                const rowHeight = row.frame.height;
                if (rowHeight) {
                  row.getCells().forEach((cell) => {
                    cell.skin = index % 2 === 0 ? 'skinYellow' : 'skinGreen';
                    cell.height = `${rowHeight}dp`;
                  });
                }
              };
              voltmx.print('Adding a new row....');
              this.view.flxExcelData.add(row);
            });
            voltmx.print('repainting the Flex....');
            this.view.flxExcelData.forceLayout();
          }
        });
      };
      reader.readAsBinaryString(event.target.files[0]);
    });  
  },

  exportData(){
    let numRows, numColumns;
    let tableData = [];
    let k = 1;
    let colHeaders = ['Col1', 'Col2', 'Col3', 'Col4', 'Col5', 'Col6', 'Col7', 'Col8', 'Col9', 'Col10'];
    //
    //	Calculating the exact number of rows and of columns according to the Breakpoint of the flex Container containg the cells
    //
    const currentBreakpoint = voltmx.application.getCurrentBreakpoint();
    if (currentBreakpoint === 640){
      numRows = 6;
      numColumns = 2;
    } else if(currentBreakpoint === 1024){
      numRows = 4;
      numColumns = 3;
    } else {
      numRows = 3;
      numColumns = 4;
    }
    //
    //	Parsing the list of cells
	//
    for (let i = 0; i < numRows; i++){
      const rowData = {};
      //
      //	We build an "object" whose fields are named like the "Column Headers" and whose value is the content of the relevant cell
      //
      for (let j = 0; j < numColumns; j++){
        rowData[colHeaders[j]] = this.view[`txt${k}`].text;
        k++;
      }
      //
      //	we push the  object representing the "row" onto the array representing the "worksheet"
      //
      tableData.push(rowData);
    }
    voltmx.print(JSON.stringify(tableData, ' ', 4));
    //
    //	Creating the Workbook and filling it
    //
    let worksheet = XLSX.utils.json_to_sheet(tableData);
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, this.view.txtWorksheetName.text);
    //
    //	Creating the file
    //
    XLSX.writeFile(workbook, this.view.txtFileName.text, { compression: true });
  },


  xlsxVersion: function() {
    return XLSX.version;
  }
});
