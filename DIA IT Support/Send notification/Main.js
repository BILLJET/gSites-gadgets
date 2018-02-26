/* =================================================== */
/*          DIA IT SUPPORT- Send notification          */
/* =================================================== */
/*                                                     */
/*   © 2018 Piotr Biller                               */
/*                                                     */
/*   piotr.biller@contractors.roche.com                */
/*   piotr.biller@billennium.pl                        */
/*                                                     */
/* =================================================== */

// sheetId- You have to add the link to the spreadsheet for email list
// postSheetId- You have to add the link to the spreadsheet for saved posts
var sheetId = "";
var postSheetId = "";

function doGet() {
    return HtmlService.createTemplateFromFile("Index").evaluate();
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}

function confirmMail(group, dateNow, subject, author, message) {
    var correctSheet = SpreadsheetApp.openById(sheetId);
    var confirm = correctSheet.getSheetByName("Confirmation");
    confirm.appendRow([group, dateNow, subject, author, message])
}

function saveNewPost(date, subject, author, content, id, archived, type) {
    var correctSheet = SpreadsheetApp.openById(postSheetId);
    var confirm = correctSheet.getSheetByName("Posts");
    confirm.appendRow([date, subject, author, content, id, archived, type])
}

// default list
function blankListSendEmails(blankSubject, id, blankMessage, fName, lName) {
    var correctSheet = SpreadsheetApp.openById(sheetId);
    var sheet = correctSheet.getSheetByName("EmailList");
    var dateNow = new Date();

    var startRow = 2;
    var numRows = sheet.getDataRange().getValues();
    var lengthRows = numRows.length - 1;

    var dataRange = sheet.getRange(startRow, 1, lengthRows, 2)

    var data = dataRange.getValues();
    for (i in data) {
        var row = data[i];
        var emailAddress = row[0];

        var unicode = String.fromCharCode(10);
        var readyBlankMessage = blankMessage.replace(new RegExp(unicode, 'gi'), '<br/>');

        var message = '<table style="width:550px;"><tr><td><img src="https://avatars.zapodaj.net/images/f39c0a792ccf.png" style="width:550px;"/></td></tr><tr><td style="font-size:12px"><p style="padding-bottom:10px;margin:0;">ID IM: ' + id + '</p><p style="padding-bottom:0;margin:0;">Dear All</p><p>' + readyBlankMessage + '</p><p style="padding-bottom:10px;padding-top:10px;margin:0;">Kind regards</p><p style="padding-bottom:0;margin:0;">' + fName + ' ' + lName + '</p></td></tr><tr><td style="font-size:10px"><p style="font-style:italic;">********* DO NOT REPLY TO THIS EMAIL *********</p></td></tr></table>';
        var subject = blankSubject;
        var senderName = fName + ' ' + lName;
        MailApp.sendEmail(emailAddress, subject, '', { htmlBody: message, name: senderName });
    }

    var author = fName + ' ' + lName;
    confirmMail('Default', dateNow, blankSubject, author, readyBlankMessage);

    var saveMessage = '<span>Dear all</span></br></br><span>' + readyBlankMessage + '</span></br></br></br><span>Kind Regards</span></br></br><span>' + author + '</span>';

    var specialSign = String.fromCharCode(39);
    subject = subject.replace(new RegExp(specialSign, 'gi'), '&rsquo;');
    author = author.replace(new RegExp(specialSign, 'gi'), '&rsquo;');
    saveMessage = saveMessage.replace(new RegExp(specialSign, 'gi'), '&rsquo;');
    id = id.replace(new RegExp(specialSign, 'gi'), '&rsquo;');

    saveNewPost(dateNow, subject, author, saveMessage, id, 'No', 'blank');
}

