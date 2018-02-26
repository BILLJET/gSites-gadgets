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

//You have to add the link to the spreadsheet
var sheetId = "";

function doGet() {
  return HtmlService.createTemplateFromFile("Index").evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function getAllRecordsFromSheet(){
  var dataService =  new DataService(); 
  var dataFromSheet = dataService.getAllDataFromSheet();
  return dataFromSheet
}

function addItemToArchive(item, columnLength){
  var correctSheet = SpreadsheetApp.openById(sheetId);
  var correctTab = correctSheet.getSheetByName("Posts");
  
  for(var i=2;i<=columnLength;i++){
    var value = correctTab.getRange(i, 5).getValue();    
    if(value == item){
       correctTab.getRange(i,6).setValue('Yes');
    }
  }
}
