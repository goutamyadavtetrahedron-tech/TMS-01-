// lib/richTextRenderer.tsx
import React from 'react';
import Link from 'next/link';

/**
 * Optimizes Cloudinary asset URLs by injecting f_auto, q_auto, and maximum width transformations.
 * Converts heavy multi-megabyte JPEG/PNG files into lightweight WebP/AVIF images on the fly.
 */
export function getOptimizedCloudinaryUrl(
  url: string | null | undefined,
  options: { width?: number; quality?: string } = {}
): string {
  if (!url || typeof url !== 'string') return '';
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) {
    return url;
  }

  const { width = 1200, quality = 'auto' } = options;
  const transformString = `f_auto,q_${quality},w_${width},c_limit`;

  // Avoid injecting transformation if it already contains transformation flags
  if (url.includes('/f_auto') || url.includes('/q_auto')) {
    return url;
  }

  return url.replace('/upload/', `/upload/${transformString}/`);
}

/**
 * Strip all HTML tags and markdown link/formatting syntax for clean excerpts,
 * search previews, and accurate word counts.
 */
export function stripHtmlAndMarkdown(input: string | null | undefined): string {
  if (!input || typeof input !== 'string') return '';

  return input
    // Markdown images: ![alt](url) -> empty
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    // Markdown links: [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Markdown formatting: **bold**, *italic*, ~~strike~~
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    // HTML tags: <...> -> empty
    .replace(/<[^>]*>/g, ' ')
    // Normalize multiple spaces and trim
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Safely parse a line/paragraph of text containing HTML links, markdown links,
 * and standard inline formatting into interactive React nodes.
 */
export function renderRichText(text: string | null | undefined): React.ReactNode {
  if (!text || typeof text !== 'string') return null;

  // Regex pattern matching:
  // 1. HTML <a> tag: <a\s+([^>]*?)>(.*?)<\/a>
  // 2. Markdown link: \[([^\]]+)\]\(([^)]+)\)
  // 3. <strong> / <b>: <(strong|b)>(.*?)<\/\1>
  // 4. Markdown bold: \*\*(.*?)\*\*
  // 5. <em> / <i>: <(em|i)>(.*?)<\/\1>
  // 6. Markdown italic: \*(.*?)\*
  // 7. <code>: <code>(.*?)<\/code>
  // 8. Markdown inline code: `([^`]+)`
  // 9. <del> / <s>: <(del|s)>(.*?)<\/\1>
  // 10. <mark>: <mark>(.*?)<\/mark>
  const tagRegex = /(<a\s+[^>]*?>.*?<\/a>|\[[^\]]+\]\([^)]+\)|<(?:strong|b)>.*?<\/(?:strong|b)>|\*\*[^*]+\*\*|<(?:em|i)>.*?<\/(?:em|i)>|\*[^*]+\*|<code>.*?<\/code>|`[^`]+`|<(?:del|s)>.*?<\/(?:del|s)>|<mark>.*?<\/mark>)/gi;

  const parts = text.split(tagRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // 1. Check HTML <a> tag
    const htmlLinkMatch = part.match(/^<a\s+([^>]*?)>(.*?)<\/a>$/i);
    if (htmlLinkMatch) {
      const attributesString = htmlLinkMatch[1];
      const linkText = htmlLinkMatch[2];

      const hrefMatch = attributesString.match(/href=["']([^"']*)["']/i);
      const targetMatch = attributesString.match(/target=["']([^"']*)["']/i);
      const relMatch = attributesString.match(/rel=["']([^"']*)["']/i);

      const href = hrefMatch ? hrefMatch[1] : '#';
      const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
      const target = targetMatch ? targetMatch[1] : isExternal ? '_blank' : undefined;
      const rel = relMatch ? relMatch[1] : isExternal ? 'noopener noreferrer' : undefined;

      // If internal link starting with '/', use Next.js Link
      if (href.startsWith('/') && !href.startsWith('//')) {
        return (
          <Link
            key={index}
            href={href}
            className="blog-content-link"
            target={target}
            rel={rel}
          >
            {renderRichText(linkText)}
          </Link>
        );
      }

      return (
        <a
          key={index}
          href={href}
          className="blog-content-link"
          target={target}
          rel={rel}
        >
          {renderRichText(linkText)}
        </a>
      );
    }

    // 2. Check Markdown link: [text](url)
    const mdLinkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (mdLinkMatch) {
      const linkText = mdLinkMatch[1];
      const href = mdLinkMatch[2];
      const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');

      if (href.startsWith('/') && !href.startsWith('//')) {
        return (
          <Link
            key={index}
            href={href}
            className="blog-content-link"
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
          >
            {linkText}
          </Link>
        );
      }

      return (
        <a
          key={index}
          href={href}
          className="blog-content-link"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {linkText}
        </a>
      );
    }

    // 3. Bold: <strong>, <b> or **bold**
    const boldMatch = part.match(/^<(?:strong|b)>(.*?)<\/(?:strong|b)>$/i);
    if (boldMatch) {
      return (
        <strong key={index} style={{ fontWeight: 600, color: 'inherit' }}>
          {renderRichText(boldMatch[1])}
        </strong>
      );
    }
    const mdBoldMatch = part.match(/^\*\*(.*?)\*\*$/);
    if (mdBoldMatch) {
      return (
        <strong key={index} style={{ fontWeight: 600, color: 'inherit' }}>
          {renderRichText(mdBoldMatch[1])}
        </strong>
      );
    }

    // 4. Italic: <em>, <i> or *italic*
    const italicMatch = part.match(/^<(?:em|i)>(.*?)<\/(?:em|i)>$/i);
    if (italicMatch) {
      return (
        <em key={index} style={{ fontStyle: 'italic' }}>
          {renderRichText(italicMatch[1])}
        </em>
      );
    }
    const mdItalicMatch = part.match(/^\*(.*?)\*$/);
    if (mdItalicMatch && !part.startsWith('**')) {
      return (
        <em key={index} style={{ fontStyle: 'italic' }}>
          {renderRichText(mdItalicMatch[1])}
        </em>
      );
    }

    // 5. Code: <code> or `code`
    const codeMatch = part.match(/^<code>(.*?)<\/code>$/i);
    if (codeMatch) {
      return (
        <code
          key={index}
          style={{
            background: '#f1f5f9',
            color: '#0f172a',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.9em',
            fontFamily: 'monospace',
          }}
        >
          {codeMatch[1]}
        </code>
      );
    }
    const mdCodeMatch = part.match(/^`([^`]+)`$/);
    if (mdCodeMatch) {
      return (
        <code
          key={index}
          style={{
            background: '#f1f5f9',
            color: '#0f172a',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.9em',
            fontFamily: 'monospace',
          }}
        >
          {mdCodeMatch[1]}
        </code>
      );
    }

    // 6. Strikethrough: <del> or <s>
    const strikeMatch = part.match(/^<(?:del|s)>(.*?)<\/(?:del|s)>$/i);
    if (strikeMatch) {
      return (
        <del key={index} style={{ textDecoration: 'line-through' }}>
          {renderRichText(strikeMatch[1])}
        </del>
      );
    }

    // 7. Highlight / Mark: <mark>
    const markMatch = part.match(/^<mark>(.*?)<\/mark>$/i);
    if (markMatch) {
      return (
        <mark
          key={index}
          style={{
            background: '#fef08a',
            color: '#854d0e',
            padding: '2px 4px',
            borderRadius: '3px',
          }}
        >
          {renderRichText(markMatch[1])}
        </mark>
      );
    }

    // Regular plain text
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

/**
 * Check if a line is a markdown table separator (e.g. |:---|:---| or |---|---|)
 */
export function isTableSeparatorLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.includes('-')) return false;
  return /^\|?\s*:?-{2,}:?\s*(\|?\s*:?-{2,}:?\s*)+\|?$/.test(trimmed);
}

