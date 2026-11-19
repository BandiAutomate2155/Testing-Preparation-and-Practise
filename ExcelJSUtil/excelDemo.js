const ExcelJs = require('exceljs');

async function excelTest() {    
const workbook = new ExcelJs.Workbook();
await workbook.xlxs.readFile("/Users/SriHari/downloads/excelDownloadSheet.xlxs") 
const worksheet = workbook.getWorksheet('Sheet1');
worksheet.eachRow( (row,rowNumber) => 
{
    row.eachCell( (cell,colNumber) => 
    {
        console.log(cell.value);
    })
})

}

excelTest();



/*

const ExcelJs = require('exceljs');
const workbook = new ExcelJs.Workbook();
workbook.xlxs.readFile("/Users/SriHari/downloads/excelDownloadSheet.xlxs").then(function , 
{
const worksheet = workbook.getWorksheet('Sheet1');
worksheet.eachRow( (row,rowNumber) => 
{
    row.eachCell( (cell,colNumber) => 
    {
        console.log(cell.value);
    })
})
})

/*