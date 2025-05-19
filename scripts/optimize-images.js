const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

console.log('Script started');

// Define paths - update to use correct full path
const sourceDir = path.join('C:', 'Users', 'skywa', 'Desktop', 'Uniform Blogs', '3', 'public', 'images');
const targetDir = path.join('C:', 'Users', 'skywa', 'Desktop', 'Uniform Blogs', 'optimized-uniform', 'public', 'images');

console.log(`Checking source directory: ${sourceDir}`);
// First, check if source directory exists
if (!fs.existsSync(sourceDir)) {
  console.error(`Source directory not found: ${sourceDir}`);
  process.exit(1);
}

console.log('Source directory exists!');

// Create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating directory: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Process all directories recursively
async function processDirectory(sourceDir, targetDir) {
  ensureDirectoryExists(targetDir);
  console.log(`Scanning directory: ${sourceDir}`);
  
  try {
    const items = fs.readdirSync(sourceDir, { withFileTypes: true });
    console.log(`Found ${items.length} items in ${sourceDir}`);
    
    for (const item of items) {
      const srcPath = path.join(sourceDir, item.name);
      const destPath = path.join(targetDir, item.name);
      
      if (item.isDirectory()) {
        console.log(`Found directory: ${item.name}`);
        await processDirectory(srcPath, destPath);
      } else if (item.isFile()) {
        const ext = path.extname(item.name).toLowerCase();
        
        // Check if it's an image file
        if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
          console.log(`Processing image: ${srcPath}`);
          
          try {
            // Ensure output directory exists
            ensureDirectoryExists(path.dirname(destPath));
            
            // Use sharp to optimize images
            // Different optimization strategies based on file type
            let transformer = sharp(srcPath).resize(1200, null, { 
              fit: 'inside',
              withoutEnlargement: true
            });
            
            if (ext === '.png') {
              await transformer.png({ quality: 80 }).toFile(destPath);
            } else if (ext === '.webp') {
              await transformer.webp({ quality: 80 }).toFile(destPath);
            } else {
              // jpg/jpeg
              await transformer.jpeg({ quality: 80 }).toFile(destPath);
            }
            
            console.log(`  Optimized: ${destPath}`);
          } catch (err) {
            console.error(`  Error optimizing ${srcPath}: ${err.message}`);
          }
        } else {
          console.log(`Skipping non-image file: ${srcPath}`);
        }
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${sourceDir}: ${err.message}`);
  }
}

// Start processing
console.log('Starting image optimization...');
console.log(`Source directory: ${sourceDir}`);
console.log(`Target directory: ${targetDir}`);

processDirectory(sourceDir, targetDir)
  .then(() => {
    console.log('Image optimization completed successfully!');
  })
  .catch(err => {
    console.error(`Error during optimization process: ${err.message}`);
    process.exit(1);
  }); 