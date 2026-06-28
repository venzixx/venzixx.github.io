import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Compass, Shield, Sword, Wand2, BookOpen, Clock, Tag } from 'lucide-react';
import type { WikiPage as StoreWikiPage } from '../store/wikiStore';
import { parseWikiContent, preprocessMarkdown, slugify } from '../store/wikiStore';

interface WikiPageProps {
  page: StoreWikiPage;
  onNavigate: (slug: string) => void;
}

export const WikiPage = ({ page, onNavigate }: WikiPageProps) => {
  // 1. Parse the page content to split out the Infobox and the main Markdown body
  const { infobox, cleanContent } = parseWikiContent(page.content);

  // 2. Preprocess internal links [[Page Title]] or [[Page Title|Display]] into standard Markdown links
  const processedContent = preprocessMarkdown(cleanContent);

  // 3. Helper to generate TOC items dynamically from the markdown headers
  const getTOCItems = (markdown: string) => {
    const lines = markdown.split('\n');
    const items: { text: string; id: string; level: number }[] = [];
    
    // Simple parser for ## Header or ### Header
    lines.forEach(line => {
      const match = line.trim().match(/^(##|###)\s+(.+)$/);
      if (match) {
        const level = match[1].length; // 2 for h2, 3 for h3
        const rawText = match[2].trim();
        // Remove markdown formatting like bold, italics, links from TOC text
        const cleanText = rawText.replace(/\[\[(.*?)\]\]/g, '$1').replace(/[\*_`]/g, '');
        items.push({
          text: cleanText,
          id: slugify(cleanText),
          level
        });
      }
    });
    return items;
  };

  const tocItems = getTOCItems(cleanContent);

  // 4. Custom ReactMarkdown components to set IDs on headers and render internal links
  const components = {
    h2: ({ children, ...props }: any) => {
      const text = React.Children.toArray(children).join('');
      const id = slugify(text);
      return <h2 id={id} {...props}>{children}</h2>;
    },
    h3: ({ children, ...props }: any) => {
      const text = React.Children.toArray(children).join('');
      const id = slugify(text);
      return <h3 id={id} {...props}>{children}</h3>;
    },
    // Custom link component to intercept internal hashes
    a: ({ href, children, ...props }: any) => {
      if (href && href.startsWith('#/page/')) {
        const targetSlug = href.replace('#/page/', '');
        return (
          <a
            href={href}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(targetSlug);
            }}
            {...props}
          >
            {children}
          </a>
        );
      }
      return <a href={href} {...props}>{children}</a>;
    }
  };

  // 5. Helper to render the infobox image placeholder or a real image
  const renderInfoboxImage = (placeholderText: string) => {
    const isUrl = placeholderText.startsWith('http') || placeholderText.startsWith('/');
    if (isUrl) {
      return (
        <img
          src={placeholderText}
          alt="Infobox media"
          style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
        />
      );
    }

    // Determine a themed icon based on the description text
    const desc = placeholderText.toLowerCase();
    let Icon = Compass;
    if (desc.includes('sword') || desc.includes('weapon') || desc.includes('blade')) Icon = Sword;
    else if (desc.includes('shield') || desc.includes('def') || desc.includes('arm')) Icon = Shield;
    else if (desc.includes('magic') || desc.includes('spell') || desc.includes('wizard') || desc.includes('rune') || desc.includes('portal')) Icon = Wand2;
    else if (desc.includes('guide') || desc.includes('book') || desc.includes('sheet')) Icon = BookOpen;
    else if (desc.includes('clock') || desc.includes('time')) Icon = Clock;

    return (
      <div className="infobox-placeholder">
        <Icon className="infobox-placeholder-icon" size={32} />
        <span className="infobox-placeholder-text">{placeholderText.replace(/[\[\]]/g, '')}</span>
      </div>
    );
  };

  return (
    <article className={`article-container ${infobox ? 'has-infobox' : ''}`}>
      {/* Main content body */}
      <div className="article-main">
        {/* Table of contents block (shown if headers are present) */}
        {tocItems.length > 1 && (
          <div className="wiki-toc">
            <div className="wiki-toc-title">Contents</div>
            <ul className="wiki-toc-list">
              {tocItems.map((item, idx) => (
                <li
                  key={idx}
                  className="wiki-toc-item"
                  style={{ paddingLeft: `${(item.level - 2) * 16}px` }}
                >
                  <span className="text-gold" style={{ marginRight: '6px', fontSize: '0.8rem' }}>•</span>
                  <a
                    href={`#${item.id}`}
                    className="wiki-toc-link"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Markdown Rendered Content */}
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {processedContent}
          </ReactMarkdown>
        </div>

        {/* Categories Bar at bottom */}
        {page.tags && page.tags.length > 0 && (
          <div className="category-block">
            <span className="category-block-label">
              <Tag size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Tags:
            </span>
            {page.tags.map((tag, idx) => (
              <span key={idx} className="category-tag">
                {tag}
              </span>
            ))}
            <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Last Modified: {page.lastModified}
            </span>
          </div>
        )}
      </div>

      {/* Floating Right Infobox */}
      {infobox && (
        <aside className="portable-infobox">
          <div className="infobox-header">
            <div className="infobox-title">{infobox.title}</div>
          </div>
          {infobox.imagePlaceholder && (
            <div className="infobox-image-container">
              {renderInfoboxImage(infobox.imagePlaceholder)}
            </div>
          )}
          <div className="infobox-rows">
            {infobox.rows.map((row, idx) => {
              if (row.isHeader) {
                return (
                  <div key={idx} className="infobox-row subheader">
                    {row.value}
                  </div>
                );
              }
              return (
                <div key={idx} className="infobox-row">
                  <div className="infobox-label">{row.label}</div>
                  <div className="infobox-value">{row.value}</div>
                </div>
              );
            })}
          </div>
        </aside>
      )}
    </article>
  );
};
