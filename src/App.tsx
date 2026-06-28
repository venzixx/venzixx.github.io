import { useState, useEffect } from 'react';
import { Menu, X, Edit, Trash2, Home, ChevronRight, HelpCircle, Plus } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { WikiPage as WikiPageViewer } from './components/WikiPage';
import { PageEditor } from './components/PageEditor';
import type { WikiPage } from './store/wikiStore';
import {
  getWikiPages,
  saveWikiPage,
  deleteWikiPage,
  searchWikiPages
} from './store/wikiStore';

export default function App() {
  const [pages, setPages] = useState<WikiPage[]>([]);
  const [activePageSlug, setActivePageSlug] = useState('main-page');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Load pages on mount
  useEffect(() => {
    setPages(getWikiPages());
  }, []);

  // Hash-based routing synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/page/')) {
        const slug = hash.replace('#/page/', '');
        setActivePageSlug(slug);
        setIsEditing(false);
        setIsCreating(false);
      } else {
        // Default route
        window.location.hash = '#/page/main-page';
        setActivePageSlug('main-page');
        setIsEditing(false);
        setIsCreating(false);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Filter pages based on search query
  const filteredPages = searchWikiPages(pages, searchQuery);

  // Get current active page
  const currentPage = pages.find(p => p.slug === activePageSlug) || null;

  // Navigation handlers
  const handleNavigate = (slug: string) => {
    window.location.hash = `#/page/${slug}`;
  };

  const handleStartNewPage = () => {
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleSavePage = (editedPage: Omit<WikiPage, 'lastModified'>) => {
    const updatedPages = saveWikiPage(editedPage);
    setPages(updatedPages);
    setIsEditing(false);
    setIsCreating(false);
    handleNavigate(editedPage.slug);
  };

  const handleDeletePage = () => {
    if (!currentPage) return;
    if (currentPage.slug === 'main-page') {
      alert('The Main Page is the core wiki hub and cannot be deleted.');
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete "${currentPage.title}"?`);
    if (confirmDelete) {
      const updatedPages = deleteWikiPage(currentPage.slug);
      setPages(updatedPages);
      handleNavigate('main-page');
    }
  };

  const handleCreateMissingPage = (title: string) => {
    setIsCreating(true);
    setIsEditing(false);
    setTimeout(() => {
      const titleInput = document.getElementById('page-title') as HTMLInputElement;
      if (titleInput) {
        titleInput.value = title;
        titleInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, 100);
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        pages={filteredPages}
        activeSlug={activePageSlug}
        onPageSelect={handleNavigate}
        onNewPage={handleStartNewPage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isMobileOpen={isMobileSidebarOpen}
        toggleMobileMenu={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Header Bar */}
        <header className="top-bar">
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          >
            {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Breadcrumbs */}
          <div className="breadcrumb">
            <Home size={16} />
            <ChevronRight size={14} />
            {isCreating ? (
              <>
                <span>Creator</span>
                <ChevronRight size={14} />
                <span style={{ color: 'var(--text-primary)' }}>New Article</span>
              </>
            ) : currentPage ? (
              <>
                <span>{currentPage.category}</span>
                <ChevronRight size={14} />
                <span style={{ color: 'var(--text-primary)' }}>{currentPage.title}</span>
              </>
            ) : (
              <span style={{ color: 'var(--text-primary)' }}>Not Found</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            {isCreating ? null : isEditing ? (
              <button className="btn-secondary" onClick={handleCancelEdit}>
                <X size={14} />
                Cancel Edit
              </button>
            ) : currentPage ? (
              <>
                <button className="btn-secondary" onClick={handleStartEdit}>
                  <Edit size={14} />
                  Edit Page
                </button>
                {currentPage.slug !== 'main-page' && (
                  <button className="btn-danger" onClick={handleDeletePage}>
                    <Trash2 size={14} />
                    Delete Page
                  </button>
                )}
              </>
            ) : null}
          </div>
        </header>

        {/* Content Body Scrollable Area */}
        <section className="content-body">
          {isCreating || isEditing ? (
            <div style={{ maxWidth: '1024px', width: '100%', height: '100%' }}>
              <PageEditor
                page={isEditing ? currentPage : null}
                onSave={handleSavePage}
                onCancel={handleCancelEdit}
              />
            </div>
          ) : currentPage ? (
            <WikiPageViewer page={currentPage} onNavigate={handleNavigate} />
          ) : (
            /* 404 Helper Page with quick creation suggestion */
            <div style={{ textAlign: 'center', marginTop: '60px', maxWidth: '500px', margin: '60px auto 0' }}>
              <HelpCircle size={48} className="logo-icon" style={{ marginBottom: '16px' }} />
              <h2 style={{ fontFamily: 'var(--font-title)', color: 'var(--text-gold)', marginBottom: '12px' }}>
                Article Not Found
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                The page you are looking for does not exist yet in this summoned realm. Would you like to create it?
              </p>
              <button 
                className="btn-primary" 
                onClick={() => handleCreateMissingPage(activePageSlug.replace(/-/g, ' '))}
                style={{ display: 'inline-flex', width: 'auto' }}
              >
                <Plus size={16} />
                Create "{activePageSlug.replace(/-/g, ' ')}"
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
