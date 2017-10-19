// config gSheet ID
var sheetId = "1I38CMuP4Axk-tGBvpRUy28NKE-pBfwRuBihE4orCvqg";

function doGet() {
  var html = HtmlService.createTemplateFromFile("index");
  try {
    html.sitesData = getAllRecordsFromSheet();
  } catch(err) {
    var ee = HtmlService.createTemplateFromFile('error');
    return ee.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).setTitle("gSiteMapHoneycomb");  
  }
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