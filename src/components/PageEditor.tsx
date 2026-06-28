import { useState, useEffect } from 'react';
import { Save, X, Sparkles, AlertCircle, Link } from 'lucide-react';
import type { WikiPage } from '../store/wikiStore';
import { WikiPage as WikiPagePreview } from './WikiPage';

interface PageEditorProps {
  page: WikiPage | null; // null if creating a new page
  onSave: (page: Omit<WikiPage, 'lastModified'>) => void;
  onCancel: () => void;
}

export const PageEditor = ({ page, onSave, onCancel }: PageEditorProps) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [tagsInput, setTagsInput] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (page) {
      setTitle(page.title);
      setCategory(page.category);
      setTagsInput(page.tags.join(', '));
      setContent(page.content);
    } else {
      setTitle('');
      setCategory('General');
      setTagsInput('');
      setContent('');
    }
  }, [page]);

  // Insert formatting template helpers
  const insertText = (before: string, after: string = '') => {
    const textarea = document.getElementById('wiki-editor-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    
    const replacement = before + selected + after;
    const newContent = text.substring(0, start) + replacement + text.substring(end);
    
    setContent(newContent);
    
    // Focus back on textarea after state updates
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 50);
  };

  const handleInsertInfobox = () => {
    const template = `| Infobox: Subject Name |
| --- | --- |
| Image | [Icon: Sword] |
| **Basic Information** | |
| **Species** | Summoned Human |
| **Main Stat** | INT |
| **Tech Level** | High |
| **Status** | Active |

`;
    setContent(prev => template + prev);
  };

  const handleInsertWikiLink = () => {
    insertText('[[', ']]');
  };

  const handleInsertAlert = () => {
    insertText('> [!IMPORTANT]\n> ', '\n');
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a page title.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t !== '');

    const slug = page ? page.slug : title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');

    onSave({
      slug,
      title,
      category: category.trim() || 'General',
      tags,
      content
    });
  };

  // Mock page object for the preview component
  const previewPage: WikiPage = {
    slug: page?.slug || 'preview',
    title: title || 'Page Title Preview',
    category: category || 'General',
    tags: tagsInput.split(',').map(t => t.trim()).filter(t => t !== ''),
    content: content || '*No content written yet.*',
    lastModified: new Date().toLocaleDateString()
  };

  return (
    <div className="editor-container">
      {/* Meta Input Fields */}
      <div className="editor-meta-grid">
        <div className="form-group">
          <label htmlFor="page-title">Page Title</label>
          <input
            id="page-title"
            type="text"
            className="form-control"
            placeholder="e.g. Mageblade"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!!page} // Slug is fixed for existing pages, can't change title to avoid broken links
          />
        </div>
        <div className="form-group">
          <label htmlFor="page-category">Category</label>
          <input
            id="page-category"
            type="text"
            className="form-control"
            placeholder="e.g. Feats, Guides, Lore"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="page-tags">Tags (comma separated)</label>
          <input
            id="page-tags"
            type="text"
            className="form-control"
            placeholder="e.g. martial, magic, rules"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
        </div>
      </div>

      {/* Editor Shortcuts Bar */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button className="btn-secondary" onClick={handleInsertInfobox}>
          <Sparkles size={14} style={{ color: 'var(--text-gold)' }} />
          Insert Infobox
        </button>
        <button className="btn-secondary" onClick={handleInsertWikiLink}>
          <Link size={14} style={{ color: 'var(--text-gold)' }} />
          Insert WikiLink
        </button>
        <button className="btn-secondary" onClick={handleInsertAlert}>
          <AlertCircle size={14} style={{ color: 'var(--text-gold)' }} />
          Insert D&D Alert
        </button>
      </div>

      {/* Main Panes: Write vs Preview */}
      <div className="editor-panes">
        {/* Editor Area */}
        <div className="pane">
          <div className="pane-header">
            <span className="pane-title">Markdown Editor</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Use markdown format</span>
          </div>
          <textarea
            id="wiki-editor-textarea"
            className="textarea-editor"
            placeholder="Write your article in markdown. Remember to start with a Portable Infobox table if you want one!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Live Preview Area */}
        <div className="pane">
          <div className="pane-header">
            <span className="pane-title">Live Preview</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-gold)' }}>Auto-renders</span>
          </div>
          <div className="preview-scroll">
            <WikiPagePreview page={previewPage} onNavigate={() => {}} />
          </div>
        </div>
      </div>

      {/* Save / Cancel Footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
        <button className="btn-secondary" onClick={onCancel}>
          <X size={16} />
          Cancel
        </button>
        <button className="btn-primary" onClick={handleSave}>
          <Save size={16} />
          Save Article
        </button>
      </div>
    </div>
  );
};
