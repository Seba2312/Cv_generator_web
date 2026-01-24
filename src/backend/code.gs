function doGet(e) {
  // Read from the first sheet, cell A1
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data = sheet.getRange("A1").getValue();
  
  // If empty, return empty object
  if (!data) data = "{}";
  
  return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = e.postData.contents;
    var json = JSON.parse(data);
    
    // Write to the first sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    
    // A: Full JSON (Hidden/Raw)
    sheet.getRange("A1").setValue(data);
    
    // B: Meta Info
    sheet.getRange("B1").setValue("Last Updated: " + new Date());
    sheet.getRange("B2").setValue("Name: " + (json.personalInfo ? json.personalInfo.fullName : "Unknown"));
    sheet.getRange("B3").setValue("Email: " + (json.personalInfo ? json.personalInfo.email : "Unknown"));

    // C: Education Summary
    var eduSummary = json.education ? json.education.map(function(ed) { return ed.title + " (" + ed.date + ")"; }).join("\n") : "";
    sheet.getRange("C1").setValue("Education Summary");
    sheet.getRange("C2").setValue(eduSummary);

    // D: Experience Summary
    var expSummary = json.experience ? json.experience.map(function(exp) { return exp.title + " - " + exp.subtitle + " (" + exp.date + ")"; }).join("\n") : "";
    sheet.getRange("D1").setValue("Experience Summary");
    sheet.getRange("D2").setValue(expSummary);

    // E: Projects Summary
    var projSummary = json.projects ? json.projects.map(function(p) { return p.title + ": " + p.subtitle; }).join("\n") : "";
    sheet.getRange("E1").setValue("Projects Summary");
    sheet.getRange("E2").setValue(projSummary);

    // F: Skills Summary
    var skillSummary = json.skills ? ("Langs: " + json.skills.languages.join(", ") + "\nTech: " + json.skills.technical.join(", ")) : "";
    sheet.getRange("F1").setValue("Skills Summary");
    sheet.getRange("F2").setValue(skillSummary);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
     return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}
