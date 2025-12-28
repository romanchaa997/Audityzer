# Audityzer Troubleshooting Guide

Common issues and their solutions for Audityzer users.

## Installation Issues

### Issue: "Command not found: audityzer"

**Symptoms**: Terminal says audityzer command is not recognized

**Solutions**:

1. **Check Installation**:
   ```bash
   npm list -g audityzer
   ```

2. **Reinstall Audityzer**:
   ```bash
   npm uninstall -g audityzer
   npm install -g audityzer
   ```

3. **Check PATH Variable** (Linux/macOS):
   ```bash
   echo $PATH
   which audityzer
   ```

4. **Fix npm Permissions**:
   ```bash
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   export PATH=~/.npm-global/bin:$PATH
   npm install -g audityzer
   ```

### Issue: "Permission denied" during installation

**Solutions**:

1. **Using sudo** (NOT recommended):
   ```bash
   sudo npm install -g audityzer
   ```

2. **Better: Fix npm permissions**:
   ```bash
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   export PATH=~/.npm-global/bin:$PATH
   ```

3. **Using nvm** (Node Version Manager):
   ```bash
   curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
   nvm install node
   npm install -g audityzer
   ```

### Issue: "EACCES: permission denied" errors

**Solution**: Change npm's default directory
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

## Configuration Issues

### Issue: "Cannot read config file"

**Symptoms**: Error loading audityzer.config.json

**Solutions**:

1. **Check File Format**:
   ```bash
   # Validate JSON
   cat audityzer.config.json | jq .
   ```

2. **Check File Permissions**:
   ```bash
   ls -la audityzer.config.json
   chmod 644 audityzer.config.json
   ```

3. **Check File Location**:
   - Should be in project root directory
   - Not in subdirectory

4. **Example Valid Config**:
   ```json
   {
     "apiKey": "your-key",
     "environment": "production"
   }
   ```

### Issue: API Key Invalid

**Symptoms**: "Invalid API Key" error

**Solutions**:

