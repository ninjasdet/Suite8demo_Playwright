const fs = require('fs');
const path = require('path');

function generateVCard(firstName, lastName, email, mobile) {
  const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
N:${lastName};${firstName};;;
EMAIL:${email}
TEL;TYPE=CELL:${mobile}
END:VCARD
  `.trim();

  const filePath = path.join(process.cwd(), `${firstName}_${lastName}.vcf`);
  fs.writeFileSync(filePath, vcard, 'utf8');

  return filePath;
}

function writeEmptyFile() {  
 const filePath = path.join(process.cwd(), "invalid_file.txt");
    fs.writeFileSync(filePath, '', 'utf8');
    return filePath;
}


function writeCsvTest(filePath, newValue) {

  try {

    // Read CSV file
    const data = fs.readFileSync(filePath, 'utf8');

    // Convert CSV into array
    let rows = data.split('\n');

    // Keep first 2 rows only
    rows = rows.slice(0, 2);

    // Add empty rows if needed
    while (rows.length < 5) {
      rows.push('');
    }

    // Insert new value in first empty row
    for (let i = 0; i < rows.length; i++) {

      if (!rows[i] || rows[i].trim() === '') {
        rows[i] = newValue;
        break;
      }
    }

    // Convert back to CSV
    const updatedCsv = rows.join('\n');

    // Save file
    fs.writeFileSync(filePath, updatedCsv, 'utf8');

    console.log('CSV updated successfully');

  } catch (error) {

    console.log('Error:', error.message);
  }
}

module.exports = { generateVCard, writeEmptyFile, writeCsvTest };
