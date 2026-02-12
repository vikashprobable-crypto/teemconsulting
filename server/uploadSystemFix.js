// Complete Upload System Test and Fix
const fs = require('fs');
const path = require('path');

const UploadSystemFix = {
  // Check all required files and configurations
  checkSystem() {
    console.log('🔍 Checking upload system configuration...\n');
    
    const checks = [
      {
        name: 'Package.json Scripts',
        check: () => {
          const packageJson = require('../package.json');
          return packageJson.scripts.server && packageJson.scripts.dev;
        }
      },
      {
        name: 'Server File Exists',
        check: () => fs.existsSync(path.join(__dirname, '../server/simple-server.js'))
      },
      {
        name: 'Upload Directory Exists',
        check: () => {
          const uploadDir = path.join(__dirname, '../public/uploads');
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
            console.log('📁 Created uploads directory');
          }
          return true;
        }
      },
      {
        name: 'Vite Config Correct',
        check: () => {
          const viteConfig = fs.readFileSync(path.join(__dirname, '../vite.config.js'), 'utf8');
          return viteConfig.includes('proxy') && viteConfig.includes('localhost:3001');
        }
      },
      {
        name: 'Dependencies Installed',
        check: () => {
          const packageJson = require('../package.json');
          const deps = ['express', 'multer', 'cors', 'concurrently'];
          return deps.every(dep => packageJson.dependencies[dep] || packageJson.devDependencies[dep]);
        }
      }
    ];

    let allPassed = true;
    checks.forEach(({ name, check }) => {
      try {
        const passed = check();
        console.log(`${passed ? '✅' : '❌'} ${name}`);
        if (!passed) allPassed = false;
      } catch (error) {
        console.log(`❌ ${name} - Error: ${error.message}`);
        allPassed = false;
      }
    });

    return allPassed;
  },

  // Test server startup
  async testServer() {
    console.log('\n🚀 Testing server startup...');
    
    try {
      // Import and test server
      const serverPath = path.join(__dirname, '../server/simple-server.js');
      console.log('📁 Server file found:', serverPath);
      
      // Check if server can be required
      delete require.cache[require.resolve(serverPath)];
      const app = require(serverPath);
      console.log('✅ Server module loaded successfully');
      
      return true;
    } catch (error) {
      console.log('❌ Server test failed:', error.message);
      return false;
    }
  },

  // Create test directories
  setupDirectories() {
    console.log('\n📁 Setting up directories...');
    
    const dirs = [
      'public/uploads',
      'public/uploads/logos',
      'public/uploads/gallery',
      'public/uploads/team',
      'public/uploads/test'
    ];

    dirs.forEach(dir => {
      const fullPath = path.join(__dirname, '..', dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`📁 Created: ${dir}`);
      } else {
        console.log(`✅ Exists: ${dir}`);
      }
    });
  },

  // Fix common issues
  fixIssues() {
    console.log('\n🔧 Applying fixes...');
    
    // Fix 1: Ensure no type: module in package.json
    const packageJsonPath = path.join(__dirname, '../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    if (packageJson.type === 'module') {
      delete packageJson.type;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('🔧 Removed "type": "module" from package.json');
    }

    // Fix 2: Ensure server uses CommonJS
    const serverPath = path.join(__dirname, '../server/simple-server.js');
    const serverContent = fs.readFileSync(serverPath, 'utf8');
    
    if (serverContent.includes('import ') || serverContent.includes('export ')) {
      console.log('⚠️  Server file contains ES modules - should use CommonJS');
    }

    console.log('✅ Fixes applied');
  },

  // Generate startup script
  generateStartupScript() {
    const script = `@echo off
echo Starting Upload System...
echo.
echo Step 1: Starting Upload Server...
start "Upload Server" cmd /k "npm run server"
timeout /t 3 /nobreak >nul
echo.
echo Step 2: Starting Frontend...
start "Frontend" cmd /k "npm run dev"
echo.
echo ✅ Both servers starting...
echo.
echo Upload Server: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause >nul`;

    fs.writeFileSync(path.join(__dirname, '../start-upload-system.bat'), script);
    console.log('📝 Generated start-upload-system.bat');
  },

  // Run complete diagnostic
  async runFullDiagnostic() {
    console.log('🔬 COMPLETE UPLOAD SYSTEM DIAGNOSTIC\n');
    console.log('=====================================\n');
    
    // Step 1: Check system
    const systemOk = this.checkSystem();
    
    // Step 2: Apply fixes
    this.fixIssues();
    
    // Step 3: Setup directories
    this.setupDirectories();
    
    // Step 4: Test server
    const serverOk = await this.testServer();
    
    // Step 5: Generate startup script
    this.generateStartupScript();
    
    console.log('\n📋 DIAGNOSTIC SUMMARY');
    console.log('====================');
    console.log(`System Check: ${systemOk ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Server Test: ${serverOk ? '✅ PASS' : '❌ FAIL'}`);
    console.log('Directories: ✅ SETUP COMPLETE');
    console.log('Startup Script: ✅ GENERATED');
    
    if (systemOk && serverOk) {
      console.log('\n🎉 UPLOAD SYSTEM IS READY!');
      console.log('\n📋 NEXT STEPS:');
      console.log('1. Run: npm run server (Terminal 1)');
      console.log('2. Run: npm run dev (Terminal 2)');
      console.log('3. Or double-click: start-upload-system.bat');
      console.log('4. Test upload in admin panel');
    } else {
      console.log('\n❌ ISSUES FOUND - Check logs above');
    }
    
    return systemOk && serverOk;
  }
};

// Auto-run if called directly
if (require.main === module) {
  UploadSystemFix.runFullDiagnostic();
}

module.exports = UploadSystemFix;