1. **Regenerate API Key**:
   - Log in to [Audityzer Dashboard](https://dashboard.audityzer.dev)
   - Go to Settings > API Keys
   - Generate a new key

2. **Update Configuration**:
   ```bash
   export AUDITYZER_API_KEY=new_api_key
   # or
   echo 'AUDITYZER_API_KEY=new_api_key' >> .env
   ```

3. **Verify Key Format**:
   ```bash
   echo $AUDITYZER_API_KEY
   # Should not be empty or contain spaces
   ```

## Runtime Issues

### Issue: Port Already in Use

**Symptoms**: "EADDRINUSE: address already in use :::8080"

**Solutions**:

1. **Find Process Using Port**:
   ```bash
   # macOS/Linux
   lsof -i :8080
   
   # Windows
   netstat -ano | findstr :8080
   ```

2. **Kill Process**:
   ```bash
   # macOS/Linux
   kill -9 <PID>
   
   # Windows
   taskkill /PID <PID> /F
   ```

3. **Use Different Port**:
   ```bash
   export AUDITYZER_PORT=3000
   audityzer start
   ```

### Issue: "ECONNREFUSED" - Connection Refused

**Symptoms**: Cannot connect to database/API

**Solutions**:

1. **Check Service Status**:
   ```bash
   # Check MongoDB
   mongosh
   
   # Check Redis
   redis-cli ping
   
   # Check API
   curl https://api.audityzer.dev/health
   ```

2. **Check Connection String**:
   ```bash
   # Verify MongoDB URI
   echo $AUDITYZER_DB_URI
   # Should be: mongodb://user:pass@host:port/db
   ```

3. **Test Database Connection**:
   ```bash
   audityzer config test-db
   ```

4. **Check Firewall**:
   ```bash
   # Allow port through firewall
   sudo ufw allow 8080
   ```

### Issue: Application Crashes on Start

**Solutions**:

1. **Enable Debug Mode**:
   ```bash
   export AUDITYZER_DEBUG=true
   export AUDITYZER_LOG_LEVEL=debug
   audityzer start
   ```

2. **Check Logs**:
   ```bash
   cat /var/log/audityzer.log
   # or
   journalctl -u audityzer -n 100
   ```

3. **Verify All Dependencies**:
   ```bash
   npm install
   npm run build
   ```

## Audit Issues

### Issue: Audit Timeout

**Symptoms**: "Analysis timeout - operation exceeded 300000ms"

**Solutions**:

1. **Increase Timeout**:
   ```bash
   export AUDITYZER_ANALYSIS_TIMEOUT=600000  # 10 minutes
   ```

2. **Reduce Analysis Scope**:
   ```bash
   audityzer audit contracts/ --exclude "test,node_modules"
   ```

3. **Run Specific Checks**:
   ```bash
   audityzer audit contracts/ --checks security
   ```

### Issue: Out of Memory

**Symptoms**: "JavaScript heap out of memory"

**Solutions**:

1. **Increase Node Memory**:
   ```bash
   NODE_OPTIONS=--max-old-space-size=4096 audityzer audit contracts/
   ```

2. **Reduce Concurrent Audits**:
   ```bash
   export AUDITYZER_MAX_CONCURRENT_AUDITS=2
   ```

3. **Enable Garbage Collection**:
   ```bash
   NODE_OPTIONS="--expose-gc" audityzer audit contracts/
   ```

### Issue: Report Not Generated

**Solutions**:

1. **Check Report Directory**:
   ```bash
   ls -la ./reports/
   # Default location: ./audityzer-reports/
   ```

2. **Check Report Format**:
   ```bash
   audityzer audit contracts/ --report-format html
   audityzer audit contracts/ --report-format json
   ```

3. **View Report**:
   ```bash
   audityzer report --format html --output report.html
   open report.html  # macOS
   xdg-open report.html  # Linux
   start report.html  # Windows
   ```

## Database Issues

### Issue: Cannot Connect to MongoDB

**Symptoms**: "MongoError: failed to connect"

**Solutions**:

1. **Verify MongoDB is Running**:
   ```bash
   # Check if MongoDB daemon is running
   ps aux | grep mongod
   
   # Or start it
   mongod --dbpath /data/db
   ```

2. **Check Connection String**:
   ```bash
   # Format: mongodb://[user:password@]host:port/database
   mongosh "mongodb://localhost:27017"
   ```

3. **Verify Credentials**:
   ```bash
   mongo admin --username admin --password password
   ```

4. **Check Port**:
   ```bash
   # Default MongoDB port: 27017
   netstat -tuln | grep 27017
   ```

### Issue: Cannot Connect to Redis

**Symptoms**: "Error: connect ECONNREFUSED"

**Solutions**:

1. **Start Redis**:
   ```bash
   redis-server
   # or
   brew services start redis  # macOS
   ```

2. **Test Redis Connection**:
   ```bash
   redis-cli ping
   # Should respond: PONG
   ```

3. **Check Redis Configuration**:
   ```bash
   redis-cli info server
   ```

## API Issues

### Issue: API Endpoint Returns 404

**Solutions**:

1. **Check API Version**:
   ```bash
   curl -H "Authorization: Bearer $AUDITYZER_API_KEY" \
        https://api.audityzer.dev/v1/health
   ```

2. **Verify API Key**:
   ```bash
   curl -H "Authorization: Bearer $AUDITYZER_API_KEY" \
        https://api.audityzer.dev/v1/audits
   ```

3. **Check API Status**:
   ```bash
   curl https://status.audityzer.dev
   ```

### Issue: Rate Limiting (429 Error)

**Solutions**:

1. **Implement Retry Logic**:
   ```javascript
   const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
   
   async function auditWithRetry(file) {
     for (let i = 0; i < 3; i++) {
       try {
         return await audityzer.audit(file);
       } catch (err) {
         if (err.status === 429 && i < 2) {
           await wait((i + 1) * 1000);
         } else {
           throw err;
         }
       }
     }
   }
   ```

2. **Upgrade Plan**:
   - Check your rate limits in Dashboard
   - Upgrade to higher tier for more requests

## Performance Issues

### Issue: Slow Audit Analysis

**Solutions**:

1. **Optimize File Size**:
   ```bash
   # Check file size
   du -sh contracts/
   
   # Split large files
   # Keep individual files under 1MB
   ```

2. **Enable Caching**:
   ```bash
   export AUDITYZER_CACHE_TTL=3600
   ```

3. **Run Parallel Audits**:
   ```bash
   audityzer audit contracts/ --parallel 4
   ```

## Docker Issues

### Issue: Docker Container Exits

**Solutions**:

1. **Check Container Logs**:
   ```bash
   docker logs <container-id>
   docker logs -f <container-id>  # Follow logs
   ```

2. **Run with Interactive Terminal**:
   ```bash
   docker run -it audityzer:latest
   ```

3. **Check Environment Variables**:
   ```bash
   docker run -e AUDITYZER_API_KEY=your_key audityzer:latest
   ```

## Getting Help

If you can't find a solution:

1. **Check Documentation**:
   - [Installation Guide](INSTALLATION.md)
   - [Configuration Guide](CONFIG.md)
   - [API Reference](API.md)

2. **Search Issues**:
   - [GitHub Issues](https://github.com/romanchaa997/Audityzer/issues)

3. **Contact Support**:
   - Email: support@audityzer.dev
   - Slack: [Join Community](https://slack.audityzer.dev)
   - Discord: [Join Server](https://discord.gg/audityzer)

4. **Enable Debug Logging**:
   ```bash
   export AUDITYZER_DEBUG=true
   export AUDITYZER_LOG_LEVEL=trace
   audityzer audit contracts/
   ```

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| EACCES: permission denied | npm permissions | Run `mkdir ~/.npm-global && npm config set prefix ~/.npm-global` |
| ECONNREFUSED | Service not running | Check if MongoDB/Redis are running |
| EADDRINUSE | Port in use | Change port or kill process using it |
| Invalid API Key | Wrong key | Regenerate key in dashboard |
| Analysis timeout | Large files/slow system | Increase timeout or reduce scope |
| Out of memory | Too many concurrent audits | Reduce concurrent audits or increase memory |
| No such file | File not found | Check file path and permissions |
| Cannot find module | Dependency missing | Run `npm install` |

## Still Need Help?

If you've tried all solutions and still having issues:

1. Gather diagnostic info:
   ```bash
   audityzer config show
   npm list audityzer
   node --version
   npm --version
   ```

2. Check logs:
   ```bash
   tail -n 100 /var/log/audityzer.log
   ```

3. Contact support with:
   - Error message
   - Steps to reproduce
   - System information
   - Relevant logs

We're here to help!
