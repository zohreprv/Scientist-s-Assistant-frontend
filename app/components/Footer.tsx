import {
  FaTelegram,
  FaLinkedin,
  FaGithub,
  FaBook,
  FaExternalLinkAlt,
  FaUsers,
} from 'react-icons/fa';
import { SiOpenaccess } from 'react-icons/si';
import { useState } from 'react';

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());

  const socialLinks = {
    telegram: 'https://t.me/zohrpr',
    linkedin: 'https://linkedin.com/in/zohreh-parvandi-8bb67a2a5',
    github: 'https://github.com/zohreprv',
  };

  return (
    <footer className="border-t border-gray-700/50 mt-12 py-8 px-6 bg-darkgray/95">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand & Description */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="Scientist's Assistant Logo"
                className="h-10 w-10"
              />
              <h1 className="font-semibold text-xl whitespace-nowrap">
                Scientist's <span className="text-blue">Assistant</span>
              </h1>
            </div>
            <p className="text-gray-400 text-xs text-center md:text-left max-w-xs">
              Discover authors, papers, and scientific publications{' '}
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <a
              href="/authors"
              className="text-gray-400 hover:text-blue transition-colors flex items-center gap-1.5"
            >
              <FaUsers size={14} />
              Authors
            </a>
            <a
              href="/works"
              className="text-gray-400 hover:text-blue transition-colors flex items-center gap-1.5"
            >
              <FaBook size={14} />
              Works
            </a>
            <div className="w-px h-4 bg-gray-700 hidden sm:block"></div>
            <a
              href="https://openalex.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue transition-colors flex items-center gap-1.5"
            >
              <SiOpenaccess size={14} />
              Data from OpenAlex
              <FaExternalLinkAlt size={10} />
            </a>
          </div>

          {/* Right: Social & Developer */}
          <div className="flex flex-col items-center lg:items-start gap-2">
            <div className="flex items-center gap-3">
              <a
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-700/50 hover:bg-blue-500 transition-all duration-300 flex items-center justify-center text-gray-300 hover:text-white hover:scale-110"
                aria-label="Telegram"
              >
                <FaTelegram size={16} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-700/50 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center text-gray-300 hover:text-white hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-700/50 hover:bg-gray-600 transition-all duration-300 flex items-center justify-center text-gray-300 hover:text-white hover:scale-110"
                aria-label="GitHub"
              >
                <FaGithub size={16} />
              </a>
            </div>
            <div className="text-xs text-gray-500">
              <span>Developed by </span>
              <span className="text-blue font-medium">Zohreh Parvandi</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-gray-700/30 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs text-gray-500">
            <span>© {currentYear} Scientist's Assistant</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
              <span>v1.0.0</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
