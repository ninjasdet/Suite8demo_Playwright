const fs = require('fs');

async function writeCsvTest(filePath, newValue) {

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

module.exports = writeCsvTest;