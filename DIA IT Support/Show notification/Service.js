/* =================================================== */
/*          DIA IT SUPPORT- Show notification          */
/* =================================================== */
/*                                                     */
/*   © 2018 Piotr Biller                               */
/*                                                     */
/*   piotr.biller@contractors.roche.com                */
/*   piotr.biller@billennium.pl                        */
/*                                                     */
/* =================================================== */

function DataService() {
  this.getAllDataFromSheet = getAllDataFromSheet;
  
  function getAllDataFromSheet(){
    var postModel = new PostModel(getDataFromSheetAllRange(1,1,0));
    return postModel.rawPostModels;
  }
  
  function getSheet(sheetNumber){
    var spreadsheet = SpreadsheetApp.openById(sheetId);
    var sheet = spreadsheet.getSheets()[sheetNumber];
    return sheet;
  }
  
  function getDataFromSheetAllRange(beginRow,beginColumn,sheetNumber){
    var sheet = getSheet(sheetNumber);
    var rawData = sheet.getRange(beginRow,beginColumn, sheet.getLastRow(), sheet.getLastColumn());
    return rawData.getValues();
  }
}
