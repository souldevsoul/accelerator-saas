'use client';

import { useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import AnnouncementBanner from './announcement-banner';
import Header from './header';
import Footer from './footer';

interface SEO {
  description?: string;
  keywords?: string[];
}

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  showAnnouncement?: boolean;
  className?: string;
  seo?: SEO;
}

/**
 * Main page layout container component
 * Provides consistent layout structure with header, footer, and page content
 */
const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  showAnnouncement = true,
  className = '',
  seo = {}
}) => {
  const pathname = usePathname();

  // Set document title
  useEffect(() => {
    if (title) {
      document.title = title;
    } else {
      // Default title based on route
      const routeTitles: Record<string, string> = {
        '/': 'Velocity - Build Your MVP in Minutes',
        '/about': 'About - Velocity',
        '/pricing': 'Pricing - Velocity',
        '/blog': 'Blog - Velocity',
        '/contact': 'Contact - Velocity',
        '/login': 'Login - Velocity',
        '/register': 'Sign Up - Velocity'
      };

      document.title = routeTitles[pathname] || 'Velocity';
    }
  }, [title, pathname]);

  // Set meta description
  useEffect(() => {
    if (seo.description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', seo.description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = seo.description;
        document.head.appendChild(meta);
      }
    }
  }, [seo.description]);

  // Set meta keywords
  useEffect(() => {
    if (seo.keywords && seo.keywords.length > 0) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      const keywordsString = seo.keywords.join(', ');

      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywordsString);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = keywordsString;
        document.head.appendChild(meta);
      }
    }
  }, [seo.keywords]);

  return (
    <div className="antialiased text-body font-body min-h-screen flex flex-col">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Announcement banner */}
      {showAnnouncement && <AnnouncementBanner />}

      {/* Header */}
      <Header />

      {/* Main content */}
      <main
        id="main-content"
        className={`flex-grow ${className}`}
        role="main"
        tabIndex={-1}
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PageContainer;