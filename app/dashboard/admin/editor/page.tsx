'use client';
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Save,
  Eye,
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Copy,
  Check,
  UploadCloud,
  Layers,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Clock,
  FileText,
  Tag,
  Folder,
  X,
  RefreshCw,
  SlidersHorizontal,
  Smartphone,
  Monitor,
  Columns,
  Maximize2,
  BookOpen,
  Image as ImageIcon,
  Calendar,
  TrendingUp,
  Compass,
  CheckCheck,
  Search,
  Archive,
  Globe,
} from 'lucide-react';
import SectionRichEditor from '@/components/admin/SectionRichEditor';
import { stripHtmlAndMarkdown, renderRichText, renderBlogContentBlock, getOptimizedCloudinaryUrl, splitContentIntoBlocks } from '@/lib/richTextRenderer';
import { parseMarkdownBlog, ParsedBlogArticle } from '@/lib/markdownBlogParser';
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  selectBlogs,
  selectBlogsLoading,
} from '@/lib/store/blogSlice';
import { AppDispatch } from '@/lib/store/store';

const ADMIN_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || '').trim();
const ADMIN_PASSWORD = (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '').trim();

const SUGGESTED_CATEGORIES = [
  'Operational Excellence',
  'Industry 4.0 & Smart Factory',
  'Automation & Robotics',
  'Lean Manufacturing',
  'Quality & Safety Management',
  'Supply Chain & Warehousing',
];

interface ChapterSection {
  heading: string;
  content: string;
  image: File | null;
  imagePreview: string;
  existingImageUrl: string;
  isCollapsed?: boolean;
}

export default function BlogEditorStudio() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const dispatch = useDispatch<AppDispatch>();
  const blogs = useSelector(selectBlogs);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);

  // Form Fields State
  const [title, setTitle] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [isSlugLocked, setIsSlugLocked] = useState<boolean>(true);
  const [category, setCategory] = useState<string>('');
  const [metaDescription, setMetaDescription] = useState<string>('');
  const [status, setStatus] = useState<'draft' | 'review' | 'published' | 'archived'>('draft');
  const [focusKeyword, setFocusKeyword] = useState<string>('');
  const [scheduledDate, setScheduledDate] = useState<string>('');
  const [featured, setFeatured] = useState<boolean>(false);
  const [tags, setTags] = useState<string>('');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>('');
  const [mainImageAlt, setMainImageAlt] = useState<string>('');

  // Media Library Modal State
  const [isMediaModalOpen, setIsMediaModalOpen] = useState<boolean>(false);
  const [mediaTarget, setMediaTarget] = useState<'banner' | { sectionIdx: number } | null>(null);
  const [mediaSearch, setMediaSearch] = useState<string>('');

  const [sections, setSections] = useState<ChapterSection[]>([
    { heading: '', content: '', image: null, imagePreview: '', existingImageUrl: '', isCollapsed: false },
  ]);

  const [ctaButtonText, setCtaButtonText] = useState<string>('');
  const [ctaText, setCtaText] = useState<string>('');

  // UI View Modes: 'edit' (standard), 'split' (side-by-side live preview), 'full-preview'
  const [viewMode, setViewMode] = useState<'edit' | 'split' | 'full-preview'>('edit');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [showPreviewSidebar, setShowPreviewSidebar] = useState<boolean>(true);

  // UI / Studio State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoadingBlog, setIsLoadingBlog] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [showDraftRecoveryPrompt, setShowDraftRecoveryPrompt] = useState<boolean>(false);
  const [recoveredDraftData, setRecoveredDraftData] = useState<any>(null);

  // AI / Markdown Importer Modal State
  const [isAiImportModalOpen, setIsAiImportModalOpen] = useState<boolean>(false);
  const [rawAiMarkdown, setRawAiMarkdown] = useState<string>('');
  const [parsedArticle, setParsedArticle] = useState<ParsedBlogArticle | null>(null);

  // Live parse whenever markdown input changes
  useEffect(() => {
    if (rawAiMarkdown.trim()) {
      setParsedArticle(parseMarkdownBlog(rawAiMarkdown));
    } else {
      setParsedArticle(null);
    }
  }, [rawAiMarkdown]);

  // Handle Clipboard Paste on Cover Banner Dropzone
  const handleCoverPaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type && item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          setMainImage(file);
          setMainImagePreview(URL.createObjectURL(file));
          setIsDirty(true);
          showToast('success', '📋 Pasted image from clipboard set as cover banner!');
        }
        break;
      }
    }
  };

  // Handle Clipboard Paste on Chapter Graphic Dropzone or Section Body
  const handlePastedSectionImage = async (idx: number, file: File) => {
    // 1. Instantly set preview with local ObjectURL for zero-latency feedback
    handleSectionImage(idx, file);
    showToast('success', `📸 Image pasted & attached to Chapter #${idx + 1} Graphic!`);

    // 2. Stream to Cloudinary in the background
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/blogs/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setSections(prev =>
          prev.map((sec, i) =>
            i === idx
              ? {
                ...sec,
                existingImageUrl: data.url,
                imagePreview: data.url,
              }
              : sec
          )
        );
      }
    } catch (err) {
      console.warn('Background Cloudinary upload for pasted image:', err);
    }
  };

  const handleSectionPaste = (idx: number, e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type && item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          handlePastedSectionImage(idx, file);
        }
        break;
      }
    }
  };

  // Apply AI Parsed Article to Studio
  const handleApplyAiImport = () => {
    if (!parsedArticle) return;
    if (parsedArticle.title) {
      setTitle(parsedArticle.title);
      setSlug(parsedArticle.slug);
    }
    if (parsedArticle.category) {
      setCategory(parsedArticle.category);
    }
    if (parsedArticle.focusKeyword) {
      setFocusKeyword(parsedArticle.focusKeyword);
    }
    if (parsedArticle.metaDescription) {
      setMetaDescription(parsedArticle.metaDescription);
    }
    if (parsedArticle.sections && parsedArticle.sections.length > 0) {
      setSections(
        parsedArticle.sections.map((s, idx) => ({
          heading: s.heading || `Chapter #${idx + 1}`,
          content: s.content || '',
          image: null,
          imagePreview: '',
          existingImageUrl: '',
          isCollapsed: false,
        }))
      );
    }
    setIsDirty(true);
    setIsAiImportModalOpen(false);
    showToast(
      'success',
      `🎉 Successfully imported "${parsedArticle.title || 'article'}" with ${parsedArticle.sections.length} chapters!`
    );
  };

  // Pre-load a sample manufacturing blog to test AI parser
  const loadSampleAiBlog = () => {
    const sample = `# AGV vs AMR: Applications in Automotive, Manufacturing & Warehousing

**Category:** Automation & Robotics
**Focus Keyword:** AGV vs AMR
**Meta Description:** Compare Automated Guided Vehicles (AGVs) and Autonomous Mobile Robots (AMRs) for plant material handling, throughput, warehouse scalability, and ROI.

Modern industrial facilities are racing to automate material transport. As manufacturing plants face skilled labor shortages and rising throughput demands, the decision between Automated Guided Vehicles (AGVs) and Autonomous Mobile Robots (AMRs) has become pivotal.

## Understanding AGV Technology: Fixed-Route Precision

Automated Guided Vehicles (AGVs) have been the workhorses of factory logistics for decades. They navigate along fixed infrastructure, such as magnetic floor tape, optical lines, or inductive guide wires.

Key characteristics of AGVs include:
- Predictable cycle paths with high path accuracy
- Ideal for repetitive, high-volume pallet transfers
- Requires physical line alterations if factory floor plans change

## Autonomous Mobile Robots (AMRs): Dynamic Intelligence

Unlike traditional AGVs, Autonomous Mobile Robots (AMRs) utilize advanced sensor suites including LiDAR, 3D depth cameras, and Simultaneous Localization and Mapping (SLAM) algorithms.

Why modern plants adopt AMRs:
- Dynamic obstacle avoidance without human intervention
- Map updates via software rather than laying new magnetic track
- Collaborative navigation alongside human warehouse operators

## Head-to-Head Comparison: Operational Metrics

When evaluating both solutions, consider total cost of ownership (TCO) and operational flexibility.

| Metric | AGV (Automated Guided Vehicle) | AMR (Autonomous Mobile Robot) |
| :--- | :--- | :--- |
| **Navigation** | Magnetic tape / Fixed track | Natural SLAM LiDAR / AI mapping |
| **Obstacle Handling** | Stops until obstacle clears | Navigates dynamically around objects |
| **Flexibility** | Low (path alterations require downtime) | High (routes re-configured via software) |
| **Best Suited For** | Fixed assembly line shuttles | Dynamic distribution & e-commerce |

## Strategic Recommendations for Plant Leadership

Before selecting a material transport platform, evaluate your plant floor stability and long-term product variability. For dedicated, unchanging production lines, AGVs remain a cost-effective choice. However, for agile manufacturing with frequent changeovers, AMRs deliver superior long-term ROI.`;
    setRawAiMarkdown(sample);
  };

  // Storage key for local autosave
  const autoSaveKey = useMemo(() => {
    return editId ? `tetra_autosave_blog_${editId}` : 'tetra_autosave_blog_new';
  }, [editId]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToastMessage({ type, message });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Verify Authentication
  useEffect(() => {
    const email = typeof window !== 'undefined' ? localStorage.getItem('tetra_admin_email') : '';
    const pass = typeof window !== 'undefined' ? localStorage.getItem('tetra_admin_pass') : '';

    if (email === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      if (!blogs || blogs.length === 0) {
        dispatch(fetchBlogs({}));
      }
    } else {
      router.push('/dashboard/admin');
    }
    setIsAuthChecking(false);
  }, [dispatch, router, blogs]);

  // 2. Load Existing Blog if editId is provided
  useEffect(() => {
    if (!editId || !isAuthenticated) return;

    const loadBlogData = async () => {
      setIsLoadingBlog(true);
      try {
        let targetBlog = blogs.find((b: any) => b._id === editId || b.id === editId);

        if (!targetBlog) {
          const res = await fetch(`/api/blogs/${editId}`);
          if (res.ok) {
            const data = await res.json();
            targetBlog = data.data || data;
          }
        }

        if (targetBlog) {
          setTitle(targetBlog.title || '');
          setSlug(targetBlog.slug || '');
          setIsSlugLocked(false);
          setCategory(targetBlog.category || '');
          setMetaDescription(targetBlog.metaDescription || '');
          setStatus(targetBlog.status || 'draft');
          setFocusKeyword(targetBlog.focusKeyword || '');
          setScheduledDate(targetBlog.scheduledDate ? new Date(targetBlog.scheduledDate).toISOString().slice(0, 16) : '');
          setFeatured(!!targetBlog.featured);
          setTags(Array.isArray(targetBlog.tags) ? targetBlog.tags.join(', ') : '');
          setMainImagePreview(targetBlog.image?.url || '');
          setMainImageAlt(targetBlog.image?.alt || targetBlog.title || '');
          setCtaButtonText(targetBlog.cta?.buttonText || '');
          setCtaText(targetBlog.cta?.text || '');

          if (Array.isArray(targetBlog.sections) && targetBlog.sections.length > 0) {
            setSections(
              targetBlog.sections.map((sec: any) => ({
                heading: sec.heading || '',
                content: Array.isArray(sec.content) ? sec.content.join('\n') : (sec.content || ''),
                image: null,
                imagePreview: sec.image?.url || '',
                existingImageUrl: sec.image?.url || '',
                isCollapsed: false,
              }))
            );
          }
          setIsDirty(false);
        }
      } catch (err) {
        console.error('Failed to load blog:', err);
        showToast('error', 'Could not load article data.');
      } finally {
        setIsLoadingBlog(false);
      }
    };

    loadBlogData();
  }, [editId, isAuthenticated, blogs]);

  // 3. Check for Autosaved Draft in localStorage
  useEffect(() => {
    if (!isAuthenticated) return;
    try {
      const savedRaw = localStorage.getItem(autoSaveKey);
      if (savedRaw) {
        const parsed = JSON.parse(savedRaw);
        if (parsed && parsed.timestamp) {
          setRecoveredDraftData(parsed);
          setShowDraftRecoveryPrompt(true);
        }
      }
    } catch {
      // ignore
    }
  }, [autoSaveKey, isAuthenticated]);

  // Restore Draft Action
  const handleRestoreDraft = () => {
    if (!recoveredDraftData) return;
    setTitle(recoveredDraftData.title || '');
    setSlug(recoveredDraftData.slug || '');
    setCategory(recoveredDraftData.category || '');
    setMetaDescription(recoveredDraftData.metaDescription || '');
    setStatus(recoveredDraftData.status || 'draft');
    setFocusKeyword(recoveredDraftData.focusKeyword || '');
    setScheduledDate(recoveredDraftData.scheduledDate || '');
    setFeatured(!!recoveredDraftData.featured);
    setTags(recoveredDraftData.tags || '');
    setCtaButtonText(recoveredDraftData.ctaButtonText || '');
    setCtaText(recoveredDraftData.ctaText || '');

    if (recoveredDraftData.sections) {
      setSections(recoveredDraftData.sections);
    }

    setShowDraftRecoveryPrompt(false);
    showToast('success', 'Restored draft from backup!');
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem(autoSaveKey);
    setShowDraftRecoveryPrompt(false);
    setRecoveredDraftData(null);
  };

  // 4. Autosave every 25 seconds
  useEffect(() => {
    if (!isAuthenticated || !isDirty) return;

    const interval = setInterval(() => {
      const draftPayload = {
        title,
        slug,
        category,
        metaDescription,
        status,
        focusKeyword,
        scheduledDate,
        featured,
        tags,
        ctaButtonText,
        ctaText,
        sections: sections.map(s => ({
          heading: s.heading,
          content: s.content,
          imagePreview: s.imagePreview,
          existingImageUrl: s.existingImageUrl,
        })),
        timestamp: new Date().toISOString(),
      };

      try {
        localStorage.setItem(autoSaveKey, JSON.stringify(draftPayload));
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLastSavedTime(timeStr);
      } catch (e) {
        // quota full
      }
    }, 25000);

    return () => clearInterval(interval);
  }, [
    isAuthenticated,
    isDirty,
    autoSaveKey,
    title,
    slug,
    category,
    metaDescription,
    status,
    focusKeyword,
    scheduledDate,
    featured,
    tags,
    ctaButtonText,
    ctaText,
    sections,
  ]);

  // 5. Warn on unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSubmitting) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, isSubmitting]);

  // Auto-slugify on title change
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setIsDirty(true);
    if (isSlugLocked) {
      const autoSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(autoSlug);
    }
  };

  // Chapter handlers
  const handleSectionChange = (idx: number, field: keyof ChapterSection, value: any) => {
    setIsDirty(true);
    setSections(prev =>
      prev.map((sec, i) => (i === idx ? { ...sec, [field]: value } : sec))
    );
  };

  const handleSectionImage = (idx: number, file: File | null) => {
    setIsDirty(true);
    setSections(prev =>
      prev.map((sec, i) =>
        i === idx
          ? {
            ...sec,
            image: file,
            imagePreview: file ? URL.createObjectURL(file) : sec.imagePreview,
          }
          : sec
      )
    );
  };

  const addChapter = () => {
    setIsDirty(true);
    setSections(prev => [
      ...prev,
      { heading: '', content: '', image: null, imagePreview: '', existingImageUrl: '', isCollapsed: false },
    ]);
  };

  const removeChapter = (idx: number) => {
    if (sections.length <= 1) {
      showToast('error', 'An article must have at least one chapter.');
      return;
    }
    setIsDirty(true);
    setSections(prev => prev.filter((_, i) => i !== idx));
  };

  // Move Chapter Up / Down
  const moveChapter = (idx: number, direction: 'up' | 'down') => {
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === sections.length - 1) return;

    setIsDirty(true);
    setSections(prev => {
      const next = [...prev];
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      const temp = next[idx];
      next[idx] = next[targetIdx];
      next[targetIdx] = temp;
      return next;
    });
  };

  // Collapse / Expand All
  const toggleCollapseAll = (collapse: boolean) => {
    setSections(prev => prev.map(s => ({ ...s, isCollapsed: collapse })));
  };

  // Keyboard shortcut: Ctrl+S to save draft
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSubmit(e as any, 'draft');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Calculate Metrics
  const totalWords = useMemo(() => {
    let text = (title || '') + ' ' + (metaDescription || '');
    sections.forEach(s => {
      text += ' ' + (s.heading || '') + ' ' + stripHtmlAndMarkdown(s.content || '');
    });
    return text.trim().split(/\s+/).filter(Boolean).length;
  }, [title, metaDescription, sections]);

  const readTimeMinutes = Math.max(1, Math.ceil(totalWords / 200));

  // Copy URL Helper
  const handleCopyUrl = () => {
    if (typeof window !== 'undefined' && slug) {
      const cleanSlug = slug.replace(/^\/+/, '');
      navigator.clipboard.writeText(`https://tetrahedron.in/${cleanSlug}`);
      setCopiedSlug(true);
      setTimeout(() => setCopiedSlug(false), 2000);
    }
  };

  // Reusable Media Library: Extract unique uploaded images across all blogs
  const mediaLibraryImages = useMemo(() => {
    const map = new Map<string, { url: string; title: string }>();
    if (Array.isArray(blogs)) {
      blogs.forEach((b: any) => {
        if (b.image?.url && typeof b.image.url === 'string') {
          map.set(b.image.url, { url: b.image.url, title: b.title || 'Cover Hero Banner' });
        }
        if (Array.isArray(b.sections)) {
          b.sections.forEach((sec: any) => {
            if (sec.image?.url && typeof sec.image.url === 'string') {
              map.set(sec.image.url, { url: sec.image.url, title: sec.heading || b.title || 'Chapter Graphic' });
            }
          });
        }
      });
    }
    return Array.from(map.values());
  }, [blogs]);

  // Filtered Media Library Search
  const filteredMediaImages = useMemo(() => {
    const query = mediaSearch.toLowerCase().trim();
    if (!query) return mediaLibraryImages;
    return mediaLibraryImages.filter(img =>
      img.title.toLowerCase().includes(query) || img.url.toLowerCase().includes(query)
    );
  }, [mediaLibraryImages, mediaSearch]);

  // Select image from Reusable Media Library
  const handleSelectMediaImage = (url: string) => {
    if (mediaTarget === 'banner') {
      setMainImage(null);
      setMainImagePreview(url);
      setIsDirty(true);
    } else if (mediaTarget && typeof mediaTarget === 'object' && 'sectionIdx' in mediaTarget) {
      const idx = mediaTarget.sectionIdx;
      handleSectionChange(idx, 'image', null);
      handleSectionChange(idx, 'imagePreview', url);
      handleSectionChange(idx, 'existingImageUrl', url);
    }
    setIsMediaModalOpen(false);
    showToast('success', 'Asset selected from library!');
  };

  // SEO Focus Keyword Real-time Audit & Density Calculation
  const seoAnalysis = useMemo(() => {
    const kw = (focusKeyword || '').trim().toLowerCase();
    if (!kw) {
      return {
        hasKeyword: false,
        inTitle: false,
        inSlug: false,
        inMeta: false,
        inFirst100: false,
        inHeadings: false,
        count: 0,
        density: 0,
        score: 0,
      };
    }

    const titleLower = (title || '').toLowerCase();
    const slugLower = (slug || '').toLowerCase();
    const metaLower = (metaDescription || '').toLowerCase();

    let fullText = (title || '') + ' ' + (metaDescription || '');
    let allContent = '';
    sections.forEach(s => {
      fullText += ' ' + (s.heading || '') + ' ' + stripHtmlAndMarkdown(s.content || '');
      allContent += ' ' + stripHtmlAndMarkdown(s.content || '');
    });

    const first100Words = allContent.trim().split(/\s+/).slice(0, 100).join(' ').toLowerCase();

    const inTitle = titleLower.includes(kw);
    const inSlug = slugLower.includes(kw.replace(/\s+/g, '-')) || kw.split(/\s+/).every(w => slugLower.includes(w));
    const inMeta = metaLower.includes(kw);
    const inFirst100 = first100Words.includes(kw);
    const inHeadings = sections.some(s => (s.heading || '').toLowerCase().includes(kw));

    const words = fullText.toLowerCase();
    const escapedKw = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matches = words.match(new RegExp(`\\b${escapedKw}\\b`, 'gi'));
    const count = matches ? matches.length : (words.includes(kw) ? 1 : 0);
    const totalW = words.split(/\s+/).filter(Boolean).length;
    const density = totalW > 0 ? Number(((count / totalW) * 100).toFixed(1)) : 0;

    let points = 0;
    if (inTitle) points += 20;
    if (inSlug) points += 20;
    if (inMeta) points += 20;
    if (inFirst100) points += 20;
    if (inHeadings) points += 20;

    return {
      hasKeyword: true,
      inTitle,
      inSlug,
      inMeta,
      inFirst100,
      inHeadings,
      count,
      density,
      score: points,
    };
  }, [focusKeyword, title, slug, metaDescription, sections]);

  // Auto Internal Link Recommendations Engine
  const internalLinkSuggestions = useMemo(() => {
    let fullText = (title || '') + ' ' + (metaDescription || '');
    sections.forEach(s => {
      fullText += ' ' + (s.heading || '') + ' ' + (s.content || '');
    });
    const lower = fullText.toLowerCase();

    const TOPICS = [
      { name: 'AGV & AMR Automation', kw: ['agv', 'amr', 'autonomous guided', 'mobile robot'], url: '/automated-guided-vehicle-manufacturers' },
      { name: 'Operational Excellence Consulting', kw: ['operational excellence', 'plant efficiency', 'oee', 'productivity', 'plant turnaround'], url: '/operational-excellence-consulting-firms' },
      { name: 'Process Improvement (Kaizen / 5S / Lean)', kw: ['lean', 'kaizen', '5s', 'waste reduction', 'vsm', 'value stream'], url: '/corporate-training-companies/process-improvement-training-courses' },
      { name: 'Technical & Engineering Training', kw: ['technical training', 'maintenance', 'welding', 'plc', 'scada'], url: '/corporate-training-companies/technical-trainings' },
      { name: 'Strategic Leadership & Management', kw: ['strategic training', 'leadership', 'supervisor', 'management'], url: '/corporate-training-companies/strategic-training' },
      { name: 'Quality & Six Sigma', kw: ['six sigma', 'quality control', 'defect reduction', 'tqm'], url: '/corporate-training-companies/skill-training' },
    ];

    return TOPICS.filter(topic => topic.kw.some(k => lower.includes(k)));
  }, [title, metaDescription, sections]);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent, overrideStatus?: 'draft' | 'review' | 'published' | 'archived') => {
    if (e && e.preventDefault) e.preventDefault();

    if (!title.trim()) {
      showToast('error', 'Please enter a blog title.');
      return;
    }
    if (!slug.trim()) {
      showToast('error', 'Please enter a valid URL slug.');
      return;
    }

    const currentStatus = overrideStatus || status;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      const blogData = {
        title: title.trim(),
        slug: slug.trim(),
        category: category.trim(),
        metaDescription: metaDescription.trim(),
        status: currentStatus,
        scheduledDate: scheduledDate ? new Date(scheduledDate).toISOString() : undefined,
        focusKeyword: focusKeyword.trim(),
        featured,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        sections: sections.map(sec => ({
          heading: sec.heading.trim(),
          content: splitContentIntoBlocks(sec.content),
        })),
        cta: {
          buttonText: ctaButtonText.trim(),
          text: ctaText.trim(),
        },
        imageAlt: mainImageAlt.trim(),
      };

      formData.append('blogData', JSON.stringify(blogData));
      formData.append('json', JSON.stringify(blogData));

      if (mainImage) {
        formData.append('mainImage', mainImage);
      } else if (mainImagePreview) {
        formData.append('mainImageUrl', mainImagePreview);
      }

      sections.forEach((sec, idx) => {
        if (sec.image) {
          formData.append(`sectionImage_${idx}`, sec.image);
        } else if (sec.existingImageUrl) {
          formData.append(`sectionImageUrl_${idx}`, sec.existingImageUrl);
        }
      });

      if (editId) {
        await dispatch(updateBlog({ id: editId, formData })).unwrap();
        showToast('success', 'Article updated successfully!');
      } else {
        await dispatch(createBlog(formData)).unwrap();
        showToast('success', 'Article created successfully!');
      }

      localStorage.removeItem(autoSaveKey);
      setIsDirty(false);

      setTimeout(() => {
        router.push('/dashboard/admin');
      }, 1200);
    } catch (err: any) {
      console.error('Submit error:', err);
      showToast('error', err.message || 'Failed to save blog post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthChecking || isLoadingBlog) {
    return (
      <div className="studio-loading-wrap">
        <Loader2 size={32} className="studio-spin" />
        <p style={{ marginTop: 12, color: '#475569', fontWeight: 500, fontSize: 14 }}>
          {isLoadingBlog ? 'Loading article into writing studio...' : 'Authenticating...'}
        </p>
        <style jsx>{`
          .studio-loading-wrap {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #f8fafc;
            font-family: var(--font-poppins), sans-serif;
          }
          .studio-spin {
            animation: spin 1s linear infinite;
            color: #2563eb;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Live Article Preview Component (Shared between Split View and Full Preview)
  const renderLiveArticlePreview = (isMobileView = false, isFullPreview = false) => (
    <div className={`live-preview-container ${isMobileView ? 'mobile-viewport' : 'desktop-viewport'} ${isFullPreview ? 'is-full-preview-mode' : 'is-split-preview-mode'}`}>
      <div className="preview-viewport-shell">
        {/* 1. Real Tetrahedron Website Header Simulator */}
        {(isFullPreview || isMobileView) && (
          <header className="real-site-nav-sim">
            {!isMobileView && (
              <div className="real-site-top-bar">
                <div className="real-site-top-inner">
                  <div className="real-site-contact-info">
                    <span>📞 +91-8984189814</span>
                    <span>✉️ marketing@tetrahedron.in</span>
                  </div>
                  <div className="real-site-socials">
                    <span>Follow Us On:</span>
                    <span className="social-tag">f</span>
                    <span className="social-tag">📸</span>
                    <span className="social-tag">𝕏</span>
                    <span className="social-tag">in</span>
                  </div>
                </div>
              </div>
            )}

            <div className="real-site-main-nav">
              <div className="real-site-nav-inner">
                <div className="real-site-logo-group">
                  {isMobileView && (
                    <div className="real-site-hamburger-btn">
                      <span>☰</span>
                    </div>
                  )}
                  <img
                    src="/assets/images/resources/logo.png"
                    alt="Tetrahedron"
                    className="real-site-main-logo"
                  />
                  <img
                    src="/assets/images/logocertified.jpeg"
                    alt="Certified"
                    className="real-site-certified-logo"
                  />
                </div>

                {!isMobileView && (
                  <nav className="real-site-menu-links">
                    <span>Home</span>
                    <span>About Us ▾</span>
                    <span>Consulting ▾</span>
                    <span>Skill Training ▾</span>
                    <span>AMR/AGV/RGV</span>
                    <span>Career</span>
                    <span>Case Studies</span>
                    <span className="active">Blogs</span>
                    <span>Contact Us</span>
                  </nav>
                )}

                <div className="real-site-quick-support-btn">
                  Quick Support
                </div>
              </div>
            </div>
          </header>
        )}

        {/* 2. Real Tetrahedron Dark Navy Hero Banner (#0a2c5e) */}
        <div className="real-site-hero-banner">
          <div className="real-site-hero-inner">
            {category && (
              <div className="real-site-hero-cat-wrap">
                <span className="real-site-hero-cat-badge">
                  {category.toUpperCase()}
                </span>
              </div>
            )}
            <h1 className="studio-article-h1">
              {title || 'Article Title Will Appear Here'}
            </h1>
          </div>
        </div>

        {/* 3. Main Article Body & Layout Wrap */}
        <div className="live-preview-layout-wrap">
          <div className="live-preview-paper">
            {/* Featured Hero Cover Image (starts immediately below the hero banner) */}
            {mainImagePreview ? (
              <div className="lp-hero-cover">
                <img src={getOptimizedCloudinaryUrl(mainImagePreview, { width: 1200 })} alt={mainImageAlt || title} />
                {mainImageAlt && <span className="lp-cover-caption">{mainImageAlt}</span>}
              </div>
            ) : (
              <div className="lp-hero-placeholder">
                <UploadCloud size={28} />
                <span>Featured hero banner will display here</span>
              </div>
            )}

            {/* Auto-Generated Dynamic Table of Contents (TOC) */}
            {sections.some(s => s.heading.trim()) && (
              <div className="lp-toc-box">
                <div className="lp-toc-header">
                  <span className="lp-toc-icon">📑</span>
                  <span className="studio-toc-heading">Table of Contents</span>
                </div>
                <ol className="lp-toc-list">
                  {sections.map((sec, i) => sec.heading.trim() ? (
                    <li key={i} className="lp-toc-item">
                      <a href={`#preview-chapter-${i}`} className="lp-toc-link">
                        {sec.heading}
                      </a>
                    </li>
                  ) : null)}
                </ol>
              </div>
            )}

            {/* Chapters Body */}
            <div className="lp-body-content">
              {sections.map((sec, idx) => (
                <section key={idx} id={`preview-chapter-${idx}`} className="lp-chapter-block">
                  {sec.heading && <h2 className="lp-h2-heading">{sec.heading}</h2>}

                  {sec.imagePreview && (
                    <div className="lp-sec-graphic">
                      <img src={getOptimizedCloudinaryUrl(sec.imagePreview, { width: 800 })} alt={sec.heading} />
                    </div>
                  )}

                  <div className="lp-paragraphs-wrap">
                    {sec.content ? (
                      splitContentIntoBlocks(sec.content).map((block, pIdx) => renderBlogContentBlock(block, pIdx))
                    ) : (
                      <p className="lp-paragraph lp-placeholder-text">
                        Chapter body text will render here with clickable links, callouts, tables, and formatted words...
                      </p>
                    )}
                  </div>
                </section>
              ))}
            </div>

            {/* Lead Gen Call To Action */}
            {(ctaButtonText || ctaText) && (
              <div className="lp-cta-block">
                {ctaText && <h3 className="lp-cta-pitch">{ctaText}</h3>}
                {ctaButtonText && (
                  <button type="button" className="lp-cta-button">
                    {ctaButtonText}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Live Blog Sidebar Simulator for Complete Page Preview */}
          {!isMobileView && isFullPreview && showPreviewSidebar && (
            <aside className="studio-full-preview-sidebar">
              <div className="studio-sidebar-card">
                <h4 className="studio-sidebar-widget-heading">Contact Us</h4>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#0a2c5e', marginBottom: 4 }}>Get in Touch</div>
                <p className="studio-sidebar-sub">Fill out your details & our expert team will respond shortly.</p>
                <div className="studio-sidebar-form">
                  <input type="text" placeholder="Full Name *" className="studio-sidebar-input" readOnly />
                  <input type="text" placeholder="Company Name *" className="studio-sidebar-input" readOnly />
                  <input type="email" placeholder="Business Email *" className="studio-sidebar-input" readOnly />
                  <input type="tel" placeholder="Mobile No. *" className="studio-sidebar-input" readOnly />
                  <textarea placeholder="Your Requirements *" rows={3} className="studio-sidebar-input" readOnly />
                  <button type="button" className="studio-sidebar-submit">Submit →</button>
                </div>
              </div>

              <div className="studio-sidebar-card">
                <h4 className="studio-sidebar-widget-heading">Recent Blogs</h4>
                <div className="studio-recent-list">
                  <div className="studio-recent-item">
                    <span className="studio-recent-dot" />
                    <span className="studio-recent-post-link">The AMR Advantage: A Guide to Autonomous Mobile Robots</span>
                  </div>
                  <div className="studio-recent-item">
                    <span className="studio-recent-dot" />
                    <span className="studio-recent-post-link">Kaizen & 5S Implementation Roadmap for Manufacturing</span>
                  </div>
                  <div className="studio-recent-item">
                    <span className="studio-recent-dot" />
                    <span className="studio-recent-post-link">Total Productive Maintenance (TPM) Metric Benchmarks</span>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div id="blog-studio-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`studio-toast studio-toast-${toastMessage.type}`}>
          {toastMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* Recovered Draft Notice Banner */}
      {showDraftRecoveryPrompt && (
        <div className="studio-recovery-banner">
          <div className="studio-recovery-content">
            <Sparkles size={16} />
            <span>
              <strong>Unsaved Draft Recovered:</strong> An autosaved version was found from your previous session.
            </span>
          </div>
          <div className="studio-recovery-actions">
            <button type="button" onClick={handleRestoreDraft} className="studio-btn-restore">
              Restore Draft
            </button>
            <button type="button" onClick={handleDiscardDraft} className="studio-btn-discard">
              Discard
            </button>
          </div>
        </div>
      )}

      {/* Top Header Studio Bar */}
      <header className="studio-topbar">
        <div className="studio-topbar-left">
          <Link
            href="/dashboard/admin"
            className="studio-btn-back"
            title="Back to Articles Dashboard"
            style={{ textDecoration: 'none' }}
          >
            <ArrowLeft size={14} />
            <span className="studio-btn-text">Articles</span>
          </Link>
          <div className="studio-vsep" />
          <div className="studio-title-badge">
            <span className="studio-article-type">{editId ? 'Edit' : 'New'}</span>
            <span className="studio-article-name">{title ? (title.length > 25 ? title.slice(0, 25) + '...' : title) : 'Untitled'}</span>
          </div>
          <div className={`studio-status-pill status-${status}`}>
            <span className="studio-status-dot" />
            <span style={{ textTransform: 'capitalize' }}>{status}</span>
          </div>
        </div>

        {/* Center: View Mode Switcher */}
        <div className="studio-topbar-center">
          <div className="studio-view-switcher">
            <button
              type="button"
              onClick={() => setViewMode('edit')}
              className={`studio-view-btn ${viewMode === 'edit' ? 'active' : ''}`}
              title="Editor Only"
            >
              <FileText size={13} />
              <span className="studio-view-label">Editor</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('split')}
              className={`studio-view-btn ${viewMode === 'split' ? 'active' : ''}`}
              title="Side-by-Side Live Preview"
            >
              <Columns size={13} />
              <span className="studio-view-label">Split Preview</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('full-preview')}
              className={`studio-view-btn ${viewMode === 'full-preview' ? 'active' : ''}`}
              title="Complete Page Preview"
            >
              <Maximize2 size={13} />
              <span className="studio-view-label">Full Page</span>
            </button>
          </div>

          {/* ⚡ 1-Click AI Importer Topbar Button */}
          <button
            type="button"
            onClick={() => setIsAiImportModalOpen(true)}
            className="studio-btn-ai-topbar"
            title="Import whole blog from ChatGPT / Claude / Markdown"
          >
            <Sparkles size={13} color="#7c3aed" />
            <span className="studio-btn-text">AI Import</span>
          </button>

          {lastSavedTime && (
            <span className="studio-autosaved-label" title={`Auto-saved at ${lastSavedTime}`}>
              <Check size={11} />
              <span>Saved {lastSavedTime.replace('Auto-saved ', '')}</span>
            </span>
          )}
        </div>

        {/* Right: Save & Publish Action Buttons */}
        <div className="studio-topbar-right">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={e => handleSubmit(e, 'draft')}
            className="studio-btn-draft"
            title="Save as Draft (Ctrl+S)"
          >
            <Save size={13} />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={e => handleSubmit(e, 'review')}
            className="studio-btn-review"
            title="Submit article for internal editorial review"
          >
            <Eye size={13} />
            <span>Review</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={e => handleSubmit(e, 'published')}
            className="studio-btn-publish"
            title={editId ? 'Update & Publish to Live Site' : 'Publish Article to Live Site'}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={13} className="studio-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={13} />
                <span>{editId ? 'Update' : 'Publish'}</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* VIEW 1: COMPLETE FULL-PAGE ARTICLE PREVIEW */}
      {viewMode === 'full-preview' && (
        <div className={`studio-full-preview-container ${previewDevice === 'mobile' ? 'mobile-viewport' : 'desktop-viewport'}`}>
          <div className="studio-full-preview-topbar">
            <div className="studio-device-toggle">
              <span className="studio-toggle-label">Preview Display:</span>
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`studio-toggle-btn ${previewDevice === 'desktop' ? 'active' : ''}`}
              >
                <Monitor size={14} />
                <span>Desktop (100%)</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`studio-toggle-btn ${previewDevice === 'mobile' ? 'active' : ''}`}
              >
                <Smartphone size={14} />
                <span>Mobile (375px)</span>
              </button>

              {previewDevice === 'desktop' && (
                <button
                  type="button"
                  onClick={() => setShowPreviewSidebar(!showPreviewSidebar)}
                  className={`studio-toggle-btn ${showPreviewSidebar ? 'active' : ''}`}
                  title="Toggle side contact form & recent posts simulator"
                >
                  <Columns size={13} />
                  <span>{showPreviewSidebar ? 'Hide Page Sidebar' : 'Show Page Sidebar'}</span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setViewMode('split')}
              className="studio-btn-exit-full"
            >
              <Columns size={13} />
              <span>Back to Split View</span>
            </button>
          </div>

          <div className="studio-full-preview-canvas">
            {renderLiveArticlePreview(previewDevice === 'mobile', true)}
          </div>
        </div>
      )}

      {/* VIEW 2: STANDARD / SPLIT VIEW CANVAS */}
      {viewMode !== 'full-preview' && (
        <div className={`studio-canvas ${viewMode === 'split' ? 'split-layout' : 'standard-layout'}`}>
          {/* LEFT: The Document & Content Editor */}
          <main className="studio-doc-column">
            {/* Post Title & Slug Card */}
            <div className="studio-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <label className="studio-label" style={{ margin: 0 }}>
                  ARTICLE TITLE <span className="studio-req">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsAiImportModalOpen(true)}
                  className="studio-card-ai-btn"
                  title="Import full article from ChatGPT, Claude, or raw Markdown"
                >
                  <Sparkles size={12} color="#7c3aed" />
                  <span>⚡ 1-Click AI / Markdown Importer</span>
                </button>
              </div>
              <input
                type="text"
                className="studio-title-input"
                placeholder="e.g. AGV vs AMR: Applications in Automotive, Manufacturing & Warehousing"
                value={title}
                onChange={e => handleTitleChange(e.target.value)}
                required
              />

              {/* Permalink Slug with Lock & Copy */}
              <div className="studio-slug-bar">
                <span className="studio-slug-prefix">https://tetrahedron.in/</span>
                <input
                  type="text"
                  className="studio-slug-input"
                  value={slug}
                  onChange={e => {
                    setSlug(e.target.value);
                    setIsDirty(true);
                  }}
                  disabled={isSlugLocked}
                />
                <button
                  type="button"
                  onClick={() => setIsSlugLocked(!isSlugLocked)}
                  className="studio-slug-action-btn"
                  title={isSlugLocked ? 'Customize Slug' : 'Lock Auto-Slug'}
                >
                  {isSlugLocked ? 'Customize' : 'Lock'}
                </button>
                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="studio-slug-action-btn"
                  title="Copy Article URL"
                >
                  {copiedSlug ? <Check size={13} color="#16a34a" /> : <Copy size={13} />}
                  <span>{copiedSlug ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Featured Hero Banner */}
            <div className="studio-card">
              <div className="studio-card-head">
                <div>
                  <div className="studio-card-title">Featured Hero Banner (Cover Image)</div>
                  <div className="studio-card-sub">
                    Primary visual displayed on article headers, LinkedIn share cards, and search snippets
                  </div>
                </div>
                <span className="studio-pill-badge">1200 × 800 px (16:9)</span>
              </div>

              {mainImagePreview ? (
                <div className="studio-banner-preview-card">
                  <img src={mainImagePreview} alt="Banner" className="studio-banner-img" />
                  <div className="studio-banner-details">
                    <div className="studio-banner-file-info">
                      <strong>{mainImage ? mainImage.name : 'Cover Asset'}</strong>
                      <span>{mainImage ? `${(mainImage.size / 1024).toFixed(1)} KB` : 'Hosted on Cloudinary'}</span>
                    </div>

                    <div className="studio-field" style={{ marginTop: 8 }}>
                      <label className="studio-label-sm">Image Alt Text (SEO & Google Image Search)</label>
                      <input
                        type="text"
                        className="studio-input-sm"
                        placeholder="e.g. Autonomous Mobile Robots transporting pallet racks"
                        value={mainImageAlt}
                        onChange={e => {
                          setMainImageAlt(e.target.value);
                          setIsDirty(true);
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <button
                        type="button"
                        onClick={() => {
                          setMediaTarget('banner');
                          setIsMediaModalOpen(true);
                        }}
                        className="studio-btn-secondary-sm"
                      >
                        <ImageIcon size={13} />
                        <span>Change from Library</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMainImage(null);
                          setMainImagePreview('');
                          setIsDirty(true);
                        }}
                        className="studio-btn-danger-sm"
                      >
                        <Trash2 size={13} />
                        <span>Remove Banner</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="studio-banner-dropzone-container"
                  tabIndex={0}
                  onPaste={handleCoverPaste}
                  title="Click to browse, drag & drop, or paste screenshot directly (Ctrl+V)"
                >
                  <label className="studio-dropzone-banner">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      style={{ display: 'none' }}
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          setMainImage(file);
                          setMainImagePreview(URL.createObjectURL(file));
                          setIsDirty(true);
                        }
                      }}
                    />
                    <div className="studio-dropzone-icon">
                      <UploadCloud size={24} />
                    </div>
                    <div className="studio-dropzone-text-main">
                      Click to browse, drag & drop, or <strong>paste image (Ctrl+V)</strong>
                    </div>
                    <div className="studio-dropzone-text-sub">
                      JPG, PNG, WebP · Max 15MB · Supports direct clipboard screenshots
                    </div>
                  </label>

                  <div className="studio-dropzone-divider">
                    <span>OR</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setMediaTarget('banner');
                      setIsMediaModalOpen(true);
                    }}
                    className="studio-btn-media-library"
                  >
                    <ImageIcon size={15} />
                    <span>Choose from Media Library ({mediaLibraryImages.length} available)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Chapters & Body Content Builder */}
            <div className="studio-card">
              <div className="studio-card-head">
                <div>
                  <div className="studio-card-title">Article Chapters & Body</div>
                  <div className="studio-card-sub">
                    Structure your article with distinct chapters, rich hyperlinked paragraphs, and visuals
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => toggleCollapseAll(false)}
                    className="studio-btn-subtle-sm"
                  >
                    Expand All
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCollapseAll(true)}
                    className="studio-btn-subtle-sm"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Chapters List */}
              <div className="studio-chapters-list">
                {sections.map((sec, idx) => {
                  const sectionWords = stripHtmlAndMarkdown(sec.content).split(/\s+/).filter(Boolean).length;
                  const isCollapsed = !!sec.isCollapsed;

                  return (
                    <div key={idx} id={`chapter-card-${idx}`} className="studio-chapter-card">
                      {/* Chapter Header Bar */}
                      <div
                        className="studio-chapter-head"
                        onClick={() => handleSectionChange(idx, 'isCollapsed', !isCollapsed)}
                      >
                        <div className="studio-chapter-head-left">
                          <span className="studio-chapter-badge">Chapter #{idx + 1}</span>
                          <span className="studio-chapter-title-preview">
                            {sec.heading ? sec.heading : 'Untitled Chapter'}
                          </span>
                          <span className="studio-chapter-word-meta">
                            {sectionWords} words
                          </span>
                        </div>

                        <div className="studio-chapter-head-right" onClick={e => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => moveChapter(idx, 'up')}
                            disabled={idx === 0}
                            className="studio-btn-icon-xs"
                            title="Move Chapter Up"
                          >
                            <ArrowUp size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveChapter(idx, 'down')}
                            disabled={idx === sections.length - 1}
                            className="studio-btn-icon-xs"
                            title="Move Chapter Down"
                          >
                            <ArrowDown size={13} />
                          </button>

                          {sections.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeChapter(idx)}
                              className="studio-btn-delete-xs"
                              title="Delete Chapter"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleSectionChange(idx, 'isCollapsed', !isCollapsed)}
                            className="studio-btn-icon-xs"
                          >
                            {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                          </button>
                        </div>
                      </div>

                      {/* Chapter Body */}
                      {!isCollapsed && (
                        <div className="studio-chapter-body">
                          <div className="studio-field">
                            <label className="studio-label">
                              Section Heading (H2) <span className="studio-req">*</span>
                            </label>
                            <input
                              type="text"
                              className="studio-input"
                              placeholder="e.g. 1. Eliminating Waste with Value Stream Mapping"
                              value={sec.heading}
                              onChange={e => handleSectionChange(idx, 'heading', e.target.value)}
                              required
                            />
                          </div>

                          <div className="studio-field">
                            <label className="studio-label">
                              Section Body Content <span className="studio-req">*</span>
                            </label>
                            <SectionRichEditor
                              value={sec.content}
                              onChange={val => handleSectionChange(idx, 'content', val)}
                              sectionIndex={idx}
                              placeholder="Compose explanation, data insights, or guidance. Highlight words and press Ctrl+K to add hyperlinks..."
                              availableBlogs={blogs.map((b: any) => ({ title: b.title, slug: b.slug }))}
                              onImagePaste={file => handlePastedSectionImage(idx, file)}
                            />
                          </div>

                          {/* Section Graphic */}
                          <div className="studio-field" style={{ marginBottom: 0 }}>
                            <label className="studio-label-sm">
                              Chapter Graphic / Illustration (Optional)
                            </label>
                            {sec.imagePreview ? (
                              <div className="studio-sec-img-preview">
                                <img src={sec.imagePreview} alt="Section graphic" className="studio-sec-thumb" />
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0f172a' }}>
                                    {sec.image ? sec.image.name : 'Attached Graphic'}
                                  </div>
                                  <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setMediaTarget({ sectionIdx: idx });
                                        setIsMediaModalOpen(true);
                                      }}
                                      className="studio-btn-secondary-xs"
                                    >
                                      <ImageIcon size={11} />
                                      <span>Change from Library</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleSectionImage(idx, null);
                                        handleSectionChange(idx, 'imagePreview', '');
                                        handleSectionChange(idx, 'existingImageUrl', '');
                                      }}
                                      className="studio-btn-danger-xs"
                                    >
                                      <Trash2 size={11} />
                                      <span>Remove</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}
                                onPaste={e => handleSectionPaste(idx, e)}
                                tabIndex={0}
                                title="Click to browse, or paste image directly (Ctrl+V)"
                              >
                                <label className="studio-sec-dropzone" tabIndex={0} onPaste={e => handleSectionPaste(idx, e)}>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={e => {
                                      if (e.target.files && e.target.files[0]) {
                                        handleSectionImage(idx, e.target.files[0]);
                                      }
                                    }}
                                  />
                                  <UploadCloud size={14} />
                                  <span>+ Upload or Paste Graphic (Ctrl+V)</span>
                                </label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setMediaTarget({ sectionIdx: idx });
                                    setIsMediaModalOpen(true);
                                  }}
                                  className="studio-btn-library-pill"
                                >
                                  <ImageIcon size={13} />
                                  <span>Pick from Library</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Add Chapter Button */}
              <div style={{ marginTop: 14 }}>
                <button
                  type="button"
                  onClick={addChapter}
                  className="studio-btn-add-chapter"
                >
                  <Plus size={15} />
                  <span>Add Content Chapter</span>
                </button>
              </div>
            </div>

            {/* Lead Generation & Call To Action (CTA) */}
            <div className="studio-card studio-card-cta">
              <div className="studio-card-head">
                <div>
                  <div className="studio-card-title">
                    🎯 Lead Generation & Call To Action (CTA)
                  </div>
                  <div className="studio-card-sub">
                    Capture high-intent manufacturing leads at the bottom of the article
                  </div>
                </div>
              </div>

              <div className="studio-cta-grid">
                <div className="studio-field">
                  <label className="studio-label">CTA Button Text</label>
                  <input
                    type="text"
                    className="studio-input"
                    placeholder="e.g. Request a Plant Assessment"
                    value={ctaButtonText}
                    onChange={e => {
                      setCtaButtonText(e.target.value);
                      setIsDirty(true);
                    }}
                  />
                </div>

                <div className="studio-field">
                  <label className="studio-label">Supporting CTA Pitch</label>
                  <input
                    type="text"
                    className="studio-input"
                    placeholder="e.g. Looking to improve factory throughput? Talk to our manufacturing engineers."
                    value={ctaText}
                    onChange={e => {
                      setCtaText(e.target.value);
                      setIsDirty(true);
                    }}
                  />
                </div>
              </div>
            </div>
          </main>

          {/* VIEW MODE: SPLIT VIEW RIGHT PANE (Live Article Preview) */}
          {viewMode === 'split' && (
            <aside className="studio-split-preview-pane">
              <div className="studio-split-preview-head">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Eye size={15} color="#2563eb" />
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>
                    Live Article Preview
                  </span>
                </div>

                {/* Device Selector */}
                <div className="studio-device-toggle-small">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    className={`studio-dev-btn ${previewDevice === 'desktop' ? 'active' : ''}`}
                    title="Desktop View"
                  >
                    <Monitor size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    className={`studio-dev-btn ${previewDevice === 'mobile' ? 'active' : ''}`}
                    title="Mobile View (375px)"
                  >
                    <Smartphone size={13} />
                  </button>
                </div>
              </div>

              <div className="studio-split-preview-body">
                {renderLiveArticlePreview(previewDevice === 'mobile')}
              </div>
            </aside>
          )}

          {/* VIEW MODE: STANDARD EDIT MODE RIGHT PANE (SEO & Publishing Controls) */}
          {viewMode === 'edit' && (
            <aside className="studio-sidebar-column">
              {/* Publishing Controls Card */}
              <div className="studio-side-card">
                <div className="studio-side-head" style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      background: '#eff6ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2563eb'
                    }}>
                      <Globe size={14} />
                    </div>
                    <div>
                      <div className="studio-side-title" style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>
                        Publishing Controls
                      </div>
                    </div>
                  </div>
                  <span className={`studio-status-live-chip chip-${status}`}>
                    <span className="studio-status-dot" />
                    {status === 'review' ? 'In Review' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>

                <div className="studio-field" style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                    <label className="studio-label-sm" style={{ margin: 0, fontWeight: 600, color: '#475569', fontSize: 11 }}>
                      POST STATUS
                    </label>
                    <span style={{ fontSize: 10.5, color: '#94a3b8' }}>Workflow state</span>
                  </div>

                  <div className="studio-status-grid">
                    {[
                      { id: 'draft', label: 'Draft', icon: FileText, activeClass: 'status-draft' },
                      { id: 'review', label: 'In Review', icon: Eye, activeClass: 'status-review' },
                      { id: 'published', label: 'Published', icon: CheckCircle2, activeClass: 'status-published' },
                      { id: 'archived', label: 'Archived', icon: Archive, activeClass: 'status-archived' },
                    ].map(opt => {
                      const isActive = status === opt.id;
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setStatus(opt.id as any);
                            setIsDirty(true);
                          }}
                          className={`studio-status-card ${opt.activeClass} ${isActive ? 'is-active' : ''}`}
                        >
                          <div className="status-card-inner">
                            <span className="status-icon-bubble">
                              <Icon size={13} />
                            </span>
                            <span className="status-card-name">{opt.label}</span>
                          </div>
                          {isActive && (
                            <span className="status-check-badge">
                              <Check size={11} strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Contextual Status Explainer */}
                  <div className={`studio-status-explainer explainer-${status}`}>
                    {status === 'published' && (
                      <>
                        <CheckCircle2 size={13} color="#15803d" style={{ flexShrink: 0, marginTop: 1 }} />
                        <span>Publicly live and indexed at <strong>tetrahedron.in/{slug || '...'}</strong></span>
                      </>
                    )}
                    {status === 'review' && (
                      <>
                        <Eye size={13} color="#2563eb" style={{ flexShrink: 0, marginTop: 1 }} />
                        <span>Submitted for editorial review. Hidden from public readers.</span>
                      </>
                    )}
                    {status === 'draft' && (
                      <>
                        <FileText size={13} color="#b45309" style={{ flexShrink: 0, marginTop: 1 }} />
                        <span>Private work in progress. Visible only to logged-in admins.</span>
                      </>
                    )}
                    {status === 'archived' && (
                      <>
                        <Archive size={13} color="#475569" style={{ flexShrink: 0, marginTop: 1 }} />
                        <span>Archived and unlisted. Hidden from feeds and category listings.</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="studio-field" style={{ marginBottom: 14 }}>
                  <label className="studio-label-sm" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, fontWeight: 600, color: '#475569', fontSize: 11 }}>
                    <Calendar size={13} color="#2563eb" />
                    <span>SCHEDULE PUBLICATION (OPTIONAL)</span>
                  </label>
                  <input
                    type="datetime-local"
                    className="studio-schedule-input"
                    value={scheduledDate}
                    onChange={e => {
                      setScheduledDate(e.target.value);
                      setIsDirty(true);
                    }}
                  />
                  {scheduledDate && (
                    <div className="studio-scheduled-notice">
                      <Clock size={12} />
                      <span>Scheduled: <strong>{new Date(scheduledDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</strong></span>
                      <button
                        type="button"
                        onClick={() => { setScheduledDate(''); setIsDirty(true); }}
                        className="studio-clear-btn"
                        title="Clear schedule"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="studio-field" style={{ marginBottom: 0 }}>
                  <label className={`studio-feature-box ${featured ? 'active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={e => {
                        setFeatured(e.target.checked);
                        setIsDirty(true);
                      }}
                      className="studio-feature-checkbox"
                    />
                    <div className="studio-feature-content">
                      <div className="studio-feature-title-row">
                        <span className="studio-feature-title">Feature on Homepage</span>
                        <span className="studio-featured-star">⭐</span>
                      </div>
                      <span className="studio-feature-desc">Highlight in top hero carousel and featured stories</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Chapter Outline / Quick Jump Navigator */}
              <div className="studio-side-card">
                <div className="studio-side-head">
                  <div className="studio-side-title" style={{ marginBottom: 0 }}>Chapter Outline</div>
                  <span className="studio-outline-count">{sections.length}</span>
                </div>

                <div className="studio-outline-list">
                  {sections.map((sec, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        const el = document.getElementById(`chapter-card-${idx}`);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          if (sec.isCollapsed) {
                            handleSectionChange(idx, 'isCollapsed', false);
                          }
                        }
                      }}
                      className="studio-outline-item"
                    >
                      <span className="studio-outline-num">{idx + 1}</span>
                      <span className="studio-outline-text">
                        {sec.heading ? sec.heading : `Chapter #${idx + 1}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Focus Keyword & Real-time Yoast-Style SEO Audit */}
              <div className="studio-side-card studio-seo-card">
                <div className="studio-side-head">
                  <div className="studio-side-title" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <TrendingUp size={15} color="#2563eb" />
                    <span>Focus Keyword & SEO Score</span>
                  </div>
                  {focusKeyword.trim() && (
                    <span className={`studio-seo-badge ${seoAnalysis.score >= 80 ? 'seo-good' : seoAnalysis.score >= 60 ? 'seo-ok' : 'seo-bad'}`}>
                      {seoAnalysis.score}/100
                    </span>
                  )}
                </div>

                <div className="studio-field" style={{ marginTop: 10 }}>
                  <label className="studio-label-sm">Target Focus Keyword</label>
                  <input
                    type="text"
                    className="studio-input-sm"
                    placeholder="e.g. AGV manufacturers in India"
                    value={focusKeyword}
                    onChange={e => {
                      setFocusKeyword(e.target.value);
                      setIsDirty(true);
                    }}
                  />
                  <span className="studio-input-hint">Target search phrase to rank for in Google</span>
                </div>

                {focusKeyword.trim() ? (
                  <div className="studio-seo-audit-wrap">
                    {/* Keyword Density Gauge */}
                    <div className="studio-density-metric">
                      <div className="studio-density-header">
                        <span>Keyword Density</span>
                        <strong>{seoAnalysis.density}% ({seoAnalysis.count} mentions)</strong>
                      </div>
                      <div className="studio-density-track">
                        <div
                          className="studio-density-fill"
                          style={{
                            width: `${Math.min(100, seoAnalysis.density * 40)}%`,
                            backgroundColor: seoAnalysis.density >= 0.8 && seoAnalysis.density <= 2.5 ? '#16a34a' : seoAnalysis.density > 2.5 ? '#eab308' : '#64748b'
                          }}
                        />
                      </div>
                      <span className="studio-density-recommendation">
                        {seoAnalysis.density >= 0.8 && seoAnalysis.density <= 2.5
                          ? '✅ Optimal keyword density (0.8% - 2.5%)'
                          : seoAnalysis.density > 2.5
                            ? '⚠️ Keyword density is high (over-optimization risk)'
                            : 'ℹ️ Add a few more natural mentions in body text'}
                      </span>
                    </div>

                    {/* Yoast-style Checklist */}
                    <div className="studio-seo-checklist">
                      <div className={`studio-seo-check-item ${seoAnalysis.inTitle ? 'passed' : 'failed'}`}>
                        {seoAnalysis.inTitle ? <CheckCircle2 size={13} color="#16a34a" /> : <AlertCircle size={13} color="#dc2626" />}
                        <span>Keyword in Title ({seoAnalysis.inTitle ? 'Found' : 'Missing'})</span>
                      </div>
                      <div className={`studio-seo-check-item ${seoAnalysis.inSlug ? 'passed' : 'failed'}`}>
                        {seoAnalysis.inSlug ? <CheckCircle2 size={13} color="#16a34a" /> : <AlertCircle size={13} color="#dc2626" />}
                        <span>Keyword in URL Slug ({seoAnalysis.inSlug ? 'Found' : 'Missing'})</span>
                      </div>
                      <div className={`studio-seo-check-item ${seoAnalysis.inMeta ? 'passed' : 'failed'}`}>
                        {seoAnalysis.inMeta ? <CheckCircle2 size={13} color="#16a34a" /> : <AlertCircle size={13} color="#dc2626" />}
                        <span>Keyword in Meta Description ({seoAnalysis.inMeta ? 'Found' : 'Missing'})</span>
                      </div>
                      <div className={`studio-seo-check-item ${seoAnalysis.inFirst100 ? 'passed' : 'failed'}`}>
                        {seoAnalysis.inFirst100 ? <CheckCircle2 size={13} color="#16a34a" /> : <AlertCircle size={13} color="#dc2626" />}
                        <span>Keyword in First 100 Words ({seoAnalysis.inFirst100 ? 'Found' : 'Missing'})</span>
                      </div>
                      <div className={`studio-seo-check-item ${seoAnalysis.inHeadings ? 'passed' : 'failed'}`}>
                        {seoAnalysis.inHeadings ? <CheckCircle2 size={13} color="#16a34a" /> : <AlertCircle size={13} color="#dc2626" />}
                        <span>Keyword in at least one H2/Chapter ({seoAnalysis.inHeadings ? 'Found' : 'Missing'})</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="studio-seo-empty-hint">
                    Enter a focus keyword above to get live SEO recommendations and search density scoring.
                  </div>
                )}
              </div>

              {/* Google SERP Snippet Preview */}
              <div className="studio-side-card">
                <div className="studio-side-title">Google SERP Snippet</div>
                <div className="studio-serp-box">
                  <div className="studio-serp-site">
                    <span className="studio-serp-logo">T</span>
                    <div>
                      <div className="studio-serp-brand">Tetrahedron</div>
                      <div className="studio-serp-url">
                        https://tetrahedron.in › {slug || 'article-slug'}
                      </div>
                    </div>
                  </div>
                  <div className="studio-serp-title">
                    {title ? (title.length > 55 ? title.slice(0, 55) + '...' : title) : 'Article Title | Tetrahedron'}
                  </div>
                  <div className="studio-serp-desc">
                    {metaDescription
                      ? (metaDescription.length > 130 ? metaDescription.slice(0, 130) + '...' : metaDescription)
                      : 'Discover actionable strategies, technical insights, and operational excellence best practices from Tetrahedron.'}
                  </div>
                </div>
              </div>

              {/* SEO Meta Description */}
              <div className="studio-side-card">
                <div className="studio-side-head">
                  <div className="studio-side-title" style={{ marginBottom: 0 }}>SEO Meta Description</div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: metaDescription.length >= 140 && metaDescription.length <= 160 ? '#16a34a' : '#64748b' }}>
                    {metaDescription.length} / 160 chars
                  </span>
                </div>

                <textarea
                  className="studio-textarea-sm"
                  rows={3}
                  placeholder="Write an enticing, keyword-rich summary for search engines (140-160 characters)..."
                  value={metaDescription}
                  onChange={e => {
                    setMetaDescription(e.target.value);
                    setIsDirty(true);
                  }}
                />
              </div>

              {/* Topic & Category */}
              <div className="studio-side-card">
                <div className="studio-side-title">Topic & Category</div>
                <div className="studio-field">
                  <input
                    type="text"
                    className="studio-input"
                    placeholder="e.g. Automation & Robotics"
                    value={category}
                    onChange={e => {
                      setCategory(e.target.value);
                      setIsDirty(true);
                    }}
                  />
                </div>

                <div className="studio-suggestions-wrap">
                  <span className="studio-sublabel">Quick Suggestions:</span>
                  <div className="studio-chips-list">
                    {SUGGESTED_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setCategory(cat);
                          setIsDirty(true);
                        }}
                        className={`studio-chip ${category === cat ? 'active' : ''}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="studio-side-card">
                <div className="studio-side-title">Tags (Comma Separated)</div>
                <input
                  type="text"
                  className="studio-input"
                  placeholder="e.g. AGV, AMR, Smart Factory, Robotics"
                  value={tags}
                  onChange={e => {
                    setTags(e.target.value);
                    setIsDirty(true);
                  }}
                />
                {tags.trim() && (
                  <div className="studio-tags-preview">
                    {tags
                      .split(',')
                      .map(t => t.trim())
                      .filter(Boolean)
                      .map((tag, i) => (
                        <span key={i} className="studio-tag-pill">
                          #{tag}
                        </span>
                      ))}
                  </div>
                )}
              </div>

              {/* Internal Link Intelligence */}
              <div className="studio-side-card">
                <div className="studio-side-head">
                  <div className="studio-side-title" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Compass size={15} color="#2563eb" />
                    <span>Internal Link Opportunities</span>
                  </div>
                  <span className="studio-outline-count">{internalLinkSuggestions.length}</span>
                </div>
                <div className="studio-card-sub" style={{ marginBottom: 8, marginTop: 4 }}>
                  Detected topics in your text you can hyperlink with Ctrl+K:
                </div>

                {internalLinkSuggestions.length > 0 ? (
                  <div className="studio-links-suggestions-list">
                    {internalLinkSuggestions.map((item, idx) => (
                      <div key={idx} className="studio-link-suggestion-row">
                        <div className="studio-link-info">
                          <span className="studio-link-topic">"{item.name}"</span>
                          <span className="studio-link-desc">{item.url}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(item.url);
                            showToast('success', `Copied link: ${item.url}`);
                          }}
                          className="studio-btn-copy-link"
                          title="Copy link to clipboard"
                        >
                          <Copy size={11} />
                          <span>Copy</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="studio-seo-empty-hint">
                    Write content mentioning manufacturing topics (e.g. AGV, TPM, Lean, Automation) to see internal link suggestions.
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>
      )}

      {/* REUSABLE MEDIA LIBRARY MODAL */}
      {isMediaModalOpen && (
        <div className="studio-media-modal-backdrop" onClick={() => setIsMediaModalOpen(false)}>
          <div className="studio-media-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="studio-media-modal-header">
              <div>
                <h3 className="studio-media-modal-title">Cloudinary Media Library</h3>
                <p className="studio-media-modal-subtitle">
                  Pick from previously uploaded high-resolution assets across all Tetrahedron blogs
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMediaModalOpen(false)}
                className="studio-media-modal-close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Search filter */}
            <div className="studio-media-search-bar">
              <Search size={15} color="#64748b" />
              <input
                type="text"
                className="studio-media-search-input"
                placeholder="Search images by article name or URL..."
                value={mediaSearch}
                onChange={e => setMediaSearch(e.target.value)}
                autoFocus
              />
              {mediaSearch && (
                <button
                  type="button"
                  onClick={() => setMediaSearch('')}
                  className="studio-clear-btn"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Image Grid */}
            <div className="studio-media-grid-container">
              {filteredMediaImages.length > 0 ? (
                <div className="studio-media-grid">
                  {filteredMediaImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="studio-media-card"
                      onClick={() => handleSelectMediaImage(img.url)}
                    >
                      <div className="studio-media-thumb-wrap">
                        <img
                          src={getOptimizedCloudinaryUrl(img.url, { width: 400, quality: 'auto' })}
                          alt={img.title}
                          className="studio-media-thumb"
                          loading="lazy"
                        />
                      </div>
                      <div className="studio-media-card-caption">
                        <span className="studio-media-card-title" title={img.title}>
                          {img.title}
                        </span>
                        <span className="studio-media-card-select-hint">Click to Use</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="studio-media-empty">
                  <ImageIcon size={32} color="#94a3b8" />
                  <p>No images match your search query.</p>
                </div>
              )}
            </div>

            <div className="studio-media-modal-footer">
              <span className="studio-media-count-text">
                Showing {filteredMediaImages.length} of {mediaLibraryImages.length} media assets
              </span>
              <button
                type="button"
                onClick={() => setIsMediaModalOpen(false)}
                className="studio-btn-cancel"
              >
                Close Library
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⚡ 1-Click AI / Markdown Import Modal */}
      {isAiImportModalOpen && (
        <div className="studio-media-modal-backdrop" onClick={() => setIsAiImportModalOpen(false)}>
          <div className="studio-ai-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="studio-ai-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="studio-ai-modal-icon">
                  <Sparkles size={18} color="#7c3aed" />
                </div>
                <div>
                  <h3 className="studio-ai-modal-title">1-Click AI / Markdown Article Importer</h3>
                  <p className="studio-ai-modal-subtitle">
                    Paste raw markdown from ChatGPT, Claude, Gemini, or Notion to automatically generate your title, slug, metadata, and chapters.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAiImportModalOpen(false)}
                className="studio-media-modal-close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="studio-ai-modal-body">
              {/* Left Column: Markdown Paste Area */}
              <div className="studio-ai-input-col">
                <div className="studio-ai-input-head">
                  <label className="studio-label-sm" style={{ fontWeight: 700, color: '#475569', fontSize: 11 }}>
                    PASTE RAW MARKDOWN / AI OUTPUT
                  </label>
                  <button
                    type="button"
                    onClick={loadSampleAiBlog}
                    className="studio-btn-sample-ai"
                    title="Load an example manufacturing article to test parser"
                  >
                    <Sparkles size={12} />
                    <span>Try Sample AI Article</span>
                  </button>
                </div>
                <textarea
                  className="studio-ai-textarea"
                  placeholder={`Paste full ChatGPT/Claude markdown here...\n\nExample format:\n# AGV vs AMR in Manufacturing\n**Category:** Automation & Robotics\n**Focus Keyword:** AGV vs AMR\n\nIntro paragraph text...\n\n## Chapter 1 Title\nChapter 1 explanation...\n\n## Chapter 2 Title\nChapter 2 explanation...`}
                  value={rawAiMarkdown}
                  onChange={e => setRawAiMarkdown(e.target.value)}
                  autoFocus
                />
                <div className="studio-ai-input-footer">
                  <span>{rawAiMarkdown.trim() ? `${rawAiMarkdown.trim().split(/\s+/).filter(Boolean).length} words detected` : 'Waiting for markdown text...'}</span>
                  {rawAiMarkdown && (
                    <button
                      type="button"
                      onClick={() => setRawAiMarkdown('')}
                      className="studio-clear-btn"
                      style={{ fontSize: 11 }}
                    >
                      Clear Text
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Live Detection & Split Breakdown */}
              <div className="studio-ai-preview-col">
                <div className="studio-ai-preview-head">
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>
                    Live Detection Breakdown
                  </span>
                  {parsedArticle && (
                    <span className="studio-pill-badge" style={{ background: '#f5f3ff', color: '#7c3aed', borderColor: '#ddd6fe' }}>
                      {parsedArticle.sections.length} Chapters Found
                    </span>
                  )}
                </div>

                {parsedArticle && parsedArticle.title ? (
                  <div className="studio-ai-detected-list">
                    <div className="studio-ai-detected-card">
                      <div className="studio-ai-prop-label">ARTICLE TITLE</div>
                      <div className="studio-ai-prop-val title-val">{parsedArticle.title}</div>
                      <div className="studio-ai-prop-slug">/{parsedArticle.slug}</div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <div className="studio-ai-detected-card">
                        <div className="studio-ai-prop-label">DETECTED CATEGORY</div>
                        <div className="studio-ai-prop-val">
                          {parsedArticle.category || <span style={{ color: '#94a3b8' }}>Auto / Default</span>}
                        </div>
                      </div>
                      <div className="studio-ai-detected-card">
                        <div className="studio-ai-prop-label">FOCUS KEYWORD</div>
                        <div className="studio-ai-prop-val">
                          {parsedArticle.focusKeyword || <span style={{ color: '#94a3b8' }}>None specified</span>}
                        </div>
                      </div>
                    </div>

                    <div className="studio-ai-detected-card">
                      <div className="studio-ai-prop-label">META DESCRIPTION</div>
                      <div className="studio-ai-prop-val" style={{ fontSize: 12, lineHeight: 1.4, color: '#475569' }}>
                        {parsedArticle.metaDescription || <span style={{ color: '#94a3b8' }}>Will be generated from intro</span>}
                      </div>
                    </div>

                    <div className="studio-ai-detected-card">
                      <div className="studio-ai-prop-label">CHAPTERS TO CREATE ({parsedArticle.sections.length})</div>
                      <div className="studio-ai-chapters-list">
                        {parsedArticle.sections.map((sec, idx) => (
                          <div key={idx} className="studio-ai-chapter-item">
                            <span className="studio-ai-ch-num">#{idx + 1}</span>
                            <span className="studio-ai-ch-name">{sec.heading}</span>
                            <span className="studio-ai-ch-words">{sec.content.split(/\s+/).filter(Boolean).length} words</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="studio-ai-empty-preview">
                    <Sparkles size={28} color="#cbd5e1" />
                    <p style={{ margin: 0, fontWeight: 600, color: '#64748b', fontSize: 13 }}>
                      No article structure detected yet
                    </p>
                    <span style={{ fontSize: 11.5, color: '#94a3b8', textAlign: 'center', maxWidth: 260 }}>
                      Paste markdown on the left or click "Try Sample AI Article" to see the live breakdown.
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="studio-ai-modal-footer">
              <button
                type="button"
                onClick={() => setIsAiImportModalOpen(false)}
                className="studio-btn-cancel"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!parsedArticle || !parsedArticle.title}
                onClick={handleApplyAiImport}
                className="studio-btn-populate-ai"
              >
                <Sparkles size={14} />
                <span>Populate Blog Studio ({parsedArticle ? parsedArticle.sections.length : 0} Chapters)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scoped CSS with High Specificity to Prevent Any Global Font Bloat */}
      <style jsx global>{`
        #blog-studio-root {
          font-family: var(--font-poppins), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          background: #f1f5f9 !important;
          min-height: 100vh !important;
          color: #0f172a !important;
        }

        /* Strict font size enforcement across the editor */
        #blog-studio-root,
        #blog-studio-root div,
        #blog-studio-root span,
        #blog-studio-root label,
        #blog-studio-root p,
        #blog-studio-root button,
        #blog-studio-root input,
        #blog-studio-root textarea {
          font-family: var(--font-poppins), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          box-sizing: border-box;
        }

        /* Top Header */
        .studio-topbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #ffffff !important;
          border-bottom: 1px solid #e2e8f0 !important;
          padding: 7px 14px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 8px !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
          flex-wrap: nowrap !important;
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
          overflow-x: clip !important;
        }
        .studio-topbar button,
        .studio-topbar a,
        .studio-topbar span {
          white-space: nowrap !important;
        }
        .studio-topbar-left {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-shrink: 0;
          min-width: 0;
        }
        .studio-btn-back {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          color: #475569 !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          text-decoration: none !important;
          padding: 5px 8px !important;
          border-radius: 6px !important;
          border: 1px solid #cbd5e1 !important;
          background: #ffffff !important;
          white-space: nowrap !important;
          flex-shrink: 0 !important;
          transition: all 0.15s;
        }
        .studio-btn-back:hover {
          background: #f8fafc !important;
          color: #0f172a !important;
        }
        .studio-vsep {
          width: 1px;
          height: 16px;
          background: #e2e8f0;
          flex-shrink: 0;
        }
        .studio-title-badge {
          display: flex;
          flex-direction: column;
          max-width: 130px;
          min-width: 0;
          flex-shrink: 1;
          overflow: hidden;
        }
        .studio-article-type {
          font-size: 9px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          color: #2563eb !important;
          line-height: 1.1 !important;
          white-space: nowrap !important;
        }
        .studio-article-name {
          font-size: 11px !important;
          font-weight: 600 !important;
          color: #1e293b !important;
          line-height: 1.2 !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }
        .studio-status-pill {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          padding: 2px 6px !important;
          border-radius: 999px !important;
          font-size: 10px !important;
          font-weight: 600 !important;
          white-space: nowrap !important;
          flex-shrink: 0 !important;
        }
        .status-published {
          background: #dcfce7 !important;
          color: #15803d !important;
        }
        .status-published .studio-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #16a34a;
        }
        .status-draft {
          background: #fef3c7 !important;
          color: #b45309 !important;
        }
        .status-draft .studio-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #d97706;
        }
        .status-review {
          background: #fef3c7 !important;
          color: #92400e !important;
        }
        .status-review .studio-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #d97706;
        }
        .status-archived {
          background: #e2e8f0 !important;
          color: #475569 !important;
        }
        .status-archived .studio-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #64748b;
        }

        /* View Mode Switcher */
        .studio-topbar-center {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .studio-view-switcher {
          display: flex;
          align-items: center;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 2px;
          border-radius: 6px;
          gap: 2px;
          flex-shrink: 0;
        }
        .studio-view-btn {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          padding: 4px 7px !important;
          font-size: 10.5px !important;
          font-weight: 500 !important;
          border: none !important;
          background: transparent !important;
          color: #64748b !important;
          border-radius: 4px !important;
          cursor: pointer !important;
          white-space: nowrap !important;
          flex-shrink: 0 !important;
          transition: all 0.12s ease;
        }
        .studio-view-btn.active {
          background: #ffffff !important;
          color: #2563eb !important;
          font-weight: 600 !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06) !important;
        }

        .studio-autosaved-label {
          display: inline-flex !important;
          align-items: center !important;
          gap: 3px !important;
          font-size: 10px !important;
          color: #16a34a !important;
          font-weight: 600 !important;
          background: #f0fdf4 !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
          white-space: nowrap !important;
          flex-shrink: 0 !important;
        }

        .studio-topbar-right {
          display: flex;
          align-items: center;
          gap: 5px;
          flex-shrink: 0;
          margin-left: auto;
        }
        .studio-btn-draft {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          padding: 5px 9px !important;
          background: #f8fafc !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 6px !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          color: #1e293b !important;
          cursor: pointer !important;
          white-space: nowrap !important;
          flex-shrink: 0 !important;
          transition: all 0.15s;
        }
        .studio-btn-draft:hover {
          background: #e2e8f0 !important;
        }
        .studio-btn-review {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          padding: 5px 9px !important;
          background: #fffbeb !important;
          border: 1px solid #fde68a !important;
          border-radius: 6px !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          color: #92400e !important;
          cursor: pointer !important;
          white-space: nowrap !important;
          flex-shrink: 0 !important;
          transition: all 0.15s ease !important;
        }
        .studio-btn-review:hover:not(:disabled) {
          background: #fef3c7 !important;
          border-color: #f59e0b !important;
          color: #78350f !important;
        }
        .studio-btn-review:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .studio-btn-publish {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          padding: 5px 11px !important;
          background: #2563eb !important;
          border: none !important;
          border-radius: 6px !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          color: #ffffff !important;
          cursor: pointer !important;
          white-space: nowrap !important;
          flex-shrink: 0 !important;
          transition: background 0.15s;
        }
        .studio-btn-publish:hover:not(:disabled) {
          background: #1d4ed8 !important;
        }
        .studio-btn-publish:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 1400px) {
          .studio-title-badge {
            max-width: 90px !important;
          }
          .studio-topbar {
            padding: 6px 10px !important;
            gap: 6px !important;
          }
        }

        @media (max-width: 1200px) {
          .studio-title-badge {
            display: none !important;
          }
          .studio-vsep {
            display: none !important;
          }
          .studio-view-label {
            display: none !important;
          }
          .studio-view-btn {
            padding: 4px 6px !important;
          }
        }

        /* Canvas Layouts */
        .studio-canvas {
          margin: 18px auto;
          padding: 0 16px;
          display: flex;
          align-items: flex-start;
          gap: 18px;
        }
        .standard-layout {
          max-width: 1380px;
        }
        .split-layout {
          max-width: 100%;
        }

        .studio-doc-column {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .studio-sidebar-column {
          width: 340px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* Cards */
        .studio-card {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 8px !important;
          padding: 16px 18px !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03) !important;
        }
        .studio-card-cta {
          background: #f0f9ff !important;
          border-color: #bae6fd !important;
        }
        .studio-card-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 12px;
          gap: 10px;
        }
        .studio-card-title {
          font-size: 14.5px !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          margin: 0 0 2px 0 !important;
          line-height: 1.3 !important;
        }
        .studio-card-sub {
          font-size: 12px !important;
          color: #64748b !important;
          margin: 0 !important;
          line-height: 1.4 !important;
        }
        .studio-pill-badge {
          background: #eff6ff !important;
          color: #1d4ed8 !important;
          border: 1px solid #bfdbfe !important;
          border-radius: 999px !important;
          padding: 2px 8px !important;
          font-size: 10.5px !important;
          font-weight: 600 !important;
          white-space: nowrap !important;
        }

        /* Fields & Typography */
        .studio-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 14px;
        }
        .studio-label {
          font-size: 11.5px !important;
          font-weight: 700 !important;
          letter-spacing: 0.3px !important;
          color: #475569 !important;
          line-height: 1.3 !important;
        }
        .studio-label-sm {
          font-size: 11px !important;
          font-weight: 600 !important;
          color: #64748b !important;
        }
        .studio-req {
          color: #dc2626 !important;
        }
        .studio-title-input {
          width: 100% !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 6px !important;
          padding: 9px 12px !important;
          font-size: 17px !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          outline: none !important;
          line-height: 1.3 !important;
        }
        .studio-title-input:focus {
          border-color: #2563eb !important;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.12) !important;
        }
        .studio-input {
          width: 100% !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 6px !important;
          padding: 8px 10px !important;
          font-size: 13px !important;
          color: #1e293b !important;
          outline: none !important;
        }
        .studio-input:focus {
          border-color: #2563eb !important;
        }
        .studio-input-sm {
          width: 100% !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 5px !important;
          padding: 6px 9px !important;
          font-size: 12px !important;
          color: #1e293b !important;
          outline: none !important;
        }
        .studio-textarea-sm {
          width: 100% !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 6px !important;
          padding: 7px 9px !important;
          font-size: 12px !important;
          color: #1e293b !important;
          resize: vertical !important;
          outline: none !important;
          line-height: 1.4 !important;
        }

        /* Slug bar */
        .studio-slug-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 5px 8px;
          margin-top: 8px;
        }
        .studio-slug-prefix {
          font-size: 11.5px !important;
          color: #64748b !important;
          font-family: monospace !important;
          white-space: nowrap;
        }
        .studio-slug-input {
          flex: 1;
          border: none !important;
          background: transparent !important;
          font-size: 12px !important;
          font-family: monospace !important;
          color: #2563eb !important;
          font-weight: 600 !important;
          outline: none !important;
        }
        .studio-slug-action-btn {
          display: inline-flex !important;
          align-items: center !important;
          gap: 3px !important;
          padding: 2px 7px !important;
          background: #ffffff !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 4px !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          color: #475569 !important;
          cursor: pointer !important;
        }

        /* Banner Dropzone */
        .studio-dropzone-banner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          border: 2px dashed #cbd5e1;
          border-radius: 7px;
          background: #f8fafc;
          cursor: pointer;
          transition: all 0.15s;
        }
        .studio-dropzone-banner:hover {
          border-color: #2563eb;
          background: #eff6ff;
        }
        .studio-dropzone-icon {
          color: #2563eb;
          margin-bottom: 6px;
        }
        .studio-dropzone-text-main {
          font-size: 13px !important;
          font-weight: 600 !important;
          color: #0f172a !important;
        }
        .studio-dropzone-text-sub {
          font-size: 11px !important;
          color: #64748b !important;
          margin-top: 3px;
        }
        .studio-banner-preview-card {
          display: flex;
          gap: 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 7px;
          padding: 10px;
        }
        .studio-banner-img {
          width: 180px;
          height: 105px;
          object-fit: cover;
          border-radius: 5px;
        }
        .studio-banner-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .studio-banner-file-info {
          display: flex;
          flex-direction: column;
          font-size: 12px !important;
        }
        .studio-banner-file-info strong {
          font-size: 12.5px !important;
          color: #0f172a !important;
        }
        .studio-banner-file-info span {
          font-size: 11px !important;
          color: #64748b !important;
        }
        .studio-btn-secondary-sm {
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px !important;
          padding: 4px 10px !important;
          font-size: 11.5px !important;
          font-weight: 600 !important;
          color: #2563eb !important;
          background: #eff6ff !important;
          border: 1px solid #bfdbfe !important;
          border-radius: 5px !important;
          cursor: pointer !important;
          white-space: nowrap !important;
          line-height: 1.4 !important;
          transition: all 0.15s ease !important;
        }
        .studio-btn-secondary-sm:hover {
          background: #dbeafe !important;
          border-color: #93c5fd !important;
          color: #1d4ed8 !important;
        }
        .studio-btn-danger-sm {
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px !important;
          padding: 4px 10px !important;
          font-size: 11.5px !important;
          font-weight: 600 !important;
          color: #dc2626 !important;
          background: #fef2f2 !important;
          border: 1px solid #fecaca !important;
          border-radius: 5px !important;
          cursor: pointer !important;
          white-space: nowrap !important;
          line-height: 1.4 !important;
          transition: all 0.15s ease !important;
        }
        .studio-btn-danger-sm:hover {
          background: #fee2e2 !important;
          border-color: #fca5a5 !important;
          color: #b91c1c !important;
        }

        /* Chapters list */
        .studio-chapters-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .studio-chapter-card {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 7px;
          overflow: hidden;
        }
        .studio-chapter-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          cursor: pointer;
          user-select: none;
        }
        .studio-chapter-head:hover {
          background: #f1f5f9;
        }
        .studio-chapter-head-left {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          min-width: 0;
        }
        .studio-chapter-badge {
          background: #0f172a !important;
          color: #ffffff !important;
          font-size: 10.5px !important;
          font-weight: 700 !important;
          padding: 2px 6px !important;
          border-radius: 3px !important;
          white-space: nowrap;
        }
        .studio-chapter-title-preview {
          font-size: 13px !important;
          font-weight: 600 !important;
          color: #1e293b !important;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .studio-chapter-word-meta {
          font-size: 10.5px !important;
          color: #64748b !important;
          white-space: nowrap;
        }
        .studio-chapter-head-right {
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .studio-btn-icon-xs {
          padding: 3px 5px !important;
          background: transparent !important;
          border: 1px solid transparent !important;
          color: #64748b !important;
          border-radius: 3px !important;
          cursor: pointer !important;
        }
        .studio-btn-icon-xs:hover:not(:disabled) {
          background: #e2e8f0 !important;
          color: #0f172a !important;
        }
        .studio-btn-icon-xs:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .studio-btn-delete-xs {
          padding: 3px 5px !important;
          background: transparent !important;
          border: 1px solid transparent !important;
          color: #dc2626 !important;
          border-radius: 3px !important;
          cursor: pointer !important;
        }
        .studio-btn-delete-xs:hover {
          background: #fee2e2 !important;
        }
        .studio-chapter-body {
          padding: 14px;
          background: #ffffff;
        }
        .studio-sec-dropzone {
          display: inline-flex !important;
          align-items: center !important;
          gap: 6px !important;
          padding: 6px 12px !important;
          background: #f8fafc !important;
          border: 1px dashed #cbd5e1 !important;
          border-radius: 5px !important;
          font-size: 12px !important;
          color: #475569 !important;
          font-weight: 500 !important;
          cursor: pointer !important;
        }
        .studio-sec-dropzone:hover {
          border-color: #2563eb !important;
          color: #2563eb !important;
        }
        .studio-sec-img-preview {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 5px;
          padding: 6px;
        }
        .studio-sec-thumb {
          width: 70px;
          height: 48px;
          object-fit: cover;
          border-radius: 3px;
        }
        .studio-btn-secondary-xs {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          padding: 3px 8px !important;
          font-size: 10.5px !important;
          font-weight: 600 !important;
          color: #2563eb !important;
          background: #eff6ff !important;
          border: 1px solid #bfdbfe !important;
          border-radius: 4px !important;
          cursor: pointer !important;
          white-space: nowrap !important;
          transition: all 0.15s ease !important;
        }
        .studio-btn-secondary-xs:hover {
          background: #dbeafe !important;
          border-color: #93c5fd !important;
          color: #1d4ed8 !important;
        }
        .studio-btn-danger-xs {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          padding: 3px 8px !important;
          font-size: 10.5px !important;
          font-weight: 600 !important;
          color: #dc2626 !important;
          background: #fef2f2 !important;
          border: 1px solid #fecaca !important;
          border-radius: 4px !important;
          cursor: pointer !important;
          white-space: nowrap !important;
          transition: all 0.15s ease !important;
        }
        .studio-btn-danger-xs:hover {
          background: #fee2e2 !important;
          border-color: #fca5a5 !important;
          color: #b91c1c !important;
        }
        .studio-btn-add-chapter {
          width: 100% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
          padding: 9px !important;
          background: #f8fafc !important;
          border: 2px dashed #cbd5e1 !important;
          border-radius: 7px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          color: #2563eb !important;
          cursor: pointer !important;
        }
        .studio-btn-add-chapter:hover {
          background: #eff6ff !important;
          border-color: #2563eb !important;
        }
        .studio-btn-subtle-sm {
          padding: 2px 7px !important;
          font-size: 11px !important;
          color: #475569 !important;
          background: #f1f5f9 !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 4px !important;
          cursor: pointer !important;
        }

        /* CTA */
        .studio-cta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        /* SPLIT VIEW PREVIEW PANE */
        .studio-split-preview-pane {
          width: 50% !important;
          min-width: 480px;
          position: sticky;
          top: 70px;
          max-height: calc(100vh - 90px);
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        .studio-split-preview-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }
        .studio-device-toggle-small {
          display: flex;
          align-items: center;
          gap: 2px;
          background: #e2e8f0;
          padding: 2px;
          border-radius: 5px;
        }
        .studio-dev-btn {
          padding: 3px 6px !important;
          background: transparent !important;
          border: none !important;
          color: #64748b !important;
          border-radius: 3px !important;
          cursor: pointer !important;
        }
        .studio-dev-btn.active {
          background: #ffffff !important;
          color: #2563eb !important;
          box-shadow: 0 1px 2px rgba(0,0,0,0.08) !important;
        }
        .studio-split-preview-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          background: #f8fafc;
        }

        /* FULL PREVIEW MODE */
        .studio-full-preview-container,
        .studio-full-preview-mode {
          width: 100%;
          min-height: calc(100vh - 58px);
          background: #f8fafc;
          display: flex;
          flex-direction: column;
        }
        .studio-full-preview-topbar,
        .studio-preview-device-bar {
          background: #ffffff !important;
          border-bottom: 1px solid #e2e8f0 !important;
          padding: 10px 24px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 16px !important;
          position: sticky !important;
          top: 0 !important;
          z-index: 50 !important;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05) !important;
          box-sizing: border-box !important;
        }
        .studio-device-toggle {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          flex-wrap: wrap !important;
        }
        .studio-toggle-label {
          font-size: 12px !important;
          font-weight: 600 !important;
          color: #64748b !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          margin-right: 4px !important;
          font-family: var(--font-poppins), sans-serif !important;
        }
        .studio-toggle-btn,
        .studio-device-btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
          padding: 6px 13px !important;
          font-size: 12.5px !important;
          font-weight: 500 !important;
          font-family: var(--font-poppins), sans-serif !important;
          border: 1px solid #cbd5e1 !important;
          background: #ffffff !important;
          color: #475569 !important;
          border-radius: 7px !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
          user-select: none !important;
          line-height: 1 !important;
          outline: none !important;
        }
        .studio-toggle-btn:hover,
        .studio-device-btn:hover {
          background: #f8fafc !important;
          border-color: #94a3b8 !important;
          color: #0f172a !important;
        }
        .studio-toggle-btn.active,
        .studio-device-btn.active {
          background: #eff6ff !important;
          border-color: #2563eb !important;
          color: #2563eb !important;
          font-weight: 600 !important;
          box-shadow: 0 1px 3px rgba(37, 99, 235, 0.12) !important;
        }
        .studio-btn-exit-full {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
          padding: 6px 14px !important;
          font-size: 12.5px !important;
          font-weight: 600 !important;
          font-family: var(--font-poppins), sans-serif !important;
          color: #2563eb !important;
          background: #eff6ff !important;
          border: 1px solid #bfdbfe !important;
          border-radius: 7px !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
          line-height: 1 !important;
          outline: none !important;
          flex-shrink: 0 !important;
        }
        .studio-btn-exit-full:hover {
          background: #dbeafe !important;
          border-color: #93c5fd !important;
          color: #1d4ed8 !important;
        }
        .studio-full-preview-canvas {
          flex: 1 1 auto !important;
          padding: 24px 16px !important;
          display: flex !important;
          justify-content: center !important;
          overflow-y: auto !important;
          background: #f8fafc !important;
        }

        /* LIVE PREVIEW CONTAINER & REAL SITE SIMULATION */
        .live-preview-container {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .preview-viewport-shell {
          width: 100%;
        }
        .desktop-viewport {
          width: 100%;
        }
        .desktop-viewport .live-preview-layout-wrap {
          display: flex;
          justify-content: center;
          width: 100%;
          max-width: 1200px;
          margin: 36px auto 0 auto;
          gap: 32px;
          padding: 0 20px;
          box-sizing: border-box;
        }
        .desktop-viewport .live-preview-paper {
          width: 876px !important;
          max-width: 876px !important;
          background: #ffffff;
          padding: 0;
          box-sizing: border-box;
        }
        .is-split-preview-mode .desktop-viewport .live-preview-layout-wrap {
          margin: 20px auto 0 auto;
          padding: 0 16px;
        }
        .is-split-preview-mode .desktop-viewport .live-preview-paper {
          width: 100% !important;
          max-width: 100% !important;
        }

        /* Mobile Viewport: Authentic iPhone Device Mockup */
        .mobile-viewport .preview-viewport-shell {
          width: 375px;
          max-width: 375px;
          background: #ffffff;
          border-radius: 36px;
          border: 11px solid #0f172a;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.25);
          margin: 20px auto 40px auto;
          overflow: hidden;
        }
        .mobile-viewport .live-preview-layout-wrap {
          width: 100%;
          padding: 14px 12px;
          box-sizing: border-box;
        }
        .mobile-viewport .live-preview-paper {
          width: 100% !important;
          max-width: 100% !important;
          background: #ffffff;
          padding: 0;
          box-sizing: border-box;
        }

        /* Real Website Header Simulator */
        .real-site-nav-sim {
          width: 100%;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          font-family: var(--font-poppins), sans-serif;
        }
        .real-site-top-bar {
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          padding: 7px 36px;
          font-size: 11.5px;
          color: #475569;
        }
        .real-site-top-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .real-site-contact-info {
          display: flex;
          gap: 18px;
        }
        .real-site-socials {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .social-tag {
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
        }
        .real-site-main-nav {
          padding: 10px 36px;
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
        }
        .real-site-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .real-site-logo-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .real-site-main-logo {
          height: 44px;
          width: auto;
          object-fit: contain;
        }
        .real-site-certified-logo {
          height: 38px;
          width: auto;
          object-fit: contain;
        }
        .real-site-menu-links {
          display: flex;
          align-items: center;
          gap: 20px;
          font-size: 13.5px;
          font-weight: 600;
          color: #0a2c5e;
        }
        .real-site-menu-links span.active {
          color: #ff5722;
        }
        .real-site-quick-support-btn {
          background: #ffb703;
          color: #0a2c5e;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 4px;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 2px 5px rgba(255, 183, 3, 0.25);
        }

        /* Mobile Simulation inside Device Mockup */
        .mobile-viewport .real-site-main-nav {
          padding: 8px 12px;
        }
        .mobile-viewport .real-site-logo-group {
          gap: 8px;
        }
        .mobile-viewport .real-site-main-logo {
          height: 32px;
        }
        .mobile-viewport .real-site-certified-logo {
          height: 28px;
        }
        .mobile-viewport .real-site-quick-support-btn {
          font-size: 10.5px;
          padding: 5px 9px;
        }
        .real-site-hamburger-btn {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          background: #fff8e1;
          border: 1px solid #ffe082;
          color: #b45309;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          cursor: pointer;
        }

        /* Real Tetrahedron Dark Navy Hero Banner (#0a2c5e) */
        .real-site-hero-banner {
          width: 100% !important;
          background: #0a2c5e !important;
          color: #ffffff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-align: center !important;
          padding: 44px 20px 48px 20px !important;
          box-sizing: border-box !important;
        }
        .desktop-viewport .real-site-hero-banner {
          min-height: 220px !important;
        }
        .mobile-viewport .real-site-hero-banner {
          padding: 26px 14px 30px 14px !important;
          min-height: 140px !important;
        }
        .real-site-hero-inner {
          max-width: 960px !important;
          margin: 0 auto !important;
          width: 100% !important;
        }
        .real-site-hero-cat-wrap {
          margin-bottom: 12px !important;
        }
        .real-site-hero-cat-badge {
          display: inline-block !important;
          background: rgba(255, 255, 255, 0.15) !important;
          color: #ff8a65 !important;
          padding: 4px 14px !important;
          border-radius: 20px !important;
          font-size: 12.5px !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.6px !important;
        }
        .real-site-hero-banner .studio-article-h1 {
          font-family: var(--font-poppins), sans-serif !important;
          font-weight: 700 !important;
          font-size: 38px !important;
          color: #ffffff !important;
          line-height: 1.3 !important;
          margin: 0 auto !important;
          text-align: center !important;
          max-width: 960px !important;
        }
        .mobile-viewport .real-site-hero-banner .studio-article-h1 {
          font-size: 22px !important;
          line-height: 1.35 !important;
        }
        .is-split-preview-mode .real-site-hero-banner {
          padding: 30px 16px !important;
          min-height: 160px !important;
        }
        .is-split-preview-mode .real-site-hero-banner .studio-article-h1 {
          font-size: 24px !important;
          line-height: 1.3 !important;
        }

        /* Complete Page Preview (1200px Layout Matching Live Blog) */
        .studio-full-preview-container .studio-full-preview-canvas,
        .studio-full-preview-mode .studio-full-preview-canvas {
          background: #f8fafc !important;
          padding: 0 0 80px 0 !important;
        }
        .studio-full-preview-container .desktop-viewport .live-preview-layout-wrap,
        .studio-full-preview-mode .desktop-viewport .live-preview-layout-wrap {
          display: flex !important;
          flex-direction: row !important;
          gap: 32px !important;
          max-width: 1200px !important;
          margin: 36px auto 0 auto !important;
          align-items: flex-start !important;
          justify-content: center !important;
        }
        .studio-full-preview-container .desktop-viewport .live-preview-paper,
        .studio-full-preview-mode .desktop-viewport .live-preview-paper {
          flex: 1 1 876px !important;
          width: 876px !important;
          max-width: 876px !important;
          padding: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
          border-radius: 0 !important;
        }
        .studio-full-preview-sidebar {
          width: 300px !important;
          max-width: 320px !important;
          flex-shrink: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 20px !important;
          position: sticky !important;
          top: 90px !important;
        }
        .studio-sidebar-card, .lp-sidebar-card {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 12px !important;
          padding: 20px 18px !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03) !important;
        }
        .studio-sidebar-widget-heading, .lp-sidebar-title {
          font-family: var(--font-poppins), sans-serif !important;
          font-size: 16px !important;
          font-weight: 700 !important;
          color: #0a2c5e !important;
          margin: 0 0 8px 0 !important;
          line-height: 1.3 !important;
        }
        .studio-sidebar-sub, .lp-sidebar-sub {
          font-size: 12px !important;
          color: #64748b !important;
          line-height: 1.5 !important;
          margin: 0 0 14px 0 !important;
        }
        .studio-sidebar-form, .lp-sidebar-form {
          display: flex !important;
          flex-direction: column !important;
          gap: 8px !important;
        }
        .studio-sidebar-input, .lp-sidebar-input {
          width: 100% !important;
          padding: 7px 10px !important;
          font-size: 12px !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 6px !important;
          background: #ffffff !important;
          color: #334155 !important;
          outline: none !important;
          box-sizing: border-box !important;
        }
        .studio-sidebar-submit, .lp-sidebar-submit {
          width: 100% !important;
          padding: 9px !important;
          background: #ff5722 !important;
          color: #ffffff !important;
          border: none !important;
          border-radius: 6px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          cursor: default !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          box-shadow: 0 2px 4px rgba(255, 87, 34, 0.2) !important;
        }
        .studio-recent-list, .lp-recent-list {
          display: flex !important;
          flex-direction: column !important;
          gap: 12px !important;
        }
        .studio-recent-item, .lp-recent-item {
          display: flex !important;
          align-items: flex-start !important;
          gap: 9px !important;
        }
        .studio-recent-dot, .lp-recent-dot {
          width: 6px !important;
          height: 6px !important;
          border-radius: 50% !important;
          background: #ff5722 !important;
          margin-top: 5px !important;
          flex-shrink: 0 !important;
        }
        .studio-recent-post-link, .lp-recent-title {
          font-size: 12.5px !important;
          font-weight: 600 !important;
          color: #0a2c5e !important;
          line-height: 1.4 !important;
          margin: 0 !important;
          display: block !important;
        }

        .lp-meta-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .lp-cat-badge {
          background: #eff6ff !important;
          color: #2563eb !important;
          padding: 3px 10px !important;
          border-radius: 999px !important;
          font-size: 11.5px !important;
          font-weight: 700 !important;
        }
        .lp-read-time {
          font-size: 11.5px !important;
          color: #64748b !important;
        }
        .lp-h1-title, .studio-article-h1 {
          font-family: var(--font-poppins) !important;
          font-size: 34px !important;
          font-weight: 800 !important;
          color: #0a2c5e !important;
          line-height: 1.25 !important;
          margin: 0 0 16px 0 !important;
        }
        .mobile-viewport .lp-h1-title, .mobile-viewport .studio-article-h1 {
          font-size: 22px !important;
        }
        .lp-byline-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f1f5f9;
        }
        .lp-author-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #2563eb;
          color: #ffffff;
          font-size: 13.5px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lp-author-name {
          font-size: 13px !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          line-height: 1.2 !important;
        }
        .lp-date-line {
          font-size: 11.5px !important;
          color: #64748b !important;
        }
        .lp-hero-cover {
          margin-bottom: 28px;
        }
        .lp-hero-cover img {
          width: 100%;
          max-height: 480px;
          object-fit: cover;
          border-radius: 10px;
        }
        .lp-cover-caption {
          display: block;
          font-size: 11.5px !important;
          color: #64748b !important;
          font-style: italic !important;
          margin-top: 6px;
          text-align: center;
        }
        .lp-hero-placeholder {
          height: 180px;
          background: #f8fafc;
          border: 2px dashed #cbd5e1;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #94a3b8;
          font-size: 12.5px !important;
          margin-bottom: 28px;
        }
        .lp-toc-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-left: 4px solid #0a2c5e !important;
          border-radius: 8px;
          padding: 20px 24px !important;
          margin: 28px 0 36px 0 !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        .lp-toc-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .lp-toc-icon {
          font-size: 18px;
        }
        .lp-toc-title, .studio-toc-heading {
          font-family: var(--font-poppins) !important;
          font-size: 18px !important;
          font-weight: 700 !important;
          color: #0a2c5e !important;
          margin: 0 !important;
        }
        .lp-toc-list {
          margin: 0;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .lp-toc-item {
          color: #64748b;
        }
        .lp-toc-link {
          font-size: 15.5px !important;
          color: #0284c7 !important;
          font-weight: 500 !important;
          text-decoration: none !important;
          transition: color 0.15s;
        }
        .lp-toc-link:hover {
          color: #ff5722 !important;
          text-decoration: underline !important;
        }
        .lp-chapter-block {
          margin-bottom: 32px;
        }
        .lp-h2-heading {
          font-family: var(--font-poppins) !important;
          font-size: 28px !important;
          font-weight: 700 !important;
          color: #002244 !important;
          margin: 32px 0 16px 0 !important;
          line-height: 1.35 !important;
          scroll-margin-top: 100px;
        }
        .mobile-viewport .lp-h2-heading {
          font-size: 20px !important;
        }
        .lp-sec-graphic img {
          width: 100%;
          max-height: 300px;
          object-fit: cover;
          border-radius: 6px;
          margin-bottom: 12px;
        }
        .lp-paragraph {
          font-size: 15px !important;
          line-height: 1.75 !important;
          color: #334155 !important;
          margin: 0 0 12px 0 !important;
        }
        .mobile-viewport .lp-paragraph {
          font-size: 13.5px !important;
          line-height: 1.65 !important;
        }
        .lp-placeholder-text {
          color: #94a3b8 !important;
          font-style: italic !important;
        }
        .lp-blockquote {
          border-left: 3px solid #2563eb;
          padding-left: 12px;
          margin: 12px 0;
          font-style: italic;
          color: #475569;
          background: #f8fafc;
          padding-top: 6px;
          padding-bottom: 6px;
          border-radius: 0 4px 4px 0;
          font-size: 14px !important;
        }
        .lp-list-item {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 5px;
          font-size: 14.5px !important;
          color: #334155;
        }
        .lp-bullet {
          color: #2563eb;
          font-size: 7px;
        }
        .lp-cta-block {
          margin-top: 28px;
          padding: 22px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          text-align: center;
        }
        .lp-cta-pitch {
          font-size: 15px !important;
          font-weight: 600 !important;
          color: #0f172a !important;
          margin-bottom: 10px !important;
        }
        .lp-cta-button {
          padding: 8px 22px !important;
          background: #ff5722 !important;
          color: #ffffff !important;
          border: none !important;
          border-radius: 6px !important;
          font-size: 14px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
        }

        /* Sidebar Cards */
        .studio-side-card {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 7px !important;
          padding: 14px !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03) !important;
        }
        .studio-side-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .studio-side-title {
          font-size: 13px !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          margin: 0 0 10px 0 !important;
          line-height: 1.2 !important;
        }
        /* Publishing Controls & Post Status Cards */
        .studio-status-live-chip {
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px !important;
          padding: 3px 8px !important;
          border-radius: 9999px !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          letter-spacing: 0.2px !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04) !important;
        }
        .studio-status-live-chip.chip-published {
          background: #ecfdf5 !important;
          color: #065f46 !important;
          border: 1px solid #a7f3d0 !important;
        }
        .studio-status-live-chip.chip-review {
          background: #eff6ff !important;
          color: #1e40af !important;
          border: 1px solid #bfdbfe !important;
        }
        .studio-status-live-chip.chip-draft {
          background: #fffbeb !important;
          color: #92400e !important;
          border: 1px solid #fde68a !important;
        }
        .studio-status-live-chip.chip-archived {
          background: #f1f5f9 !important;
          color: #334155 !important;
          border: 1px solid #cbd5e1 !important;
        }
        .studio-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }
        .chip-published .studio-status-dot {
          background: #10b981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
        }
        .chip-review .studio-status-dot {
          background: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
        }
        .chip-draft .studio-status-dot {
          background: #f59e0b;
          box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.25);
        }
        .chip-archived .studio-status-dot {
          background: #64748b;
          box-shadow: 0 0 0 2px rgba(100, 116, 139, 0.25);
        }

        /* 2x2 Status Selector Grid */
        .studio-status-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
          margin-bottom: 8px;
        }
        .studio-status-card {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding: 8px 9px !important;
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 7px !important;
          cursor: pointer !important;
          transition: all 0.15s ease-in-out !important;
          text-align: left !important;
          position: relative !important;
        }
        .studio-status-card:hover {
          background: #f8fafc !important;
          border-color: #cbd5e1 !important;
          transform: translateY(-1px);
        }
        .status-card-inner {
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
        }
        .status-icon-bubble {
          width: 22px;
          height: 22px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          color: #64748b;
          flex-shrink: 0;
          transition: all 0.15s ease;
        }
        .status-card-name {
          font-size: 11.5px !important;
          font-weight: 600 !important;
          color: #334155 !important;
          white-space: nowrap !important;
        }
        .status-check-badge {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Active Card Variants */
        .studio-status-card.status-published.is-active {
          background: #f0fdf4 !important;
          border: 1.5px solid #16a34a !important;
          box-shadow: 0 2px 5px rgba(22, 163, 74, 0.12) !important;
        }
        .studio-status-card.status-published.is-active .status-card-name {
          color: #15803d !important;
          font-weight: 700 !important;
        }
        .studio-status-card.status-published.is-active .status-icon-bubble {
          background: #dcfce7 !important;
          color: #15803d !important;
        }
        .studio-status-card.status-published.is-active .status-check-badge {
          background: #16a34a;
          color: #ffffff;
        }

        .studio-status-card.status-review.is-active {
          background: #eff6ff !important;
          border: 1.5px solid #2563eb !important;
          box-shadow: 0 2px 5px rgba(37, 99, 235, 0.12) !important;
        }
        .studio-status-card.status-review.is-active .status-card-name {
          color: #1d4ed8 !important;
          font-weight: 700 !important;
        }
        .studio-status-card.status-review.is-active .status-icon-bubble {
          background: #dbeafe !important;
          color: #1d4ed8 !important;
        }
        .studio-status-card.status-review.is-active .status-check-badge {
          background: #2563eb;
          color: #ffffff;
        }

        .studio-status-card.status-draft.is-active {
          background: #fffbeb !important;
          border: 1.5px solid #d97706 !important;
          box-shadow: 0 2px 5px rgba(217, 119, 6, 0.12) !important;
        }
        .studio-status-card.status-draft.is-active .status-card-name {
          color: #b45309 !important;
          font-weight: 700 !important;
        }
        .studio-status-card.status-draft.is-active .status-icon-bubble {
          background: #fef3c7 !important;
          color: #b45309 !important;
        }
        .studio-status-card.status-draft.is-active .status-check-badge {
          background: #d97706;
          color: #ffffff;
        }

        .studio-status-card.status-archived.is-active {
          background: #f8fafc !important;
          border: 1.5px solid #475569 !important;
          box-shadow: 0 2px 5px rgba(71, 85, 105, 0.12) !important;
        }
        .studio-status-card.status-archived.is-active .status-card-name {
          color: #1e293b !important;
          font-weight: 700 !important;
        }
        .studio-status-card.status-archived.is-active .status-icon-bubble {
          background: #e2e8f0 !important;
          color: #334155 !important;
        }
        .studio-status-card.status-archived.is-active .status-check-badge {
          background: #475569;
          color: #ffffff;
        }

        /* Status Explainer Box */
        .studio-status-explainer {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          padding: 8px 10px;
          border-radius: 6px;
          font-size: 11px;
          line-height: 1.45;
          transition: all 0.2s ease;
        }
        .studio-status-explainer.explainer-published {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
        }
        .studio-status-explainer.explainer-review {
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #1e40af;
        }
        .studio-status-explainer.explainer-draft {
          background: #fffbeb;
          border: 1px solid #fde68a;
          color: #92400e;
        }
        .studio-status-explainer.explainer-archived {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #475569;
        }

        /* Schedule Input & Controls */
        .studio-schedule-input {
          width: 100% !important;
          padding: 6px 9px !important;
          font-size: 12px !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 6px !important;
          background: #ffffff !important;
          color: #1e293b !important;
          outline: none !important;
          transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
          box-sizing: border-box !important;
        }
        .studio-schedule-input:focus {
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
        }

        /* Feature on Homepage Card */
        .studio-feature-box {
          display: flex !important;
          align-items: flex-start !important;
          gap: 10px !important;
          padding: 9px 11px !important;
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 7px !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
        }
        .studio-feature-box:hover {
          background: #f1f5f9 !important;
          border-color: #cbd5e1 !important;
        }
        .studio-feature-box.active {
          background: #fffdf5 !important;
          border-color: #fcd34d !important;
          box-shadow: 0 1px 3px rgba(245, 158, 11, 0.08) !important;
        }
        .studio-feature-checkbox {
          width: 16px !important;
          height: 16px !important;
          cursor: pointer !important;
          margin-top: 1px !important;
          accent-color: #f59e0b !important;
        }
        .studio-feature-content {
          flex: 1;
        }
        .studio-feature-title-row {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .studio-feature-title {
          font-size: 12px !important;
          font-weight: 700 !important;
          color: #0f172a !important;
        }
        .studio-featured-star {
          font-size: 11px;
        }
        .studio-feature-desc {
          display: block !important;
          font-size: 10.5px !important;
          color: #64748b !important;
          margin-top: 2px !important;
          line-height: 1.35 !important;
        }

        /* Chapter Outline */
        .studio-outline-count {
          background: #eff6ff !important;
          color: #2563eb !important;
          font-size: 10.5px !important;
          font-weight: 700 !important;
          padding: 1px 6px !important;
          border-radius: 999px !important;
        }
        .studio-outline-list {
          display: flex;
          flex-direction: column;
          gap: 3px;
          max-height: 180px;
          overflow-y: auto;
        }
        .studio-outline-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 6px;
          background: transparent !important;
          border: none !important;
          border-radius: 4px;
          text-align: left;
          cursor: pointer;
          width: 100%;
        }
        .studio-outline-item:hover {
          background: #f1f5f9 !important;
        }
        .studio-outline-num {
          background: #e2e8f0;
          color: #334155;
          font-size: 9.5px !important;
          font-weight: 700 !important;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .studio-outline-text {
          font-size: 11.5px !important;
          color: #334155 !important;
          font-weight: 500 !important;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* SERP */
        .studio-serp-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 5px;
          padding: 8px;
        }
        .studio-serp-site {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }
        .studio-serp-logo {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ea580c;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .studio-serp-brand {
          font-size: 11.5px !important;
          font-weight: 600 !important;
          color: #202124 !important;
        }
        .studio-serp-url {
          font-size: 10px !important;
          color: #4d5156 !important;
          font-family: monospace !important;
        }
        .studio-serp-title {
          color: #1a0dab !important;
          font-size: 13.5px !important;
          font-weight: 500 !important;
          margin: 3px 0 2px 0 !important;
          line-height: 1.25 !important;
        }
        .studio-serp-desc {
          color: #4d5156 !important;
          font-size: 11px !important;
          line-height: 1.35 !important;
        }

        /* Chips */
        .studio-chips-list {
          display: flex;
          flex-wrap: wrap;
          gap: 3px;
          margin-top: 5px;
        }
        .studio-chip {
          padding: 2px 7px !important;
          border-radius: 4px !important;
          font-size: 10.5px !important;
          background: #f1f5f9 !important;
          border: 1px solid #e2e8f0 !important;
          color: #475569 !important;
          cursor: pointer !important;
        }
        .studio-chip.active {
          background: #eff6ff !important;
          border-color: #bfdbfe !important;
          color: #2563eb !important;
          font-weight: 600 !important;
        }
        .studio-tags-preview {
          display: flex;
          flex-wrap: wrap;
          gap: 3px;
          margin-top: 6px;
        }
        .studio-tag-pill {
          background: #f1f5f9;
          color: #0f172a;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 11px !important;
          font-weight: 500;
        }

        /* Recovery Banner */
        .studio-recovery-banner {
          background: #eff6ff;
          border-bottom: 1px solid #bfdbfe;
          padding: 8px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #1e40af;
          font-size: 12.5px;
        }
        .studio-recovery-content {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .studio-recovery-actions {
          display: flex;
          gap: 6px;
        }
        .studio-btn-restore {
          padding: 3px 10px !important;
          background: #2563eb !important;
          color: #fff !important;
          border: none !important;
          border-radius: 4px !important;
          font-size: 11.5px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
        }
        .studio-btn-discard {
          padding: 3px 8px !important;
          background: transparent !important;
          border: 1px solid #93c5fd !important;
          color: #1e40af !important;
          border-radius: 4px !important;
          font-size: 11.5px !important;
          cursor: pointer !important;
        }

        /* Toast */
        .studio-toast {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 99999;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border-radius: 7px;
          font-size: 13px !important;
          font-weight: 600 !important;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }
        .studio-toast-success {
          background: #0f172a !important;
          color: #ffffff !important;
        }
        .studio-toast-error {
          background: #dc2626 !important;
          color: #ffffff !important;
        }

        /* Scheduled Publication Notice */
        .studio-scheduled-notice {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 6px;
          padding: 6px 8px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 5px;
          color: #1e40af;
          font-size: 11px !important;
        }
        .studio-clear-btn {
          margin-left: auto;
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
        }
        .studio-clear-btn:hover {
          color: #ef4444;
        }

        /* Media Library Dropzone Buttons */
        .studio-banner-dropzone-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .studio-dropzone-divider {
          display: flex;
          align-items: center;
          text-align: center;
          color: #94a3b8;
          font-size: 11px;
          font-weight: 700;
        }
        .studio-dropzone-divider::before,
        .studio-dropzone-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #e2e8f0;
        }
        .studio-dropzone-divider span {
          padding: 0 10px;
        }
        .studio-btn-media-library {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          padding: 10px 16px !important;
          background: #ffffff !important;
          border: 1.5px solid #cbd5e1 !important;
          border-radius: 7px !important;
          color: #1e293b !important;
          font-size: 12.5px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
        }
        .studio-btn-media-library:hover {
          background: #f8fafc !important;
          border-color: #94a3b8 !important;
          color: #0f172a !important;
        }
        .studio-btn-library-pill {
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px !important;
          padding: 6px 12px !important;
          background: #f1f5f9 !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 5px !important;
          color: #334155 !important;
          font-size: 11.5px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
        }
        .studio-btn-library-pill:hover {
          background: #e2e8f0 !important;
          color: #0f172a !important;
        }

        /* Focus Keyword & Yoast-Style SEO Checklist */
        .studio-seo-card {
          border-left: 3px solid #2563eb !important;
        }
        .studio-seo-badge {
          font-size: 11px !important;
          font-weight: 700 !important;
          padding: 2px 8px !important;
          border-radius: 999px !important;
        }
        .seo-good {
          background: #dcfce7 !important;
          color: #15803d !important;
        }
        .seo-ok {
          background: #fef9c3 !important;
          color: #854d0e !important;
        }
        .seo-bad {
          background: #fee2e2 !important;
          color: #b91c1c !important;
        }
        .studio-seo-audit-wrap {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
        }
        .studio-density-metric {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 8px 10px;
        }
        .studio-density-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px !important;
          color: #475569 !important;
          margin-bottom: 5px;
        }
        .studio-density-header strong {
          color: #0f172a !important;
        }
        .studio-density-track {
          width: 100%;
          height: 6px;
          background: #e2e8f0;
          border-radius: 999px;
          overflow: hidden;
          margin-bottom: 5px;
        }
        .studio-density-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.25s ease;
        }
        .studio-density-recommendation {
          font-size: 10px !important;
          color: #64748b !important;
          display: block;
        }
        .studio-seo-checklist {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .studio-seo-check-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 11px !important;
          padding: 4px 6px;
          border-radius: 4px;
        }
        .studio-seo-check-item.passed {
          color: #15803d !important;
          background: #f0fdf4;
        }
        .studio-seo-check-item.failed {
          color: #991b1b !important;
          background: #fef2f2;
        }
        .studio-seo-empty-hint {
          font-size: 11px !important;
          color: #64748b !important;
          line-height: 1.4;
          padding: 8px 10px;
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 5px;
          margin-top: 8px;
        }

        /* Internal Links Suggestions */
        .studio-links-suggestions-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: 220px;
          overflow-y: auto;
        }
        .studio-link-suggestion-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 6px 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 5px;
        }
        .studio-link-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .studio-link-topic {
          font-size: 11.5px !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .studio-link-desc {
          font-size: 10px !important;
          color: #64748b !important;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .studio-btn-copy-link {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          padding: 3px 8px !important;
          background: #eff6ff !important;
          border: 1px solid #bfdbfe !important;
          border-radius: 4px !important;
          color: #1d4ed8 !important;
          font-size: 10.5px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          flex-shrink: 0;
        }
        .studio-btn-copy-link:hover {
          background: #dbeafe !important;
        }

        /* Reusable Media Library Modal */
        .studio-media-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          z-index: 99999;
        }
        .studio-media-modal-dialog {
          background: #ffffff;
          border-radius: 12px;
          width: 900px;
          max-width: 95vw;
          max-height: 88vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25);
          border: 1px solid #cbd5e1;
          overflow: hidden;
        }
        .studio-media-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }
        .studio-media-modal-title {
          font-size: 16px !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          margin: 0 !important;
        }
        .studio-media-modal-subtitle {
          font-size: 11.5px !important;
          color: #64748b !important;
          margin: 3px 0 0 0 !important;
        }
        .studio-media-modal-close {
          background: transparent;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
        }
        .studio-media-modal-close:hover {
          background: #e2e8f0;
          color: #0f172a;
        }
        .studio-media-search-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
        }
        .studio-media-search-input {
          flex: 1;
          border: none !important;
          outline: none !important;
          font-size: 13px !important;
          color: #0f172a !important;
        }
        .studio-media-grid-container {
          flex: 1;
          overflow-y: auto;
          padding: 18px 20px;
          min-height: 280px;
        }
        .studio-media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 14px;
        }
        .studio-media-card {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          background: #ffffff;
          transition: all 0.15s ease;
          display: flex;
          flex-direction: column;
        }
        .studio-media-card:hover {
          border-color: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.12);
        }
        .studio-media-thumb-wrap {
          width: 100%;
          height: 120px;
          background: #f1f5f9;
          overflow: hidden;
        }
        .studio-media-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.2s ease;
        }
        .studio-media-card:hover .studio-media-thumb {
          transform: scale(1.04);
        }
        .studio-media-card-caption {
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: #ffffff;
        }
        .studio-media-card-title {
          font-size: 11px !important;
          font-weight: 600 !important;
          color: #1e293b !important;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .studio-media-card-select-hint {
          font-size: 9.5px !important;
          color: #2563eb !important;
          font-weight: 600 !important;
        }
        .studio-media-empty {
          text-align: center;
          padding: 40px 20px;
          color: #64748b;
          font-size: 13px;
        }
        .studio-media-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }
        .studio-media-count-text {
          font-size: 11.5px !important;
          color: #64748b !important;
        }

        /* ⚡ 1-Click AI Importer Modal & Trigger Buttons */
        .studio-btn-ai-topbar {
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px !important;
          padding: 4px 10px !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          background: #f5f3ff !important;
          border: 1px solid #ddd6fe !important;
          color: #7c3aed !important;
          border-radius: 6px !important;
          cursor: pointer !important;
          white-space: nowrap !important;
          transition: all 0.15s ease !important;
        }
        .studio-btn-ai-topbar:hover {
          background: #ede9fe !important;
          border-color: #c4b5fd !important;
          color: #6d28d9 !important;
        }

        .studio-card-ai-btn {
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px !important;
          padding: 3px 9px !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          background: #f5f3ff !important;
          border: 1px solid #ddd6fe !important;
          color: #7c3aed !important;
          border-radius: 5px !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
        }
        .studio-card-ai-btn:hover {
          background: #ede9fe !important;
          border-color: #c4b5fd !important;
          color: #6d28d9 !important;
        }

        .studio-ai-modal-dialog {
          background: #ffffff !important;
          border-radius: 16px !important;
          width: 920px !important;
          max-width: 95vw !important;
          max-height: 88vh !important;
          display: flex !important;
          flex-direction: column !important;
          overflow: hidden !important;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25) !important;
          border: 1px solid #e2e8f0 !important;
          animation: studioModalPopIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .studio-ai-modal-header {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding: 16px 20px !important;
          border-bottom: 1px solid #e2e8f0 !important;
          background: #ffffff !important;
        }
        .studio-ai-modal-icon {
          width: 32px !important;
          height: 32px !important;
          border-radius: 8px !important;
          background: #f5f3ff !important;
          border: 1px solid #ddd6fe !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .studio-ai-modal-title {
          font-size: 15px !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          margin: 0 !important;
        }
        .studio-ai-modal-subtitle {
          font-size: 11.5px !important;
          color: #64748b !important;
          margin: 2px 0 0 0 !important;
        }

        .studio-ai-modal-body {
          display: grid !important;
          grid-template-columns: 1.15fr 0.85fr !important;
          gap: 16px !important;
          padding: 16px 20px !important;
          overflow-y: auto !important;
          flex: 1 !important;
          min-height: 380px !important;
        }

        @media (max-width: 768px) {
          .studio-ai-modal-body {
            grid-template-columns: 1fr !important;
          }
        }

        .studio-ai-input-col {
          display: flex !important;
          flex-direction: column !important;
          gap: 8px !important;
        }
        .studio-ai-input-head {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
        }
        .studio-btn-sample-ai {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          padding: 3px 8px !important;
          font-size: 10.5px !important;
          font-weight: 600 !important;
          background: #f8fafc !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 4px !important;
          color: #475569 !important;
          cursor: pointer !important;
        }
        .studio-btn-sample-ai:hover {
          background: #f1f5f9 !important;
          color: #0f172a !important;
        }

        .studio-ai-textarea {
          flex: 1 !important;
          width: 100% !important;
          min-height: 320px !important;
          border: 1.5px solid #cbd5e1 !important;
          border-radius: 8px !important;
          padding: 12px !important;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace !important;
          font-size: 12px !important;
          line-height: 1.5 !important;
          color: #0f172a !important;
          background: #f8fafc !important;
          resize: vertical !important;
          outline: none !important;
        }
        .studio-ai-textarea:focus {
          border-color: #7c3aed !important;
          background: #ffffff !important;
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1) !important;
        }

        .studio-ai-input-footer {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          font-size: 11px !important;
          color: #64748b !important;
        }

        .studio-ai-preview-col {
          display: flex !important;
          flex-direction: column !important;
          gap: 10px !important;
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 10px !important;
          padding: 14px !important;
          overflow-y: auto !important;
          max-height: 440px !important;
        }
        .studio-ai-preview-head {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding-bottom: 8px !important;
          border-bottom: 1px solid #e2e8f0 !important;
        }

        .studio-ai-detected-list {
          display: flex !important;
          flex-direction: column !important;
          gap: 8px !important;
        }
        .studio-ai-detected-card {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 7px !important;
          padding: 8px 10px !important;
        }
        .studio-ai-prop-label {
          font-size: 9.5px !important;
          font-weight: 700 !important;
          color: #64748b !important;
          letter-spacing: 0.4px !important;
          margin-bottom: 3px !important;
        }
        .studio-ai-prop-val {
          font-size: 12.5px !important;
          font-weight: 600 !important;
          color: #0f172a !important;
        }
        .studio-ai-prop-val.title-val {
          font-size: 13.5px !important;
          color: #0f172a !important;
          font-weight: 700 !important;
          line-height: 1.3 !important;
        }
        .studio-ai-prop-slug {
          font-family: monospace !important;
          font-size: 11px !important;
          color: #2563eb !important;
          margin-top: 3px !important;
        }

        .studio-ai-chapters-list {
          display: flex !important;
          flex-direction: column !important;
          gap: 4px !important;
          margin-top: 6px !important;
          max-height: 150px !important;
          overflow-y: auto !important;
        }
        .studio-ai-chapter-item {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          padding: 4px 6px !important;
          background: #f8fafc !important;
          border-radius: 4px !important;
          font-size: 11.5px !important;
        }
        .studio-ai-ch-num {
          font-weight: 700 !important;
          color: #7c3aed !important;
          font-size: 10.5px !important;
          min-width: 20px !important;
        }
        .studio-ai-ch-name {
          flex: 1 !important;
          font-weight: 600 !important;
          color: #1e293b !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          white-space: nowrap !important;
        }
        .studio-ai-ch-words {
          font-size: 10.5px !important;
          color: #94a3b8 !important;
        }

        .studio-ai-empty-preview {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 40px 10px !important;
          gap: 8px !important;
          height: 100% !important;
        }

        .studio-ai-modal-footer {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding: 12px 20px !important;
          border-top: 1px solid #e2e8f0 !important;
          background: #f8fafc !important;
        }

        .studio-btn-populate-ai {
          display: inline-flex !important;
          align-items: center !important;
          gap: 6px !important;
          padding: 8px 18px !important;
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%) !important;
          color: #ffffff !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          border: none !important;
          border-radius: 7px !important;
          cursor: pointer !important;
          box-shadow: 0 2px 8px rgba(124, 58, 237, 0.25) !important;
          transition: all 0.15s ease !important;
        }
        .studio-btn-populate-ai:hover:not(:disabled) {
          background: linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%) !important;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.35) !important;
          transform: translateY(-1px) !important;
        }
        .studio-btn-populate-ai:disabled {
          opacity: 0.5 !important;
          cursor: not-allowed !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
