// lib/markdownBlogParser.ts
import { stripHtmlAndMarkdown } from './richTextRenderer';

export interface ParsedChapter {
  heading: string;
  content: string;
}

export interface ParsedBlogArticle {
  title: string;
  slug: string;
  category: string;
  focusKeyword: string;
  metaDescription: string;
  sections: ParsedChapter[];
  rawWordCount: number;
}

const KNOWN_CATEGORIES = [
  'Automation & Robotics',
  'Operational Excellence',
  'Industry 4.0 & Smart Factory',
  'Lean Manufacturing',
  'Quality & Safety Management',
  'Supply Chain & Warehousing',
];

/**
 * Generate a clean, SEO-friendly URL slug from text.
 */
export function generateSlug(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove special characters
    .replace(/[\s_-]+/g, '-') // collapse whitespace and underscores to single hyphen
    .replace(/^-+|-+$/g, ''); // trim leading and trailing hyphens
}

/**
 * Clean up title text by stripping markdown formatting characters.
 */
function cleanTitleText(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/^#+\s*/, '') // remove leading markdown heading hashes
    .replace(/^[\*\_\`]+|[\*\_\`]+$/g, '') // remove bold/italic wrappers
    .replace(/^(Title|Blog Title|Article Title):\s*/i, '')
    .trim();
}

/**
 * Parse an AI or Markdown-formatted blog article into structured fields and chapters.
 */
export function parseMarkdownBlog(markdown: string): ParsedBlogArticle {
  if (!markdown || !markdown.trim()) {
    return {
      title: '',
      slug: '',
      category: '',
      focusKeyword: '',
      metaDescription: '',
      sections: [{ heading: '', content: '' }],
      rawWordCount: 0,
    };
  }

  const rawLines = markdown.split(/\r?\n/);
  const totalWords = markdown.trim().split(/\s+/).filter(Boolean).length;

  let title = '';
  let category = '';
  let focusKeyword = '';
  let metaDescription = '';

  // Extract YAML Frontmatter if present
  let bodyStartIndex = 0;
  if (rawLines[0]?.trim() === '---') {
    const closingIndex = rawLines.slice(1).findIndex(line => line.trim() === '---');
    if (closingIndex !== -1) {
      const frontmatterLines = rawLines.slice(1, closingIndex + 1);
      bodyStartIndex = closingIndex + 2;

      for (const fLine of frontmatterLines) {
        const colonIdx = fLine.indexOf(':');
        if (colonIdx !== -1) {
          const key = fLine.slice(0, colonIdx).trim().toLowerCase();
          const val = fLine.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '');
          if (key === 'title') title = val;
          else if (key === 'category') category = val;
          else if (key === 'focus_keyword' || key === 'keyword' || key === 'keywords') focusKeyword = val;
          else if (key === 'description' || key === 'meta_description') metaDescription = val;
        }
      }
    }
  }

  const lines = rawLines.slice(bodyStartIndex);
  const cleanBodyLines: string[] = [];

  // Pass 1: Extract inline metadata (Title, Category, Focus Keyword, Meta Description)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check for explicit H1 (# Title)
    if (!title && /^#\s+(.+)$/.test(trimmed)) {
      title = cleanTitleText(trimmed);
      continue;
    }

    // Check for Title: or **Title:**
    if (!title && /^(\*\*|\*)?(Title|Article Title):\s*(.+?)(\*\*|\*)?$/i.test(trimmed)) {
      const m = trimmed.match(/^(\*\*|\*)?(Title|Article Title):\s*(.+?)(\*\*|\*)?$/i);
      if (m && m[3]) {
        title = cleanTitleText(m[3]);
        continue;
      }
    }

    // Check for Category: or **Category:**
    if (!category && /^(\*\*|\*)?(Category):\s*(.+?)(\*\*|\*)?$/i.test(trimmed)) {
      const m = trimmed.match(/^(\*\*|\*)?(Category):\s*(.+?)(\*\*|\*)?$/i);
      if (m && m[3]) {
        category = m[3].replace(/[\*\_\`]/g, '').trim();
        continue;
      }
    }

    // Check for Focus Keyword: or **Focus Keyword:**
    if (!focusKeyword && /^(\*\*|\*)?(Focus Keyword|Keyword|Keywords):\s*(.+?)(\*\*|\*)?$/i.test(trimmed)) {
      const m = trimmed.match(/^(\*\*|\*)?(Focus Keyword|Keyword|Keywords):\s*(.+?)(\*\*|\*)?$/i);
      if (m && m[3]) {
        focusKeyword = m[3].replace(/[\*\_\`]/g, '').trim();
        continue;
      }
    }

    // Check for Meta Description: or **Meta Description:**
    if (!metaDescription && /^(\*\*|\*)?(Meta Description|Description|Summary):\s*(.+?)(\*\*|\*)?$/i.test(trimmed)) {
      const m = trimmed.match(/^(\*\*|\*)?(Meta Description|Description|Summary):\s*(.+?)(\*\*|\*)?$/i);
      if (m && m[3]) {
        metaDescription = m[3].replace(/[\*\_\`]/g, '').trim();
        continue;
      }
    }

    cleanBodyLines.push(line);
  }

  // If title was still not found, check the first non-empty line
  if (!title) {
    const firstNonEmpty = cleanBodyLines.find(l => l.trim().length > 0);
    if (firstNonEmpty) {
      title = cleanTitleText(firstNonEmpty);
      // Remove that line from the body if it was used as title
      const idx = cleanBodyLines.indexOf(firstNonEmpty);
      if (idx !== -1) cleanBodyLines.splice(idx, 1);
    }
  }

  // Fallback category detection: match against known categories
  if (!category) {
    const fullTextLower = markdown.toLowerCase();
    for (const cat of KNOWN_CATEGORIES) {
      const keywords = cat.toLowerCase().split(/[&\s]+/);
      if (keywords.some(k => k.length > 3 && fullTextLower.includes(k))) {
        category = cat;
        break;
      }
    }
  }

  // Pass 2: Split Body into Chapters by `## ` headings
  const sections: ParsedChapter[] = [];
  let currentHeading = '';
  let currentContentLines: string[] = [];

  for (let i = 0; i < cleanBodyLines.length; i++) {
    const line = cleanBodyLines[i];
    const trimmed = line.trim();

    // Check for Chapter Heading (`## Heading`)
    if (/^##\s+(.+)$/.test(trimmed)) {
      // Save previous section if exists
      if (currentHeading || currentContentLines.some(l => l.trim().length > 0)) {
        const bodyText = currentContentLines.join('\n').trim();
        if (bodyText || currentHeading) {
          sections.push({
            heading: currentHeading || 'Introduction',
            content: bodyText,
          });
        }
      }

      currentHeading = cleanTitleText(trimmed);
      currentContentLines = [];
    } else {
      currentContentLines.push(line);
    }
  }

  // Save the final section
  if (currentHeading || currentContentLines.some(l => l.trim().length > 0)) {
    const bodyText = currentContentLines.join('\n').trim();
    if (bodyText || currentHeading) {
      sections.push({
        heading: currentHeading || 'Conclusion & Next Steps',
        content: bodyText,
      });
    }
  }

  // Fallback if no `## ` headings were detected at all
  if (sections.length === 0) {
    const fullBody = cleanBodyLines.join('\n').trim();
    sections.push({
      heading: 'Chapter 1: Overview',
      content: fullBody,
    });
  }

  // Fallback for Meta Description: use first intro paragraph if not explicitly provided
  if (!metaDescription) {
    const firstSectionContent = sections[0]?.content || '';
    if (firstSectionContent) {
      const cleanPlain = stripHtmlAndMarkdown(firstSectionContent);
      const sentences = cleanPlain.split(/(?<=[.?!])\s+/);
      let descCandidate = (sentences[0] || '').trim();
      if (descCandidate.length < 90 && sentences[1]) {
        descCandidate += ' ' + sentences[1].trim();
      }
      metaDescription = descCandidate.slice(0, 158).trim();
    }
  }

  return {
    title: title.trim(),
    slug: generateSlug(title),
    category: category.trim(),
    focusKeyword: focusKeyword.trim(),
    metaDescription: metaDescription.trim(),
    sections: sections.length > 0 ? sections : [{ heading: '', content: '' }],
    rawWordCount: totalWords,
  };
}
