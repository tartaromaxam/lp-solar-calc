const fs = require('fs');
const path = require('path');
const dir = 'content/blog';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/\[CTA\]/g, '<ArticleCTA variant="calculator" />');
  
  // Replace "> *Detalhe importante:*" with HighlightBox
  content = content.replace(
    /> \*Detalhe importante:\*\s*([^\n]+)/g, 
    '<HighlightBox title="Detalhe Importante" type="info">\n$1\n</HighlightBox>'
  );

  fs.writeFileSync(filePath, content);
});
console.log('MDX updated');
