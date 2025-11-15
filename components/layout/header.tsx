'use client';

import { useState, useCallback, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from 'next';
import Image from "next/image";

interface NavigationItem {
  to: Route;
  label: string;
}

/**
 * Main navigation header component
 * Provides responsive navigation with mobile menu support
 */
const Header = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Check if current route is active
  const isActiveRoute = useCallback((path: string) => {
    return pathname === path;
  }, [pathname]);

  // Route mapping for Next.js
  const getRouteByName = (name: string): Route => {
    const routes: Record<string, Route> = {
      'home': '/' as Route,
      'login': '/login' as Route,
      'register': '/register' as Route
    };
    return routes[name] || ('/' as Route);
  };

  // Navigation items
  const getNavigationRoutes = (): NavigationItem[] => {
    return [
      { to: '/' as Route, label: 'Home' },
      { to: '/about' as Route, label: 'About' },
      { to: '/pricing' as Route, label: 'Pricing' },
      { to: '/blog' as Route, label: 'Blog' },
      { to: '/contact' as Route, label: 'Contact' }
    ];
  };

  const navigationItems = getNavigationRoutes();

  return (
    <header role="banner">
      <nav className="relative bg-white/10 backdrop-blur-lg mx-4 my-4 rounded-2xl border border-white/20" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4">
          <div className="relative flex h-20 items-center">
            {/* Logo */}
            <Link className="inline-flex items-center gap-2.5 group" href={getRouteByName('home')} aria-label="Nimbus - Home">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-blue-700 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" transform="rotate(-45 12 12)" />
                </svg>
              </div>
              <span className="text-2xl font-semibold text-gray-900">Nimbus</span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden flex items-center justify-center h-10 w-10 ml-auto bg-gradient-to-b from-sky-600 to-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M3 5H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M3 12H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M3 19H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>

            {/* Desktop navigation */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.to}
                  className={`inline-block text-gray-900 hover:text-blue-600 ${index < navigationItems.length - 1 ? 'mr-10' : ''} font-medium transition duration-200 focus:outline-none focus:underline ${isActiveRoute(item.to) ? 'text-blue-600' : ''}`}
                  href={item.to}
                  aria-current={isActiveRoute(item.to) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop auth buttons */}
            <div className="hidden lg:block ml-auto">
              <Link
                className="inline-flex items-center justify-center h-10 mr-4 px-4 text-center leading-loose text-sm text-gray-900 hover:text-blue-600 font-semibold transition duration-200 focus:outline-none focus:underline"
                href={getRouteByName('login')}
              >
                Login
              </Link>
              <Link
                className="inline-flex items-center justify-center h-10 px-4 text-center leading-loose text-sm text-white font-semibold border border-blue-600 bg-blue-600 hover:bg-blue-700 shadow-sm rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                href={getRouteByName('register')}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`${mobileMenuOpen ? 'block' : 'hidden'} fixed top-0 left-0 bottom-0 w-5/6 max-w-md z-50`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-teal-800 opacity-70"
            onClick={closeMobileMenu}
            aria-hidden="true"
          ></div>

          {/* Menu panel */}
          <nav className="relative flex flex-col py-6 px-10 w-full h-full bg-white overflow-y-auto" role="navigation">
            {/* Header */}
            <div className="flex mb-auto items-center">
              <Link
                className="inline-flex items-center gap-2.5 mr-auto"
                href={getRouteByName('home')}
                onClick={closeMobileMenu}
                aria-label="Nimbus - Home"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" transform="rotate(-45 12 12)" />
                  </svg>
                </div>
                <span className="text-2xl font-semibold text-gray-800">Nimbus</span>
              </Link>
              <button
                className="p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M6 18L18 6M6 6L18 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>

            {/* Navigation links */}
            <div className="py-12 mb-auto">
              <ul className="flex-col space-y-6" role="list">
                {navigationItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      className={`inline-block text-lg font-medium transition duration-200 focus:outline-none focus:underline ${isActiveRoute(item.to) ? 'text-sky-700' : 'text-black hover:text-sky-700'}`}
                      href={item.to}
                      onClick={closeMobileMenu}
                      aria-current={isActiveRoute(item.to) ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Auth buttons */}
            <div className="space-y-4">
              <Link
                className="flex items-center justify-center h-10 px-4 text-center text-sm text-gray-700 font-semibold border border-gray-200 hover:bg-gray-100 shadow-sm rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                href={getRouteByName('login')}
                onClick={closeMobileMenu}
              >
                Login
              </Link>
              <Link
                className="flex items-center justify-center h-10 px-4 text-center text-sm text-white font-semibold border border-sky-600 bg-sky-500 hover:bg-sky-600 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                href={getRouteByName('register')}
                onClick={closeMobileMenu}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </nav>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;