'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Code2,
  UploadCloud,
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  HelpCircle,
  X,
  Layers,
  ArrowRight,
  RefreshCw,
  Info,
  Globe,
  Clock,
  Copy,
  Check,
  Tag,
  Folder,
  Search,
  LogOut,
  Edit3,
  Heart,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowUpDown,
  Calendar,
  BookOpen,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  selectBlogs,
  selectBlogsLoading,
} from '@/lib/store/blogSlice';
import { AppDispatch } from '@/lib/store/store';
import SectionRichEditor from '@/components/admin/SectionRichEditor';
import { stripHtmlAndMarkdown } from '@/lib/richTextRenderer';

const ADMIN_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || '').trim();
const ADMIN_PASSWORD = (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '').trim();

const styles = {
  container: {
    maxWidth: '1280px',
    margin: '40px auto',
    padding: '32px',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
    fontFamily: 'Poppins, sans-serif',
  },
  loginBox: {
    maxWidth: '400px',
    margin: '120px auto',
    padding: '32px',
    background: '#f7f7f7',
    borderRadius: '10px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    textAlign: 'center' as const,
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    background: '#1a73e8',
    color: '#fff',
    border: 'none',
    padding: '10px 22px',
    borderRadius: '6px',
    fontWeight: 600,
    fontSize: '16px',
    cursor: 'pointer',
    margin: '10px 0',
    transition: 'background 0.2s',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    marginTop: 10,
    marginBottom: 18,
  },
  toolbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    justifyContent: 'flex-end',
  },
  filtersRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: 8,
    marginBottom: 12,
  },
  inputSm: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
  },
  select: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    background: '#fff',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginTop: '32px',
    fontSize: '15px',
  },
  tableWrap: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
    padding: '12px',
  },
  th: {
    background: '#f2f2f2',
    padding: '12px 8px',
    border: '1px solid #e0e0e0',
    fontWeight: 600,
    position: 'sticky' as const,
    top: 0,
    zIndex: 1,
  },
  td: {
    padding: '10px 8px',
    border: '1px solid #e0e0e0',
    textAlign: 'left' as const,
    verticalAlign: 'middle' as const,
  },
  actionBtn: {
    marginRight: '8px',
    padding: '6px 14px',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 500,
    cursor: 'pointer',
    fontSize: '14px',
  },
  editBtn: {
    background: '#ffd600',
    color: '#333',
  },
  deleteBtn: {
    background: '#e53935',
    color: '#fff',
  },
  formSection: {
    margin: '32px 0',
    padding: '24px',
    background: '#f9f9f9',
    borderRadius: '10px',
  },
  label: {
    display: 'block',
    fontWeight: 500,
    margin: '12px 0 4px 0',
  },
  tagInput: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '15px',
    marginBottom: '8px',
  },
  sectionBox: {
    background: '#fff',
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '18px',
  },
  addSectionBtn: {
    background: '#43a047',
    color: '#fff',
    border: 'none',
    padding: '7px 18px',
    borderRadius: '6px',
    fontWeight: 500,
    fontSize: '15px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  removeSectionBtn: {
    background: '#e53935',
    color: '#fff',
    border: 'none',
    padding: '5px 12px',
    borderRadius: '5px',
    fontWeight: 500,
    fontSize: '13px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  actionsRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  fullWidthButton: {
    width: '100%',
  },
  primaryCTA: {
    width: 'auto',
    padding: '14px 24px',
    borderRadius: '10px',
    fontSize: '17px',
    whiteSpace: 'nowrap' as const,
    minWidth: 240,
  },
  logoutBtn: {
    background: '#e53935',
    color: '#fff',
    border: 'none',
    padding: '7px 18px',
    borderRadius: '6px',
    fontWeight: 500,
    fontSize: '15px',
    cursor: 'pointer',
    float: 'right' as const,
    marginTop: '-10px',
    marginBottom: '10px',
  }
};

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  width?: string | number;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

