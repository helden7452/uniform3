const fs = require('fs');
const path = require('path');

// Function to fix the remaining issues
function fixRemainingIssues(content, filePath) {
  // 1. Remove 'use client' directive from files with generateMetadata
  if (content.includes('export async function generateMetadata')) {
    content = content.replace(/^'use client';\s*\n+/m, '');
  }
  
  // 2. Fix Container syntax in server components
  if (content.includes('<Container className=') && content.includes('export const metadata')) {
    // Replace ArticleHero and Container sections with proper JSX
    content = content.replace(/<ArticleHero([^>]*?)image={{([^}]*?)}}\s*\/>\s*\n\s*\n\s*\n\s*<Container/g, 
      (match, heroProps, imageProps) => {
        return `<div>\n      <ArticleHero${heroProps}image={{${imageProps}}} />\n\n      <Container`;
      }
    );
    
    // Ensure proper closing tags
    content = content.replace(/<\/Container>\s*<\/div>\s*\);/g, '</Container>\n    </div>\n  );');
    content = content.replace(/<\/Container>\s*\);/g, '</Container>\n    </div>\n  );');
  }
  
  // 3. Fix extra div wrappers
  content = content.replace(/return\s*\(\s*<div>\s*<div>\s*<ArticleHero/g, 'return (\n    <div>\n      <ArticleHero');
  content = content.replace(/<\/div>\s*<\/div>\s*\);/g, '</div>\n  );');
  
  return content;
}

// Function to process a file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = fixRemainingIssues(content, filePath);
    
    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`Fixed remaining issues in: ${filePath}`);
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