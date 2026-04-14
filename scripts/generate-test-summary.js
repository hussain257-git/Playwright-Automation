#!/usr/bin/env node

/**
 * Generate Playwright Test Report Summary
 * Parses test-results.json and generates detailed metrics
 */

const fs = require('fs');
const path = require('path');

try {
  const testResultsPath = path.join(__dirname, '../test-results.json');
  
  if (!fs.existsSync(testResultsPath)) {
    console.log('::warning::test-results.json not found. Using default values.');
    const defaultSummary = {
      totalTests: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      broken: 0,
      suites: [],
      failedTests: []
    };
    console.log(JSON.stringify(defaultSummary));
    process.exit(0);
  }

  const testResults = JSON.parse(fs.readFileSync(testResultsPath, 'utf8'));
  
  let totalTests = 0;
  let passed = 0;
  let failed = 0;
  let skipped = 0;
  let broken = 0;
  let totalDuration = 0;
  const suites = [];
  const failedTests = [];

  if (testResults.suites && Array.isArray(testResults.suites)) {
    testResults.suites.forEach(suite => {
      if (suite.specs) {
        suite.specs.forEach(spec => {
          totalTests++;
          totalDuration += spec.duration || 0;

          const status = spec.tests?.[0]?.status;
          
          if (status === 'passed') {
            passed++;
          } else if (status === 'failed') {
            failed++;
            failedTests.push({
              title: spec.title,
              suite: suite.title,
              error: spec.tests?.[0]?.error?.message || 'Unknown error'
            });
          } else if (status === 'skipped') {
            skipped++;
          } else if (status === 'broken') {
            broken++;
            failedTests.push({
              title: spec.title,
              suite: suite.title,
              error: 'Test broken'
            });
          }
        });

        suites.push({
          name: suite.title,
          tests: suite.specs?.length || 0,
          passed: suite.specs?.filter(s => s.tests?.[0]?.status === 'passed').length || 0,
          failed: suite.specs?.filter(s => s.tests?.[0]?.status === 'failed').length || 0,
          skipped: suite.specs?.filter(s => s.tests?.[0]?.status === 'skipped').length || 0,
          broken: suite.specs?.filter(s => s.tests?.[0]?.status === 'broken').length || 0
        });
      }
    });
  }

  const summary = {
    totalTests,
    passed,
    failed,
    skipped,
    broken,
    passRate: totalTests > 0 ? ((passed / totalTests) * 100).toFixed(2) : 0,
    failRate: totalTests > 0 ? ((failed / totalTests) * 100).toFixed(2) : 0,
    totalDuration: (totalDuration / 1000).toFixed(2),
    suites,
    failedTests
  };

  console.log(JSON.stringify(summary, null, 2));
  
  // Also output to file for debugging
  fs.writeFileSync(
    path.join(__dirname, '../test-summary.json'),
    JSON.stringify(summary, null, 2)
  );

} catch (error) {
  console.error('Error parsing test results:', error.message);
  const defaultSummary = {
    totalTests: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    broken: 0,
    suites: [],
    failedTests: [],
    error: error.message
  };
  console.log(JSON.stringify(defaultSummary));
  process.exit(1);
}
