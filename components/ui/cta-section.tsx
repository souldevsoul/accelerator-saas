'use client';

import Image from 'next/image';

interface CTASectionProps {
  badge?: string;
  title?: string;
  buttonText?: string;
  buttonUrl?: string;
  showArrow?: boolean;
  className?: string;
  backgroundImagePath?: string;
}

/**
 * Reusable Call-to-Action section component
 */
const CTASection: React.FC<CTASectionProps> = ({
  badge = 'Become A Frontend Developer',
  title = 'Want to learn how to build templates like this one?',
  buttonText = 'Visit www.pixelrocket.store',
  buttonUrl = 'https://www.pixelrocket.store',
  showArrow = true,
  className = '',
  backgroundImagePath = '/images'
}) => {
  return (
    <section className={`py-12 md:py-24 ${className}`}>
      <div className="container px-4 mx-auto">
        <div className="relative pb-16 border-b border-blue-400 overflow-hidden">
          {/* Background Images */}
          <Image
            className="absolute bottom-0 left-1/2 md:-mb-2 lg:-mb-20 transform -translate-x-1/2"
            src={`${backgroundImagePath}/cta-line-green-bottom.png`}
            alt=""
            width={800}
            height={200}
            aria-hidden="true"
          />
          <Image
            className="absolute bottom-0 left-1/2 -mb-5 sm:-mb-10 md:-mb-16 lg:-mb-28 transform -translate-x-1/2"
            src={`${backgroundImagePath}/cta-light-green-bottom.png`}
            alt=""
            width={800}
            height={300}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative max-w-sm md:max-w-xl mx-auto text-center">
            {badge && (
              <span className="inline-flex items-center h-6 mb-4 px-2 text-sm font-medium text-blue-700 bg-blue-200 rounded-full">
                {badge}
              </span>
            )}

            <h2 className="font-heading tracking-tight text-4xl sm:text-5xl font-bold mb-10">
              {title}
            </h2>

            <a
              className="group relative flex xs:inline-flex items-center justify-center px-5 h-12 font-bold text-sm text-white bg-gradient-to-br from-cyanGreen-800 to-cyan-800 rounded-lg transition-all duration-300 hover:from-cyanGreen-900 hover:to-cyan-900 focus:outline-none focus:ring-4 focus:ring-cyanGreen-500"
              href={buttonUrl}
              aria-label={`${buttonText} - Opens in new tab`}
              target="_blank"
              rel="noopener noreferrer"
            >

              <span className={showArrow ? 'mr-2' : ''}>
                {buttonText}
              </span>

              {showArrow && (
                <span className="transform group-hover:translate-x-1 transition duration-200" aria-hidden="true">
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.5 8H12.8333M12.8333 8L8.83334 4M12.8333 8L8.83334 12"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;