/**
 * Check if a line is a markdown table row (e.g. | col 1 | col 2 |)
 */
export function isTableRowLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.includes('|')) return false;
  return trimmed.split('|').length >= 2;
}

/**
 * Parses markdown table lines into an interactive React table component.
 */
export function renderMarkdownTable(lines: string[], key: React.Key): React.ReactNode {
  const sepIdx = lines.findIndex(l => isTableSeparatorLine(l));
  if (sepIdx === -1) return null;

  const splitCells = (line: string) => {
    let raw = line.trim();
    if (raw.startsWith('|')) raw = raw.slice(1);
    if (raw.endsWith('|')) raw = raw.slice(0, -1);
    return raw.split('|').map(c => c.trim());
  };

  const rawHeaderLine = lines[sepIdx - 1] || '';
  const headers = splitCells(rawHeaderLine);
  const sepCells = splitCells(lines[sepIdx]);

  const alignments = sepCells.map(cell => {
    const trimmed = cell.trim();
    const starts = trimmed.startsWith(':');
    const ends = trimmed.endsWith(':');
    if (starts && ends) return 'center';
    if (ends) return 'right';
    return 'left';
  });

  const bodyLines = lines.slice(sepIdx + 1);
  const bodyRows = bodyLines
    .filter(l => l.trim().length > 0 && !isTableSeparatorLine(l))
    .map(l => splitCells(l));

  return (
    <div
      key={key}
      className="blog-table-container"
      style={{
        margin: '28px 0',
        overflowX: 'auto',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
        background: '#ffffff',
      }}
    >
      <table
        className="blog-data-table"
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '15px',
        }}
      >
        <thead>
          <tr style={{ background: '#002244' }}>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  color: '#ffffff',
                  padding: '13px 18px',
                  fontWeight: 600,
                  fontSize: '14.5px',
                  fontFamily: 'var(--font-poppins)',
                  textAlign: (alignments[i] || 'left') as any,
                  borderBottom: '2px solid #001730',
                  whiteSpace: 'nowrap',
                }}
              >
                {renderRichText(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, rIdx) => (
            <tr
              key={rIdx}
              style={{
                background: rIdx % 2 === 1 ? '#f8fafc' : '#ffffff',
                transition: 'background 0.15s ease',
              }}
            >
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  style={{
                    padding: '12px 18px',
                    borderBottom: '1px solid #e2e8f0',
                    color: '#334155',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    textAlign: (alignments[cIdx] || 'left') as any,
                  }}
                >
                  {renderRichText(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Helper to test if a line is a list item:
 * - Markdown bullets: •, -, *
 * - Numbered lists: 1., 1.), 1), (1)
 * - Lettered lists: a), A), a.
 */
