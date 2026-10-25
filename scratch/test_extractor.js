const fs = require('fs');
const path = require('path');

const wiremockDir = path.join(__dirname, '../slides/wiremock');

function cleanText(s) {
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
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function extractCards(raw) {
  const cards = [];
  const cardRegex = /<div\s+[^>]*class="[^"]*slide-card[^"]*"[^>]*>([\s\S]*?)(?=<div\s+[^>]*class="[^"]*slide-card[^"]*"|$)/gi;
  let match;
  while ((match = cardRegex.exec(raw)) !== null) {
    const cardHtml = match[1];

    if (cardHtml.includes('💡') || cardHtml.includes('Architectural Rule') || cardHtml.includes('Production Pattern') || cardHtml.includes('Takeaway')) {
      continue;
    }

    let title = '';
    let badge = '';
    const headerMatch = cardHtml.match(/<div class="flex items-center justify-between[^>]*>([\s\S]*?)<\/div>/i);
    if (headerMatch) {
      const headerHtml = headerMatch[1];
      const badgeMatch = headerHtml.match(/<span[^>]*font-mono[^>]*>([\s\S]*?)<\/span>/i);
      if (badgeMatch) {
        badge = cleanText(badgeMatch[1]);
      }
      const titleClean = headerHtml.replace(/<span[^>]*font-mono[\s\S]*?<\/span>/i, '');
      title = cleanText(titleClean);
    }

    let desc = '';
    const pMatch = cardHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (pMatch) {
      desc = cleanText(pMatch[1]);
    }

    const bullets = [];
    const liMatches = cardHtml.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    if (liMatches) {
      for (const li of liMatches) {
        bullets.push(cleanText(li.replace(/^[•\s]+/, '')));
      }
    } else {
      const divMatches = cardHtml.match(/<div>\s*(?:•|&bull;)\s*([\s\S]*?)<\/div>/gi);
      if (divMatches) {
        for (const d of divMatches) {
          bullets.push(cleanText(d.replace(/^[•\s]+/, '')));
        }
      }
    }

    let footer = '';
    const footerMatch = cardHtml.match(/<div[^>]*border-t[^>]*>([\s\S]*?)<\/div>/i);
    if (footerMatch) {
      footer = cleanText(footerMatch[1]);
    }

    cards.push({ title, badge, desc, bullets, footer });
  }
  return cards;
}

const s2 = fs.readFileSync(path.join(wiremockDir, 'slide-wiremock-2.md'), 'utf-8');
const cards = extractCards(s2);
cards.forEach((c, i) => {
  console.log(`Card ${i+1}: title="${c.title}", badge="${c.badge}", bullets=${c.bullets.length}, footer="${c.footer}"`);
});
