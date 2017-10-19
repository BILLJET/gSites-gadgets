function PostService() {
  this.getAllDataFromSheet = getAllDataFromSheet;
  
  function getAllDataFromSheet(){
    var dataFromSheet = getDataFromSheet();
    var postModel = new PostModel(dataFromSheet);
    return postModel.rawPostModels;
  }
  
  function getSheet(){
    var spreadsheet = SpreadsheetApp.openById(sheetId);
    var sheet = spreadsheet.getSheetByName(SitesApp.getActivePage().getUrl());
    return sheet;
  }

  function getDataFromSheet(){
    var sheet = getSheet();
    var dataFromSheet = sheet.getRange(2,1,sheet.getLastRow()-1,sheet.getLastColumn()).getValues();
    return dataFromSheet;
  }
}
