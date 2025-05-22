
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-portfolio-navy text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-xl">Kyiewu Bernard</h3>
            <p className="text-portfolio-light-slate text-sm mt-1">
              AI Engineer | Computer Engineer | Health and Safety Advocate
            </p>
          </div>

          <div className="flex flex-col items-center">
            <button
              onClick={scrollToTop}
              className="bg-portfolio-amber hover:bg-portfolio-dark-amber text-white p-2 rounded-full mb-4 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>

          <div className="text-center md:text-right">
            <p className="text-portfolio-light-slate text-sm">
              &copy; {currentYear} Kyiewu Bernard. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
