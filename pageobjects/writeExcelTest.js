const ExcelJS = require('exceljs');
const path = require('path');
//const filePath = path.join('C:', 'Users', 'krith', 'Downloads', 'Quotes.csv');
//const filePath = path.join(__dirname, 'download', 'Quotes.csv');

async function writeExcelTest(filePath, newValue) {
    const workbook = new ExcelJS.Workbook();
    await workbook.csv.readFile(filePath); 
    const worksheet = workbook.worksheets[0];
    
    // Clear the cell value for unwanted rows
    for(let i=30; i>=3; i--)
    {
        worksheet.spliceRows(i,1);
    }

    //Insert a new quote in the excel
    for(let row=1; row<5; row++)
    {
        if (worksheet.getCell(`A${row}`).value === null){

            worksheet.getCell(`A${row}`).value = newValue;
            break;
        }
    }
   
    // Save the changes
    await workbook.csv.writeFile(filePath);
}

module.exports = writeExcelTest;