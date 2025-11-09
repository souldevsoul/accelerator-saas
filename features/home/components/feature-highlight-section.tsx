import Image from 'next/image';

const FeatureHighlightSection: React.FC = () => {
  return (
    <section className="relative py-12 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-5/12 px-4 mb-20 lg:mb-0">
            <div className="max-w-xs mb-10">
              <span className="inline-flex items-center h-6 mb-4 px-2 text-sm uppercase font-medium text-yellowGreen-700 bg-yellowGreen-200 rounded-full">Feature</span>
              <h1 className="font-heading tracking-tight text-4xl sm:text-5xl font-bold mb-4">Easily organize your files</h1>
              <p className="text-gray-700 mb-10">Increase your marketing team efficiency with a quick search and ease of use features.</p>
              <ul>
                <li className="flex mb-5 items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 p-px rounded-full bg-gradient-to-br from-cyanGreen-800 to-cyan-800">
                    <div className="flex items-center justify-center bg-white h-full w-full rounded-full">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 11.6V4.4C2 4.29391 2.04214 4.19217 2.11716 4.11716C2.19217 4.04214 2.29391 4 2.4 4H11.1193C11.2527 4 11.378 4.06667 11.4527 4.178L13.8527 7.778C13.8965 7.84373 13.9199 7.92098 13.9199 8C13.9199 8.07902 13.8965 8.15627 13.8527 8.222L11.4527 11.822C11.4161 11.8768 11.3665 11.9218 11.3083 11.9528C11.2502 11.9839 11.1853 12.0001 11.1193 12H2.4C2.34747 12 2.29546 11.9897 2.24693 11.9696C2.1984 11.9495 2.1543 11.92 2.11716 11.8828C2.08001 11.8457 2.05055 11.8016 2.03045 11.7531C2.01035 11.7045 2 11.6525 2 11.6Z" stroke="url(#paint0_linear_3018_20784)" strokeWidth="1.5"></path>
                        <defs>
                          <linearGradient id="paint0_linear_3018_20784" x1="1.81375" y1="1.5" x2="4.80178" y2="12.8327" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#ACE348">
                              <stop offset="1" stopColor="#25ACA0"></stop>
                            </stop>
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <span className="font-semibold">Auto-tagging</span>
                </li>
                <li className="flex mb-5 items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 p-px rounded-full bg-gradient-to-br from-gray-200 to-gray-200">
                    <div className="flex items-center justify-center bg-white h-full w-full rounded-full">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_3018_20789)">
                          <path d="M3.33333 2.66667H6L8 4.66667H12.6667C13.0203 4.66667 13.3594 4.80715 13.6095 5.0572C13.8595 5.30724 14 5.64638 14 6.00001V11.3333C14 11.687 13.8595 12.0261 13.6095 12.2761C13.3594 12.5262 13.0203 12.6667 12.6667 12.6667H3.33333C2.97971 12.6667 2.64057 12.5262 2.39052 12.2761C2.14048 12.0261 2 11.687 2 11.3333V4.00001C2 3.64638 2.14048 3.30724 2.39052 3.0572C2.64057 2.80715 2.97971 2.66667 3.33333 2.66667Z" stroke="#6C7F73" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_3018_20789">
                            <rect width="16" height="16" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <span className="text-gray-500">Categorized by collections</span>
                </li>
                <li className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3 p-px rounded-full bg-gradient-to-br from-gray-200 to-gray-200">
                    <div className="flex items-center justify-center bg-white h-full w-full rounded-full">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 14.6667C13.1046 14.6667 14 13.7712 14 12.6667C14 11.5621 13.1046 10.6667 12 10.6667C10.8954 10.6667 10 11.5621 10 12.6667C10 13.7712 10.8954 14.6667 12 14.6667Z" stroke="#6C7F73" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M12 5.33334C13.1046 5.33334 14 4.43791 14 3.33334C14 2.22877 13.1046 1.33334 12 1.33334C10.8954 1.33334 10 2.22877 10 3.33334C10 4.43791 10.8954 5.33334 12 5.33334Z" stroke="#6C7F73" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M4 10C5.10457 10 6 9.10457 6 8C6 6.89543 5.10457 6 4 6C2.89543 6 2 6.89543 2 8C2 9.10457 2.89543 10 4 10Z" stroke="#6C7F73" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M10.3337 4.33334L5.66699 7" stroke="#6C7F73" strokeWidth="1.5"></path>
                        <path d="M5.66699 9L10.3337 11.6667" stroke="#6C7F73" strokeWidth="1.5"></path>
                      </svg>
                    </div>
                  </div>
                  <span className="text-gray-500">Share to others with links</span>
                </li>
              </ul>
            </div>
            <a className="xs:flex-shrink-0 group relative w-full xs:w-auto h-12 flex xs:inline-flex items-center justify-center px-5 font-bold text-gray-700 bg-white border border-gray-200 hover:border-yellowGreen-600 shadow-md hover:shadow-none rounded-lg transition-all duration-300 focus:outline-none" href="#">
              <div className="absolute top-0 left-0 w-full h-full rounded-lg ring ring-gray-100 animate-pulse group-hover:ring-0 transition duration-300"></div>
              <span className="mr-2">Learn more</span>
              <span className="transform group-hover:translate-x-1 transition duration-300">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 5L12.5 10L7.5 15" stroke="#3B5444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </span>
            </a>
          </div>
          <div className="w-full md:w-1/2 lg:w-7/12 px-4">
            <div>
              <div className="flex items-start max-w-xl mb-12">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 mr-6 p-px rounded-full bg-gradient-to-br from-cyanGreen-800 to-cyan-800">
                  <div className="flex items-center justify-center bg-white h-full w-full rounded-full">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 11.6V4.4C2 4.29391 2.04214 4.19217 2.11716 4.11716C2.19217 4.04214 2.29391 4 2.4 4H11.1193C11.2527 4 11.378 4.06667 11.4527 4.178L13.8527 7.778C13.8965 7.84373 13.9199 7.92098 13.9199 8C13.9199 8.07902 13.8965 8.15627 13.8527 8.222L11.4527 11.822C11.4161 11.8768 11.3665 11.9218 11.3083 11.9528C11.2502 11.9839 11.1853 12.0001 11.1193 12H2.4C2.34747 12 2.29546 11.9897 2.24693 11.9696C2.1984 11.9495 2.1543 11.92 2.11716 11.8828C2.08001 11.8457 2.05055 11.8016 2.03045 11.7531C2.01035 11.7045 2 11.6525 2 11.6Z" stroke="url(#paint0_linear_3018_20784)" strokeWidth="1.5"></path>
                      <defs>
                        <linearGradient id="paint0_linear_3018_20784" x1="1.81375" y1="1.5" x2="4.80178" y2="12.8327" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ACE348">
                            <stop offset="1" stopColor="#25ACA0"></stop>
                          </stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div>
                  <h5 className="text-lg font-semibold mb-1">Auto-tagging</h5>
                  <p className="text-gray-500">Useful for large collections of files, such as photo or video, where manually tagging each file would be impractical.</p>
                </div>
              </div>
              <div>
                <Image
                  className="block"
                  src="/images/features-feature-image-right.png"
                  alt="Auto-tagging feature illustration"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlightSection;