var sheetId = "1I38CMuP4Axk-tGBvpRUy28NKE-pBfwRuBihE4orCvqg";

function doGet() {
  var html = HtmlService.createTemplateFromFile("Index");
  html.sitesData = getAllRecordsFromSheet();
  return html.evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}


function getAllRecordsFromSheet(){
  var postService =  new PostService(); 
  var dataFromSheet =postService.getAllDataFromSheet();
  return dataFromSheet
}