//declaration list
function declarListSendEmails(declarSubject, declarNr, declarMessage, declarIncidentTime, declarTime, declarEstimate, declarUpdates, declarFirstName, declarLastName, declarMajorIncident) {
    var correctSheet = SpreadsheetApp.openById(sheetId);
    var sheet = correctSheet.getSheetByName("EmailList");
    var dateNow = new Date();

    var startRow = 2;
    var numRows = sheet.getDataRange().getValues();
    var lengthRows = numRows.length - 1;

    var dataRange = sheet.getRange(startRow, 1, lengthRows, 2)

    var data = dataRange.getValues();
    for (i in data) {
        var row = data[i];
        var emailAddress = row[0];
        var unicode = String.fromCharCode(10);
        var readyDeclarMessage = declarMessage.replace(new RegExp(unicode, 'gi'), '<br/>');

        if (!declarUpdates) {
            var readyDeclarUpdates = '';
        }
        else if (declarUpdates) {
            var readyDeclarUpdateCode = declarUpdates.replace(new RegExp(unicode, 'gi'), '<br/>');
            var readyDeclarUpdates = '<p style="padding-bottom:0px;margin:0;font-weight:bold;">Updates from now on</p><p style="padding-bottom:20px;margin:0;">' + readyDeclarUpdateCode + '</p>';
        }

        var message = '<table style="width:550px;"><tr><td><img src="https://avatars.zapodaj.net/images/f39c0a792ccf.png" style="width:550px;" /></td></tr><tr><td style="font-size:12px"><p style="padding-bottom:20px;margin:0;">ID IM: ' + declarNr + '</p><p style="padding-bottom:20px;margin:0;">Dear All</p><p style="padding-bottom:10px;margin:0;">' + readyDeclarMessage + '</p><p style="padding-bottom:20px;margin:0;">Our teams are working with highest priority on the resolution of this incident.</p><p style="padding-bottom:0px;margin:0;font-weight:bold;">Incident Log Time</p><p style="padding-bottom:20px;margin:0;">' + declarIncidentTime + '</p><p style="padding-bottom:0px;margin:0;font-weight:bold;">Major Incident Declaration Time</p><p style="padding-bottom:20px;margin:0;">' + declarTime + '</p><p style="padding-bottom:0px;margin:0;font-weight:bold;">Current Estimated Resolution Time</p><p style="padding-bottom:20px;margin:0;">' + declarEstimate + '</p>' + readyDeclarUpdates + '<p style="padding-bottom:20px;margin:0;">Please receive our sincere apologies for the inconvenience caused.</p><p style="padding-bottom:20px;margin:0;">Kind regards</p><p style="padding-bottom:0;margin:0;">' + declarFirstName + ' ' + declarLastName + '</p><p style="padding-bottom:20px;margin:0;">' + declarMajorIncident + '</p></td></tr><tr><td style="font-size:10px"><p style="font-style:italic;">********* DO NOT REPLY TO THIS EMAIL *********</p></td></tr></table>';
        var subject = '[DECLARATION] DIA IT MAJOR INCIDENT- ' + declarSubject;
        var senderName = declarFirstName + ' ' + declarLastName;
        MailApp.sendEmail(emailAddress, subject, '', { htmlBody: message, name: senderName });
    }
    var author = declarFirstName + ' ' + declarLastName;
    confirmMail('Declaration', dateNow, declarSubject, author, readyDeclarMessage);

    var saveMessage = '<span>Dear all</span></br></br>' + readyDeclarMessage + '</span></br></br><span>Our teams are working with highest priority on the resolution of this incident.</span></br></br><span>Incident Log Time</span></br><span>' + declarIncidentTime + '</span></br></br><span>Major Incident Declaration Time</span></br><span>' + declarTime + '</span></br></br><span>Current Estimated Resolution Time</span></br><span>' + declarEstimate + '</span></br></br><span>Please receive our sincere apologies for the inconvenience caused.</span></br></br><span>Kind Regards</span></br></br><span>' + author + '</span></br><span>' + declarMajorIncident + '</span>';

    var specialSign = String.fromCharCode(39);
    subject = subject.replace(new RegExp(specialSign, 'gi'), '&rsquo;');
    author = author.replace(new RegExp(specialSign, 'gi'), '&rsquo;');
    saveMessage = saveMessage.replace(new RegExp(specialSign, 'gi'), '&rsquo;');
    declarNr = declarNr.replace(new RegExp(specialSign, 'gi'), '&rsquo;');

    saveNewPost(dateNow, subject, author, saveMessage, declarNr, 'No', 'declaration');
}

