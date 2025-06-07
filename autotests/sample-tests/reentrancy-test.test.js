/* global describe, it, expect, beforeEach, afterEach, jest */
// Reentrancy Test using Playwright with mocked Ethereum contract
const { test, expect } = require('@playwright/test');

test.describe('Smart Contract Reentrancy Test (Mocked)', () => {
  test('detects reentrancy vulnerability when calling contract function', async ({ page }) => {
    // Create a simpler test page with direct JavaScript execution
    await page.goto('about:blank');

    // Setup the page with a simple contract mock and UI
    await page.evaluate(() => {
      // Initialize test variables
      window.contractBalance = 100;
      window.reentrancyCounter = 0;
      window.attackExecuted = false;

      // Create simple UI
      document.body.innerHTML = `
        <h1>Reentrancy Test</h1>
        <div>
          <p>Contract Balance: <span id="balance">100</span></p>
          <button id="normal">Normal Withdraw</button>
          <button id="attack">Simulate Reentrancy Attack</button>
          <div id="log"></div>
        </div>
      `;

      // Log function
      function log(message) {
        const logElement = document.getElementById('log');
        logElement.innerHTML += `<p>${message}</p>`;
        console.log(message);
      }

      // Update UI balance
      function updateBalance() {
        document.getElementById('balance').textContent = window.contractBalance;
      }

      // Vulnerable withdraw function (simplified)
      async function vulnerableWithdraw(amount, isAttack = false) {
        log(`Withdraw called with amount: ${amount}`);

        // Check balance
        if (window.contractBalance < amount) {
          log('ERROR: Insufficient funds');
          return false;
        }

        // This is the vulnerable part - if an attacker can call back into this function
        // before the balance is updated, they can drain more than they should

        // In a reentrancy attack, we call back into the same function
        if (isAttack && window.reentrancyCounter < 3) {
          window.reentrancyCounter++;
          log(`Reentrancy attack attempt #${window.reentrancyCounter}`);

          // Call back into the withdraw function before balance is updated
          await vulnerableWithdraw(amount, true);
        }

        // Balance is only updated after the external call (vulnerability!)
        window.contractBalance -= amount;
        log(`Balance updated to: ${window.contractBalance}`);
        updateBalance();

        return true;
      }

      // Normal withdraw button
      document.getElementById('normal').addEventListener('click', async () => {
        await vulnerableWithdraw(10, false);
        log('Normal withdraw completed');
      });

      // Attack button
      document.getElementById('attack').addEventListener('click', async () => {
        window.contractBalance = 100; // Reset for this test
        updateBalance();
        window.reentrancyCounter = 0;
        window.attackExecuted = true;

        log('Starting reentrancy attack simulation...');
        await vulnerableWithdraw(10, true);

        // Check if we were able to drain more than we should have
        const expectedBalance = 100 - 10; // Should be 90 in normal case
        const actualBalance = window.contractBalance;

        if (actualBalance < expectedBalance) {
          log(`VULNERABILITY DETECTED: Expected ${expectedBalance} but got ${actualBalance}`);
          log('Reentrancy attack was successful - contract drained multiple times');
          document.body.setAttribute('data-test-vulnerability-found', 'true');
        } else {
          log('Contract appears to be secure against reentrancy');
        }
      });
    });

    // Log console messages for debugging
    page.on('console', msg => console.log(`PAGE LOG: ${msg.text()}`));

    // Test normal withdraw
    await page.click('#normal');
    await expect(page.locator('#balance')).toHaveText('90');

    // Test reentrancy attack - reset contract state first
    await page.click('#attack');

    // Wait for attack to complete
    await page.waitForFunction(
      () => {
        return document.body.hasAttribute('data-test-vulnerability-found');
      },
      { timeout: 5000 }
    );

    // Verify the vulnerability was detected
    const logText = await page.locator('#log').textContent();
    expect(logText).toContain('VULNERABILITY DETECTED');

    // Check if balance shows evidence of reentrancy (should be less than 90)
    const finalBalance = await page.locator('#balance').textContent();
    expect(parseInt(finalBalance)).toBeLessThan(90);

    // Take a screenshot
    await page.screenshot({ path: 'media/reentrancy-test.png' });
  });
});
