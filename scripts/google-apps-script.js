/**
 * =========================================================================
 * ZERYTHOUS ENTERPRISE - GOOGLE APPS SCRIPT WEBHOOK BACKEND
 * =========================================================================
 *
 * HOW TO DEPLOY:
 * 1. Open Google Sheets (create a new blank spreadsheet, e.g. "Zerythous Submissions").
 * 2. Click "Extensions" > "Apps Script".
 * 3. Delete any default code and paste this ENTIRE file into the editor.
 * 4. Click "Deploy" > "New deployment".
 * 5. Select type: "Web app".
 * 6. Set Description: "Zerythous Contact & Project Brief Webhook".
 * 7. Set "Execute as": "Me (your email)".
 * 8. Set "Who has access": "Anyone" (allows Next.js server to POST payloads).
 * 9. Click "Deploy" and copy the Web app URL (e.g. https://script.google.com/macros/s/.../exec).
 * 10. Paste the URL into your .env or Admin CMS Dashboard (GOOGLE_APPS_SCRIPT_URL).
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Lock for up to 30 seconds to handle concurrent form submissions
  lock.tryLock(30000);

  try {
    var rawData = e.postData.contents;
    var payload = JSON.parse(rawData);

    var sheet = getOrCreateSubmissionsSheet();

    // Map payload attributes
    var timestamp = payload.timestamp || new Date().toISOString();
    var type = payload.type || "unknown";
    var name = payload.name || "";
    var email = payload.email || "";
    var phone = payload.phone || "";
    var company = payload.company || "";
    var subjectOrProject = payload.subjectOrProject || "";
    var budget = payload.budget || "";
    var timeline = payload.timeline || "";
    var services = Array.isArray(payload.services) ? payload.services.join(", ") : "";
    var messageOrRequirements = payload.messageOrRequirements || "";

    // Append new row
    sheet.appendRow([
      timestamp,
      type,
      name,
      email,
      phone,
      company,
      subjectOrProject,
      services,
      budget,
      timeline,
      messageOrRequirements,
      "NEW_LEAD"
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Submission logged successfully into Google Sheets."
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "Zerythous Google Apps Script Webhook Engine",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSubmissionsSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Inquiries & Briefs");

  if (!sheet) {
    sheet = ss.insertSheet("Inquiries & Briefs");
    // Setup Header Row
    var headers = [
      "Timestamp",
      "Type",
      "Client Name",
      "Email Address",
      "Phone",
      "Company",
      "Subject / Initiative",
      "Capabilities",
      "Budget Tier",
      "Timeline",
      "Details / Scope",
      "Status"
    ];
    sheet.appendRow(headers);

    // Style the Header Row
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#050505");
    headerRange.setFontColor("#10B981");
    headerRange.setFontWeight("bold");
    headerRange.setFontSize(11);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }

  return sheet;
}
