const fs = require('fs');
const path = require('path');

// Function to check if a file needs the 'use client' directive
function needsClientDirective(content) {
  // If file has JSX but doesn't have metadata export and doesn't already have the 'use client' directive
  return (
    content.includes('return (') && 
    content.includes('<div') && 
    !content.includes('export const metadata') && 
    !content.includes("'use client'") &&
    !content.includes('"use client"')
  );
}

// Function to add 'use client' directive
function addClientDirective(content) {
  if (needsClientDirective(content)) {
    return "'use client';\n\n" + content;
  }
  return content;
}

// Function to process a file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = addClientDirective(content);
    
    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`Added 'use client' to: ${filePath}`);
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