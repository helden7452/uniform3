const fs = require('fs');
const path = require('path');

// Function to fix server component JSX structure
function fixServerJSX(content, filePath) {
  // Check if this file has metadata export (server component)
  const hasMetadata = content.includes('export const metadata') || 
                      content.includes('export async function generateMetadata');
  
  if (hasMetadata) {
    // Remove any 'use client' directive
    content = content.replace(/^'use client';\s*\n+/m, '');
    
    // Fix JSX structure - replace div wrapper with fragment
    content = content.replace(/return\s*\(\s*<div>\s*<ArticleHero/g, 'return (\n    <>\n      <ArticleHero');
    content = content.replace(/return\s*\(\s*<div[^>]*>\s*<Breadcrumb/g, 'return (\n    <>\n      <Breadcrumb');
    
    // Fix closing tags
    content = content.replace(/<\/div>\s*\);/g, '    </>\n  );');
    
    // Fix Container closing tags
    content = content.replace(/<\/Container>\s*<\/div>\s*\);/g, '</Container>\n    </>\n  );');
    content = content.replace(/<\/Container>\s*\);/g, '</Container>\n    </>\n  );');
  }
  
  return content;
}

// Function to process a file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = fixServerJSX(content, filePath);
    
    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`Fixed server JSX in: ${filePath}`);
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