function Modal({ isOpen, title, onClose, width = 940, children, footer }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        zIndex: 1000,
      }}
      role="dialog"
      aria-modal
    >
      <div
        id="admin-modal-container"
        style={{
          width: typeof width === 'number' ? width : width,
          maxWidth: '96vw',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          borderRadius: 16,
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          fontFamily: 'var(--font-poppins), sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderBottom: '1px solid #f1f5f9',
            background: '#ffffff',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileText size={18} />
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: '17px',
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1.2,
                fontFamily: 'var(--font-poppins), sans-serif',
              }}
            >
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '8px',
              color: '#64748b',
              cursor: 'pointer',
              padding: '6px 12px',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'background 0.15s ease',
            }}
          >
            <X size={15} />
            <span>Close</span>
          </button>
        </div>
        <div style={{ overflowY: 'auto', padding: '24px', flex: 1 }}>{children}</div>
        {footer && (
          <div style={{ padding: '14px 24px', borderTop: '1px solid #f1f5f9', background: '#fafafa', flexShrink: 0 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

type Toast = { id: string; message: string; type?: 'success' | 'error' | 'info' };

function Toasts({ toasts, remove }: { toasts: Toast[]; remove: (id: string) => void }) {
  if (!toasts.length) return null;
  return (
    <div style={{ position: 'fixed', top: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 1100 }}>
      {toasts.map(t => (
        <div
          key={t.id}
          style={{
            minWidth: 240,
            maxWidth: 360,
            background: t.type === 'error' ? '#fdecea' : t.type === 'success' ? '#e8f5e9' : '#e3f2fd',
            color: '#111',
            borderLeft: `4px solid ${t.type === 'error' ? '#e53935' : t.type === 'success' ? '#43a047' : '#1a73e8'}`,
            borderRadius: 8,
            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
            padding: '10px 12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 14 }}>{t.message}</span>
            <button onClick={() => remove(t.id)} style={{ ...styles.button, background: 'transparent', color: '#333', padding: '4px 8px' }}>✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}

type BlogSection = {
  heading: string;
  content: string;
  image: File | null;
  imagePreview: string;
  existingImageUrl: string;
};

type BlogFormProps = {
  onSubmit: (formData: FormData, jsonMode?: boolean, jsonData?: any) => void;
  initial?: any;
  loading: boolean;
  onCancel?: () => void;
};

const SUGGESTED_CATEGORIES = [
  'Operational Excellence',
  'Industry 4.0 & Smart Factory',
  'Automation & Robotics',
  'Lean Manufacturing',
  'Quality & Safety Management',
  'Supply Chain & Warehousing'
];

function BlogForm({ onSubmit, initial, loading, onCancel }: BlogFormProps) {
  // Tab switcher: Default to Standard Editor for Marketing & Content creators
  const [activeTab, setActiveTab] = useState<'editor' | 'json'>('editor');

  // State for form fields
  const [title, setTitle] = useState<string>(initial?.title || '');
  const [slug, setSlug] = useState<string>(initial?.slug || '');
  const [isSlugLocked, setIsSlugLocked] = useState<boolean>(!initial?.slug);
  const [category, setCategory] = useState<string>(initial?.category || '');
  const [metaDescription, setMetaDescription] = useState<string>(initial?.metaDescription || '');
  const [status, setStatus] = useState<string>(initial?.status || 'draft');
  const [featured, setFeatured] = useState<boolean>(initial?.featured || false);
  const [tags, setTags] = useState<string>(initial?.tags?.join(', ') || '');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>(initial?.image?.url || '');
  const [mainImageAlt, setMainImageAlt] = useState<string>(initial?.image?.alt || '');
  const [copiedSlug, setCopiedSlug] = useState<boolean>(false);

  const [sections, setSections] = useState<BlogSection[]>(
    initial?.sections?.length
      ? initial.sections.map((sec: any) => ({
        heading: sec.heading || '',
        content: Array.isArray(sec.content) ? sec.content.join('\n') : (sec.content || ''),
        image: null,
        imagePreview: sec.image?.url || '',
        existingImageUrl: sec.image?.url || '',
      }))
      : [
        { heading: '', content: '', image: null, imagePreview: '', existingImageUrl: '' }
      ]
  );
  const [ctaButtonText, setCtaButtonText] = useState<string>(initial?.cta?.buttonText || '');
  const [ctaText, setCtaText] = useState<string>(initial?.cta?.text || '');

  // For JSON upload
  const [jsonFile, setJsonFile] = useState<File | null>(null);
  const [jsonError, setJsonError] = useState<string>('');
  const [jsonPreview, setJsonPreview] = useState<string>('');
  const [jsonParsed, setJsonParsed] = useState<any>(null);

  // Real-time Content Metrics for Marketers
  const totalWords = React.useMemo(() => {
    let text = (title || '') + ' ' + (metaDescription || '');
    sections.forEach(s => {
      text += ' ' + (s.heading || '') + ' ' + stripHtmlAndMarkdown(s.content || '');
    });
    return text.trim().split(/\s+/).filter(Boolean).length;
  }, [title, metaDescription, sections]);

  const readTimeMinutes = Math.max(1, Math.ceil(totalWords / 200));

  // Auto-slugify
  const handleTitleChange = (val: string) => {
    setTitle(val);
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

  // Copy URL Helper
  const handleCopyUrl = () => {
    if (typeof window !== 'undefined' && slug) {
      const cleanSlug = slug.replace(/^\/+/, '');
      navigator.clipboard.writeText(`https://tetrahedron.in/${cleanSlug}`);
      setCopiedSlug(true);
      setTimeout(() => setCopiedSlug(false), 2000);
    }
  };

  // Main image preview
  useEffect(() => {
    if (mainImage) {
      const url = URL.createObjectURL(mainImage);
      setMainImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [mainImage]);

  // Section image preview
  const handleSectionImage = (idx: number, file: File | null) => {
    setSections(secs =>
      secs.map((sec, i) =>
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

  const handleSectionChange = (idx: number, field: keyof BlogSection, value: string) => {
    setSections(secs =>
      secs.map((sec, i) =>
        i === idx ? { ...sec, [field]: value } : sec
      )
    );
  };

  const addSection = () => {
    setSections(secs => [
      ...secs,
      { heading: '', content: '', image: null, imagePreview: '', existingImageUrl: '' }
    ]);
  };

  const removeSection = (idx: number) => {
    setSections(secs => secs.filter((_, i) => i !== idx));
  };

  // Handle JSON file upload
  const handleJsonFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJsonError('');
    setJsonPreview('');
    setJsonParsed(null);
    const file = e.target.files && e.target.files[0];
    setJsonFile(file || null);
    if (file) {
      if (!file.name.toLowerCase().endsWith('.json')) {
        setJsonError('⚠️ Please select a valid .json data file (e.g. blog.json). If you want to upload blog pictures or banners, switch to the "Standard Blog Editor" tab.');
        return;
      }
      const reader = new FileReader();
      reader.onload = evt => {
        try {
          const json = JSON.parse(evt?.target?.result as string);
          setJsonPreview(JSON.stringify(json, null, 2));
          setJsonParsed(json);
        } catch (err) {
          setJsonError('Invalid JSON structure. Please check for missing quotes or brackets.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, overrideStatus?: string) => {
    e.preventDefault();

    if (activeTab === 'json') {
      if (!jsonFile || !jsonParsed) {
        setJsonError('Please select a valid .json file before importing.');
        return;
      }
      onSubmit(new FormData(), true, jsonParsed);
      return;
    }

    if (!title.trim()) {
      alert('Please enter a Blog Title.');
      return;
    }
    if (!slug.trim()) {
      alert('Please enter a Blog Slug/URL.');
      return;
    }

    const currentStatus = overrideStatus || status;

    const formData = new FormData();
    const blogData = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim(),
      metaDescription: metaDescription.trim(),
      status: currentStatus,
      featured,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      sections: sections.map(sec => ({
        heading: sec.heading.trim(),
        content: sec.content.split('\n').map(line => line.trim()).filter(Boolean),
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
    } else if (mainImagePreview && initial?.image?.url) {
      formData.append('mainImageUrl', initial.image.url);
    }

    sections.forEach((sec, idx) => {
      if (sec.image) {
        formData.append(`sectionImage_${idx}`, sec.image);
      } else if (sec.existingImageUrl) {
        formData.append(`sectionImageUrl_${idx}`, sec.existingImageUrl);
      }
    });

    onSubmit(formData, false, null);
  };

  return (
    <form id="admin-blog-editor-wrap" onSubmit={e => handleSubmit(e)}>
      {/* CMS Top Header Bar */}
      <div className="adm-cms-topbar">
        <div className="adm-tab-switcher">
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`adm-tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
          >
            <FileText size={16} />
            <span>Standard Composer</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('json')}
            className={`adm-tab-btn ${activeTab === 'json' ? 'active' : ''}`}
          >
            <Code2 size={16} />
            <span>Developer / Bulk JSON</span>
          </button>
        </div>

        {activeTab === 'editor' && (
          <div className="adm-cms-metrics">
            <span className="adm-metric-chip">
              <Clock size={13} />
              <strong>{readTimeMinutes} min</strong> read
            </span>
            <span className="adm-metric-chip">
              <FileText size={13} />
              <strong>{totalWords}</strong> words
            </span>
            <span className="adm-metric-chip">
              <Layers size={13} />
              <strong>{sections.length}</strong> {sections.length === 1 ? 'section' : 'sections'}
            </span>
          </div>
        )}

        <div className="adm-cms-top-actions">
          {onCancel && (
            <button type="button" onClick={onCancel} className="adm-btn-subtle">
              Cancel
            </button>
          )}
          {activeTab === 'editor' && (
            <button
              type="button"
              disabled={loading}
              onClick={e => handleSubmit(e as any, 'draft')}
              className="adm-btn-draft"
            >
              Save Draft
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="adm-btn-primary"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="adm-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                <span>
                  {activeTab === 'json'
                    ? 'Import JSON Blogs'
                    : initial
                      ? 'Update Blog'
                      : status === 'published'
                        ? 'Publish Blog'
                        : 'Create Blog'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'editor' ? (
        <div className="adm-cms-grid">
          {/* LEFT COLUMN: Main Writing Canvas */}
          <div className="adm-cms-main-col">
            {/* Title & URL Box */}
            <div className="adm-panel">
              <div className="adm-field-group" style={{ marginBottom: 12 }}>
                <label className="adm-field-label">
                  Blog Title <span className="adm-req">*</span>
                </label>
                <input
                  className="adm-title-input"
                  placeholder="Enter a high-impact, SEO-friendly headline..."
                  value={title}
                  onChange={e => handleTitleChange(e.target.value)}
                  required
                />
              </div>

              {/* Permalink URL Bar */}
              <div className="adm-permalink-box">
                <div className="adm-permalink-left">
                  <Globe size={14} className="adm-permalink-icon" />
                  <span className="adm-permalink-prefix">https://tetrahedron.in/</span>
                  <input
                    className="adm-permalink-input"
                    placeholder="article-slug"
                    value={slug}
                    onChange={e => {
                      setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                      setIsSlugLocked(false);
                    }}
                    required
                  />
                </div>
                <div className="adm-permalink-actions">
                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    className="adm-permalink-btn"
                    title="Copy full blog URL"
                  >
                    {copiedSlug ? (
                      <>
                        <Check size={13} style={{ color: '#16a34a' }} />
                        <span style={{ color: '#16a34a' }}>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!isSlugLocked) {
                        const auto = title
                          .toLowerCase()
                          .trim()
                          .replace(/[^a-z0-9\s-]/g, '')
                          .replace(/[\s-]+/g, '-')
                          .replace(/^-+|-+$/g, '');
                        setSlug(auto);
                      }
                      setIsSlugLocked(!isSlugLocked);
                    }}
                    className={`adm-permalink-btn ${isSlugLocked ? 'active' : ''}`}
                    title={isSlugLocked ? 'URL is auto-synced with title. Click to manually customize.' : 'URL is manually edited. Click to auto-generate from title.'}
                  >
                    {isSlugLocked ? '🔒 Auto-Sync' : '✏️ Custom'}
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Hero Banner */}
            <div className="adm-panel">
              <div className="adm-panel-head">
                <div>
                  <h4 className="adm-panel-title">Featured Hero Banner (Cover Image)</h4>
                  <p className="adm-panel-sub">
                    The primary visual shown on blog lists, LinkedIn/Twitter share cards, and top banner
                  </p>
                </div>
                <span className="adm-badge-blue">1200 × 800 px (16:9)</span>
              </div>

              {mainImagePreview ? (
                <div className="adm-cover-preview-card">
                  <img src={mainImagePreview} alt="Blog Banner" className="adm-cover-img" />
                  <div className="adm-cover-details">
                    <div className="adm-cover-file">
                      <strong>{mainImage ? mainImage.name : 'Current Cloudinary Banner'}</strong>
                      <span>{mainImage ? `${(mainImage.size / 1024).toFixed(1)} KB` : 'Hosted Asset'}</span>
                    </div>

                    <div className="adm-field-group" style={{ marginTop: 8, marginBottom: 8 }}>
                      <label className="adm-field-label-sm">Image Alt Text (SEO & Google Image Search)</label>
                      <input
                        className="adm-input-sm"
                        placeholder="e.g. Automated warehouse with AGV robots and factory workers"
                        value={mainImageAlt}
                        onChange={e => setMainImageAlt(e.target.value)}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => { setMainImage(null); setMainImagePreview(''); }}
                      className="adm-btn-danger-sm"
                    >
                      <Trash2 size={13} />
                      <span>Remove / Replace Banner Image</span>
                    </button>
                  </div>
                </div>
              ) : (
                <label className="adm-dropzone-large">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    style={{ display: 'none' }}
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setMainImage(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="adm-dropzone-icon-circle">
                    <UploadCloud size={26} />
                  </div>
                  <div className="adm-dropzone-text-primary">
                    Click to browse or drag & drop high-res banner
                  </div>
                  <div className="adm-dropzone-text-secondary">
                    Supported: JPG, PNG, WebP · Max 5MB · Recommended: 1200 × 800 px
                  </div>
                </label>
              )}
            </div>

            {/* Content Sections Builder */}
            <div className="adm-panel">
              <div className="adm-panel-head">
                <div>
                  <h4 className="adm-panel-title">Article Sections & Body</h4>
                  <p className="adm-panel-sub">
                    Structure the article with distinct chapters, body paragraphs, and graphics
                  </p>
                </div>
              </div>

              <div className="adm-sections-list">
                {sections.map((sec, idx) => (
                  <div key={idx} className="adm-section-block">
                    <div className="adm-section-block-head">
                      <div className="adm-section-badge">
                        <span>Chapter #{idx + 1}</span>
                      </div>
                      {sections.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSection(idx)}
                          className="adm-btn-delete-section"
                          title="Delete this chapter"
                        >
                          <Trash2 size={13} />
                          <span>Delete Chapter</span>
                        </button>
                      )}
                    </div>

                    <div className="adm-field-group">
                      <label className="adm-field-label">
                        Section Heading (H2) <span className="adm-req">*</span>
                      </label>
                      <input
                        className="adm-input"
                        placeholder="e.g. 1. Eliminating Waste with Value Stream Mapping"
                        value={sec.heading}
                        onChange={e => handleSectionChange(idx, 'heading', e.target.value)}
                        required
                      />
                    </div>

                    <div className="adm-field-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <label className="adm-field-label" style={{ marginBottom: 0 }}>
                          Section Body Content <span className="adm-req">*</span>
                        </label>
                        <span className="adm-hint">Highlight words and press Ctrl+K to add link</span>
                      </div>
                      <SectionRichEditor
                        value={sec.content}
                        onChange={val => handleSectionChange(idx, 'content', val)}
                        sectionIndex={idx}
                        placeholder="Write the explanation, case study details, or step-by-step guidance. Highlight words and press Ctrl+K to add hyperlinks..."
                      />
                    </div>

                    {/* Section Image */}
                    <div className="adm-field-group" style={{ marginBottom: 0 }}>
                      <label className="adm-field-label-sm">
                        Section Graphic / Illustration (Optional)
                      </label>

                      {sec.imagePreview ? (
                        <div className="adm-section-img-preview">
                          <img src={sec.imagePreview} alt="Section" className="adm-section-thumb" />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>
                              {sec.image ? sec.image.name : 'Attached Section Graphic'}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleSectionImage(idx, null)}
                              className="adm-btn-danger-xs"
                            >
                              <Trash2 size={12} />
                              <span>Remove Graphic</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label className="adm-section-dropzone">
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
                          <ImageIcon size={16} />
                          <span>+ Add Section Graphic (Recommended: 800 × 600 px)</span>
                        </label>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addSection}
                  className="adm-btn-add-block"
                >
                  <Plus size={16} />
                  <span>+ Add Another Content Chapter</span>
                </button>
              </div>
            </div>

            {/* Conversion / Call To Action (CTA) Block */}
            <div className="adm-panel adm-cta-panel">
              <div className="adm-panel-head" style={{ borderBottom: 'none', marginBottom: 12 }}>
                <div>
                  <h4 className="adm-panel-title" style={{ color: '#0369a1' }}>
                    🎯 Lead Generation & Call To Action (CTA)
                  </h4>
                  <p className="adm-panel-sub" style={{ color: '#0284c7' }}>
                    Capture high-intent manufacturing leads at the bottom of the article
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 14 }}>
                <div>
                  <label className="adm-field-label">CTA Button Text</label>
                  <input
                    className="adm-input"
                    placeholder="e.g. Request a Plant Assessment"
                    value={ctaButtonText}
                    onChange={e => setCtaButtonText(e.target.value)}
                  />
                </div>
                <div>
                  <label className="adm-field-label">Supporting CTA Pitch</label>
                  <input
                    className="adm-input"
                    placeholder="e.g. Looking to improve factory throughput? Talk to our manufacturing engineers."
                    value={ctaText}
                    onChange={e => setCtaText(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10, marginTop: 4 }}>
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="adm-btn-subtle"
                  style={{ padding: '9px 18px', fontSize: 13.5 }}
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                disabled={loading}
                onClick={e => handleSubmit(e as any, 'draft')}
                className="adm-btn-draft"
                style={{ padding: '9px 18px', fontSize: 13.5 }}
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={loading}
                className="adm-btn-primary"
                style={{ padding: '9px 24px', fontSize: 13.5 }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="adm-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>{initial ? 'Update Blog' : 'Create Blog'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Marketing, SEO & Publishing Sidebar */}
          <div className="adm-cms-side-col">
            {/* 1. Publishing & Status Card */}
            <div className="adm-panel">
              <h4 className="adm-panel-title" style={{ marginBottom: 12 }}>
                Publishing Controls
              </h4>

              <div className="adm-field-group">
                <label className="adm-field-label">Post Status</label>
                <div className="adm-status-pills">
                  <button
                    type="button"
                    onClick={() => setStatus('draft')}
                    className={`adm-pill ${status === 'draft' ? 'active-draft' : ''}`}
                  >
                    Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('published')}
                    className={`adm-pill ${status === 'published' ? 'active-published' : ''}`}
                  >
                    Published
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('archived')}
                    className={`adm-pill ${status === 'archived' ? 'active-archived' : ''}`}
                  >
                    Archived
                  </button>
                </div>
              </div>

              <div className="adm-field-group" style={{ marginBottom: 0 }}>
                <label className={`adm-featured-card ${featured ? 'active' : ''}`}>
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={e => setFeatured(e.target.checked)}
                    style={{ width: 16, height: 16, cursor: 'pointer' }}
                  />
                  <div>
                    <span className="adm-featured-title">⭐ Feature on Homepage</span>
                    <span className="adm-featured-desc">Pin to top hero slider and carousel</span>
                  </div>
                </label>
              </div>
            </div>

            {/* 2. Google SERP Snippet Simulator (Interactive SEO Preview) */}
            <div className="adm-panel">
              <div className="adm-panel-head" style={{ marginBottom: 10, paddingBottom: 8 }}>
                <div>
                  <h4 className="adm-panel-title">Google SERP Snippet</h4>
                  <p className="adm-panel-sub">Live search engine result preview</p>
                </div>
              </div>

              {/* SERP Card Simulator */}
              <div className="adm-serp-simulator">
                <div className="adm-serp-site-row">
                  <div className="adm-serp-fav">T</div>
                  <div className="adm-serp-meta">
                    <span className="adm-serp-site">Tetrahedron</span>
                    <span className="adm-serp-link">https://tetrahedron.in › {(slug || 'article-slug').replace(/^\/+/, '')}</span>
                  </div>
                </div>
                <h5 className="adm-serp-heading">
                  {title ? (title.length > 60 ? title.substring(0, 58) + '...' : title) : 'Your Article Title - Tetrahedron'}
                </h5>
                <p className="adm-serp-snippet">
                  {metaDescription
                    ? (metaDescription.length > 155 ? metaDescription.substring(0, 152) + '...' : metaDescription)
                    : 'Write an SEO meta description below to preview how search engines will present this article to users.'}
                </p>
              </div>

              {/* Meta Description Editor */}
              <div className="adm-field-group" style={{ marginTop: 14, marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <label className="adm-field-label" style={{ marginBottom: 0 }}>SEO Meta Description</label>
                  <span style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: metaDescription.length === 0
                      ? '#64748b'
                      : metaDescription.length > 160
                        ? '#ef4444'
                        : metaDescription.length >= 120
                          ? '#16a34a'
                          : '#d97706'
                  }}>
                    {metaDescription.length} / 160
                    {metaDescription.length >= 120 && metaDescription.length <= 160 && ' · ✓ Ideal'}
                    {metaDescription.length > 160 && ' · ⚠️ Truncated'}
                  </span>
                </div>
                <textarea
                  className="adm-textarea"
                  rows={3}
                  placeholder="Summarize the article in 1-2 compelling sentences with target keywords..."
                  value={metaDescription}
                  onChange={e => setMetaDescription(e.target.value)}
                />
              </div>
            </div>

            {/* 3. Taxonomy & Categorization Card */}
            <div className="adm-panel">
              <h4 className="adm-panel-title" style={{ marginBottom: 12 }}>
                Topic & Categories
              </h4>

              <div className="adm-field-group">
                <label className="adm-field-label">Category</label>
                <input
                  className="adm-input"
                  placeholder="e.g. Operational Excellence"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                />

                {/* 1-Click Suggestions */}
                <div style={{ marginTop: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>
                    QUICK SUGGESTIONS:
                  </span>
                  <div className="adm-quick-pills">
                    {SUGGESTED_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`adm-quick-pill ${category === cat ? 'selected' : ''}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="adm-field-group" style={{ marginBottom: 0 }}>
                <label className="adm-field-label">Tags (comma separated)</label>
                <input
                  className="adm-input"
                  placeholder="e.g. lean, industry 4.0, kaizen, oee"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                />
                {tags && (
                  <div className="adm-tag-chips">
                    {tags.split(',').map(t => t.trim()).filter(Boolean).map((t, idx) => (
                      <span key={idx} className="adm-tag-chip">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Bulk JSON Import View */
        <div className="adm-panel" style={{ maxWidth: 800, margin: '20px auto' }}>
          <div className="adm-json-warning-banner">
            <AlertCircle size={24} style={{ flexShrink: 0, color: '#b45309' }} />
            <div>
              <strong style={{ display: 'block', fontSize: 14.5, color: '#92400e', marginBottom: 4 }}>
                Developer Bulk Migration Tool (.json only)
              </strong>
              <p style={{ fontSize: 13, color: '#78350f', margin: 0, lineHeight: 1.5 }}>
                This tool is reserved for bulk database updates using formatted <code>.json</code> files (e.g. <code>blog.json</code>).
              </p>
              <div style={{ marginTop: 8, padding: '6px 10px', background: '#fee2e2', borderRadius: 6, color: '#991b1b', fontSize: 12.5, fontWeight: 600 }}>
                🚨 IMPORTANT: Do NOT upload images (.jpg, .png, .webp) here. To write blogs or upload images, switch to the <strong>Standard Composer</strong> tab above.
              </div>
            </div>
          </div>

          <label className="adm-dropzone-large">
            <input
              type="file"
              accept=".json,application/json"
              style={{ display: 'none' }}
              onChange={handleJsonFileChange}
            />
            <div className="adm-dropzone-icon-circle" style={{ background: '#fef3c7', color: '#d97706' }}>
              <Code2 size={26} />
            </div>
            <div className="adm-dropzone-text-primary">
              {jsonFile ? `Selected: ${jsonFile.name}` : 'Click to select structured .json file'}
            </div>
            <div className="adm-dropzone-text-secondary">
              Parses batch blog arrays or slug-mapped documents
            </div>
          </label>

          {jsonError && (
            <div className="adm-json-error-banner">
              <AlertCircle size={16} />
              <span>{jsonError}</span>
            </div>
          )}

          {jsonPreview && (
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#334155' }}>JSON Structure Preview</span>
                <span className="adm-badge-blue">✓ Valid JSON Format</span>
              </div>
              <pre className="adm-json-code-box">{jsonPreview}</pre>
            </div>
          )}
        </div>
      )}

      {/* Scoped CSS to completely shield from app/global.css */}
      <style jsx>{`
        #admin-blog-editor-wrap {
          font-family: var(--font-poppins), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          color: #0f172a !important;
        }

        .adm-cms-topbar {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 14px !important;
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 12px !important;
          padding: 8px 14px !important;
          margin-bottom: 20px !important;
          flex-wrap: wrap !important;
        }

        .adm-tab-switcher {
          display: flex !important;
          background: #e2e8f0 !important;
          padding: 3px !important;
          border-radius: 8px !important;
          gap: 4px !important;
        }

        .adm-tab-btn {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          padding: 6px 14px !important;
          border-radius: 6px !important;
          border: none !important;
          background: transparent !important;
          color: #475569 !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
        }

        .adm-tab-btn.active {
          background: #ffffff !important;
          color: #0f172a !important;
          box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08) !important;
        }

        .adm-cms-metrics {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }

        .adm-metric-chip {
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px !important;
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          padding: 4px 10px !important;
          border-radius: 6px !important;
          font-size: 12px !important;
          color: #475569 !important;
        }

        .adm-cms-top-actions {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          margin-left: auto !important;
        }

        .adm-btn-subtle {
          background: transparent !important;
          border: 1px solid #cbd5e1 !important;
          color: #475569 !important;
          border-radius: 8px !important;
          padding: 7px 14px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: background 0.15s ease !important;
        }

        .adm-btn-subtle:hover {
          background: #e2e8f0 !important;
        }

        .adm-btn-draft {
          background: #f1f5f9 !important;
          border: 1px solid #cbd5e1 !important;
          color: #0f172a !important;
          border-radius: 8px !important;
          padding: 7px 14px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
        }

        .adm-btn-draft:hover {
          background: #e2e8f0 !important;
        }

        .adm-btn-primary {
          background: #0f172a !important;
          color: #ffffff !important;
          border: none !important;
          border-radius: 8px !important;
          padding: 7px 18px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 6px !important;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.18) !important;
          transition: background 0.15s ease !important;
        }

        .adm-btn-primary:hover:not(:disabled) {
          background: #1e293b !important;
        }

        .adm-btn-primary:disabled {
          opacity: 0.7 !important;
          cursor: not-allowed !important;
        }

        /* 2-Column Grid Layout */
        .adm-cms-grid {
          display: grid !important;
          grid-template-columns: 1fr 350px !important;
          gap: 20px !important;
          align-items: start !important;
        }

        @media (max-width: 900px) {
          .adm-cms-grid {
            grid-template-columns: 1fr !important;
          }
        }

        .adm-cms-main-col {
          display: flex !important;
          flex-direction: column !important;
          gap: 18px !important;
        }

        .adm-cms-side-col {
          display: flex !important;
          flex-direction: column !important;
          gap: 18px !important;
          position: sticky !important;
          top: 10px !important;
        }

        /* Panels */
        .adm-panel {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 12px !important;
          padding: 18px !important;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.02) !important;
        }

        .adm-panel-head {
          display: flex !important;
          justify-content: space-between !important;
          align-items: flex-start !important;
          margin-bottom: 14px !important;
          padding-bottom: 10px !important;
          border-bottom: 1px solid #f1f5f9 !important;
        }

        .adm-panel-title {
          font-family: var(--font-poppins), sans-serif !important;
          font-size: 14.5px !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          margin: 0 !important;
          line-height: 1.25 !important;
        }

        .adm-panel-sub {
          font-family: var(--font-poppins), sans-serif !important;
          font-size: 11.5px !important;
          color: #64748b !important;
          margin: 2px 0 0 0 !important;
          line-height: 1.4 !important;
        }

        .adm-badge-blue {
          font-size: 11px !important;
          font-weight: 600 !important;
          color: #1d4ed8 !important;
          background: #eff6ff !important;
          border: 1px solid #bfdbfe !important;
          padding: 2px 8px !important;
          border-radius: 4px !important;
        }

        /* Title Input */
        .adm-title-input {
          width: 100% !important;
          height: 48px !important;
          font-size: 18px !important;
          font-weight: 700 !important;
          font-family: var(--font-poppins), sans-serif !important;
          color: #0f172a !important;
          border: 1.5px solid #cbd5e1 !important;
          border-radius: 10px !important;
          padding: 0 14px !important;
          outline: none !important;
          box-sizing: border-box !important;
          transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
        }

        .adm-title-input:focus {
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12) !important;
        }

        /* Permalink Bar */
        .adm-permalink-box {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 8px !important;
          padding: 4px 8px !important;
          gap: 8px !important;
          flex-wrap: wrap !important;
        }

        .adm-permalink-left {
          display: flex !important;
          align-items: center !important;
          gap: 4px !important;
          flex: 1 !important;
          min-width: 260px !important;
        }

        .adm-permalink-icon {
          color: #64748b !important;
          flex-shrink: 0 !important;
        }

        .adm-permalink-prefix {
          font-size: 12px !important;
          font-weight: 600 !important;
          color: #64748b !important;
        }

        .adm-permalink-input {
          border: none !important;
          background: transparent !important;
          font-size: 12.5px !important;
          font-weight: 600 !important;
          color: #2563eb !important;
          outline: none !important;
          flex: 1 !important;
          padding: 2px 4px !important;
          font-family: var(--font-poppins), sans-serif !important;
        }

        .adm-permalink-actions {
          display: flex !important;
          gap: 6px !important;
        }

        .adm-permalink-btn {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          background: #ffffff !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 6px !important;
          padding: 3px 8px !important;
          font-size: 11.5px !important;
          font-weight: 600 !important;
          color: #475569 !important;
          cursor: pointer !important;
        }

        .adm-permalink-btn.active {
          background: #eff6ff !important;
          border-color: #bfdbfe !important;
          color: #1d4ed8 !important;
        }

        /* Large Dropzone */
        .adm-dropzone-large {
          display: block !important;
          border: 2px dashed #cbd5e1 !important;
          border-radius: 10px !important;
          padding: 28px 16px !important;
          text-align: center !important;
          cursor: pointer !important;
          background: #f8fafc !important;
          transition: all 0.15s ease !important;
        }

        .adm-dropzone-large:hover {
          border-color: #2563eb !important;
          background: #eff6ff !important;
        }

        .adm-dropzone-icon-circle {
          width: 50px !important;
          height: 50px !important;
          border-radius: 12px !important;
          background: #e2e8f0 !important;
          color: #2563eb !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .adm-dropzone-text-primary {
          font-weight: 600 !important;
          font-size: 14px !important;
          color: #0f172a !important;
          margin-top: 10px !important;
        }

        .adm-dropzone-text-secondary {
          font-size: 12px !important;
          color: #64748b !important;
          margin-top: 3px !important;
        }

        /* Cover Preview Card */
        .adm-cover-preview-card {
          display: flex !important;
          gap: 16px !important;
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 10px !important;
          padding: 14px !important;
          align-items: flex-start !important;
        }

        .adm-cover-img {
          width: 160px !important;
          height: 105px !important;
          object-fit: cover !important;
          border-radius: 8px !important;
          border: 1px solid #cbd5e1 !important;
          flex-shrink: 0 !important;
        }

        .adm-cover-details {
          flex: 1 !important;
        }

        .adm-cover-file {
          display: flex !important;
          justify-content: space-between !important;
          font-size: 13px !important;
          color: #0f172a !important;
        }

        .adm-cover-file span {
          color: #64748b !important;
          font-size: 12px !important;
        }

        .adm-btn-danger-sm {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          background: #fee2e2 !important;
          color: #dc2626 !important;
          border: 1px solid #fecaca !important;
          border-radius: 6px !important;
          padding: 5px 10px !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: background 0.15s ease !important;
        }

        .adm-btn-danger-sm:hover {
          background: #fecaca !important;
        }

        /* Content Sections */
        .adm-sections-list {
          display: flex !important;
          flex-direction: column !important;
          gap: 14px !important;
        }

        .adm-section-block {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 10px !important;
          padding: 16px !important;
        }

        .adm-section-block-head {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          margin-bottom: 12px !important;
        }

        .adm-section-badge {
          background: #0f172a !important;
          color: #ffffff !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          padding: 2px 8px !important;
          border-radius: 4px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
        }

        .adm-btn-delete-section {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          background: transparent !important;
          border: none !important;
          color: #ef4444 !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
        }

        .adm-section-dropzone {
          display: inline-flex !important;
          align-items: center !important;
          gap: 6px !important;
          background: #ffffff !important;
          border: 1.5px dashed #bfdbfe !important;
          border-radius: 6px !important;
          padding: 8px 14px !important;
          font-size: 12.5px !important;
          font-weight: 600 !important;
          color: #2563eb !important;
          cursor: pointer !important;
        }

        .adm-section-dropzone:hover {
          background: #eff6ff !important;
        }

        .adm-section-img-preview {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 8px !important;
          padding: 8px !important;
        }

        .adm-section-thumb {
          width: 70px !important;
          height: 50px !important;
          object-fit: cover !important;
          border-radius: 6px !important;
          border: 1px solid #cbd5e1 !important;
        }

        .adm-btn-danger-xs {
          display: inline-flex !important;
          align-items: center !important;
          gap: 3px !important;
          background: #fee2e2 !important;
          color: #dc2626 !important;
          border: none !important;
          border-radius: 4px !important;
          padding: 3px 8px !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          margin-top: 4px !important;
        }

        .adm-btn-add-block {
          width: 100% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
          background: #eff6ff !important;
          border: 1.5px dashed #93c5fd !important;
          color: #2563eb !important;
          border-radius: 10px !important;
          padding: 12px !important;
          font-size: 13.5px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
        }

        .adm-btn-add-block:hover {
          background: #dbeafe !important;
          border-color: #60a5fa !important;
        }

        /* CTA Panel */
        .adm-cta-panel {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%) !important;
          border-color: #bae6fd !important;
        }

        /* Form Inputs */
        .adm-field-group {
          margin-bottom: 14px !important;
        }

        .adm-field-label {
          display: block !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          color: #334155 !important;
          margin-bottom: 5px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.3px !important;
        }

        .adm-field-label-sm {
          display: block !important;
          font-size: 11.5px !important;
          font-weight: 600 !important;
          color: #475569 !important;
          margin-bottom: 4px !important;
        }

        .adm-req {
          color: #ef4444 !important;
        }

        .adm-hint {
          font-size: 11.5px !important;
          color: #64748b !important;
        }

        .adm-input {
          width: 100% !important;
          height: 38px !important;
          padding: 0 12px !important;
          border: 1.5px solid #cbd5e1 !important;
          border-radius: 8px !important;
          font-size: 13.5px !important;
          font-family: var(--font-poppins), sans-serif !important;
          color: #0f172a !important;
          background: #ffffff !important;
          outline: none !important;
          box-sizing: border-box !important;
          transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
        }

        .adm-input:focus {
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12) !important;
        }

        .adm-input-sm {
          width: 100% !important;
          height: 34px !important;
          padding: 0 10px !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 6px !important;
          font-size: 12.5px !important;
          font-family: var(--font-poppins), sans-serif !important;
          color: #0f172a !important;
          background: #ffffff !important;
          outline: none !important;
          box-sizing: border-box !important;
        }

        .adm-textarea {
          width: 100% !important;
          padding: 10px 12px !important;
          border: 1.5px solid #cbd5e1 !important;
          border-radius: 8px !important;
          font-size: 13px !important;
          font-family: var(--font-poppins), sans-serif !important;
          color: #0f172a !important;
          background: #ffffff !important;
          outline: none !important;
          resize: vertical !important;
          box-sizing: border-box !important;
          transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
          line-height: 1.5 !important;
        }

        .adm-textarea:focus {
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12) !important;
        }

        /* Sidebar: Status Pills */
        .adm-status-pills {
          display: flex !important;
          gap: 6px !important;
        }

        .adm-pill {
          flex: 1 !important;
          height: 36px !important;
          border-radius: 7px !important;
          border: 1.5px solid #cbd5e1 !important;
          background: #ffffff !important;
          font-size: 12.5px !important;
          font-weight: 600 !important;
          color: #64748b !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
        }

        .adm-pill.active-draft {
          border-color: #64748b !important;
          background: #f1f5f9 !important;
          color: #0f172a !important;
        }

        .adm-pill.active-published {
          border-color: #22c55e !important;
          background: #f0fdf4 !important;
          color: #15803d !important;
        }

        .adm-pill.active-archived {
          border-color: #f59e0b !important;
          background: #fffbeb !important;
          color: #b45309 !important;
        }

        .adm-featured-card {
          display: flex !important;
          align-items: center !important;
          gap: 10px !important;
          padding: 10px 12px !important;
          border-radius: 8px !important;
          border: 1.5px solid #cbd5e1 !important;
          background: #ffffff !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
        }

        .adm-featured-card.active {
          border-color: #f59e0b !important;
          background: #fffbeb !important;
        }

        .adm-featured-title {
          font-size: 12.5px !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          display: block !important;
        }

        .adm-featured-desc {
          font-size: 11px !important;
          color: #64748b !important;
        }

        /* Google SERP Simulator */
        .adm-serp-simulator {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 8px !important;
          padding: 12px !important;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04) !important;
        }

        .adm-serp-site-row {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          margin-bottom: 4px !important;
        }

        .adm-serp-fav {
          width: 20px !important;
          height: 20px !important;
          border-radius: 50% !important;
          background: #ff5e14 !important;
          color: #ffffff !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .adm-serp-site {
          font-size: 11px !important;
          font-weight: 600 !important;
          color: #202124 !important;
          display: block !important;
        }

        .adm-serp-link {
          font-size: 10px !important;
          color: #4d5156 !important;
          display: block !important;
        }

        .adm-serp-heading {
          color: #1a0dab !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          margin: 4px 0 !important;
          line-height: 1.3 !important;
          font-family: Arial, sans-serif !important;
        }

        .adm-serp-snippet {
          color: #4d5156 !important;
          font-size: 11.5px !important;
          line-height: 1.4 !important;
          margin: 0 !important;
          font-family: Arial, sans-serif !important;
        }

        /* 1-Click Quick Pills */
        .adm-quick-pills {
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 5px !important;
        }

        .adm-quick-pill {
          background: #f1f5f9 !important;
          border: 1px solid #e2e8f0 !important;
          color: #475569 !important;
          font-size: 11px !important;
          font-weight: 500 !important;
          padding: 3px 8px !important;
          border-radius: 4px !important;
          cursor: pointer !important;
          transition: all 0.1s ease !important;
        }

        .adm-quick-pill:hover,
        .adm-quick-pill.selected {
          background: #eff6ff !important;
          border-color: #93c5fd !important;
          color: #1d4ed8 !important;
        }

        /* Tag Chips */
        .adm-tag-chips {
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 4px !important;
          margin-top: 6px !important;
        }

        .adm-tag-chip {
          background: #f1f5f9 !important;
          color: #0f172a !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          padding: 2px 7px !important;
          border-radius: 4px !important;
        }

        /* JSON Import Alert */
        .adm-json-warning-banner {
          display: flex !important;
          gap: 12px !important;
          background: #fffbeb !important;
          border: 1.5px solid #fcd34d !important;
          border-radius: 10px !important;
          padding: 16px !important;
          margin-bottom: 20px !important;
        }

        .adm-json-error-banner {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          color: #b91c1c !important;
          background: #fef2f2 !important;
          border: 1px solid #fecaca !important;
          padding: 10px 14px !important;
          border-radius: 8px !important;
          font-size: 13px !important;
          margin-top: 14px !important;
        }

        .adm-json-code-box {
          background: #0f172a !important;
          color: #38bdf8 !important;
          padding: 14px !important;
          border-radius: 8px !important;
          max-height: 300px !important;
          overflow: auto !important;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace !important;
          font-size: 12.5px !important;
          line-height: 1.45 !important;
        }
      `}</style>
    </form>
  );
}

export default function AdminBlogDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editBlog, setEditBlog] = useState<any>(null);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string>('');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'review' | 'draft' | 'archived' | 'featured'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const dispatch = useDispatch<AppDispatch>();
  const blogs = useSelector(selectBlogs);
  const loading = useSelector(selectBlogsLoading);

  // Use refs to persist savedEmail and savedPass across renders
  const [savedEmail, setSavedEmail] = useState<string>('');
  const [savedPass, setSavedPass] = useState<string>('');

  const handleSort = (field: 'date' | 'views' | 'title') => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const formatArticleDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '—';
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '—';
    }
  };

  const getArticleWordCount = (blog: any) => {
    if (!blog.sections || !Array.isArray(blog.sections)) return 0;
    return blog.sections.reduce((total: number, sec: any) => {
      const contentText = Array.isArray(sec.content) ? sec.content.join(' ') : (sec.content || '');
      const words = contentText.trim().split(/\s+/).filter(Boolean).length;
      return total + words;
    }, 0);
  };

  const handleToggleFeatured = async (blog: any) => {
    try {
      const newFeatured = !blog.featured;
      const formData = new FormData();
      const blogData = {
        title: blog.title,
        slug: blog.slug,
        category: blog.category,
        featured: newFeatured,
        status: blog.status,
      };
      formData.append('json', JSON.stringify(blogData));
      await dispatch(updateBlog({ id: blog._id || blog.id, formData })).unwrap();
      showToast('success', newFeatured ? `⭐ Marked "${blog.title.slice(0, 24)}..." as Featured!` : `Removed from Featured.`);
      dispatch(fetchBlogs({}));
    } catch (err: any) {
      showToast('error', err.message || 'Failed to update featured status');
    }
  };


  // Check localStorage for admin login
  useEffect(() => {
    const email = typeof window !== 'undefined' ? localStorage.getItem('tetra_admin_email') : '';
    const pass = typeof window !== 'undefined' ? localStorage.getItem('tetra_admin_pass') : '';
    setSavedEmail(email || '');
    setSavedPass(pass || '');
    if (email === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      dispatch(fetchBlogs({}));
    }
    // eslint-disable-next-line
  }, [dispatch]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    // Natural micro-delay for smooth tactile feedback
    await new Promise((res) => setTimeout(res, 200));

    const trimmedEmail = loginEmail.trim().toLowerCase();
    const targetEmail = ADMIN_EMAIL.trim().toLowerCase();

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      setLoginError('Admin credentials are not configured in environment variables (.env.local).');
      showToast('error', 'Credentials not configured');
      setIsLoggingIn(false);
      return;
    }

    if (trimmedEmail === targetEmail && loginPassword === ADMIN_PASSWORD) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('tetra_admin_email', ADMIN_EMAIL);
        localStorage.setItem('tetra_admin_pass', ADMIN_PASSWORD);
      }
      setSavedEmail(ADMIN_EMAIL);
      setSavedPass(ADMIN_PASSWORD);
      setIsLoggedIn(true);
      showToast('success', 'Logged in successfully! Welcome back.');
      dispatch(fetchBlogs({}));
    } else {
      setLoginError('Invalid email or password. Please verify your credentials.');
      showToast('error', 'Invalid credentials');
    }
    setIsLoggingIn(false);
  };

  // Logout
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tetra_admin_email');
      localStorage.removeItem('tetra_admin_pass');
    }
    setSavedEmail('');
    setSavedPass('');
    setIsLoggedIn(false);
  };

  function showToast(type: Toast['type'], message: string) {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }

  // Create blog (single or batch)
  const normalizeImage = (img: any) => {
    // If already an object with url/publicId, return as is
    if (img && typeof img === 'object' && img.url && img.publicId) {
      return img;
    }
    // If it's a string, convert to object with url, publicId, alt
    if (typeof img === 'string') {
      return {
        url: img,
        publicId: '', // You may want to extract or generate this if possible
        alt: ''
      };
    }
    return img;
  };

  const normalizeBlogImages = (blogObj: any) => {
    // Normalize top-level image
    if (blogObj.image) {
      blogObj.image = normalizeImage(blogObj.image);
    }
    // Normalize images in sections
    if (Array.isArray(blogObj.sections)) {
      blogObj.sections = blogObj.sections.map((section: any) => {
        if (section.image) {
          section.image = normalizeImage(section.image);
        }
        return section;
      });
    }
    return blogObj;
  };

  const handleCreateBlog = async (formData: FormData, jsonMode?: boolean, jsonData?: any) => {
    setFormLoading(true);
    try {
      if (jsonMode && jsonData) {
        // If jsonData is an array, create multiple blogs
        if (Array.isArray(jsonData)) {
          let successCount = 0;
          let failCount = 0;
          for (const item of jsonData) {
            let blogObj = item;
            let slug = '';
            if (
              typeof item === 'object' &&
              !Array.isArray(item) &&
              Object.keys(item).length === 1 &&
              typeof Object.values(item)[0] === 'object'
            ) {
              slug = Object.keys(item)[0];
              blogObj = Object.values(item)[0];
            } else if (item.slug) {
              slug = item.slug;
            }
            // Ensure slug is present in the data object
            let blogDataWithSlug = { ...blogObj, slug };
            blogDataWithSlug = normalizeBlogImages(blogDataWithSlug);
            const fd = new FormData();
            fd.append('json', JSON.stringify(blogDataWithSlug));
            try {
              await dispatch(createBlog(fd)).unwrap();
              successCount++;
            } catch (err) {
              failCount++;
            }
          }
          setShowForm(false);
          setEditBlog(null);
          // Do NOT refresh blogs here (per instruction: don't refresh screen)
          showToast('success', `Processed: ${successCount} ✓, Failed: ${failCount}`);
        } else if (
          typeof jsonData === 'object' &&
          !Array.isArray(jsonData)
        ) {
          // If it's an object with slugs as keys or a single blog object
          const keys = Object.keys(jsonData);
          if (
            keys.length > 0 &&
            typeof jsonData[keys[0]] === 'object'
          ) {
            let successCount = 0;
            let failCount = 0;
            for (const slug of keys) {
              let blogObj = jsonData[slug];
              let blogDataWithSlug = { ...blogObj, slug };
              blogDataWithSlug = normalizeBlogImages(blogDataWithSlug);
              const fd = new FormData();
              fd.append('json', JSON.stringify(blogDataWithSlug));
              try {
                await dispatch(createBlog(fd)).unwrap();
                successCount++;
              } catch (err) {
                failCount++;
              }
            }
            setShowForm(false);
            setEditBlog(null);
            // Do NOT refresh blogs here
            showToast('success', `Processed: ${successCount} ✓, Failed: ${failCount}`);
          } else {
            // Single blog object
            let blogObj = jsonData;
            let slug = '';
            if (jsonData.slug) {
              slug = jsonData.slug;
            }
            let blogDataWithSlug = { ...blogObj, slug };
            blogDataWithSlug = normalizeBlogImages(blogDataWithSlug);
            const fd = new FormData();
            fd.append('json', JSON.stringify(blogDataWithSlug));
            await dispatch(createBlog(fd)).unwrap();
            setShowForm(false);
            setEditBlog(null);
            dispatch(fetchBlogs({}));
            showToast('success', 'Blog created successfully');
          }
        }
      } else {
        // Normal formData (from fields)
        await dispatch(createBlog(formData)).unwrap();
        setShowForm(false);
        setEditBlog(null);
        dispatch(fetchBlogs({}));
        showToast('success', 'Blog created successfully');
      }
    } catch (err) {
      showToast('error', 'Failed to create blog');
    }
    setFormLoading(false);
  };

  // Edit blog
  const handleEditBlog = async (formData: FormData) => {
    setFormLoading(true);
    try {
      await dispatch(updateBlog({ id: editBlog?._id || editBlog?.data?._id, formData })).unwrap();
      setShowForm(false);
      setEditBlog(null);
      dispatch(fetchBlogs({}));
      showToast('success', 'Blog updated successfully');
    } catch (err) {
      showToast('error', 'Failed to update blog');
    }
    setFormLoading(false);
  };

  // Delete blog
  const handleDeleteBlog = async (id: string) => {
    try {
      await dispatch(deleteBlog(id)).unwrap();
      dispatch(fetchBlogs({}));
      showToast('success', 'Blog deleted');
    } catch (err) {
      showToast('error', 'Failed to delete blog');
    }
  };

  // Edit button
  const handleEditPrompt = (blog: any) => {
    setEditBlog(blog);
    setShowForm(true);
  };

  // Metrics & Category Aggregations
  const stats = React.useMemo(() => {
    const list = Array.isArray(blogs) ? blogs : [];
    const total = list.length;
    const published = list.filter((b: any) => b.status === 'published').length;
    const inReview = list.filter((b: any) => b.status === 'review').length;
    const drafts = list.filter((b: any) => b.status === 'draft').length;
    const archived = list.filter((b: any) => b.status === 'archived').length;
    const featured = list.filter((b: any) => Boolean(b.featured)).length;
    const totalViews = list.reduce((acc: number, b: any) => acc + (b.views || 0), 0);
    return { total, published, inReview, drafts, archived, featured, totalViews };
  }, [blogs]);

  const uniqueCategories = React.useMemo(() => {
    const list = Array.isArray(blogs) ? blogs : [];
    const set = new Set<string>();
    list.forEach((b: any) => {
      if (b.category && b.category.trim()) set.add(b.category.trim());
    });
    return Array.from(set);
  }, [blogs]);

  // Derived filtered and paginated data
  const filteredBlogs = React.useMemo(() => {
    let data = Array.isArray(blogs) ? blogs : [];
    if (statusFilter === 'published') {
      data = data.filter((b: any) => b.status === 'published');
    } else if (statusFilter === 'review') {
      data = data.filter((b: any) => b.status === 'review');
    } else if (statusFilter === 'draft') {
      data = data.filter((b: any) => b.status === 'draft');
    } else if (statusFilter === 'archived') {
      data = data.filter((b: any) => b.status === 'archived');
    } else if (statusFilter === 'featured') {
      data = data.filter((b: any) => Boolean(b.featured));
    }

    if (categoryFilter !== 'all') {
      data = data.filter((b: any) => (b.category || '').toLowerCase() === categoryFilter.toLowerCase());
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      data = data.filter((b: any) =>
        (b.title || '').toLowerCase().includes(q) ||
        (b.slug || '').toLowerCase().includes(q) ||
        (b.category || '').toLowerCase().includes(q) ||
        (b.focusKeyword || '').toLowerCase().includes(q)
      );
    }

    // Dynamic Multi-Column Sorting
    return [...data].sort((a: any, b: any) => {
      if (sortBy === 'views') {
        const va = a.views || 0;
        const vb = b.views || 0;
        return sortOrder === 'asc' ? va - vb : vb - va;
      }
      if (sortBy === 'title') {
        const ta = (a.title || '').toLowerCase();
        const tb = (b.title || '').toLowerCase();
        return sortOrder === 'asc' ? ta.localeCompare(tb) : tb.localeCompare(ta);
      }
      // Default: date (newest first)
      const da = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const db = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return sortOrder === 'asc' ? da - db : db - da;
    });
  }, [blogs, statusFilter, categoryFilter, search, sortBy, sortOrder]);

  const totalPages = Math.max(1, Math.ceil((filteredBlogs?.length || 0) / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedBlogs = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredBlogs.slice(start, end);
  }, [filteredBlogs, currentPage, pageSize]);

  if (!isLoggedIn) {
    return (
      <div id="admin-auth-root">
        <Toasts toasts={toasts} remove={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

        <div id="admin-auth-card">
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 14 }}>
            <img
              src="/assets/images/Tetrahedron Logo.png"
              alt="Tetrahedron"
              style={{
                height: '48px',
                width: 'auto',
                maxWidth: '200px',
                objectFit: 'contain',
                display: 'inline-block'
              }}
            />
          </div>

          {/* Badge */}
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <span className="adm-badge">
              <ShieldCheck size={13} strokeWidth={2.5} />
              <span>CMS Portal</span>
            </span>
          </div>

          <h2 className="adm-heading">Admin Sign In</h2>
          <p className="adm-subtext">Sign in to manage blog posts and media</p>

          {/* Error Banner */}
          {loginError && (
            <div className="adm-error-box">
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="adm-label" htmlFor="admin-email">Email Address</label>
              <div className={`adm-input-box ${loginError ? 'adm-input-error' : ''}`}>
                <Mail size={16} className="adm-input-icon" />
                <input
                  id="admin-email"
                  type="email"
                  autoFocus
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={e => {
                    setLoginEmail(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  required
                  className="adm-input-control"
                />
              </div>
            </div>

            <div>
              <label className="adm-label" htmlFor="admin-password">Password</label>
              <div className={`adm-input-box ${loginError ? 'adm-input-error' : ''}`}>
                <Lock size={16} className="adm-input-icon" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={e => {
                    setLoginPassword(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  required
                  className="adm-input-control"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="adm-toggle-pw"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="adm-submit-btn"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 size={16} className="adm-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>

          {/* Footer Back Link */}
          <div style={{ marginTop: 22, paddingTop: 14, borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
            <Link href="/" className="adm-back-link" style={{ color: '#64748b', fontSize: '13px' }}>
              <ArrowLeft size={14} style={{ color: 'inherit', display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }} />
              <span style={{ color: 'inherit', fontSize: '13px' }}>Back to Tetrahedron website</span>
            </Link>
          </div>
        </div>

        <style jsx>{`
          #admin-auth-root {
            min-height: 100vh !important;
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background-color: #f8fafc !important;
            background-image: radial-gradient(#e2e8f0 1.2px, transparent 1.2px) !important;
            background-size: 24px 24px !important;
            padding: 32px 16px !important;
            box-sizing: border-box !important;
            font-family: var(--font-poppins), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          }

          #admin-auth-card {
            width: 100% !important;
            max-width: 400px !important;
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 16px !important;
            padding: 32px 28px !important;
            box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.03) !important;
            margin: auto !important;
            box-sizing: border-box !important;
          }

          #admin-auth-card .adm-badge {
            display: inline-flex !important;
            align-items: center !important;
            gap: 5px !important;
            padding: 3px 10px !important;
            border-radius: 9999px !important;
            background: #eff6ff !important;
            border: 1px solid #bfdbfe !important;
            color: #1d4ed8 !important;
            font-size: 11px !important;
            font-weight: 600 !important;
            letter-spacing: 0.5px !important;
            text-transform: uppercase !important;
            line-height: 1.4 !important;
          }

          #admin-auth-card .adm-heading {
            font-family: var(--font-poppins), sans-serif !important;
            font-size: 20px !important;
            font-weight: 700 !important;
            color: #0f172a !important;
            margin: 8px 0 4px 0 !important;
            text-align: center !important;
            line-height: 1.3 !important;
            letter-spacing: -0.2px !important;
            text-transform: none !important;
          }

          #admin-auth-card .adm-subtext {
            font-family: var(--font-poppins), sans-serif !important;
            font-size: 13px !important;
            color: #64748b !important;
            margin: 0 0 18px 0 !important;
            text-align: center !important;
            line-height: 1.4 !important;
            font-weight: 400 !important;
          }

          #admin-auth-card .adm-error-box {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            background: #fef2f2 !important;
            border: 1px solid #fecaca !important;
            color: #991b1b !important;
            padding: 9px 12px !important;
            border-radius: 8px !important;
            font-size: 12.5px !important;
            margin-bottom: 16px !important;
            text-align: left !important;
            line-height: 1.4 !important;
          }

          #admin-auth-card .adm-label {
            font-family: var(--font-poppins), sans-serif !important;
            display: block !important;
            font-size: 12px !important;
            font-weight: 600 !important;
            color: #334155 !important;
            margin-bottom: 6px !important;
            letter-spacing: 0.3px !important;
            text-transform: uppercase !important;
            text-align: left !important;
            line-height: 1.2 !important;
          }

          #admin-auth-card .adm-input-box {
            display: flex !important;
            align-items: center !important;
            background: #ffffff !important;
            border: 1.5px solid #cbd5e1 !important;
            border-radius: 8px !important;
            height: 42px !important;
            padding: 0 10px 0 12px !important;
            gap: 10px !important;
            box-sizing: border-box !important;
            transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
          }

          #admin-auth-card .adm-input-box:focus-within {
            border-color: #2563eb !important;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12) !important;
          }

          #admin-auth-card .adm-input-box.adm-input-error {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12) !important;
          }

          #admin-auth-card .adm-input-icon {
            color: #94a3b8 !important;
            flex-shrink: 0 !important;
            display: block !important;
            pointer-events: none !important;
            margin: 0 !important;
          }

          #admin-auth-card .adm-input-box:focus-within .adm-input-icon {
            color: #2563eb !important;
          }

          #admin-auth-card .adm-input-box.adm-input-error .adm-input-icon {
            color: #ef4444 !important;
          }

          #admin-auth-card .adm-input-control {
            font-family: var(--font-poppins), sans-serif !important;
            flex: 1 1 auto !important;
            min-width: 0 !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            background: transparent !important;
            font-size: 13.5px !important;
            color: #0f172a !important;
            outline: none !important;
            box-shadow: none !important;
            box-sizing: border-box !important;
          }

          #admin-auth-card .adm-input-control::placeholder {
            color: #94a3b8 !important;
          }

          #admin-auth-card .adm-toggle-pw {
            background: transparent !important;
            border: none !important;
            padding: 4px !important;
            margin: 0 !important;
            color: #94a3b8 !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-shrink: 0 !important;
            transition: color 0.15s ease !important;
            outline: none !important;
          }

          #admin-auth-card .adm-toggle-pw:hover {
            color: #334155 !important;
          }

          #admin-auth-card .adm-toggle-pw svg {
            display: block !important;
            flex-shrink: 0 !important;
            margin: 0 !important;
          }

          #admin-auth-card .adm-submit-btn {
            font-family: var(--font-poppins), sans-serif !important;
            width: 100% !important;
            height: 42px !important;
            background: #0f172a !important;
            color: #ffffff !important;
            border: none !important;
            border-radius: 8px !important;
            font-size: 13.5px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            margin-top: 4px !important;
            box-shadow: 0 2px 6px rgba(15, 23, 42, 0.15) !important;
            transition: background 0.15s ease, transform 0.1s ease !important;
            text-transform: none !important;
          }

          #admin-auth-card .adm-submit-btn:hover:not(:disabled) {
            background: #1e293b !important;
            transform: translateY(-1px) !important;
          }

          #admin-auth-card .adm-submit-btn:active:not(:disabled) {
            transform: translateY(0) !important;
          }

          #admin-auth-card .adm-submit-btn:disabled {
            opacity: 0.7 !important;
            cursor: not-allowed !important;
          }

          #admin-auth-root #admin-auth-card a,
          #admin-auth-root #admin-auth-card a.adm-back-link,
          #admin-auth-root #admin-auth-card .adm-back-link {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 6px !important;
            color: #64748b !important;
            text-decoration: none !important;
            font-size: 13px !important;
            font-weight: 500 !important;
            transition: color 0.15s ease !important;
            font-family: var(--font-poppins), sans-serif !important;
            line-height: 1 !important;
          }

          #admin-auth-root #admin-auth-card a:hover,
          #admin-auth-root #admin-auth-card a.adm-back-link:hover,
          #admin-auth-root #admin-auth-card .adm-back-link:hover {
            color: #1d4ed8 !important;
            text-decoration: none !important;
          }

          .adm-spin {
            animation: admSpinKey 0.8s linear infinite !important;
          }

          @keyframes admSpinKey {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div id="admin-cms-dashboard-root">
      {/* Modern Top Header / Navbar */}
      <header className="adm-nav-header">
        <div className="adm-nav-left">
          <img
            src="/assets/images/resources/logo.png"
            alt="Tetrahedron"
            className="adm-nav-logo"
          />
          <div className="adm-nav-divider" />
          <div className="adm-nav-badge">
            <ShieldCheck size={13} strokeWidth={2.5} />
            <span>Blog Studio CMS</span>
          </div>
        </div>

        <div className="adm-nav-right">
          <a
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="adm-nav-site-btn"
            title="Open live blogs directory on website"
          >
            <Globe size={14} />
            <span>View Live Site</span>
            <ExternalLink size={12} />
          </a>

          <div className="adm-nav-user-pill">
            <div className="adm-user-avatar">A</div>
            <span className="adm-user-email">{savedEmail || ADMIN_EMAIL || 'Admin'}</span>
          </div>

          <button
            onClick={handleLogout}
            className="adm-nav-logout-btn"
            title="Sign out of Admin Dashboard"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="adm-main-container">
        {/* Title & Quick CTA Row */}
        <div className="adm-title-row">
          <div>
            <h1 className="adm-title-heading">Blog Management</h1>
            <p className="adm-title-subtext">Create, edit, optimize, and publish technical manufacturing articles</p>
          </div>

          <Link
            href="/dashboard/admin/editor"
            className="adm-btn-create-top"
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              background: '#0f172a',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              borderRadius: 10,
              fontSize: '13.5px',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.18)',
            }}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span style={{ color: '#ffffff', fontSize: '13.5px', fontWeight: 600 }}>Create New Blog</span>
          </Link>
        </div>

        {/* Executive KPI Stats Grid */}
        <div className="adm-kpi-grid">
          <div className="adm-kpi-card">
            <div className="adm-kpi-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <FileText size={20} />
            </div>
            <div>
              <span className="adm-kpi-val">{stats.total}</span>
              <span className="adm-kpi-name">Total Articles</span>
            </div>
          </div>

          <div className="adm-kpi-card">
            <div className="adm-kpi-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}>
              <CheckCircle2 size={20} />
            </div>
            <div>
              <span className="adm-kpi-val">{stats.published}</span>
              <span className="adm-kpi-name">Published</span>
            </div>
          </div>

          <div className="adm-kpi-card">
            <div className="adm-kpi-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
              <Clock size={20} />
            </div>
            <div>
              <span className="adm-kpi-val">{stats.drafts}</span>
              <span className="adm-kpi-name">Drafts</span>
            </div>
          </div>

          <div className="adm-kpi-card">
            <div className="adm-kpi-icon" style={{ background: '#faf5ff', color: '#9333ea' }}>
              <Eye size={20} />
            </div>
            <div>
              <span className="adm-kpi-val">{stats.totalViews.toLocaleString()}</span>
              <span className="adm-kpi-name">Total Views</span>
            </div>
          </div>
        </div>

        {/* Table Panel */}
        <div className="adm-table-panel">
          {/* Filter & Search Toolbar */}
          <div className="adm-table-toolbar">
            <div className="adm-filter-tabs">
              <button
                onClick={() => { setStatusFilter('all'); setPage(1); }}
                className={`adm-filter-tab ${statusFilter === 'all' ? 'active' : ''}`}
              >
                All <span className="adm-filter-count">{stats.total}</span>
              </button>
              <button
                onClick={() => { setStatusFilter('published'); setPage(1); }}
                className={`adm-filter-tab ${statusFilter === 'published' ? 'active' : ''}`}
              >
                Published <span className="adm-filter-count">{stats.published}</span>
              </button>
              <button
                onClick={() => { setStatusFilter('review'); setPage(1); }}
                className={`adm-filter-tab ${statusFilter === 'review' ? 'active' : ''}`}
              >
                In Review <span className="adm-filter-count">{stats.inReview}</span>
              </button>
              <button
                onClick={() => { setStatusFilter('draft'); setPage(1); }}
                className={`adm-filter-tab ${statusFilter === 'draft' ? 'active' : ''}`}
              >
                Drafts <span className="adm-filter-count">{stats.drafts}</span>
              </button>
              <button
                onClick={() => { setStatusFilter('archived'); setPage(1); }}
                className={`adm-filter-tab ${statusFilter === 'archived' ? 'active' : ''}`}
              >
                Archived <span className="adm-filter-count">{stats.archived}</span>
              </button>
              <button
                onClick={() => { setStatusFilter('featured'); setPage(1); }}
                className={`adm-filter-tab ${statusFilter === 'featured' ? 'active' : ''}`}
              >
                ⭐ Featured <span className="adm-filter-count">{stats.featured}</span>
              </button>
            </div>

            <div className="adm-toolbar-right-box">
              <div className="adm-search-box">
                <Search size={15} className="adm-search-icon" />
                <input
                  placeholder="Search title, slug, category, keyword..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="adm-search-input"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="adm-search-clear-btn" title="Clear search">
                    <X size={13} />
                  </button>
                )}
              </div>

              {uniqueCategories.length > 0 && (
                <select
                  value={categoryFilter}
                  onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
                  className="adm-cat-dropdown"
                >
                  <option value="all">All Categories</option>
                  {uniqueCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Data Table */}
          <div className="adm-table-responsive">
            <table className="adm-data-table">
              <thead>
                <tr>
                  <th style={{ width: '32%', cursor: 'pointer' }} onClick={() => handleSort('title')} title="Click to sort by Title">
                    <div className="adm-th-sortable">
                      <span>Article</span>
                      <ArrowUpDown size={11} color={sortBy === 'title' ? '#2563eb' : '#94a3b8'} />
                    </div>
                  </th>
                  <th style={{ width: '13%' }}>Category</th>
                  <th style={{ width: '10%' }}>Status</th>
                  <th style={{ width: '11%' }}>Featured</th>
                  <th style={{ width: '11%', cursor: 'pointer' }} onClick={() => handleSort('date')} title="Click to sort by Date">
                    <div className="adm-th-sortable">
                      <span>Date</span>
                      <ArrowUpDown size={11} color={sortBy === 'date' ? '#2563eb' : '#94a3b8'} />
                    </div>
                  </th>
                  <th style={{ width: '12%', cursor: 'pointer' }} onClick={() => handleSort('views')} title="Click to sort by Views">
                    <div className="adm-th-sortable">
                      <span>Engagement</span>
                      <ArrowUpDown size={11} color={sortBy === 'views' ? '#2563eb' : '#94a3b8'} />
                    </div>
                  </th>
                  <th style={{ width: '11%', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="adm-empty-cell">
                      <Loader2 size={24} className="adm-spin" style={{ margin: '0 auto 8px auto', color: '#2563eb' }} />
                      <div>Loading blogs...</div>
                    </td>
                  </tr>
                ) : filteredBlogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="adm-empty-cell">
                      <FileText size={32} style={{ margin: '0 auto 8px auto', color: '#94a3b8' }} />
                      <div style={{ fontWeight: 600, color: '#334155' }}>No blog articles found</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                        {search || statusFilter !== 'all' ? 'Try clearing your search or filters.' : 'Click "+ Create New Blog" to get started.'}
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedBlogs.map((blog: any) => {
                    const cleanSlug = (blog.slug || '').replace(/^\/+/, '');
                    const wordCount = getArticleWordCount(blog);
                    const readTime = blog.readingTime || Math.max(1, Math.ceil(wordCount / 200));

                    return (
                    <tr key={blog._id} className="adm-table-data-row">
                      {/* 1. Article: Thumbnail + Title + Live Link + SEO Keyword */}
                      <td>
                        <div className="adm-article-group">
                          {blog.image?.url ? (
                            <img src={blog.image.url} alt={blog.title} className="adm-thumb-img" />
                          ) : (
                            <div className="adm-thumb-fallback">
                              <ImageIcon size={18} />
                            </div>
                          )}
                          <div className="adm-article-info">
                            <span className="adm-article-name" title={blog.title}>
                              {blog.title}
                            </span>
                            <div className="adm-article-meta-row">
                              <a
                                href={`/${cleanSlug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="adm-article-link"
                                title="Preview live article"
                              >
                                <span>/{cleanSlug}</span>
                                <ExternalLink size={10} />
                              </a>
                              {blog.focusKeyword && (
                                <span className="adm-kw-badge" title={`SEO Focus Keyword: ${blog.focusKeyword}`}>
                                  🎯 {blog.focusKeyword}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Category */}
                      <td>
                        {blog.category ? (
                          <span className="adm-category-pill">
                            {blog.category}
                          </span>
                        ) : (
                          <span style={{ color: '#94a3b8', fontSize: 12 }}>—</span>
                        )}
                      </td>

                      {/* 3. Status */}
                      <td>
                        <span className={`adm-status-pill pill-${blog.status || 'draft'}`}>
                          <span className="adm-status-circle" />
                          <span style={{ textTransform: 'capitalize' }}>
                            {blog.status === 'review' ? 'In Review' : (blog.status || 'draft')}
                          </span>
                        </span>
                      </td>

                      {/* 4. Interactive 1-Click Featured Toggle */}
                      <td>
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(blog)}
                          className={`adm-star-btn ${blog.featured ? 'is-featured' : ''}`}
                          title={blog.featured ? "Click to remove from Featured" : "Click to set as Featured on Homepage"}
                        >
                          <Star size={13} fill={blog.featured ? "#eab308" : "none"} color={blog.featured ? "#ca8a04" : "#94a3b8"} />
                          <span>{blog.featured ? 'Featured' : 'Standard'}</span>
                        </button>
                      </td>

                      {/* 5. Date */}
                      <td>
                        <div className="adm-date-wrap" title={`Last updated: ${new Date(blog.updatedAt || blog.createdAt).toLocaleString()}`}>
                          <Calendar size={12} className="adm-date-icon" />
                          <span className="adm-date-val">{formatArticleDate(blog.updatedAt || blog.createdAt)}</span>
                        </div>
                      </td>

                      {/* 6. Engagement: Views + Read Time & Words */}
                      <td>
                        <div className="adm-engagement-wrap">
                          <div className="adm-views-wrap">
                            <Eye size={12} style={{ color: '#2563eb' }} />
                            <span>{(blog.views || 0).toLocaleString()} views</span>
                          </div>
                          <div className="adm-read-wrap">
                            <Clock size={11} style={{ color: '#64748b' }} />
                            <span>{readTime}m read · {wordCount.toLocaleString()}w</span>
                          </div>
                        </div>
                      </td>

                      {/* 7. Actions: Edit, View, Delete */}
                      <td>
                        <div className="adm-row-actions">
                          <Link
                            href={`/dashboard/admin/editor?id=${blog._id || blog.id}`}
                            className="adm-btn-edit-row"
                            title="Edit Blog in Dedicated Studio"
                          >
                            <Edit3 size={12} />
                            <span>Edit</span>
                          </Link>

                          <a
                            href={`/${cleanSlug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="adm-btn-view-row"
                            title="Open live post in new tab"
                          >
                            <ExternalLink size={12} />
                          </a>

                          <button
                            type="button"
                            onClick={() => { setConfirmDeleteId(blog._id); setConfirmOpen(true); }}
                            className="adm-btn-delete-row"
                            title="Delete Blog"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="adm-table-footer">
            <div className="adm-footer-info">
              Showing <strong>{filteredBlogs.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</strong> to <strong>{Math.min(currentPage * pageSize, filteredBlogs.length)}</strong> of <strong>{filteredBlogs.length}</strong> articles
            </div>

            <div className="adm-footer-controls">
              <div className="adm-per-page">
                <span>Per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                  className="adm-select-page-size"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="adm-pagination-btns">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="adm-page-nav-btn"
                  title="Previous Page"
                >
                  <ChevronLeft size={15} />
                  <span>Prev</span>
                </button>

                <span className="adm-page-label">
                  Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                </span>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className="adm-page-nav-btn"
                  title="Next Page"
                >
                  <span>Next</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Create / Edit Blog Modal */}
      <Modal
        isOpen={showForm}
        title={editBlog ? `Edit Blog: ${editBlog.title}` : 'Create New Blog'}
        onClose={() => { setShowForm(false); setEditBlog(null); }}
        width={1180}
      >
        <BlogForm
          key={editBlog?._id || 'new-blog'}
          onSubmit={editBlog ? handleEditBlog : handleCreateBlog}
          initial={editBlog}
          loading={formLoading}
          onCancel={() => { setShowForm(false); setEditBlog(null); }}
        />
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={confirmOpen}
        title="Confirm Delete"
        onClose={() => { setConfirmOpen(false); setConfirmDeleteId(''); }}
        width={420}
      >
        <div style={{ padding: '8px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#b91c1c', marginBottom: 12 }}>
            <AlertCircle size={22} />
            <strong style={{ fontSize: 15 }}>Are you sure you want to delete this blog?</strong>
          </div>
          <p style={{ margin: 0, fontSize: 13.5, color: '#475569', lineHeight: 1.5 }}>
            This will permanently remove the blog article and delete its associated media from Cloudinary. This action cannot be undone.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
            <button
              type="button"
              className="adm-btn-subtle"
              style={{ padding: '8px 16px', fontSize: 13 }}
              onClick={() => { setConfirmOpen(false); setConfirmDeleteId(''); }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="adm-btn-primary"
              style={{ background: '#dc2626', padding: '8px 18px', fontSize: 13 }}
              onClick={() => { const id = confirmDeleteId; setConfirmOpen(false); setConfirmDeleteId(''); handleDeleteBlog(id); }}
            >
              Yes, Delete Post
            </button>
          </div>
        </div>
      </Modal>

      <Toasts toasts={toasts} remove={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Scoped Styles for Admin Dashboard */}
      <style jsx>{`
        #admin-cms-dashboard-root {
          min-height: 100vh !important;
          background: #f8fafc !important;
          font-family: var(--font-poppins), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          color: #0f172a !important;
        }

        /* Top Navigation */
        .adm-nav-header {
          background: #ffffff !important;
          border-bottom: 1px solid #e2e8f0 !important;
          height: 68px !important;
          padding: 0 28px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          position: sticky !important;
          top: 0 !important;
          z-index: 100 !important;
        }

        .adm-nav-left {
          display: flex !important;
          align-items: center !important;
          gap: 14px !important;
        }

        .adm-nav-logo {
          height: 48px !important;
          width: auto !important;
          object-fit: contain !important;
          display: block !important;
        }

        .adm-nav-divider {
          width: 1px !important;
          height: 24px !important;
          background: #e2e8f0 !important;
        }

        .adm-nav-badge {
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px !important;
          background: #eff6ff !important;
          border: 1px solid #bfdbfe !important;
          color: #1d4ed8 !important;
          padding: 3px 9px !important;
          border-radius: 6px !important;
          font-size: 11.5px !important;
          font-weight: 600 !important;
          letter-spacing: 0.3px !important;
        }

        .adm-nav-right {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
        }

        .adm-nav-site-btn {
          display: inline-flex !important;
          align-items: center !important;
          gap: 6px !important;
          padding: 6px 12px !important;
          background: #f1f5f9 !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 8px !important;
          color: #475569 !important;
          font-size: 12.5px !important;
          font-weight: 500 !important;
          text-decoration: none !important;
          transition: all 0.15s ease !important;
        }

        .adm-nav-site-btn:hover {
          background: #e2e8f0 !important;
          color: #0f172a !important;
        }

        .adm-nav-user-pill {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          padding: 4px 10px 4px 4px !important;
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 9999px !important;
        }

        .adm-user-avatar {
          width: 26px !important;
          height: 26px !important;
          border-radius: 50% !important;
          background: #0f172a !important;
          color: #ffffff !important;
          font-size: 12px !important;
          font-weight: 700 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .adm-user-email {
          font-size: 12px !important;
          font-weight: 500 !important;
          color: #334155 !important;
        }

        .adm-nav-logout-btn {
          display: inline-flex !important;
          align-items: center !important;
          gap: 6px !important;
          padding: 6px 12px !important;
          background: #fee2e2 !important;
          color: #dc2626 !important;
          border: 1px solid #fecaca !important;
          border-radius: 8px !important;
          font-size: 12.5px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
        }

        .adm-nav-logout-btn:hover {
          background: #fecaca !important;
        }

        /* Main Container */
        .adm-main-container {
          max-width: 1280px !important;
          margin: 0 auto !important;
          padding: 28px 24px !important;
        }

        /* Title Row */
        .adm-title-row {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          margin-bottom: 24px !important;
          gap: 16px !important;
          flex-wrap: wrap !important;
        }

        .adm-title-heading {
          font-size: 24px !important;
          font-weight: 800 !important;
          color: #0f172a !important;
          margin: 0 0 4px 0 !important;
          line-height: 1.2 !important;
          letter-spacing: -0.3px !important;
        }

        .adm-title-subtext {
          font-size: 13.5px !important;
          color: #64748b !important;
          margin: 0 !important;
        }

        .adm-btn-create-top {
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
          padding: 10px 20px !important;
          background: #0f172a !important;
          color: #ffffff !important;
          border: none !important;
          border-radius: 10px !important;
          font-size: 13.5px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.18) !important;
          transition: all 0.15s ease !important;
        }

        .adm-btn-create-top:hover {
          background: #1e293b !important;
          transform: translateY(-1px) !important;
        }

        /* KPI Stats Grid */
        .adm-kpi-grid {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 16px !important;
          margin-bottom: 24px !important;
        }

        @media (max-width: 900px) {
          .adm-kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        .adm-kpi-card {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 12px !important;
          padding: 16px !important;
          display: flex !important;
          align-items: center !important;
          gap: 14px !important;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.02) !important;
        }

        .adm-kpi-icon {
          width: 44px !important;
          height: 44px !important;
          border-radius: 10px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex-shrink: 0 !important;
        }

        .adm-kpi-val {
          font-size: 20px !important;
          font-weight: 800 !important;
          color: #0f172a !important;
          display: block !important;
          line-height: 1.2 !important;
        }

        .adm-kpi-name {
          font-size: 12px !important;
          font-weight: 500 !important;
          color: #64748b !important;
        }

        /* Table Panel */
        .adm-table-panel {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 14px !important;
          box-shadow: 0 1px 4px rgba(15, 23, 42, 0.03) !important;
          overflow: hidden !important;
        }

        .adm-table-toolbar {
          padding: 16px 20px !important;
          border-bottom: 1px solid #f1f5f9 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 14px !important;
          flex-wrap: wrap !important;
        }

        .adm-filter-tabs {
          display: flex !important;
          gap: 6px !important;
          background: #f1f5f9 !important;
          padding: 3px !important;
          border-radius: 9px !important;
        }

        .adm-filter-tab {
          border: none !important;
          background: transparent !important;
          padding: 6px 12px !important;
          border-radius: 7px !important;
          font-size: 12.5px !important;
          font-weight: 600 !important;
          color: #475569 !important;
          cursor: pointer !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 6px !important;
          transition: all 0.15s ease !important;
        }

        .adm-filter-tab.active {
          background: #ffffff !important;
          color: #0f172a !important;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08) !important;
        }

        .adm-filter-count {
          background: #e2e8f0 !important;
          padding: 1px 6px !important;
          border-radius: 9999px !important;
          font-size: 11px !important;
        }

        .adm-toolbar-right-box {
          display: flex !important;
          align-items: center !important;
          gap: 10px !important;
        }

        .adm-search-box {
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          background: #ffffff !important;
          border: 1.5px solid #cbd5e1 !important;
          border-radius: 8px !important;
          padding: 0 12px !important;
          height: 38px !important;
          width: 290px !important;
          transition: all 0.15s ease !important;
          box-sizing: border-box !important;
        }

        .adm-search-box:focus-within {
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12) !important;
        }

        .adm-search-icon {
          color: #94a3b8 !important;
          margin-right: 9px !important;
          flex-shrink: 0 !important;
        }

        .adm-search-input {
          border: none !important;
          outline: none !important;
          background: transparent !important;
          padding: 0 !important;
          margin: 0 !important;
          font-size: 13px !important;
          font-family: var(--font-poppins), sans-serif !important;
          color: #0f172a !important;
          flex: 1 1 auto !important;
          min-width: 0 !important;
          width: 100% !important;
          height: 100% !important;
        }

        .adm-search-input::placeholder {
          color: #94a3b8 !important;
        }

        .adm-search-clear-btn {
          background: transparent !important;
          border: none !important;
          color: #94a3b8 !important;
          cursor: pointer !important;
          padding: 2px !important;
          margin-left: 4px !important;
          display: flex !important;
          align-items: center !important;
          flex-shrink: 0 !important;
        }

        .adm-search-clear-btn:hover {
          color: #334155 !important;
        }

        .adm-cat-dropdown {
          height: 38px !important;
          padding: 0 12px !important;
          border: 1.5px solid #cbd5e1 !important;
          border-radius: 8px !important;
          font-size: 13px !important;
          font-family: var(--font-poppins), sans-serif !important;
          color: #0f172a !important;
          background: #ffffff !important;
          outline: none !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
        }

        .adm-cat-dropdown:focus {
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12) !important;
        }

        /* Sortable Header */
        .adm-th-sortable {
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px !important;
          cursor: pointer !important;
          user-select: none !important;
          transition: color 0.15s ease !important;
        }

        .adm-th-sortable:hover {
          color: #2563eb !important;
        }

        /* Interactive Star Button */
        .adm-star-btn {
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px !important;
          padding: 3px 8px !important;
          border-radius: 6px !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          color: #64748b !important;
          transition: all 0.15s ease !important;
        }

        .adm-star-btn:hover {
          border-color: #cbd5e1 !important;
          background: #f1f5f9 !important;
        }

        .adm-star-btn.is-featured {
          background: #fefce8 !important;
          border-color: #fef08a !important;
          color: #854d0e !important;
        }

        .adm-star-btn.is-featured:hover {
          background: #fef9c3 !important;
          border-color: #fde047 !important;
        }

        /* Keyword Badge */
        .adm-article-meta-row {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          flex-wrap: wrap !important;
          margin-top: 3px !important;
        }

        .adm-kw-badge {
          display: inline-flex !important;
          align-items: center !important;
          gap: 3px !important;
          font-size: 10px !important;
          font-weight: 600 !important;
          color: #0369a1 !important;
          background: #e0f2fe !important;
          border: 1px solid #bae6fd !important;
          padding: 1px 6px !important;
          border-radius: 4px !important;
          white-space: nowrap !important;
        }

        /* Date Cell */
        .adm-date-wrap {
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px !important;
          font-size: 12px !important;
          color: #475569 !important;
          font-weight: 500 !important;
          white-space: nowrap !important;
        }

        .adm-date-icon {
          color: #94a3b8 !important;
          flex-shrink: 0 !important;
        }

        /* Engagement Cell */
        .adm-engagement-wrap {
          display: flex !important;
          flex-direction: column !important;
          gap: 2px !important;
          white-space: nowrap !important;
        }

        .adm-read-wrap {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          font-size: 11px !important;
          color: #64748b !important;
        }

        /* Table */
        .adm-table-responsive {
          width: 100% !important;
          overflow-x: auto !important;
        }

        .adm-data-table {
          width: 100% !important;
          border-collapse: collapse !important;
          text-align: left !important;
        }

        .adm-data-table thead th {
          background: #f8fafc !important;
          border-bottom: 1px solid #e2e8f0 !important;
          padding: 12px 18px !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          color: #64748b !important;
          text-transform: uppercase !important;
          letter-spacing: 0.4px !important;
        }

        .adm-table-data-row {
          border-bottom: 1px solid #f1f5f9 !important;
          transition: background 0.1s ease !important;
        }

        .adm-table-data-row:hover {
          background: #f8fafc !important;
        }

        .adm-table-data-row td {
          padding: 12px 18px !important;
          vertical-align: middle !important;
          font-size: 13.5px !important;
          color: #0f172a !important;
        }

        /* Article Cell */
        .adm-article-group {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
        }

        .adm-thumb-img {
          width: 52px !important;
          height: 36px !important;
          border-radius: 6px !important;
          object-fit: cover !important;
          border: 1px solid #e2e8f0 !important;
          flex-shrink: 0 !important;
        }

        .adm-thumb-fallback {
          width: 52px !important;
          height: 36px !important;
          border-radius: 6px !important;
          background: #f1f5f9 !important;
          border: 1px solid #e2e8f0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: #94a3b8 !important;
          flex-shrink: 0 !important;
        }

        .adm-article-info {
          display: flex !important;
          flex-direction: column !important;
          min-width: 0 !important;
        }

        .adm-article-name {
          font-weight: 600 !important;
          font-size: 13.5px !important;
          color: #0f172a !important;
          line-height: 1.3 !important;
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
        }

        .adm-article-link {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          font-size: 11.5px !important;
          color: #2563eb !important;
          text-decoration: none !important;
          margin-top: 3px !important;
        }

        .adm-article-link:hover {
          text-decoration: underline !important;
        }

        /* Badges */
        .adm-category-pill {
          display: inline-block !important;
          padding: 3px 8px !important;
          border-radius: 6px !important;
          background: #eff6ff !important;
          border: 1px solid #bfdbfe !important;
          color: #1d4ed8 !important;
          font-size: 11.5px !important;
          font-weight: 600 !important;
          white-space: nowrap !important;
        }

        .adm-status-pill {
          display: inline-flex !important;
          align-items: center !important;
          gap: 6px !important;
          padding: 3px 9px !important;
          border-radius: 9999px !important;
          font-size: 11.5px !important;
          font-weight: 600 !important;
        }

        .adm-status-circle {
          width: 6px !important;
          height: 6px !important;
          border-radius: 50% !important;
        }

        .pill-published {
          background: #f0fdf4 !important;
          color: #15803d !important;
          border: 1px solid #bbf7d0 !important;
        }
        .pill-published .adm-status-circle { background: #22c55e !important; }

        .pill-review {
          background: #fef3c7 !important;
          color: #92400e !important;
          border: 1px solid #fcd34d !important;
        }
        .pill-review .adm-status-circle { background: #d97706 !important; }

        .pill-draft {
          background: #f1f5f9 !important;
          color: #475569 !important;
          border: 1px solid #cbd5e1 !important;
        }
        .pill-draft .adm-status-circle { background: #64748b !important; }

        .pill-archived {
          background: #fffbeb !important;
          color: #b45309 !important;
          border: 1px solid #fde68a !important;
        }
        .pill-archived .adm-status-circle { background: #f59e0b !important; }

        .adm-featured-badge {
          display: inline-block !important;
          background: #fefce8 !important;
          border: 1px solid #fef08a !important;
          color: #a16207 !important;
          padding: 2px 7px !important;
          border-radius: 4px !important;
          font-size: 11px !important;
          font-weight: 700 !important;
        }

        .adm-views-wrap {
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px !important;
          font-size: 12.5px !important;
          font-weight: 600 !important;
          color: #475569 !important;
        }

        /* Actions */
        .adm-row-actions {
          display: flex !important;
          align-items: center !important;
          justify-content: flex-end !important;
          gap: 6px !important;
        }

        .adm-btn-edit-row {
          display: inline-flex !important;
          align-items: center !important;
          gap: 5px !important;
          padding: 5px 10px !important;
          background: #eff6ff !important;
          border: 1px solid #bfdbfe !important;
          color: #1d4ed8 !important;
          border-radius: 6px !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
        }

        .adm-btn-edit-row:hover {
          background: #dbeafe !important;
        }

        .adm-btn-view-row {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 28px !important;
          height: 28px !important;
          border-radius: 6px !important;
          background: #f1f5f9 !important;
          border: 1px solid #e2e8f0 !important;
          color: #475569 !important;
          text-decoration: none !important;
          transition: all 0.15s ease !important;
        }

        .adm-btn-view-row:hover {
          background: #e2e8f0 !important;
          color: #0f172a !important;
        }

        .adm-btn-delete-row {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 28px !important;
          height: 28px !important;
          border-radius: 6px !important;
          background: #fee2e2 !important;
          border: 1px solid #fecaca !important;
          color: #dc2626 !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
        }

        .adm-btn-delete-row:hover {
          background: #fecaca !important;
        }

        .adm-empty-cell {
          text-align: center !important;
          padding: 48px 16px !important;
        }

        /* Footer Pagination */
        .adm-table-footer {
          padding: 14px 20px !important;
          background: #f8fafc !important;
          border-top: 1px solid #e2e8f0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 12px !important;
          flex-wrap: wrap !important;
        }

        .adm-footer-info {
          font-size: 13px !important;
          color: #64748b !important;
        }

        .adm-footer-controls {
          display: flex !important;
          align-items: center !important;
          gap: 16px !important;
        }

        .adm-per-page {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          font-size: 12.5px !important;
          color: #64748b !important;
        }

        .adm-select-page-size {
          height: 30px !important;
          padding: 0 6px !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 6px !important;
          background: #ffffff !important;
          font-size: 12.5px !important;
          color: #0f172a !important;
        }

        .adm-pagination-btns {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }

        .adm-page-nav-btn {
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          padding: 4px 10px !important;
          background: #ffffff !important;
          border: 1px solid #cbd5e1 !important;
          border-radius: 6px !important;
          color: #334155 !important;
          font-size: 12.5px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
        }

        .adm-page-nav-btn:hover:not(:disabled) {
          background: #f1f5f9 !important;
        }

        .adm-page-nav-btn:disabled {
          opacity: 0.5 !important;
          cursor: not-allowed !important;
        }

        .adm-page-label {
          font-size: 12.5px !important;
          color: #475569 !important;
        }
      `}</style>
    </div>
  );
}
