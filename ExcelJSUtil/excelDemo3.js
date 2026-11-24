const ExcelJs = require('exceljs');

async function WriteexcelTest(searchText)
{    
let output = {row:-1, column:-1};
const workbook = new ExcelJs.Workbook();
await workbook.xlxs.readFile("/Users/SriHari/downloads/excelDownloadSheet.xlxs") 
const worksheet = workbook.getWorksheet('Sheet1');

readExcel(worksheet,searchText);

const cell = worksheet.getCell(output.row,output.column);
cell.value = "Republic";
await workbook.xlxs.writeFile("/Users/SriHari/downloads/excelDownloadSheet.xlxs");

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


WriteexcelTest("Banana");
