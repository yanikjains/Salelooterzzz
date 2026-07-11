// ── Salelooterz — Google Apps Script Email Capture ────────────────────────
// Deploy this as a Web App (Execute as: Me, Who has access: Anyone).
// Replace SHEET_ID with your Google Sheet's ID from its URL.
// ──────────────────────────────────────────────────────────────────────────

var SHEET_ID = "YOUR_SHEET_ID_HERE";

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var email = data.email.trim().toLowerCase();
  var sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  var lastRow = sheet.getLastRow();

  if (lastRow > 1) {
    var rows = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var i = 0; i < rows.length; i++) {
      if (rows[i][0].toString().trim().toLowerCase() === email) {
        return output("duplicate");
      }
    }
  }

  sheet.appendRow([email]);
  return output("success");
}

function output(status) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: status }))
    .setMimeType(ContentService.MimeType.JSON);
}
