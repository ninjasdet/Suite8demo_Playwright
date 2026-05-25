**How to Install & Run Tests**

**Install Dependencies**

npm install

**Running Tests**

  _Run a specific feature (step definition)_

    npm run test -- features/contacts.feature

    npm run test -- features/leads.feature

  _Run tests by tags_

    npm run test -- --tags "@contacts"

    npm run test -- --tags "@leads"

  **Note**: The double dash -- is required so npm passes arguments to Cucumber.

  _Run all tests_

    npm run test

  _Generate HTML report after running tests_

    npm run report:html

    This will read reports/report.json and generate:
