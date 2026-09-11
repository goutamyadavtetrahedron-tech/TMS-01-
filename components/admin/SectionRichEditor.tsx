'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Link as LinkIcon,
  Unlink,
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Eye,
  Edit3,
  ExternalLink,
  Search,
  Check,
  X,
  Sparkles,
  HelpCircle,
  Table as TableIcon,
  Video,
  PlusCircle,
  ChevronDown,
  Lightbulb,
  Heading,
  HelpCircle as FaqIcon,
  Loader2,
  Image as ImageIcon,
} from 'lucide-react';
import { renderRichText, stripHtmlAndMarkdown, renderBlogContentBlock, splitContentIntoBlocks } from '@/lib/richTextRenderer';

// Predefined high-value internal links for quick suggestions
const COMMON_INTERNAL_PAGES = [
  { title: 'AGV & AMR Manufacturers', url: '/automated-guided-vehicle-manufacturers' },
  { title: 'Operational Excellence Consulting', url: '/operational-excellence-consulting-firms' },
  { title: 'Technical Trainings', url: '/corporate-training-companies/technical-trainings' },
  { title: 'Process Improvement Courses', url: '/corporate-training-companies/process-improvement-training-courses' },
  { title: 'Behavioural Training', url: '/corporate-training-companies/behavioural-training' },
  { title: 'Strategic Training', url: '/corporate-training-companies/strategic-training' },
  { title: 'Skill Training', url: '/corporate-training-companies/skill-training' },
  { title: 'About Tetrahedron', url: '/about-us' },
  { title: 'Contact Us', url: '/contact-us' },
  { title: 'All Blog Articles', url: '/blog' },
];

interface SectionRichEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  sectionIndex: number;
  availableBlogs?: Array<{ title: string; slug: string }>;
  onImagePaste?: (file: File) => void;
}

