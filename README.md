# Getting Started

To get started with the project, follow the steps below to set up your environment and configuration.

### 1. Install Node Dependencies

Run the following command to install all required dependencies for the project:

```bash
npm install
```

### 2. Set Up the Configuration

Create or update your `config.json` file with the appropriate settings:

```json
{
  "sitemap": "<url to sitemap>",
  "additionalUrls": [
    // List any additional URLs here that are not part of the sitemap
  ],
  "ignoreUrls": [
    // List URLs to ignore, either from the sitemap or additional URLs
  ]
}
```

- **sitemap**: Provide the URL to your sitemap here.
- **additionalUrls**: Use this array to add any extra URLs that are not included in the sitemap but should be part of the tests.
- **ignoreUrls**: List any URLs that should be excluded from testing, either from the sitemap or additional URLs.

### 3. Update `template.test.js`

The `template.test.js` file contains the main test structure. Follow these steps to customize and extend your tests:

1. **Setting the Website URL:**
   - The file has a variable named `website`, which is dynamically populated with URLs from the sitemap or the additional URLs list using `prepare.js`.
   - You can add as many test cases as needed, using the `website` variable to navigate to the URL.

2. **Test Functionalities:**
   - The `template.test.js` file includes basic functionalities such as:
     - **Scroll to Bottom**: Ensures the page scrolls correctly.
     - **Title Check**: Verifies that the page title is correct.
     - **URL Validation**: Confirms that the `og:url` meta tag matches the page URL.
