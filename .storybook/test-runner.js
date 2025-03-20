const { injectAxe, checkA11y } = require('axe-playwright');

module.exports = {
  async preVisit(page, context) {
    await injectAxe(page);
    try {
      await page.coverage.startJSCoverage({
        resetOnNavigation: false
      });
      await page.coverage.startCSSCoverage({
        resetOnNavigation: false
      });
    } catch (error) {
      if (!error.message.includes('already enabled')) {
        throw error;
      }
    }
  },
  async postVisit(page, context) {
    // Wait for any animations to complete
    await page.waitForTimeout(500);
    
    // Run accessibility tests
    await checkA11y(page, '#storybook-root', {
      reportIncludedRules: true,
      detailedReport: true,
      detailedReportOptions: {
        html: true
      }
    });
    
    try {
      const jsCoverage = await page.coverage.stopJSCoverage();
      const cssCoverage = await page.coverage.stopCSSCoverage();
      
      // Process coverage data as needed
      return {
        jsCoverage,
        cssCoverage
      };
    } catch (error) {
      console.warn('Error collecting coverage:', error);
      return {};
    }
  }
}; 