export function isListItem(line: string): boolean {
  const trimmed = line.trim();
  if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
    return true;
  }
  return /^(\d+(?:\.\)|\)|\.)|\(\d+\)|[a-zA-Z](?:\.\)|\)|\.))\s+/.test(trimmed);
}

/**
 * Helper to detect standalone subheadings:
 * Short standalone lines that look like section titles (e.g. "Daily Planning Sessions", "Visual Management Boards")
 */
export function isLikelySubheading(line: string): boolean {
  const trimmed = line.trim();
  if (trimmed.length < 3 || trimmed.length > 70) return false;
  // Cannot end with sentence punctuation or colons
  if (/[.:,;?!]$/.test(trimmed)) return false;
  // Cannot start with bullet/quote/code/heading markdown
  if (/^[•\-*>#`]/.test(trimmed)) return false;
  // Cannot be URL or markdown link
  if (trimmed.includes('http') || trimmed.includes('](')) return false;
  // Word count between 1 and 8 words
  const words = trimmed.split(/\s+/);
  if (words.length > 8) return false;
  // Must start with an uppercase letter
  if (!/^[A-Z]/.test(trimmed)) return false;
  // Cannot contain sentence-internal period
  if (/\w\.\s+\w/.test(trimmed)) return false;
  return true;
}

/**
 * Helper to detect if a text contains an inline numbered list, e.g.:
 * "The program typically covers: 1.) Item one 2.) Item two 3.) Item three..."
 * and break it into an introductory text line followed by individual list items.
 */
export function splitInlineListIfPresent(text: string): string[] {
  const trimmed = text.trim();
  // Check if text has at least two sequential numbered items like 1.) and 2.) or 1) and 2) or (1) and (2)
  const pattern = /(?:^|\s)(?:(\d+)[\.\)]|\((\d+)\))\s+/g;
  const matches = [...trimmed.matchAll(pattern)];

  // If fewer than 2 numbered markers, no need to split inline
  if (matches.length < 2) {
    return [trimmed];
  }

  // Check if first match is item 1
  const firstNum = matches[0][1] || matches[0][2];
  if (firstNum !== '1') {
    return [trimmed];
  }

  const result: string[] = [];
  const firstMatchIndex = matches[0].index ?? 0;

  // Intro text before 1.)
  if (firstMatchIndex > 0) {
    const intro = trimmed.slice(0, firstMatchIndex).trim();
    if (intro) result.push(intro);
  }

  // Iterate over matches to slice items
  for (let m = 0; m < matches.length; m++) {
    const startIdx = matches[m].index ?? 0;
    const endIdx = m + 1 < matches.length ? (matches[m + 1].index ?? trimmed.length) : trimmed.length;
    let itemChunk = trimmed.slice(startIdx, endIdx).trim();

    // In the last item, check if there's a trailing independent concluding paragraph
    if (m === matches.length - 1) {
      const sentenceBoundaryMatch = itemChunk.match(/^((?:(?:\d+[\.\)]|\(\d+\))\s+.*?[.!?]))\s+([A-Z].*)$/s);
      if (sentenceBoundaryMatch) {
        result.push(sentenceBoundaryMatch[1].trim());
        result.push(sentenceBoundaryMatch[2].trim());
        continue;
      }
    }

    result.push(itemChunk);
  }

  return result;
}

/**
 * Check if a numbered line is a strategy section heading (e.g. "1. It Converts Strategy Into Action")
 */
export function isNumberedStrategyHeading(line: string): { num: string; title: string } | null {
  const trimmed = line.trim();
  // Match "1. Title" with dot only (distinguishes numbered section headings from "1.)" list items)
  const match = trimmed.match(/^(\d+)\.\s+(.*)$/);
  if (!match) return null;
  const num = match[1];
  const title = match[2].trim();

  // If title is <= 80 chars, doesn't contain sentence-internal period followed by uppercase
  if (title.length <= 80 && !/\w\.\s+[A-Z]/.test(title)) {
    // If it ends with period, only allow if short title
    if (!title.endsWith('.') || title.length <= 45) {
      return { num, title: title.replace(/\.$/, '') };
    }
  }
  return null;
}

/**
 * Intelligently groups lines of content into semantic blocks:
 * - Markdown tables (groups headers, separator, and rows into one block)
 * - Multi-line HTML blocks (<table>, <details>, <blockquote>)
 * - Numbered strategy headings & scannable list items
 * - Subheadings, images, blockquotes, and paragraphs.
 */
export function splitContentIntoBlocks(rawContent: string | string[] | null | undefined): string[] {
  if (!rawContent) return [];

  const rawLines: string[] = [];
  if (Array.isArray(rawContent)) {
    for (const item of rawContent) {
      if (typeof item === 'string') {
        const itemTrimmed = item.trim();
        if (!itemTrimmed) continue;

        // Check if item contains an inline numbered list: "intro: 1.) a 2.) b"
        const inlineSplits = splitInlineListIfPresent(itemTrimmed);
        if (inlineSplits.length > 1) {
          rawLines.push(...inlineSplits);
          rawLines.push(""); // Separate from following items
          continue;
        }

        // Check if item is a likely subheading
        if (isLikelySubheading(itemTrimmed)) {
          rawLines.push(`### ${itemTrimmed}`);
          rawLines.push("");
          continue;
        }

        // Normal multi-line split within string
        rawLines.push(...item.split(/\r?\n/));
        rawLines.push(""); // Array entries represent distinct editorial paragraphs
      }
    }
  } else if (typeof rawContent === 'string') {
    const trimmed = rawContent.trim();
    // Check if entire string is an inline numbered list
    const inlineSplits = splitInlineListIfPresent(trimmed);
    if (inlineSplits.length > 1) {
      rawLines.push(...inlineSplits);
    } else {
      rawLines.push(...rawContent.split(/\r?\n/));
    }
  }

  const blocks: string[] = [];
  let currentPara: string[] = [];

  const flushPara = () => {
    if (currentPara.length > 0) {
      const text = currentPara.join('\n').trim();
      if (text) blocks.push(text);
      currentPara = [];
    }
  };

  let i = 0;
  while (i < rawLines.length) {
    const line = rawLines[i];
    const trimmed = line.trim();

    // Markdown table check:
    if (isTableRowLine(trimmed)) {
      const nextIsSep = i + 1 < rawLines.length && isTableSeparatorLine(rawLines[i + 1]);
      if (nextIsSep) {
        flushPara();
        const tableLines: string[] = [trimmed];
        i++; // separator line
        tableLines.push(rawLines[i].trim());
        i++; // body lines
        while (i < rawLines.length && isTableRowLine(rawLines[i].trim()) && rawLines[i].trim().length > 0) {
          tableLines.push(rawLines[i].trim());
          i++;
        }
        blocks.push(tableLines.join('\n'));
        continue;
      }
    }

    // Multi-line HTML blocks: <table>, <details>, <blockquote>
    if (
      trimmed.startsWith('<table') ||
      trimmed.startsWith('<div class="blog-table-container">') ||
      trimmed.startsWith('<details') ||
      (trimmed.startsWith('<blockquote') && !trimmed.includes('</blockquote>'))
    ) {
      flushPara();
      const htmlLines: string[] = [line];
      const closingTag = trimmed.startsWith('<table')
        ? '</table>'
        : trimmed.startsWith('<details')
        ? '</details>'
        : trimmed.startsWith('<blockquote')
        ? '</blockquote>'
        : '</div>';

      i++;
      while (i < rawLines.length) {
        htmlLines.push(rawLines[i]);
        if (rawLines[i].includes(closingTag)) {
          i++;
          break;
        }
        i++;
      }
      blocks.push(htmlLines.join('\n'));
      continue;
    }

    // Empty line separates paragraphs
    if (!trimmed) {
      flushPara();
      i++;
      continue;
    }

    // Standalone headings, image, or quote
    if (trimmed.startsWith('#') || trimmed.startsWith('![') || trimmed.startsWith('> ')) {
      flushPara();
      blocks.push(trimmed);
      i++;
      continue;
    }

    // Check if this line is an inline list that was not caught earlier
    const inlineCheck = splitInlineListIfPresent(trimmed);
    if (inlineCheck.length > 1) {
      flushPara();
      inlineCheck.forEach((item) => blocks.push(item));
      i++;
      continue;
    }

    // Check if line is a likely subheading
    if (isLikelySubheading(trimmed)) {
      flushPara();
      blocks.push(`### ${trimmed}`);
      i++;
      continue;
    }

    // List item (•, -, *, 1., 1.), 1), (1), a))
    if (isListItem(trimmed)) {
      flushPara();
      blocks.push(trimmed);
      i++;
      continue;
    }

    currentPara.push(trimmed);
    i++;
  }

  flushPara();
  return blocks;
}

