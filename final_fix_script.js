const fs = require('fs');
const path = require('path');

// Function to fix all JSX syntax issues
function fixJsxSyntax(content) {
  // Replace React.Fragment with shorthand <>
  content = content.replace(/<React\.Fragment>/g, '<>');
  content = content.replace(/<\/React\.Fragment>/g, '</>');
  
  // Fix main element - replace with div
  content = content.replace(/<main([^>]*)>/g, '<div$1>');
  content = content.replace(/<\/main>/g, '</div>');
  
  // Fix empty return statements - use div instead of empty fragment
  const returnRegex = /return\s*\(\s*<>\s*<ArticleHero/g;
  content = content.replace(returnRegex, 'return (<div className="blog-post-container"><ArticleHero');
  content = content.replace(/<\/>\s*\);/g, '</div>);');
  
  // Fix JSX.Element type annotation (might not be needed with 'use client' directive)
  content = content.replace(/\): JSX\.Element {/g, ') {');
  
  // Add 'use client' directive as the first line if not already there
  if (!content.includes("'use client'")) {
    content = "'use client';\n" + content;
  }
  
  return content;
}

// Function to process a file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = fixJsxSyntax(content);
    
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