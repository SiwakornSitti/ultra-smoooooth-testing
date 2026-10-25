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
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function extractPresenterNotes(raw) {
  const match = raw.match(/<!--\s*Presenter Notes:\s*([\s\S]*?)-->/i);
  if (!match) return '';
  const notes = match[1].trim().split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .map(l => l.startsWith('-') ? l : `- ${l}`);
  if (notes.length === 0) return '';
  return `\n### Presenter Notes\n\n${notes.join('\n')}\n`;
}

function extractCallout(raw) {
  const match = raw.match(/<div[^>]*class="[^"]*slide-card[^"]*py-3[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if (match) {
    return cleanHtml(match[1]);
  }
  return '';
}

function extractCards(raw) {
  const cards = [];
  const cardRegex = /<div\s+[^>]*class="[^"]*slide-card[^"]*"[^>]*>([\s\S]*?)(?=<div\s+[^>]*class="[^"]*slide-card[^"]*"|$)/gi;
  let match;
  while ((match = cardRegex.exec(raw)) !== null) {
    const cardHtml = match[1];
    if (cardHtml.includes('py-3') && (cardHtml.includes('💡') || cardHtml.includes('Rule') || cardHtml.includes('Pattern'))) {
      continue;
    }

    let title = '';
    let badge = '';
    const headerMatch = cardHtml.match(/<div class="flex items-center justify-between[^>]*>([\s\S]*?)<\/div>/i);
    if (headerMatch) {
      const headerHtml = headerMatch[1];
      const badgeMatch = headerHtml.match(/<span[^>]*font-mono[^>]*>([\s\S]*?)<\/span>/i);
      if (badgeMatch) {
        badge = cleanHtml(badgeMatch[1]);
      }
      const titleClean = headerHtml.replace(/<span[^>]*font-mono[\s\S]*?<\/span>/i, '');
      title = cleanHtml(titleClean);
    }

    let desc = '';
    const pMatch = cardHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (pMatch) {
      desc = cleanHtml(pMatch[1]);
    }

    const bullets = [];
    const liMatches = cardHtml.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    if (liMatches) {
      for (const li of liMatches) {
        bullets.push(cleanHtml(li.replace(/^[•\s]+/, '')));
      }
    } else {
      const divMatches = cardHtml.match(/<div>\s*(?:•|&bull;)\s*([\s\S]*?)<\/div>/gi);
      if (divMatches) {
        for (const d of divMatches) {
          bullets.push(cleanHtml(d.replace(/^[•\s]+/, '')));
        }
      }
    }

    let footer = '';
    const footerMatch = cardHtml.match(/<div[^>]*border-t[^>]*>([\s\S]*?)<\/div>/i);
    if (footerMatch) {
      footer = cleanHtml(footerMatch[1]);
    }

    cards.push({ title, badge, desc, bullets, footer, raw: cardHtml });
  }
  return cards;
}

function extractTable(raw) {
  const tableMatch = raw.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
  if (!tableMatch) return null;
  const tableHtml = tableMatch[1];

  const headers = [];
  const thMatches = tableHtml.match(/<th[^>]*>([\s\S]*?)<\/th>/gi);
  if (thMatches) {
    for (const th of thMatches) {
      headers.push(cleanHtml(th));
    }
  }

  const rows = [];
  const trMatches = tableHtml.match(/<tr>([\s\S]*?)<\/tr>/gi);
  if (trMatches) {
    for (const tr of trMatches) {
      if (tr.includes('<th')) continue;
      const cells = [];
      const tdMatches = tr.match(/<td[^>]*>([\s\S]*?)<\/td>/gi);
      if (tdMatches) {
        for (const td of tdMatches) {
          cells.push(cleanHtml(td));
        }
      }
      if (cells.length > 0) {
        rows.push(cells);
      }
    }
  }

  return { headers, rows };
}

function extractCodeBlock(raw) {
  const match = raw.match(/```([a-z]*)\n([\s\S]*?)```/i);
  if (match) {
    return { lang: match[1] || 'json', code: match[2].trim() };
  }
  return null;
}

function extractTerminal(raw) {
  const match = raw.match(/<div class="sv-terminal[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if (!match) return null;
  const lines = match[1].match(/<div[^>]*>([\s\S]*?)<\/div>/gi);
  if (!lines) return null;
  const bashLines = lines.map(l => cleanHtml(l));
  return bashLines.join('\n');
}

module.exports = {
  cleanHtml,
  extractPresenterNotes,
  extractCallout,
  extractCards,
  extractTable,
  extractCodeBlock,
  extractTerminal,
  wiremockDir
};
