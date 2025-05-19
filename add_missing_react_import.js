const fs = require('fs');
const path = require('path');

// Function to add React import if missing
function addMissingReactImport(content) {
  // Check if file uses JSX but doesn't have React import
  const hasJSX = content.includes('<div') || 
                 content.includes('<span') || 
                 content.includes('<p') || 
                 content.includes('<a') || 
                 content.includes('<article');
                 
  const hasReactImport = content.includes("import React") || 
                         content.includes("from 'react'");

  // Add import if JSX exists without React import
  if (hasJSX && !hasReactImport) {
    content = "import React from 'react';\n" + content;
    return content;
  }
  
  return content;
}

// Function to process a file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = addMissingReactImport(content);
    
    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`Added missing React import to: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Process all blog files
function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name === 'page.tsx') {
      processFile(fullPath);
    }
  }
}

// Start processing from the blog directory
const blogDir = path.join(__dirname, 'src', 'app', 'blog');
console.log(`Starting to process files in: ${blogDir}`);

processDirectory(blogDir);
console.log('Processing complete!'); 