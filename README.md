# Uniform Blogs Website

This is the optimized version of the Uniform Blogs website.

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build:optimized`

## Simplified Automation

Use the provided script to handle all optimization and deployment steps:

```
.\optimize-and-deploy.bat
```

This interactive script will:
1. Check for large files that may cause GitHub issues
2. Optimize images for web use
3. Build the application with optimized settings
4. Deploy to GitHub with proper authentication handling

## Build Instructions

For successful builds, use the following command:

```powershell
$env:NEXT_PUBLIC_SKIP_IMAGES="true"; $env:NODE_OPTIONS="--max-old-space-size=4096"; npm run build
```

Or simply use the npm script:

```
npm run build:optimized
```

These commands:
- Set the `NEXT_PUBLIC_SKIP_IMAGES` environment variable to optimize image handling
- Increase the Node.js memory limit to handle larger builds
- Run the standard Next.js build process

## GitHub Repository Management

### Handling Large Files

GitHub has file size limits that can cause push failures. To address this:

1. Use the `find-large-files.ps1` script to identify problematic files:
   ```
   .\find-large-files.ps1
   ```

2. Consider these options for large files:
   - Optimize images using the `compress-images.ps1` script
   - Exclude large files using `.gitignore` (already configured)
   - Use Git LFS for tracking large files (requires setup)

### GitHub Authentication

If you encounter authentication issues:

1. Run the improved `deploy.ps1` script which helps with authentication setup:
   ```
   .\deploy.ps1
   ```

2. For HTTPS connections, create a personal access token:
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Generate a token with 'repo' scope
   - Use this token instead of your password when prompted

3. For SSH connections, add your SSH key to GitHub:
   - Generate key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
   - Add public key to GitHub: Settings → SSH and GPG keys → New SSH key

## Image Optimization

Images can be optimized using the enhanced script:

```
.\compress-images.ps1
```

This script:
1. Creates a copy of all images in `compressed-images/` directory
2. If Node.js is available, uses the Sharp library for high-quality optimization
3. Places optimized images in `public/optimized/` directory
4. Provides guidance on manual optimization if automated tools aren't available

## Current Status

The project has been optimized and successfully builds. Key fixes include:

1. Simplified component architecture to avoid circular dependencies
2. Removed problematic imports from image-mapper 
3. Created a clean version of the home page
4. Added "use client" directives to components with React hooks
5. Added optimized build script to package.json
6. Enhanced deployment process with better GitHub integration

## Deployment Guide

### Prerequisites
- Git installed
- Node.js (version 16.x) and npm (version 8.x) installed

### Deploy to GitHub

1. Run the deployment script:
   ```
   .\deploy.ps1
   ```
   
2. Or use the all-in-one script:
   ```
   .\optimize-and-deploy.bat
   ```

3. Follow the interactive prompts to commit and push your changes.

### Deploy to Netlify

The website is configured for Netlify deployment with the `netlify.toml` file. 

1. Connect your GitHub repository to Netlify
2. Use these build settings:
   - Build command: `npm run build:optimized`
   - Publish directory: `.next`
   - Node.js version: 16.x

## Troubleshooting

If you encounter build issues:

1. Check for import errors in components using SmartImage or OptimizedImage
2. Verify all required files exist in the proper directories
3. Use the simplified build command with environment variables
4. Try building with a subset of pages if a specific page is causing errors
5. Check GitHub error messages for specific file size issues
6. Ensure your authentication credentials are correct for GitHub

## License

This project is proprietary and confidential.
