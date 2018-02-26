/* =================================================== */
/*          DIA IT SUPPORT- People Announcements       */
/* =================================================== */
/*                                                     */
/*   © 2018 Piotr Biller                               */
/*                                                     */
/*   piotr.biller@contractors.roche.com                */
/*   piotr.biller@billennium.pl                        */
/*                                                     */
/* =================================================== */

// sheetId - You have to add the link to the spreadsheet
var sheetId = "";

function doGet() {
    return HtmlService.createTemplateFromFile("Index").evaluate();
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}

function getAllRecordsFromSheet() {
    var dataService = new DataService();
    var dataFromSheet = dataService.getAllDataFromSheet();
    return dataFromSheet
}