/**
 * Render a complete content block or paragraph, handling custom block types:
 * - Key Takeaway Callout Boxes (<blockquote> or <blockquote class="takeaway">)
 * - FAQ Accordions (<details><summary>Q</summary><p>A</p></details>)
 * - Comparison & Data Tables (<table...> or Markdown |---| tables)
 * - YouTube Video Embeds (<iframe src="...youtube...">)
 * - Subheadings (<h3>, <h4>, or ## Heading)
 * - Bullet and numbered list items (•, -, 1.)
 * - Standard paragraphs
 */
export function renderBlogContentBlock(rawText: string | null | undefined, key: React.Key): React.ReactNode {
  if (!rawText || typeof rawText !== 'string') return null;
  const trimmed = rawText.trim();
  if (!trimmed) return null;

  // 0. Multi-line Markdown Table check: | col1 | col2 | ... |:---|:---|
  if (trimmed.includes('\n') && trimmed.includes('|')) {
    const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);
    const sepIdx = lines.findIndex(l => isTableSeparatorLine(l));
    if (sepIdx > 0 && sepIdx < lines.length) {
      const tableNode = renderMarkdownTable(lines, key);
      if (tableNode) return tableNode;
    }
  }

  // 0. Inline Markdown Image: ![alt](url)
  const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imgMatch) {
    const altText = imgMatch[1] || 'Article illustration';
    const imgSrc = imgMatch[2];
    const optimizedSrc = getOptimizedCloudinaryUrl(imgSrc, { width: 1200 });
    return (
      <figure
        key={key}
        className="blog-inline-image-figure"
        style={{
          margin: '28px 0',
          textAlign: 'center',
        }}
      >
        <img
          src={optimizedSrc}
          alt={altText}
          loading="lazy"
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            display: 'inline-block',
          }}
        />
        {altText && !['image', 'screenshot', 'illustration'].includes(altText.toLowerCase()) && (
          <figcaption
            style={{
              fontSize: '13px',
              color: '#64748b',
              fontStyle: 'italic',
              marginTop: '8px',
              textAlign: 'center',
            }}
          >
            {altText}
          </figcaption>
        )}
      </figure>
    );
  }

  // 1. YouTube Video Embed (via iframe or container)
  if (trimmed.includes('<iframe') && trimmed.includes('youtube')) {
    const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
    const videoSrc = srcMatch ? srcMatch[1] : '';
    if (videoSrc) {
      return (
        <div key={key} className="blog-video-wrapper" style={{ margin: '24px 0' }}>
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%', // 16:9 aspect ratio
              height: 0,
              overflow: 'hidden',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              background: '#000',
            }}
          >
            <iframe
              src={videoSrc}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
            />
          </div>
        </div>
      );
    }
  }

  // 2. Comparison / Data Table (HTML <table>)
  if (trimmed.startsWith('<table') || trimmed.startsWith('<div class="blog-table-container">') || trimmed.includes('<table')) {
    return (
      <div
        key={key}
        className="blog-table-container"
        style={{
          margin: '24px 0',
          overflowX: 'auto',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}
        dangerouslySetInnerHTML={{ __html: trimmed }}
      />
    );
  }

  // 3. FAQ Accordion (<details><summary>Question</summary>...</details>)
  if (trimmed.startsWith('<details') && trimmed.includes('<summary>')) {
    return (
      <div
        key={key}
        className="blog-faq-block"
        style={{ margin: '14px 0' }}
        dangerouslySetInnerHTML={{ __html: trimmed }}
      />
    );
  }

  // 4. Key Takeaway Callout Box / Blockquote
  if (
    trimmed.startsWith('<blockquote>') ||
    trimmed.startsWith('<blockquote class="') ||
    trimmed.startsWith('> ')
  ) {
    let innerText = trimmed;
    if (trimmed.startsWith('> ')) {
      innerText = trimmed.slice(2);
    } else {
      innerText = trimmed.replace(/^<blockquote[^>]*>/i, '').replace(/<\/blockquote>$/i, '');
    }

    const isTakeaway = trimmed.includes('takeaway') || innerText.toLowerCase().includes('takeaway');

    return (
      <blockquote
        key={key}
        className={isTakeaway ? 'blog-takeaway-box' : 'blog-standard-quote'}
        style={{
          borderLeft: isTakeaway ? '4px solid #2563eb' : '4px solid #94a3b8',
          background: isTakeaway ? '#f0f7ff' : '#f8fafc',
          padding: '16px 20px',
          margin: '20px 0',
          borderRadius: '0 8px 8px 0',
          fontSize: '16px',
          lineHeight: '1.7',
          color: '#1e293b',
        }}
      >
        {renderRichText(innerText)}
      </blockquote>
    );
  }

  // 5. Universal Standard Markdown & HTML Headings (# H1, ## H2, ### H3, #### H4)
  if (trimmed.startsWith('#### ') || trimmed.startsWith('<h4')) {
    const cleanHeading = trimmed.startsWith('#### ')
      ? trimmed.slice(5)
      : trimmed.replace(/^<h4[^>]*>/i, '').replace(/<\/h4>$/i, '');

    return (
      <h4
        key={key}
        className="blog-subheading-h4"
        style={{
          fontFamily: 'var(--font-poppins)',
          fontSize: '18.5px',
          fontWeight: 600,
          margin: '20px 0 8px 0',
          color: '#0f172a',
          lineHeight: '1.4',
        }}
      >
        {renderRichText(cleanHeading)}
      </h4>
    );
  }

  if (trimmed.startsWith('### ') || trimmed.startsWith('<h3')) {
    const cleanHeading = trimmed.startsWith('### ')
      ? trimmed.slice(4)
      : trimmed.replace(/^<h3[^>]*>/i, '').replace(/<\/h3>$/i, '');

    return (
      <h3
        key={key}
        className="blog-subheading-h3 text-lg sm:text-xl font-bold text-[#001659] mt-8 mb-3 tracking-tight flex items-center gap-2.5"
      >
        <span className="w-2 h-2 rounded-full bg-[#FF5E14] inline-block shrink-0" />
        <span>{renderRichText(cleanHeading)}</span>
      </h3>
    );
  }

  if (trimmed.startsWith('## ') || trimmed.startsWith('<h2')) {
    const cleanHeading = trimmed.startsWith('## ')
      ? trimmed.slice(3)
      : trimmed.replace(/^<h2[^>]*>/i, '').replace(/<\/h2>$/i, '');

    return (
      <h2
        key={key}
        className="blog-subheading-h2 text-xl sm:text-2xl font-extrabold text-[#001659] mt-9 mb-4 tracking-tight"
      >
        {renderRichText(cleanHeading)}
      </h2>
    );
  }

  if (trimmed.startsWith('# ') || trimmed.startsWith('<h1')) {
    const cleanHeading = trimmed.startsWith('# ')
      ? trimmed.slice(2)
      : trimmed.replace(/^<h1[^>]*>/i, '').replace(/<\/h1>$/i, '');

    return (
      <h1
        key={key}
        className="blog-subheading-h1 text-2xl sm:text-3xl font-extrabold text-[#001659] mt-10 mb-5 tracking-tight"
      >
        {renderRichText(cleanHeading)}
      </h1>
    );
  }

  // 6. Numbered Strategy Section / Step Header (e.g. "1. It Converts Strategy Into Action")
  const stratHeading = isNumberedStrategyHeading(trimmed);
  if (stratHeading) {
    return (
      <div key={key} className="blog-strategy-step-header mt-8 mb-3 pt-2">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#001659] text-[#FF7A3D] font-extrabold text-sm sm:text-base flex items-center justify-center shadow-xs border border-blue-900/40 shrink-0">
            {String(stratHeading.num).padStart(2, '0')}
          </span>
          <h3 className="text-base sm:text-lg md:text-[19px] font-bold text-[#001659] tracking-tight">
            {renderRichText(stratHeading.title)}
          </h3>
        </div>
      </div>
    );
  }

  // 7. Bullet List items (•, -, *)
  if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
    const listContent = trimmed.replace(/^[•\-\*]\s+/, '');
    return (
      <div
        key={key}
        className="my-2.5 p-3.5 sm:p-4 rounded-xl bg-slate-50/70 hover:bg-slate-100/70 border border-slate-200/70 transition-all flex items-start gap-3.5 group"
      >
        <div className="w-5 h-5 rounded-full bg-orange-100 text-[#FF5E14] flex items-center justify-center shrink-0 mt-0.5 border border-orange-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
        </div>
        <div className="text-[17px] sm:text-[18px] text-slate-700 leading-relaxed flex-1">
          {renderRichText(listContent)}
        </div>
      </div>
    );
  }

  // 8. Numbered / Lettered List Item (e.g. "1.) Item", "1) Item", "(1) Item", "a) Item")
  const numListMatch = trimmed.match(/^(\d+(?:\.\)|\)|\.)|\(\d+\)|[a-zA-Z](?:\.\)|\)|\.))\s+(.*)$/);
  if (numListMatch) {
    const rawBadge = numListMatch[1].replace(/[^\w]/g, '');
    const content = numListMatch[2];
    const formattedBadge = /^\d+$/.test(rawBadge) ? String(rawBadge).padStart(2, '0') : rawBadge;
    return (
      <div
        key={key}
        className="my-3 p-4 sm:p-4.5 rounded-xl bg-slate-50/80 hover:bg-blue-50/40 border border-slate-200/80 hover:border-blue-200 transition-all flex items-start gap-3.5 shadow-2xs group"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100/80 text-[#001659] font-bold text-xs sm:text-[13px] flex items-center justify-center shrink-0 mt-0.5 border border-blue-200/60 group-hover:bg-[#001659] group-hover:text-white transition-all">
          {formattedBadge}
        </div>
        <div className="text-[17px] sm:text-[18px] text-slate-700 leading-relaxed flex-1">
          {renderRichText(content)}
        </div>
      </div>
    );
  }

  // 9. Standard Editorial Paragraph
  return (
    <p
      key={key}
      className="blog-para text-[18px] sm:text-[19px] leading-[1.85] text-slate-700 mb-6 font-normal"
    >
      {renderRichText(trimmed)}
    </p>
  );
}

export default renderRichText;
