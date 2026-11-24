// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { worker, workers } from 'node:cluster';
import { trace } from 'node:console';


const config = ({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  retries :1,
  timeout:40*1000,  // Every test in the test folder should complete execution in 30 sec 
  workers: 1,
  expect : {  // assertion validation timeout 
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'firefox Execution', 
    use: {
        browserName: 'webkit',
        headless : true, 
        navigationTimeout: 30 * 1000, 
        trace: 'on',
        ///viewPort: {width:720,height:720},
        ...devices['iphone 11'],
        video: 'retain-on-failure',
        screenshot: 'on',
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless : true, 
        navigationTimeout: 30 * 1000, 
        trace: 'on',       
      }
    }
    ],

});
module.exports = config
