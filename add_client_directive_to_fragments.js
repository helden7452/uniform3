const fs = require('fs');
const path = require('path');

// Function to add 'use client' directive to files with JSX fragments
function addClientDirectiveToFragments(content, filePath) {
  // Check if file has fragments but no 'use client' directive
  const hasFragments = content.includes('<>') || content.includes('</>')
  const hasClientDirective = content.includes("'use client'") || content.includes('"use client"')
  
  if (hasFragments && !hasClientDirective) {
    content = "'use client';\n\n" + content;
  }
  
  return content;
}

// Function to process a file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = addClientDirectiveToFragments(content, filePath);
    
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