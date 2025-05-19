const fs = require('fs');
const path = require('path');

// Function to add React import to files
function addReactImport(content) {
  // Check if React is already imported
  if (!content.includes('import React from')) {
    // Add the import at the beginning of the file
    return 'import React from \'react\';\n' + content;
  }
  return content;
}

// Function to process a file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = addReactImport(content);
    
    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Process all blog files
const blogDir = path.join(__dirname, 'src', 'app', 'blog');
const directories = fs.readdirSync(blogDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let fixedCount = 0;

directories.forEach(dir => {
  const pageFilePath = path.join(blogDir, dir, 'page.tsx');
  if (fs.existsSync(pageFilePath)) {
    const wasFixed = processFile(pageFilePath);
    if (wasFixed) fixedCount++;
  }
});

console.log(`Fixed ${fixedCount} files out of ${directories.length} directories.`); 