export default function SectionRichEditor({
  value,
  onChange,
  placeholder = 'Write the explanation, case study details, or step-by-step guidance for this chapter...',
  required = false,
  sectionIndex,
  availableBlogs = [],
  onImagePaste,
}: SectionRichEditorProps) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false);
  const [linkText, setLinkText] = useState<string>('');
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [openInNewTab, setOpenInNewTab] = useState<boolean>(true);
  const [isEditingExistingLink, setIsEditingExistingLink] = useState<boolean>(false);
  const [linkSearchQuery, setLinkSearchQuery] = useState<string>('');
  const [savedSelection, setSavedSelection] = useState<{ start: number; end: number }>({ start: 0, end: 0 });

  // Custom Blocks & YouTube modal state
  const [isBlockMenuOpen, setIsBlockMenuOpen] = useState<boolean>(false);
  const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState<boolean>(false);
  const [youtubeUrlInput, setYoutubeUrlInput] = useState<string>('');
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const urlInputRef = useRef<HTMLInputElement | null>(null);
  const blockMenuRef = useRef<HTMLDivElement | null>(null);

  // Close block menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (blockMenuRef.current && !blockMenuRef.current.contains(e.target as Node)) {
        setIsBlockMenuOpen(false);
      }
    };
    if (isBlockMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isBlockMenuOpen]);

  // Auto-resize textarea height to eliminate cramped inner scrollbars
  const autoResizeTextarea = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.max(140, textareaRef.current.scrollHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'write') {
      autoResizeTextarea();
    }
  }, [value, activeTab, autoResizeTextarea]);

  // Focus URL input when link popover opens
  useEffect(() => {
    if (isLinkModalOpen && urlInputRef.current) {
      urlInputRef.current.focus();
      urlInputRef.current.select();
    }
  }, [isLinkModalOpen]);

  // Word Boundary Detection Helper: Find word at cursor if nothing is selected
  const getWordAtCursor = (text: string, pos: number) => {
    let start = pos;
    let end = pos;

    while (start > 0 && /\w/.test(text[start - 1])) {
      start--;
    }
    while (end < text.length && /\w/.test(text[end])) {
      end++;
    }

    return { start, end, word: text.slice(start, end) };
  };

  // Detect if selection or cursor is already inside an <a href="...">...</a> tag
  const checkInsideLink = (text: string, cursorStart: number, cursorEnd: number) => {
    const linkRegex = /<a\s+href=["']([^"']*)["'](?:\s+target=["']([^"']*)["'])?(?:\s+rel=["']([^"']*)["'])?[^>]*>(.*?)<\/a>/gi;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(text)) !== null) {
      const matchStart = match.index;
      const matchEnd = match.index + match[0].length;

      // Check if cursor/selection intersects with this link tag
      if (cursorStart >= matchStart && cursorEnd <= matchEnd) {
        return {
          found: true,
          matchStart,
          matchEnd,
          url: match[1] || '',
          target: match[2] || '',
          text: match[4] || '',
          fullTag: match[0],
        };
      }
    }

    return { found: false, matchStart: 0, matchEnd: 0, url: '', target: '', text: '', fullTag: '' };
  };

  // Open Link Dialog
  const handleOpenLinkModal = () => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    let selStart = textarea.selectionStart;
    let selEnd = textarea.selectionEnd;

    // Check if cursor is inside an existing link
    const existingLink = checkInsideLink(value, selStart, selEnd);
    if (existingLink.found) {
      setSavedSelection({ start: existingLink.matchStart, end: existingLink.matchEnd });
      setLinkText(existingLink.text);
      setLinkUrl(existingLink.url);
      setOpenInNewTab(existingLink.target === '_blank');
      setIsEditingExistingLink(true);
      setLinkSearchQuery('');
      setIsLinkModalOpen(true);
      return;
    }

    // If no text selected, automatically select word at cursor (WordPress behavior)
    if (selStart === selEnd) {
      const { start, end, word } = getWordAtCursor(value, selStart);
      if (word && word.trim().length > 0) {
        selStart = start;
        selEnd = end;
      }
    }

    const selectedSlice = value.slice(selStart, selEnd);

    setSavedSelection({ start: selStart, end: selEnd });
    setLinkText(selectedSlice);
    setLinkUrl('');
    setOpenInNewTab(true);
    setIsEditingExistingLink(false);
    setLinkSearchQuery('');
    setIsLinkModalOpen(true);
  };

  // Apply Link to Text
  const handleApplyLink = () => {
    if (!linkUrl.trim()) return;

    let formattedUrl = linkUrl.trim();
    // Auto-prefix https:// if missing for web URLs (unless internal anchor / path)
    if (
      !formattedUrl.startsWith('http://') &&
      !formattedUrl.startsWith('https://') &&
      !formattedUrl.startsWith('/') &&
      !formattedUrl.startsWith('#') &&
      !formattedUrl.startsWith('mailto:') &&
      !formattedUrl.startsWith('tel:')
    ) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const displayText = linkText.trim() || formattedUrl;
    const targetAttr = openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';
    const linkHtml = `<a href="${formattedUrl}"${targetAttr}>${displayText}</a>`;

    const before = value.slice(0, savedSelection.start);
    const after = value.slice(savedSelection.end);
    const newValue = `${before}${linkHtml}${after}`;

    onChange(newValue);
    setIsLinkModalOpen(false);

    // Refocus textarea and place cursor after inserted link
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newCursorPos = savedSelection.start + linkHtml.length;
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
        autoResizeTextarea();
      }
    }, 50);
  };

  // Unlink / Remove Link
  const handleUnlink = () => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const selStart = textarea.selectionStart;
    const selEnd = textarea.selectionEnd;

    const existingLink = checkInsideLink(value, selStart, selEnd);
    if (existingLink.found) {
      const before = value.slice(0, existingLink.matchStart);
      const after = value.slice(existingLink.matchEnd);
      const newValue = `${before}${existingLink.text}${after}`;

      onChange(newValue);
      setIsLinkModalOpen(false);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          const newCursorPos = existingLink.matchStart + existingLink.text.length;
          textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
          autoResizeTextarea();
        }
      }, 50);
    } else {
      const selectedText = value.slice(selStart, selEnd);
      if (/<a\s+[^>]*>.*?<\/a>/i.test(selectedText)) {
        const unlinkedText = selectedText.replace(/<a\s+[^>]*>(.*?)<\/a>/gi, '$1');
        const before = value.slice(0, selStart);
        const after = value.slice(selEnd);
        const newValue = `${before}${unlinkedText}${after}`;
        onChange(newValue);
      }
    }
  };

  // Wrap Selection Helper (for Bold, Italic, Code, Strikethrough)
  const handleWrapSelection = (tag: string, endTag = tag) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    let selStart = textarea.selectionStart;
    let selEnd = textarea.selectionEnd;

    if (selStart === selEnd) {
      const { start, end, word } = getWordAtCursor(value, selStart);
      if (word && word.trim().length > 0) {
        selStart = start;
        selEnd = end;
      }
    }

    const selectedText = value.slice(selStart, selEnd);
    const before = value.slice(0, selStart);
    const after = value.slice(selEnd);

    const openTag = `<${tag}>`;
    const closeTag = `</${endTag}>`;

    if (before.endsWith(openTag) && after.startsWith(closeTag)) {
      // Toggle off / unwrap
      const newBefore = before.slice(0, before.length - openTag.length);
      const newAfter = after.slice(closeTag.length);
      onChange(`${newBefore}${selectedText}${newAfter}`);
      return;
    }

    const wrappedText = `${openTag}${selectedText || 'text'}${closeTag}`;
    const newValue = `${before}${wrappedText}${after}`;

    onChange(newValue);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newCursorPos = selStart + wrappedText.length;
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
        autoResizeTextarea();
      }
    }, 50);
  };

  // Bullet / Numbered List Formatter
  const handleFormatList = (type: 'bullet' | 'number') => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const selStart = textarea.selectionStart;
    const selEnd = textarea.selectionEnd;

    const selectedText = value.slice(selStart, selEnd);
    const lines = (selectedText || 'List item').split('\n');

    const formattedLines = lines.map((line, idx) => {
      const cleanLine = line.replace(/^[•\-\*]\s+/, '').replace(/^\d+\.\s+/, '');
      return type === 'bullet' ? `• ${cleanLine}` : `${idx + 1}. ${cleanLine}`;
    });

    const replacement = formattedLines.join('\n');
    const before = value.slice(0, selStart);
    const after = value.slice(selEnd);

    onChange(`${before}${replacement}${after}`);
  };

  // Insert Block Templates Helper
  const handleInsertBlock = (
    blockType: 'takeaway' | 'table' | 'faq' | 'youtube' | 'subheading' | 'h1' | 'h2' | 'h3' | 'h4'
  ) => {
    setIsBlockMenuOpen(false);

    if (blockType === 'youtube') {
      setYoutubeUrlInput('');
      setIsYoutubeModalOpen(true);
      return;
    }

    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const selStart = textarea.selectionStart;
    const selEnd = textarea.selectionEnd;

    let snippet = '';

    if (blockType === 'takeaway') {
      snippet = `\n<blockquote class="blog-takeaway-box">\n<strong>💡 Key Takeaway:</strong> Enter critical operational summary or manufacturing takeaway here.\n</blockquote>\n`;
    } else if (blockType === 'table') {
      snippet = `\n<div class="blog-table-container">\n<table class="blog-data-table">\n<thead>\n<tr>\n<th>Feature / Metric</th>\n<th>Conventional System</th>\n<th>Tetrahedron Smart Automation</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Cycle Time</td>\n<td>Manual tracking, high variance</td>\n<td>Automated tracking, 35% latency reduction</td>\n</tr>\n<tr>\n<td>Quality Rejection Rate</td>\n<td>1.8% defect margin</td>\n<td>Reduced to < 0.2% Six Sigma standard</td>\n</tr>\n<tr>\n<td>Payback Period</td>\n<td>3+ Years</td>\n<td>12 to 18 Months</td>\n</tr>\n</tbody>\n</table>\n</div>\n`;
    } else if (blockType === 'faq') {
      snippet = `\n<details class="blog-faq-accordion">\n<summary>Frequently Asked Question about this topic?</summary>\n<p>Provide a detailed, practical answer explaining the technical methodology, engineering considerations, and business results.</p>\n</details>\n`;
    } else if (blockType === 'h1') {
      snippet = `\n# Main Heading (H1)\n`;
    } else if (blockType === 'h2') {
      snippet = `\n## Section Heading (H2)\n`;
    } else if (blockType === 'subheading' || blockType === 'h3') {
      snippet = `\n### Sub-Heading (H3)\n`;
    } else if (blockType === 'h4') {
      snippet = `\n#### Minor Heading (H4)\n`;
    }

    const before = value.slice(0, selStart);
    const after = value.slice(selEnd);
    const newValue = `${before}${snippet}${after}`;

    onChange(newValue);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newCursorPos = selStart + snippet.length;
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
        autoResizeTextarea();
      }
    }, 50);
  };

  // Apply YouTube Embed
  const handleApplyYoutube = () => {
    if (!youtubeUrlInput.trim() || !textareaRef.current) return;

    let videoId = '';
    const trimmedUrl = youtubeUrlInput.trim();

    // Parse various YouTube URL formats:
    // https://www.youtube.com/watch?v=XXXXX
    // https://youtu.be/XXXXX
    // https://www.youtube.com/embed/XXXXX
    const watchMatch = trimmedUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (watchMatch) {
      videoId = watchMatch[1];
    } else if (/^[\w-]{11}$/.test(trimmedUrl)) {
      videoId = trimmedUrl;
    }

    if (!videoId) {
      alert('Please enter a valid YouTube video URL or 11-character video ID.');
      return;
    }

    const embedHtml = `\n<div class="blog-video-wrapper"><iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allowfullscreen></iframe></div>\n`;

    const textarea = textareaRef.current;
    const selStart = textarea.selectionStart;
    const selEnd = textarea.selectionEnd;

    const before = value.slice(0, selStart);
    const after = value.slice(selEnd);
    onChange(`${before}${embedHtml}${after}`);

    setIsYoutubeModalOpen(false);
    setYoutubeUrlInput('');

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        autoResizeTextarea();
      }
    }, 50);
  };

  // Keyboard Shortcuts & Smart Markdown List Continuation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 1. Ctrl+K or Cmd+K: Hyperlink
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      handleOpenLinkModal();
      return;
    }

    // 2. Ctrl+B or Cmd+B: Bold
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      handleWrapSelection('strong');
      return;
    }

    // 3. Ctrl+I or Cmd+I: Italic
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      handleWrapSelection('em');
      return;
    }

    const textarea = e.currentTarget;
    const cursorPos = textarea.selectionStart;
    const currentText = textarea.value;

    // 4. Enter Key: Smart List Continuation
    if (e.key === 'Enter') {
      // Find current line bounds
      const lineStart = currentText.lastIndexOf('\n', cursorPos - 1) + 1;
      let lineEnd = currentText.indexOf('\n', cursorPos);
      if (lineEnd === -1) lineEnd = currentText.length;
      const currentLine = currentText.slice(lineStart, cursorPos);

      // Check bullet list: "• " or "- "
      const bulletMatch = currentLine.match(/^[•\-\*]\s*(.*)$/);
      if (bulletMatch) {
        e.preventDefault();
        const content = bulletMatch[1];
        if (!content.trim()) {
          // Empty bullet item -> exit list (clear bullet from current line)
          const newBefore = currentText.slice(0, lineStart);
          const newAfter = currentText.slice(cursorPos);
          onChange(`${newBefore}\n${newAfter}`);
          setTimeout(() => {
            textarea.setSelectionRange(lineStart + 1, lineStart + 1);
            autoResizeTextarea();
          }, 0);
        } else {
          // Non-empty bullet item -> continue with next bullet
          const newBefore = currentText.slice(0, cursorPos);
          const newAfter = currentText.slice(cursorPos);
          const insert = '\n• ';
          onChange(`${newBefore}${insert}${newAfter}`);
          setTimeout(() => {
            textarea.setSelectionRange(cursorPos + insert.length, cursorPos + insert.length);
            autoResizeTextarea();
          }, 0);
        }
        return;
      }

      // Check numbered list: "1. "
      const numberMatch = currentLine.match(/^(\d+)\.\s*(.*)$/);
      if (numberMatch) {
        e.preventDefault();
        const num = parseInt(numberMatch[1], 10);
        const content = numberMatch[2];
        if (!content.trim()) {
          // Empty item -> exit numbered list
          const newBefore = currentText.slice(0, lineStart);
          const newAfter = currentText.slice(cursorPos);
          onChange(`${newBefore}\n${newAfter}`);
          setTimeout(() => {
            textarea.setSelectionRange(lineStart + 1, lineStart + 1);
            autoResizeTextarea();
          }, 0);
        } else {
          // Continue numbered list
          const nextNum = num + 1;
          const insert = `\n${nextNum}. `;
          const newBefore = currentText.slice(0, cursorPos);
          const newAfter = currentText.slice(cursorPos);
          onChange(`${newBefore}${insert}${newAfter}`);
          setTimeout(() => {
            textarea.setSelectionRange(cursorPos + insert.length, cursorPos + insert.length);
            autoResizeTextarea();
          }, 0);
        }
        return;
      }
    }

    // 5. Space Key: Markdown triggers at start of line
    if (e.key === ' ') {
      const lineStart = currentText.lastIndexOf('\n', cursorPos - 1) + 1;
      const prefix = currentText.slice(lineStart, cursorPos);

      if (prefix === '##') {
        e.preventDefault();
        const newText = currentText.slice(0, lineStart) + '## ' + currentText.slice(cursorPos);
        onChange(newText);
        setTimeout(() => {
          textarea.setSelectionRange(lineStart + 3, lineStart + 3);
          autoResizeTextarea();
        }, 0);
        return;
      }

      if (prefix === '-' || prefix === '*') {
        e.preventDefault();
        const newText = currentText.slice(0, lineStart) + '• ' + currentText.slice(cursorPos);
        onChange(newText);
        setTimeout(() => {
          textarea.setSelectionRange(lineStart + 2, lineStart + 2);
          autoResizeTextarea();
        }, 0);
        return;
      }

      if (prefix === '>') {
        e.preventDefault();
        const newText = currentText.slice(0, lineStart) + '> ' + currentText.slice(cursorPos);
        onChange(newText);
        setTimeout(() => {
          textarea.setSelectionRange(lineStart + 2, lineStart + 2);
          autoResizeTextarea();
        }, 0);
        return;
      }
    }
  };

  // 6. Clipboard Paste Handler: Upload copied screenshots & images directly to Cloudinary
  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardItems = e.clipboardData?.items;
    if (!clipboardItems) return;

    let imageFile: File | null = null;
    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i];
      if (item.type && item.type.startsWith('image/')) {
        imageFile = item.getAsFile();
        break;
      }
    }

    if (!imageFile) {
      // Normal text paste, proceed with default browser behavior
      return;
    }

    // Image found! Prevent raw binary paste
    e.preventDefault();

    // 1. If onImagePaste is provided by parent Chapter card, attach directly to Chapter Graphic!
    if (onImagePaste) {
      onImagePaste(imageFile);
      setIsUploadingImage(true);
      setTimeout(() => setIsUploadingImage(false), 3000);
      return;
    }

    const textarea = textareaRef.current;
    const start = textarea?.selectionStart ?? value.length;
    const end = textarea?.selectionEnd ?? value.length;

    const imageName = imageFile.name ? imageFile.name.replace(/\.[^/.]+$/, '') : 'Screenshot';
    const placeholder = `\n\n![Uploading ${imageName}...]()\n\n`;
    const newTextWithPlaceholder = value.slice(0, start) + placeholder + value.slice(end);
    onChange(newTextWithPlaceholder);
    setIsUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const res = await fetch('/api/blogs/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Image upload failed');
      }

      const finalMarkdownImage = `\n\n![${imageName}](${data.url})\n\n`;
      onChange(newTextWithPlaceholder.replace(placeholder, finalMarkdownImage));
      setTimeout(() => autoResizeTextarea(), 50);
    } catch (err: any) {
      console.error('Failed to paste/upload image from clipboard:', err);
      // Remove placeholder on error
      onChange(newTextWithPlaceholder.replace(placeholder, ''));
      alert('Could not upload pasted image: ' + (err.message || 'Network error'));
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Filtered internal link suggestions for autocomplete
  const filteredSuggestions = React.useMemo(() => {
    const query = linkSearchQuery.toLowerCase().trim();
    const suggestions: Array<{ title: string; url: string; type: string }> = [];

    COMMON_INTERNAL_PAGES.forEach(page => {
      if (!query || page.title.toLowerCase().includes(query) || page.url.toLowerCase().includes(query)) {
        suggestions.push({ ...page, type: 'Page' });
      }
    });

    availableBlogs.forEach(b => {
      if (!query || b.title.toLowerCase().includes(query) || b.slug.toLowerCase().includes(query)) {
        suggestions.push({
          title: b.title,
          url: `/blog/${b.slug}`,
          type: 'Blog',
        });
      }
    });

    return suggestions.slice(0, 5);
  }, [linkSearchQuery, availableBlogs]);

  // Section Word & Character Metrics
  const sectionMetrics = React.useMemo(() => {
    const clean = stripHtmlAndMarkdown(value);
    const words = clean.split(/\s+/).filter(Boolean).length;
    const chars = clean.length;
    return { words, chars };
  }, [value]);

  return (
    <div className="section-rich-editor-root">
      {/* Editor Top Toolbar */}
      <div className="sre-toolbar">
        {/* Left: WordPress Formatting Buttons */}
        <div className="sre-tools-group">
          {/* Hyperlink Tool */}
          <button
            type="button"
            onClick={handleOpenLinkModal}
            className="sre-btn sre-btn-link"
            title="Add Hyperlink on selected words (Ctrl+K)"
          >
            <LinkIcon size={14} />
            <span className="sre-btn-label">Link</span>
          </button>

          <button
            type="button"
            onClick={handleUnlink}
            className="sre-btn"
            title="Remove Hyperlink (Unlink)"
          >
            <Unlink size={14} />
          </button>

          <div className="sre-divider" />

          {/* Bold */}
          <button
            type="button"
            onClick={() => handleWrapSelection('strong')}
            className="sre-btn"
            title="Bold (Ctrl+B)"
          >
            <Bold size={14} />
          </button>

          {/* Italic */}
          <button
            type="button"
            onClick={() => handleWrapSelection('em')}
            className="sre-btn"
            title="Italic (Ctrl+I)"
          >
            <Italic size={14} />
          </button>

          {/* Strikethrough */}
          <button
            type="button"
            onClick={() => handleWrapSelection('del')}
            className="sre-btn"
            title="Strikethrough"
          >
            <Strikethrough size={14} />
          </button>

          {/* Code */}
          <button
            type="button"
            onClick={() => handleWrapSelection('code')}
            className="sre-btn"
            title="Inline Code (`code`)"
          >
            <Code size={14} />
          </button>

          <div className="sre-divider" />

          {/* Bullet List */}
          <button
            type="button"
            onClick={() => handleFormatList('bullet')}
            className="sre-btn"
            title="Bullet List (•)"
          >
            <List size={14} />
          </button>

          {/* Numbered List */}
          <button
            type="button"
            onClick={() => handleFormatList('number')}
            className="sre-btn"
            title="Numbered List (1. 2. 3.)"
          >
            <ListOrdered size={14} />
          </button>

          <div className="sre-divider" />

          {/* "+ Insert Block" Dropdown Menu */}
          <div className="sre-block-dropdown-wrap" ref={blockMenuRef}>
            <button
              type="button"
              onClick={() => setIsBlockMenuOpen(!isBlockMenuOpen)}
              className="sre-btn sre-btn-blocks"
              title="Insert WordPress-style blocks: Tables, Callouts, FAQs, YouTube"
            >
              <PlusCircle size={14} />
              <span className="sre-btn-label">Insert Block</span>
              <ChevronDown size={12} />
            </button>

            {isBlockMenuOpen && (
              <div className="sre-block-menu">
                <div className="sre-block-menu-header">WordPress Block Templates</div>

                <button
                  type="button"
                  className="sre-block-menu-item"
                  onClick={() => handleInsertBlock('takeaway')}
                >
                  <Lightbulb size={15} color="#2563eb" />
                  <div>
                    <div className="sre-bmi-title">Key Takeaway Box</div>
                    <div className="sre-bmi-desc">Highlighted executive summary callout</div>
                  </div>
                </button>

                <button
                  type="button"
                  className="sre-block-menu-item"
                  onClick={() => handleInsertBlock('table')}
                >
                  <TableIcon size={15} color="#16a34a" />
                  <div>
                    <div className="sre-bmi-title">Comparison / Data Table</div>
                    <div className="sre-bmi-desc">Responsive side-by-side metric matrix</div>
                  </div>
                </button>

                <button
                  type="button"
                  className="sre-block-menu-item"
                  onClick={() => handleInsertBlock('faq')}
                >
                  <FaqIcon size={15} color="#9333ea" />
                  <div>
                    <div className="sre-bmi-title">FAQ Accordion (&lt;details&gt;)</div>
                    <div className="sre-bmi-desc">Interactive collapsible question & answer</div>
                  </div>
                </button>

                <button
                  type="button"
                  className="sre-block-menu-item"
                  onClick={() => handleInsertBlock('youtube')}
                >
                  <Video size={15} color="#dc2626" />
                  <div>
                    <div className="sre-bmi-title">YouTube Video Embed</div>
                    <div className="sre-bmi-desc">Responsive 16:9 streaming video player</div>
                  </div>
                </button>

                <button
                  type="button"
                  className="sre-block-menu-item"
                  onClick={() => handleInsertBlock('h2')}
                >
                  <Heading size={15} color="#0f172a" />
                  <div>
                    <div className="sre-bmi-title">Section Heading (H2)</div>
                    <div className="sre-bmi-desc">Type ## for major section heading</div>
                  </div>
                </button>

                <button
                  type="button"
                  className="sre-block-menu-item"
                  onClick={() => handleInsertBlock('h3')}
                >
                  <Heading size={15} color="#0f172a" />
                  <div>
                    <div className="sre-bmi-title">Sub-Heading (H3)</div>
                    <div className="sre-bmi-desc">Type ### for chapter subsections</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Write vs Visual Preview Tabs */}
        <div className="sre-tab-group">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`sre-tab-btn ${activeTab === 'write' ? 'active' : ''}`}
          >
            <Edit3 size={13} />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`sre-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
          >
            <Eye size={13} />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Body: Write Mode */}
      {activeTab === 'write' ? (
        <div className="sre-write-wrap">
          <textarea
            ref={textareaRef}
            className="sre-textarea"
            placeholder={placeholder}
            value={value}
            onChange={e => {
              onChange(e.target.value);
              autoResizeTextarea();
            }}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            required={required}
            rows={5}
          />
          {isUploadingImage && (
            <div className="sre-paste-uploading-bar" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d' }}>
              <Check size={13} color="#16a34a" />
              <span>Image pasted from clipboard & attached to Chapter Graphic below!</span>
            </div>
          )}
        </div>
      ) : (
        /* Visual Preview Mode: Real time rendered view */
        <div className="sre-preview-wrap">
          {value.trim() ? (
            <div className="sre-preview-content">
              {splitContentIntoBlocks(value).map((block, i) => renderBlogContentBlock(block, i))}
            </div>
          ) : (
            <div className="sre-preview-empty">
              <span>Section is empty. Switch to Write tab to compose content.</span>
            </div>
          )}
        </div>
      )}

      {/* Footer Meta Row */}
      <div className="sre-footer">
        <div className="sre-footer-left">
          <span className="sre-shortcuts-label">💡 Shortcuts:</span>
          <div className="sre-shortcuts-badges">
            <span className="sre-shortcut-pill"><kbd>Ctrl+K</kbd> Link</span>
            <span className="sre-shortcut-pill"><kbd>Ctrl+B</kbd> Bold</span>
            <span className="sre-shortcut-pill"><kbd>#</kbd> H1</span>
            <span className="sre-shortcut-pill"><kbd>##</kbd> H2</span>
            <span className="sre-shortcut-pill"><kbd>###</kbd> H3</span>
            <span className="sre-shortcut-pill"><kbd>-</kbd> List</span>
            <span className="sre-shortcut-pill"><kbd>&gt;</kbd> Quote</span>
          </div>
        </div>
        <div className="sre-footer-right">
          <span className="sre-counter">
            <strong>{sectionMetrics.words}</strong> {sectionMetrics.words === 1 ? 'word' : 'words'} · <strong>{sectionMetrics.chars}</strong> chars
          </span>
        </div>
      </div>

      {/* WordPress-Style Link Insertion Popover Modal */}
      {isLinkModalOpen && (
        <div className="sre-link-overlay" onClick={() => setIsLinkModalOpen(false)}>
          <div className="sre-link-popover" onClick={e => e.stopPropagation()}>
            <div className="sre-popover-head">
              <div className="sre-popover-title">
                <LinkIcon size={16} />
                <span>{isEditingExistingLink ? 'Edit Hyperlink' : 'Add Hyperlink to Words'}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="sre-popover-close"
              >
                <X size={15} />
              </button>
            </div>

            <div className="sre-popover-body">
              {/* Text to Display */}
              <div className="sre-field">
                <label className="sre-label">Word(s) to Display</label>
                <input
                  type="text"
                  className="sre-input"
                  placeholder="Selected word or anchor text..."
                  value={linkText}
                  onChange={e => setLinkText(e.target.value)}
                />
              </div>

              {/* Destination URL */}
              <div className="sre-field">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="sre-label">Destination URL</label>
                  <span className="sre-sublabel">e.g. https://tetrahedron.in or /about-us</span>
                </div>
                <div className="sre-input-icon-wrap">
                  <ExternalLink size={14} className="sre-input-icon" />
                  <input
                    ref={urlInputRef}
                    type="text"
                    className="sre-input sre-input-with-icon"
                    placeholder="https://example.com or /internal-link"
                    value={linkUrl}
                    onChange={e => {
                      setLinkUrl(e.target.value);
                      setLinkSearchQuery(e.target.value);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleApplyLink();
                      } else if (e.key === 'Escape') {
                        setIsLinkModalOpen(false);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Open in New Tab Checkbox */}
              <div className="sre-field-checkbox">
                <label className="sre-checkbox-label">
                  <input
                    type="checkbox"
                    checked={openInNewTab}
                    onChange={e => setOpenInNewTab(e.target.checked)}
                    className="sre-checkbox"
                  />
                  <span>Open link in new tab (<code>target="_blank"</code>)</span>
                </label>
              </div>

              {/* Internal Link Quick Suggestions */}
              <div className="sre-suggestions-box">
                <div className="sre-suggestions-head">
                  <Search size={12} />
                  <span>Quick Internal Link Suggestions:</span>
                </div>
                <div className="sre-suggestions-list">
                  {filteredSuggestions.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setLinkUrl(item.url);
                        if (!linkText.trim()) {
                          setLinkText(item.title);
                        }
                      }}
                      className="sre-suggestion-item"
                    >
                      <span className="sre-sug-title">{item.title}</span>
                      <span className="sre-sug-url">{item.url}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Popover Actions */}
            <div className="sre-popover-foot">
              {isEditingExistingLink && (
                <button
                  type="button"
                  onClick={handleUnlink}
                  className="sre-btn-danger-outline"
                >
                  <Unlink size={13} />
                  <span>Remove Link</span>
                </button>
              )}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setIsLinkModalOpen(false)}
                  className="sre-btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyLink}
                  disabled={!linkUrl.trim()}
                  className="sre-btn-apply"
                >
                  <Check size={14} />
                  <span>{isEditingExistingLink ? 'Update Link' : 'Add Link'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Embed Modal */}
      {isYoutubeModalOpen && (
        <div className="sre-link-overlay" onClick={() => setIsYoutubeModalOpen(false)}>
          <div className="sre-link-popover" onClick={e => e.stopPropagation()}>
            <div className="sre-popover-head">
              <div className="sre-popover-title">
                <Video size={16} color="#dc2626" />
                <span>Embed YouTube Video</span>
              </div>
              <button
                type="button"
                onClick={() => setIsYoutubeModalOpen(false)}
                className="sre-popover-close"
              >
                <X size={15} />
              </button>
            </div>

            <div className="sre-popover-body">
              <div className="sre-field">
                <label className="sre-label">YouTube Video Link or ID</label>
                <input
                  type="text"
                  className="sre-input"
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                  value={youtubeUrlInput}
                  onChange={e => setYoutubeUrlInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleApplyYoutube();
                    }
                  }}
                  autoFocus
                />
                <span className="sre-sublabel" style={{ marginTop: 4 }}>
                  Supports full YouTube URLs, short youtu.be links, or direct 11-digit video IDs.
                </span>
              </div>
            </div>

            <div className="sre-popover-foot">
              <button
                type="button"
                onClick={() => setIsYoutubeModalOpen(false)}
                className="sre-btn-cancel"
                style={{ marginLeft: 'auto' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyYoutube}
                disabled={!youtubeUrlInput.trim()}
                className="sre-btn-apply"
                style={{ marginLeft: 8 }}
              >
                <Check size={14} />
                <span>Embed Video</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Component Scoped CSS */}
      <style jsx>{`
        .section-rich-editor-root {
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
          overflow: visible;
          position: relative;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .section-rich-editor-root:focus-within {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
        }

        /* Toolbar */
        .sre-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 10px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          gap: 8px;
          flex-wrap: wrap;
        }
        .sre-tools-group {
          display: flex;
          align-items: center;
          gap: 3px;
          flex-wrap: wrap;
          position: relative;
        }
        .sre-divider {
          width: 1px;
          height: 18px;
          background: #cbd5e1;
          margin: 0 4px;
        }
        .sre-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          height: 28px;
          padding: 0 7px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 5px;
          color: #475569;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
        }
        .sre-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }
        .sre-btn-link {
          background: #eff6ff;
          color: #1d4ed8;
          border-color: #bfdbfe;
          font-weight: 600;
        }
        .sre-btn-link:hover {
          background: #dbeafe;
          color: #1e40af;
        }
        .sre-btn-blocks {
          background: #f0fdf4;
          color: #15803d;
          border-color: #bbf7d0;
          font-weight: 600;
        }
        .sre-btn-blocks:hover {
          background: #dcfce7;
          color: #166534;
        }
        .sre-btn-label {
          font-size: 11.5px;
        }

        /* Blocks Dropdown */
        .sre-block-dropdown-wrap {
          position: relative;
        }
        .sre-block-menu {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          width: 270px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08);
          z-index: 1000;
          padding: 6px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          animation: srePopoverIn 0.15s ease-out;
        }
        .sre-block-menu-header {
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 6px 8px 4px 8px;
        }
        .sre-block-menu-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 8px 10px;
          border: none;
          background: transparent;
          border-radius: 6px;
          text-align: left;
          cursor: pointer;
          transition: background 0.12s;
          width: 100%;
        }
        .sre-block-menu-item:hover {
          background: #f1f5f9;
        }
        .sre-bmi-title {
          font-size: 13px;
          font-weight: 600;
          color: #0f172a;
        }
        .sre-bmi-desc {
          font-size: 11px;
          color: #64748b;
          margin-top: 1px;
        }

        /* Tab switch */
        .sre-tab-group {
          display: flex;
          align-items: center;
          background: #e2e8f0;
          padding: 2px;
          border-radius: 6px;
          gap: 2px;
        }
        .sre-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 9px;
          font-size: 11.5px;
          font-weight: 500;
          border: none;
          background: transparent;
          color: #64748b;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .sre-tab-btn.active {
          background: #ffffff;
          color: #0f172a;
          font-weight: 600;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        /* Write Textarea */
        .sre-write-wrap {
          padding: 10px 12px;
          background: #ffffff;
        }
        .sre-textarea {
          width: 100%;
          min-height: 140px;
          border: none;
          outline: none;
          resize: none;
          font-family: inherit;
          font-size: 14.5px;
          line-height: 1.65;
          color: #1e293b;
          background: transparent;
        }
        .sre-textarea::placeholder {
          color: #94a3b8;
        }

        /* Live Preview */
        .sre-preview-wrap {
          min-height: 140px;
          padding: 14px 16px;
          background: #ffffff;
          border-top: 1px solid transparent;
        }
        .sre-preview-content {
          font-size: 15px;
          line-height: 1.7;
          color: #1e293b;
        }
        .sre-preview-empty {
          color: #94a3b8;
          font-size: 13.5px;
          font-style: italic;
          padding: 20px 0;
          text-align: center;
        }

        /* Footer */
        .sre-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 12px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          gap: 10px;
          min-height: 34px;
        }
        .sre-footer-left {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          min-width: 0;
        }
        .sre-shortcuts-label {
          font-size: 11px;
          font-weight: 700;
          color: #334155;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 2px;
          letter-spacing: 0.2px;
        }
        .sre-shortcuts-badges {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 4px 6px;
        }
        .sre-shortcut-pill {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 10.5px;
          color: #475569;
          white-space: nowrap;
          background: #ffffff;
          padding: 1.5px 6px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          line-height: 1.3;
        }
        .sre-shortcut-pill kbd {
          background: #f1f5f9;
          color: #1e293b;
          padding: 1px 4px;
          border-radius: 3px;
          font-size: 10px;
          font-weight: 600;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          border: 1px solid #cbd5e1;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
        }
        .sre-footer-right {
          flex-shrink: 0;
          margin-left: auto;
          white-space: nowrap;
        }
        .sre-counter {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 11px;
          font-weight: 500;
          color: #64748b;
          white-space: nowrap;
          background: #ffffff;
          padding: 2.5px 8px;
          border-radius: 4px;
          border: 1px solid #e2e8f0;
        }
        .sre-counter strong {
          color: #0f172a;
          font-weight: 700;
        }

        /* Link Popover Overlay */
        .sre-link-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(2px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .sre-link-popover {
          width: 100%;
          maxWidth: 480px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          animation: srePopoverIn 0.18s ease-out;
        }
        @keyframes srePopoverIn {
          from { opacity: 0; transform: scale(0.96) translateY(-6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sre-popover-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }
        .sre-popover-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          color: #0f172a;
        }
        .sre-popover-close {
          border: none;
          background: transparent;
          color: #64748b;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
        }
        .sre-popover-close:hover {
          background: #e2e8f0;
          color: #0f172a;
        }
        .sre-popover-body {
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sre-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .sre-label {
          font-size: 12.5px;
          font-weight: 600;
          color: #334155;
        }
        .sre-sublabel {
          font-size: 11px;
          color: #94a3b8;
        }
        .sre-input {
          width: 100%;
          padding: 8px 12px;
          font-size: 13.5px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          outline: none;
          transition: border-color 0.15s;
        }
        .sre-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.12);
        }
        .sre-input-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .sre-input-icon {
          position: absolute;
          left: 10px;
          color: #94a3b8;
          pointer-events: none;
        }
        .sre-input-with-icon {
          padding-left: 32px;
        }
        .sre-field-checkbox {
          display: flex;
          align-items: center;
        }
        .sre-checkbox-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: #475569;
          cursor: pointer;
        }
        .sre-checkbox {
          width: 15px;
          height: 15px;
          cursor: pointer;
        }
        .sre-suggestions-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 8px 10px;
        }
        .sre-suggestions-head {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 6px;
        }
        .sre-suggestions-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-height: 120px;
          overflow-y: auto;
        }
        .sre-suggestion-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 8px;
          border-radius: 4px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          cursor: pointer;
          text-align: left;
          transition: all 0.12s;
        }
        .sre-suggestion-item:hover {
          background: #eff6ff;
          border-color: #bfdbfe;
        }
        .sre-sug-title {
          font-size: 12px;
          font-weight: 500;
          color: #1e293b;
        }
        .sre-sug-url {
          font-size: 11px;
          color: #2563eb;
          font-family: monospace;
        }
        .sre-popover-foot {
          display: flex;
          align-items: center;
          padding: 12px 18px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }
        .sre-btn-cancel {
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 500;
          color: #64748b;
          background: transparent;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          cursor: pointer;
        }
        .sre-btn-cancel:hover {
          background: #f1f5f9;
          color: #0f172a;
        }
        .sre-btn-apply {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          background: #2563eb;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .sre-btn-apply:hover:not(:disabled) {
          background: #1d4ed8;
        }
        .sre-btn-apply:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .sre-btn-danger-outline {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 500;
          color: #dc2626;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          cursor: pointer;
        }
        .sre-btn-danger-outline:hover {
          background: #fee2e2;
          color: #b91c1c;
        }

        .sre-paste-uploading-bar {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 12px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 6px;
          font-size: 11.5px;
          font-weight: 600;
          color: #1d4ed8;
          margin-top: 6px;
        }
        .sre-spin {
          animation: sreSpinAnim 1s linear infinite;
        }
        @keyframes sreSpinAnim {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

