# Project Setup and Usage Guide

Follow the steps below to set up your environment and configure the project for testing.

## 1. Install Dependencies

First, install all the required dependencies by running:

```bash
npm install
```

This will install all the necessary packages to get the project up and running.

## 2. Configure the Project

Create or update the `config.json` file with the appropriate settings. The configuration should look like this:

```json
{
  "sitemap": "<url to sitemap>",
  "additionalUrls": [
    // Add any extra URLs not included in the sitemap
  ],
  "ignoreUrls": [
    // List any URLs to ignore, whether from the sitemap or additional URLs
  ]
}
```

### Configuration Details:
- **sitemap**: Provide the URL to your sitemap here.
- **additionalUrls**: Use this array to add any extra URLs not included in the sitemap but that you want to include in your tests.
- **ignoreUrls**: List any URLs to exclude from testing, whether they’re from the sitemap or the additional URLs list.

## 3. Update `template.test.js`

The `template.test.js` file contains the main test logic. Here's how you can customize it:

1. **Set the Website URL**:  
   The `template.test.js` file includes a variable called `website`, which is populated dynamically with URLs from your sitemap or the `additionalUrls` list using the `prepare.js` script. 
   
   You can add as many test cases as needed, and the `website` variable will automatically navigate to each URL for testing.

2. **Test Functionalities**:  
   The default `template.test.js` file includes a few basic test cases:
   - **Scroll to Bottom**: Verifies that the page scrolls correctly.
   - **Title Check**: Confirms that the page title is correct.
   - **URL Validation**: Ensures that the `og:url` meta tag matches the page URL.

## How to Use

### Option 1: Pre-generate Test Files from the Sitemap

To generate a test file for each URL in your sitemap, run:

```bash
node prepare.js
```

This will create starter test files for each URL listed in your sitemap, which you can then modify as needed.

### Option 2: Generate Test Files On-the-Fly

By default, the project is configured to automatically generate and delete test files each time you run the tests. This allows you to run the tests without manually generating or cleaning up test files.

The default behavior is handled using `pretest` and `posttest` scripts:
- **`pretest`**: Creates test files before the tests run.
- **`posttest`**: Cleans up test files after the tests are completed.

## Additional Notes
- You can extend or modify `template.test.js` to add more test cases as needed.
