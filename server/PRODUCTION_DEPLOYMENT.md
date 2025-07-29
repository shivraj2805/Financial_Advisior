# Production Deployment Guide

## 🚀 Quick Fix for Current Error

The error `Cannot find module 'dayjs'` is now fixed by adding `dayjs` to package.json dependencies.

## 📦 Dependencies

Make sure these are in your `package.json`:

```json
{
  "dependencies": {
    "dayjs": "^1.11.10",
    "express": "^4.21.2",
    "mongoose": "^8.8.4",
    "cors": "^2.8.5",
    "dotenv": "^16.6.1",
    "socket.io": "^4.8.1"
  }
}
```

## 🔧 Environment Variables

Create `.env` file with:

```bash
NODE_ENV=production
PORT=8080
MONGODB_URI=your_mongodb_connection_string
```

## 🚀 Deployment Steps

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Create Uploads Directory:**
   ```bash
   mkdir -p uploads
   ```

3. **Start Server:**
   ```bash
   node index.js
   ```

## 🔍 Common Production Issues

### 1. Missing Dependencies
- ✅ **Fixed**: Added `dayjs` to package.json
- ✅ **Check**: Run `npm install` after deployment

### 2. Environment Variables
- ✅ **Required**: `MONGODB_URI` for database connection
- ✅ **Required**: `PORT` for server port (default: 8080)

### 3. File Permissions
- ✅ **Uploads Directory**: Ensure write permissions
- ✅ **Logs**: Ensure log directory exists

### 4. CORS Configuration
- ✅ **Frontend URLs**: Add your production frontend URLs
- ✅ **Security**: Only allow trusted origins

## 🛡️ Security Checklist

- [ ] Remove all `console.log` statements ✅
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS in production
- [ ] Set up proper CORS origins
- [ ] Validate all user inputs
- [ ] Use rate limiting

## 📊 Monitoring

- [ ] Set up error tracking (Sentry)
- [ ] Monitor server performance
- [ ] Set up health checks
- [ ] Configure logging

## 🔄 Deployment Commands

```bash
# Install dependencies
npm install

# Create required directories
mkdir -p uploads

# Start production server
NODE_ENV=production node index.js
```

## 🆘 Troubleshooting

### Error: "Cannot find module 'dayjs'"
**Solution:** ✅ Fixed - Added to package.json

### Error: "MongoDB connection failed"
**Solution:** Check `MONGODB_URI` environment variable

### Error: "CORS blocked"
**Solution:** Add your frontend URL to allowed origins

### Error: "Uploads directory not found"
**Solution:** Run `mkdir -p uploads` before starting server 