//update list
function updateListSendEmails(updateSubject, updateID, updateNr, updateSystem, updateDate, updateIncidentTime, updateTime, updateEstimate, updateUpdates, updateFirstName, updateLastName, updateMajorIncident) {
    var correctSheet = SpreadsheetApp.openById(sheetId);
    var sheet = correctSheet.getSheetByName("EmailList");
    var dateNow = new Date();

    var startRow = 2;
    var numRows = sheet.getDataRange().getValues();
    var lengthRows = numRows.length - 1;

    var dataRange = sheet.getRange(startRow, 1, lengthRows, 2)

    var data = dataRange.getValues();
    for (i in data) {
        var row = data[i];
        var emailAddress = row[0];

        var unicode = String.fromCharCode(10);
        var readyUpdateMessage = updateSystem.replace(new RegExp(unicode, 'gi'), '<br/>');

        if (!updateUpdates) {
            var readyUpdateUpdates = '';
        }
        else if (updateUpdates) {
            var readyUpdateCode = updateUpdates.replace(new RegExp(unicode, 'gi'), '<br/>');
            var readyUpdateUpdates = '<p style="padding-bottom:0px;margin:0;font-weight:bold;">Updates from now on</p><p style="padding-bottom:20px;margin:0;">' + readyUpdateCode + '</p>';
        }

        var message = '<table style="width:550px;"><tr><td><img src="https://avatars.zapodaj.net/images/f39c0a792ccf.png" style="width:550px;" /></td></tr><tr><td style="font-size:12px"><p style="padding-bottom:20px;margin:0;">ID IM: ' + updateNr + '</p><p style="padding-bottom:20px;margin:0;">Dear All</p><p style="padding-bottom:20px;margin:0;">' + readyUpdateMessage + '.</p><p style="padding-bottom:10px;margin:0;">Our teams continue with highest priority on the resolution of this incident.</p><p style="padding-bottom:0px;margin:0;font-weight:bold;">Incident Log Time</p><p style="padding-bottom:20px;margin:0;">' + updateIncidentTime + '</p><p style="padding-bottom:0px;margin:0;font-weight:bold;">Major Incident Declaration Time</p><p style="padding-bottom:20px;margin:0;">' + updateTime + '</p><p style="padding-bottom:0px;margin:0;font-weight:bold;">Current Estimated Resolution Time</p><p style="padding-bottom:20px;margin:0;">' + updateEstimate + '</p>' + readyUpdateUpdates + '<p style="padding-bottom:20px;margin:0;">Please receive our sincere apologies for the inconvenience caused.</p><p style="padding-bottom:20px;margin:0;">Kind regards</p><p style="padding-bottom:0px;margin:0;">' + updateFirstName + ' ' + updateLastName + '</p><p style="padding:0px 0;margin:0;">' + updateMajorIncident + '</p></td></tr><tr><td style="font-size:10px"><p style="padding-top:20px;font-style:italic;">********* DO NOT REPLY TO THIS EMAIL *********</p></td></tr></table>';
        var subject2 = '[UPDATE NO.' + updateID + ']' + ' DIA IT MAJOR INCIDENT- ' + updateSubject;
        var senderName = updateFirstName + ' ' + updateLastName;
        MailApp.sendEmail(emailAddress, subject2, '', { htmlBody: message, name: senderName });
    }
    var author = updateFirstName + ' ' + updateLastName;
    confirmMail('Update', dateNow, updateSubject, author, readyUpdateMessage);

    var saveMessage = '<span>Dear all</span></br></br><span>' + readyUpdateMessage + '</span></br></br><span>Our teams continue with highest priority on the resolution of this incident.</span></br></br><span>Incident Log Time</span></br><span>' + updateIncidentTime + '</span></br></br><span>Major Incident Declaration Time</span></br><span>' + updateTime + '</span></br></br><span>Current Estimated Resolution Time</span></br><span>' + updateEstimate + '</span></br></br><span>Please receive our sincere apologies for the inconvenience caused.</span></br></br><span>Kind Regards</span></br></br><span>' + author + '</span></br><span>' + updateMajorIncident + '</span>';

    var specialSign = String.fromCharCode(39);
    subject2 = subject2.replace(new RegExp(specialSign, 'gi'), '&rsquo;');
    author = author.replace(new RegExp(specialSign, 'gi'), '&rsquo;');
    saveMessage = saveMessage.replace(new RegExp(specialSign, 'gi'), '&rsquo;');
    updateID = updateID.replace(new RegExp(specialSign, 'gi'), '&rsquo;');

    saveNewPost(dateNow, subject2, author, saveMessage, updateID, 'No', 'update');
}

