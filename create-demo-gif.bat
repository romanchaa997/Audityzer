@echo off
echo Creating Audityzer Demo GIF

REM Create a directory for the demo if it doesn't exist
if not exist "assets\demo" mkdir assets\demo

REM Create a series of screenshots for the demo
echo Generating demo frames...

REM Use PowerShell to create a series of text files with demo content
powershell -Command "Set-Content -Path 'demo-frame1.txt' -Value '# Audityzer Demo`n`n> Generate ZK-SNARK security tests`n`n$ npm run test:zk-snark`n`nTesting invalid elliptic curve points...`nTesting circuit constraint validations...`nAll tests passed!'"

powershell -Command "Set-Content -Path 'demo-frame2.txt' -Value '# Audityzer Debug Mode`n`n> Debug cross-chain messaging`n`n$ npm run test:layerzero`n`nDetecting message replay attacks...`nVisualizing cross-chain message flow...`nCreating debug report...'"

powershell -Command "Set-Content -Path 'demo-frame3.txt' -Value '# Audityzer Security Report`n`n> Vulnerability summary`n`nFound 0 critical issues`nFound 0 high issues`nFound 0 medium issues`n`nAll tests passed! Your dApp is secure.'"

REM Use PowerShell to create a simple text-based animation (not a real GIF but a placeholder)
powershell -Command "Set-Content -Path 'demo-animation.txt' -Value 'This is a text-based representation of what the demo GIF would show.`n`nThe actual GIF would demonstrate:`n1. ZK-SNARK security testing`n2. Debug mode with cross-chain message visualization`n3. Security reporting with vulnerability classification'"

REM Copy placeholder or animation to assets/demo
copy demo-animation.txt assets\demo\demo-description.txt

echo Demo information saved to assets\demo directory

REM If ffmpeg is available, we could use it to create a GIF
REM But for now, let's create a simple HTML example that could display the demo

REM Create HTML demo page
powershell -Command "Set-Content -Path 'assets\demo\index.html' -Value '<html><head><title>Audityzer Demo</title><style>body{font-family:Arial;max-width:800px;margin:0 auto;padding:20px;background:#f5f5f5;}pre{background:#1a1a1a;color:#f0f0f0;padding:20px;border-radius:5px;overflow:auto;}</style></head><body><h1>uzzForge Demo</h1><p>This page demonstrates the key features implemented:</p><h2>ZK-SNARK Security Testing</h2><pre># Testing ZK-SNARK security\n$ npm run test:zk-snark\n\n✓ Detected invalid elliptic curve points\n✓ Detected circuit constraint violations\n✓ Found hardcoded proof attempts\n✓ Prevented proof replay attacks\n\nAll tests passed!</pre><h2>Debug Mode Visualization</h2><pre># Cross-chain message flow\n\nTime      | ethereum   | optimism   | arbitrum   \n----------|------------|------------|------------\n12:34:56  |   OUT >    |  < IN      |            \n12:34:58  |            |   OUT >    |  < IN      \n12:35:01  |  < IN      |            |   OUT >    \n\n# Debug report generated at test-output/debug-logs/flow-12345.txt</pre><h2>Security Report</h2><pre>Security assessment complete:\n- 0 critical issues\n- 0 high issues\n- 0 medium issues\n\nAll security tests passed!</pre></body></html>'"

echo Demo HTML page created at assets\demo\index.html   

REM Clean up temporary files
del demo-frame1.txt
del demo-frame2.txt
del demo-frame3.txt
del demo-animation.txt

echo Demo creation completed!
echo To create a real animated GIF, please install ffmpeg and update this script.

REM Create placeholder GIF
echo GIF-89a > assets\demo\demo.gif
echo Placeholder GIF created at assets\demo\demo.gif 