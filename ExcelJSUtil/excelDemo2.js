const ExcelJs = require('exceljs');

async function excelTest()
{    
let output = {row:-1, column:-1};
const workbook = new ExcelJs.Workbook();
await workbook.xlxs.readFile("/Users/SriHari/downloads/excelDownloadSheet.xlxs") 
const worksheet = workbook.getWorksheet('Sheet1');

worksheet.eachRow( (row,rowNumber) => 
{
    row.eachCell( (cell,colNumber) => 
    {
        if(cell.value === "Apple")
        {
            output.row=rowNumber;
            output.column=colNumber;
        }
    })
})
}

async function excelTestReWrite()
{ 
const cell = worksheet.getCell(output.row,output.column);
cell.value = "Iphone";
await workbook.xlxs.writeFile("/Users/SriHari/downloads/excelDownloadSheet.xlxs");
}


excelTest();