//resolve list
function resolveListSendEmails(resolveSubject, resolveNr, resolveSystem, resolveIncidentTime, resolveTime, resolveResolution, resolveOurTeam, resolveFirstName, resolveLastName, resolveMajorIncident) {
    var correctSheet = SpreadsheetApp.openById(sheetId);
    var sheet = correctSheet.getSheetByName("EmailList");
    var dateNow = new Date();

    var startRow = 2;
    var numRows = sheet.getDataRange().getValues();
    var lengthRows = numRows.length - 1;

    var dataRange = sheet.getRange(startRow, 1, lengthRows, 2)

    var data = dataRange.getValues();
    for (i in data) {
        var row = data[i];
        var emailAddress = row[0];

        var unicode = String.fromCharCode(10);
        var readyResolveSystem = resolveSystem.replace(new RegExp(unicode, 'gi'), '<br/>');

        if (!resolveOurTeam) {
            var readyResolveOurTeamMail = '';
            var readyResolveOurTeamPost = '';
        }
        else if (resolveOurTeam) {
            var readyResolveOurTeamCode = resolveOurTeam.replace(new RegExp(unicode, 'gi'), '<br/>');
            var readyResolveOurTeamMail = '<p style="padding-bottom:10px;margin:0;">' + readyResolveOurTeamCode + '</p>';
            var readyResolveOurTeamPost = '<span>' + readyResolveOurTeamCode + '</span></br></br>';
        }

        var message = '<table style="width:550px;"><tr><td><img src="https://avatars.zapodaj.net/images/f39c0a792ccf.png" style="width:550px;" /></td></tr><tr><td style="font-size:12px"><p style="padding-bottom:20px;margin:0;">ID IM: ' + resolveNr + '</p><p style="padding-bottom:20px;margin:0;">Dear All</p><p style="padding-bottom:20px;margin:0;">' + readyResolveSystem + '</p><p style="padding-bottom:0px;margin:0;font-weight:bold;">Incident Log Time</p><p style="padding-bottom:20px;margin:0;">' + resolveIncidentTime + '</p><p style="padding-bottom:0px;margin:0;font-weight:bold;">Major Incident Declaration Time</p><p style="padding-bottom:20px;margin:0;">' + resolveTime + '</p><p style="padding-bottom:0px;margin:0;font-weight:bold;">Major Incident Resolution Time</p><p style="padding-bottom:20px;margin:0;">' + resolveResolution + '</p>' + readyResolveOurTeamMail + '<p style="padding-bottom:20px;margin:0;">Thank you very much for your support and once again apologies for the inconvenience caused. </p><p style="padding-bottom:20px;margin:0;">Kind regards</p><p style="padding-bottom:0;margin:0;">' + resolveFirstName + ' ' + resolveLastName + '</p><p style="padding-bottom:20px;margin:0;">' + resolveMajorIncident + '</p></td></tr><tr><td style="font-size:10px"><p style="font-style:italic;">********* DO NOT REPLY TO THIS EMAIL *********</p></td></tr></table>';
        var subject = '[RESOLVED] DIA IT MAJOR INCIDENT– ' + resolveSubject;
        var senderName = resolveFirstName + ' ' + resolveLastName;
        MailApp.sendEmail(emailAddress, subject, '', { htmlBody: message, name: senderName });
    }
    var author = resolveFirstName + ' ' + resolveLastName;
    confirmMail('Resolve', dateNow, resolveSubject, author, readyResolveOurTeamPost);

    var saveMessage = '<span>Dear all</span></br></br><span>' + readyResolveSystem + '</span></br></br><span>Incident Log Time</span></br><span>' + resolveIncidentTime + '</span></br></br><span>Major Incident Declaration Time</span></br><span>' + resolveTime + '</span></br></br><span>Current Estimated Resolution Time</span></br><span>' + resolveResolution + '</span></br></br>' + readyResolveOurTeamPost + '<span>Thank you very much for your support and once again apologies for the inconvenience caused.</span></br></br><span>Kind Regards</span></br></br><span>' + author + '</span></br><span>' + resolveMajorIncident + '</span>';

    var specialSign = String.fromCharCode(39);
    subject = subject.replace(new RegExp(specialSign, 'gi'), '&rsquo;');
    author = author.replace(new RegExp(specialSign, 'gi'), '&rsquo;');
    saveMessage = saveMessage.replace(new RegExp(specialSign, 'gi'), '&rsquo;');
    resolveNr = resolveNr.replace(new RegExp(specialSign, 'gi'), '&rsquo;');

    saveNewPost(dateNow, subject, author, saveMessage, resolveNr, 'No', 'update');
}
