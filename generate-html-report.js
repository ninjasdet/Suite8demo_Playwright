const fs = require('fs');
const path = require('path');

// Input JSON from Cucumber v8
const input = path.join(__dirname, 'reports', 'report.json');
const output = path.join(__dirname, 'reports', 'report.html');

const json = JSON.parse(fs.readFileSync(input, 'utf8'));

// Scenario-level stats
let passed = 0;
let failed = 0;
let skipped = 0;

// Count SCENARIOS, not steps
json.forEach(feature => {
  feature.elements.forEach(scenario => {
    const hasFailed = scenario.steps.some(s => s.result.status === 'failed');
    const allPassed = scenario.steps.every(s => s.result.status === 'passed');

    if (hasFailed) failed++;
    else if (allPassed) passed++;
    else skipped++;
  });
});

// HTML content
let html = `
<html>
<head>
<title>Cucumber Test Report</title>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>
body { 
  font-family: Arial; 
  padding: 20px; 
  background: #f7f7f7; 
}
h1 { color: #333; }
h2 { margin-top: 30px; }
.pass { color: green; font-weight: bold; }
.fail { color: red; font-weight: bold; }
.skipped { color: #c7a600; font-weight: bold; }

.feature-box {
  background: white;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* Force chart to stay small */
.chart-container {
  width: 220px;
  height: 220px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

#summaryChart {
  width: 200px !important;
  height: 200px !important;
}
</style>
</head>

<body>
<h1>Cucumber Test Report</h1>

<h2>Scenario Summary</h2>

<div class="chart-container">
  <canvas id="summaryChart"></canvas>
</div>

<script>
const ctx = document.getElementById('summaryChart').getContext('2d');
new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Passed', 'Failed', 'Skipped'],
    datasets: [{
      data: [${passed}, ${failed}, ${skipped}],
      backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: false,
    maintainAspectRatio: false
  }
});
</script>
`;

json.forEach(feature => {
  html += `<div class="feature-box"><h2>${feature.name}</h2>`;

  feature.elements.forEach(scenario => {
    html += `<h3>${scenario.name}</h3><ul>`;

    scenario.steps.forEach(step => {
      const status = step.result.status;
      html += `<li class="${status}">${step.keyword} ${step.name} — ${status}</li>`;
    });

    html += `</ul>`;
  });

  html += `</div>`;
});

html += `</body></html>`;

fs.writeFileSync(output, html, 'utf8');

console.log("HTML report generated at reports/report.html");