import { useState } from 'react';
import { Search, Compass, BookOpen, Scroll, ShieldAlert, Sword, Wand2, Hammer, Plus } from 'lucide-react';
import type { WikiPage } from '../store/wikiStore';

interface SidebarProps {
  pages: WikiPage[];
  activeSlug: string;
  onPageSelect: (slug: string) => void;
  onNewPage: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isMobileOpen: boolean;
  toggleMobileMenu: () => void;
}

export const Sidebar = ({
  pages,
  activeSlug,
  onPageSelect,
  onNewPage,
  searchQuery,
  onSearchChange,
  isMobileOpen,
  toggleMobileMenu
}: SidebarProps) => {
  // Accordion state for categories
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  // Category Icons mapping
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'home': return <Compass size={18} />;
      case 'guides': return <BookOpen size={18} />;
      case 'rules': return <Scroll size={18} />;
      case 'feats': return <ShieldAlert size={18} />;
      case 'classes': return <Wand2 size={18} />;
      case 'gear': return <Sword size={18} />;
      default: return <Hammer size={18} />;
    }
  };

  // Group pages by category
  const groupedPages = pages.reduce<Record<string, WikiPage[]>>((acc, page) => {
    const cat = page.category || 'Uncategorized';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(page);
    return acc;
  }, {});

  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handlePageClick = (slug: string) => {
    onPageSelect(slug);
    if (isMobileOpen) {
      toggleMobileMenu();
    }
  };

  const handleNewPageClick = () => {
    onNewPage();
    if (isMobileOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <Wand2 className="logo-icon" size={24} />
        <h1>Summoned Wiki</h1>
      </div>

      <div className="search-container">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          placeholder="Search lore, feats, stats..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="sidebar-scroll">
        <div className="nav-section-title">Categories</div>

        {Object.keys(groupedPages).map(category => {
          const catPages = groupedPages[category];
          const isCollapsed = collapsedCategories[category];
          const hasActiveChild = catPages.some(p => p.slug === activeSlug);

          return (
            <div key={category} className="category-group">
              <div
                className={`category-header ${hasActiveChild ? 'active' : ''}`}
                onClick={() => toggleCategory(category)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {getCategoryIcon(category)}
                  {category}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {isCollapsed ? '▶' : '▼'}
                </span>
              </div>

              {!isCollapsed && (
                <ul className="page-list">
                  {catPages.map(page => (
                    <li key={page.slug} className="page-item">
                      <a
                        onClick={() => handlePageClick(page.slug)}
                        className={`page-link ${activeSlug === page.slug ? 'active' : ''}`}
                      >
                        {page.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <button 
          className="btn-primary" 
          onClick={handleNewPageClick}
        >
          <Plus size={16} />
          Create New Page
        </button>
      </div>
    </aside>
  );
};
