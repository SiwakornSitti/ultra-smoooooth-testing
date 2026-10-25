const fs = require('fs');
const path = require('path');

const wiremockDir = path.join(__dirname, '../slides/wiremock');

function cleanHtml(s) {
  if (!s) return '';
  return s
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**')
    .replace(/<span[^>]*class="[^"]*font-mono[^"]*"[^>]*>([\s\S]*?)<\/span>/gi, '`$1`')
    .replace(/<span[^>]*class="[^"]*font-bold[^"]*"[^>]*>([\s\S]*?)<\/span>/gi, '**$1**')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&le;/g, '≤')
    .replace(/&ge;/g, '≥')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&bull;/g, '•')
    .replace(/\s+/g, ' ')
    .trim();
}

// Read all 67 files and analyze their contents
const files = fs.readdirSync(wiremockDir)
  .filter(f => f.startsWith('slide-wiremock-') && f.endsWith('.md'))
  .sort((a, b) => {
    const numA = parseInt(a.replace('slide-wiremock-', '').replace('.md', ''), 10);
    const numB = parseInt(b.replace('slide-wiremock-', '').replace('.md', ''), 10);
    return numA - numB;
  });

console.log(`Found ${files.length} slide files to convert.`);
