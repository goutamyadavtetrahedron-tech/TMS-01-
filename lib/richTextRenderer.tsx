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
 * Intelligently groups lines of content into semantic blocks:
 * - Markdown tables (groups headers, separator, and rows into one block)
 * - Multi-line HTML blocks (<table>, <details>, <blockquote>)
 * - Lists, subheadings, images, blockquotes, and paragraphs.
 */
export function splitContentIntoBlocks(rawContent: string | string[] | null | undefined): string[] {
  if (!rawContent) return [];

  const rawLines: string[] = [];
  if (Array.isArray(rawContent)) {
    for (const item of rawContent) {
      if (typeof item === 'string') {
        rawLines.push(...item.split(/\r?\n/));
      }
    }
  } else if (typeof rawContent === 'string') {
    rawLines.push(...rawContent.split(/\r?\n/));
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

    // List item (•, -, *, 1.)
    if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s+/.test(trimmed)) {
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
        className="blog-subheading-h3"
        style={{
          fontFamily: 'var(--font-poppins)',
          fontSize: '21.5px',
          fontWeight: 600,
          margin: '24px 0 10px 0',
          color: '#0f172a',
          lineHeight: '1.35',
        }}
      >
        {renderRichText(cleanHeading)}
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
        className="blog-subheading-h2"
        style={{
          fontFamily: 'var(--font-poppins)',
          fontSize: '25px',
          fontWeight: 700,
          margin: '28px 0 12px 0',
          color: '#0f172a',
          lineHeight: '1.3',
        }}
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
        className="blog-subheading-h1"
        style={{
          fontFamily: 'var(--font-poppins)',
          fontSize: '29px',
          fontWeight: 800,
          margin: '32px 0 14px 0',
          color: '#0f172a',
          lineHeight: '1.25',
        }}
      >
        {renderRichText(cleanHeading)}
      </h1>
    );
  }

  // 6. List items (•, -, *, or 1.)
  if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
    const listContent = trimmed.replace(/^[•\-\*]\s+/, '');
    return (
      <div
        key={key}
        className="blog-list-item"
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '10px',
          marginBottom: '8px',
          fontSize: '17px',
          lineHeight: '1.7',
          color: '#333333',
        }}
      >
        <span style={{ color: '#ff5722', fontSize: '12px', flexShrink: 0 }}>●</span>
        <span style={{ flex: 1 }}>{renderRichText(listContent)}</span>
      </div>
    );
  }

  // Numbered list item: e.g. "1. Item"
  const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
  if (numberedMatch) {
    const num = numberedMatch[1];
    const content = numberedMatch[2];
    return (
      <div
        key={key}
        className="blog-numbered-item"
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '10px',
          marginBottom: '8px',
          fontSize: '17px',
          lineHeight: '1.7',
          color: '#333333',
        }}
      >
        <span style={{ fontWeight: 700, color: '#002244', minWidth: '22px' }}>{num}.</span>
        <span style={{ flex: 1 }}>{renderRichText(content)}</span>
      </div>
    );
  }

  // 7. Standard Paragraph
  return (
    <p
      key={key}
      className="blog-para"
      style={{
        fontSize: '17.5px',
        lineHeight: '1.8',
        marginBottom: '16px',
        color: '#333333',
      }}
    >
      {renderRichText(trimmed)}
    </p>
  );
}

export default renderRichText;
