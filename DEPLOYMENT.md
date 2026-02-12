# 🚀 Hosting & Deployment Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Build Process](#build-process)
4. [Deployment Options](#deployment-options)
5. [Configuration](#configuration)
6. [Troubleshooting](#troubleshooting)

## 🎯 Prerequisites

### Required Software
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Git** (for version control)

### Hosting Requirements
- **Node.js hosting** (Heroku, Vercel, DigitalOcean, etc.)
- **File upload support** (for image uploads)
- **Environment variables support**
- **Static file serving**

## 🔧 Environment Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` for your environment:

#### Development (.env)
```env
NODE_ENV=development
VITE_API_URL=http://localhost:3001
VITE_APP_URL=http://localhost:5173
PORT=3001
UPLOAD_DIR=public/uploads
MAX_FILE_SIZE=10485760
CORS_ORIGIN=*
```

#### Production (.env)
```env
NODE_ENV=production
VITE_API_URL=https://your-domain.com/api
VITE_APP_URL=https://your-domain.com
PORT=3001
UPLOAD_DIR=public/uploads
MAX_FILE_SIZE=10485760
CORS_ORIGIN=https://your-domain.com
```

## 🏗️ Build Process

### Development Build
```bash
npm run build
```

### Production Build
```bash
npm run build:prod
```

### Build Output
- **Files created in**: `dist/`
- **Static assets**: `dist/assets/`
- **Entry point**: `dist/index.html`

## 🌐 Deployment Options

### Option 1: Traditional VPS (DigitalOcean, Vultr, etc.)

#### 1. Server Setup
```bash
# Update server
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2
```

#### 2. Deploy Application
```bash
# Clone repository
git clone <your-repo-url>
cd accounting-consulting-website

# Install dependencies
npm install

# Set production environment
export NODE_ENV=production

# Build application
npm run build:prod

# Start with PM2
pm2 start npm --name "accounting-app" -- start
pm2 startup
pm2 save
```

#### 3. Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 2: Heroku

#### 1. Create Procfile
```
web: node server/production-server.js
```

#### 2. Deploy
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set VITE_API_URL=https://your-app-name.herokuapp.com/api
heroku config:set VITE_APP_URL=https://your-app-name.herokuapp.com

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### Option 3: Vercel

#### 1. Create vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/production-server.js",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/production-server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production",
    "VITE_API_URL": "@api_url",
    "VITE_APP_URL": "@app_url"
  }
}
```

#### 2. Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 4: Docker

#### 1. Create Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build:prod

# Production stage
FROM node:18-alpine

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/server ./server
COPY --from=build /app/public ./public

EXPOSE 3001

CMD ["node", "server/production-server.js"]
```

#### 2. Deploy
```bash
# Build image
docker build -t accounting-app .

# Run container
docker run -p 3001:3001 -e NODE_ENV=production accounting-app
```

## ⚙️ Configuration

### Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `VITE_API_URL` | API base URL | `https://domain.com/api` |
| `VITE_APP_URL` | Frontend URL | `https://domain.com` |
| `PORT` | Server port | `3001` |
| `UPLOAD_DIR` | Upload directory | `public/uploads` |
| `MAX_FILE_SIZE` | Max file size (bytes) | `10485760` |
| `CORS_ORIGIN` | Allowed CORS origins | `https://domain.com` |

### File Upload Configuration

#### Server-side Limits
- **Max file size**: 10MB (configurable)
- **Allowed types**: Images only
- **Storage**: Local filesystem

#### Client-side Validation
- **File size check**: Before upload
- **File type validation**: Images only
- **Progress tracking**: Upload progress

## 🔍 Troubleshooting

### Common Issues

#### 1. Upload Fails
**Problem**: Files not uploading
**Solution**:
- Check server is running on correct port
- Verify CORS configuration
- Check file size limits
- Ensure upload directory exists

#### 2. Build Errors
**Problem**: Build fails with errors
**Solution**:
- Check all dependencies installed
- Verify environment variables
- Check for syntax errors
- Clear cache: `rm -rf node_modules && npm install`

#### 3. Environment Variables Not Working
**Problem**: `import.meta.env` returns undefined
**Solution**:
- Ensure variables start with `VITE_`
- Restart development server
- Check `.env` file location

#### 4. Images Not Loading
**Problem**: Uploaded images not displaying
**Solution**:
- Check static file serving
- Verify file paths
- Check CORS headers
- Ensure files exist in upload directory

#### 5. Data Not Persisting
**Problem**: Changes not saved after refresh
**Solution**:
- Check localStorage availability
- Verify data manager initialization
- Check for quota exceeded

### Debug Mode

Enable detailed logging:
```bash
# Development
NODE_ENV=development npm run dev

# Production with debug
DEBUG=* npm start
```

### Health Checks

Monitor application health:
```bash
# Check server status
curl https://your-domain.com/api/health

# Expected response
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "message": "Upload server is running",
  "environment": "production",
  "version": "1.0.0"
}
```

## 📊 Performance Optimization

### Build Optimization
- **Code splitting**: Automatic with Vite
- **Tree shaking**: Enabled
- **Minification**: Enabled
- **Asset optimization**: Images compressed

### Runtime Optimization
- **Static caching**: Configure CDN
- **Gzip compression**: Enable on server
- **Database indexing**: If using database
- **Image optimization**: WebP format

## 🔒 Security Considerations

### File Upload Security
- **File type validation**: Images only
- **Size limits**: Configurable
- **Virus scanning**: Consider adding
- **Access control**: Authentication required

### Environment Security
- **Secret management**: Use proper secrets
- **HTTPS enforcement**: SSL certificates
- **CORS configuration**: Restrict origins
- **Rate limiting**: Prevent abuse

## 📱 Monitoring

### Application Monitoring
- **Error tracking**: Sentry, Bugsnag
- **Performance monitoring**: New Relic, DataDog
- **Uptime monitoring**: Pingdom, UptimeRobot
- **Log aggregation**: Papertrail, Loggly

### Health Metrics
- **Server response time**
- **Upload success rate**
- **Error rates**
- **Memory usage**

## 🚀 Quick Deploy Checklist

### Pre-deployment
- [ ] Environment variables configured
- [ ] Build tested locally
- [ ] Security review completed
- [ ] Backup strategy in place

### Post-deployment
- [ ] Health checks passing
- [ ] Upload functionality tested
- [ ] Performance monitored
- [ ] Error tracking configured

## 📞 Support

For deployment issues:
1. Check this guide first
2. Review error logs
3. Test in development environment
4. Check hosting provider documentation

---

**Happy hosting! 🎉**
