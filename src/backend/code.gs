function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data = sheet.getRange("A1").getValue();

  if (!data) data = "{}";

  return ContentService
    .createTextOutput(data)
    .setMimeType(ContentService.MimeType.JSON);
}

function formatSkills(skills) {
  return (skills || [])
    .filter(function(skill) {
      return skill && skill.isVisible !== false;
    })
    .map(function(skill) {
      return typeof skill === "string" ? skill : skill.name;
    })
    .filter(function(name) {
      return name;
    })
    .join(", ");
}

function doPost(e) {
  try {
    var data = e.postData.contents;
    var json = JSON.parse(data);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    sheet.getRange("A1").setValue(data);

    sheet.getRange("B1").setValue("Last Updated: " + new Date());
    sheet.getRange("B2").setValue("Name: " + (json.personalInfo ? json.personalInfo.fullName : "Unknown"));
    sheet.getRange("B3").setValue("Email: " + (json.personalInfo ? json.personalInfo.email : "Unknown"));

    var eduSummary = json.education
      ? json.education.map(function(ed) {
          return ed.title + " (" + ed.date + ")";
        }).join("\n")
      : "";

    sheet.getRange("C1").setValue("Education Summary");
    sheet.getRange("C2").setValue(eduSummary);

    var expSummary = json.experience
      ? json.experience.map(function(exp) {
          return exp.title + " - " + exp.subtitle + " (" + exp.date + ")";
        }).join("\n")
      : "";

    sheet.getRange("D1").setValue("Experience Summary");
    sheet.getRange("D2").setValue(expSummary);

    var projSummary = json.projects
      ? json.projects.map(function(p) {
          return p.title + ": " + p.subtitle;
        }).join("\n")
      : "";

    sheet.getRange("E1").setValue("Projects Summary");
    sheet.getRange("E2").setValue(projSummary);

    var skillSummary = json.skills
      ? (
          "Langs: " + formatSkills(json.skills.languages) +
          "\nTech: " + formatSkills(json.skills.technical) +
          "\nInterests: " + formatSkills(json.skills.interests)
        )
      : "";

    sheet.getRange("F1").setValue("Skills Summary");
    sheet.getRange("F2").setValue(skillSummary);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}