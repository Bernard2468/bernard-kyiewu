
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';

type HeaderProps = {
  toggleTheme: () => void;
  isDarkMode: boolean;
};

const Header = ({ toggleTheme, isDarkMode }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Set active section based on scroll position
    const sections = ['home', 'about', 'experience', 'projects', 'education', 'volunteer', 'contact'];
    for (const section of sections.reverse()) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-portfolio-navy/90 shadow-md backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-portfolio-navy dark:text-portfolio-white">
          <a href="#home" className="flex items-center">Bernard Kyiewu</a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <a 
            onClick={() => scrollToSection('home')} 
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
          >
            Home
          </a>
          <a 
            onClick={() => scrollToSection('about')} 
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
          >
            About
          </a>
          <a 
            onClick={() => scrollToSection('experience')} 
            className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
          >
            Experience
          </a>
          <a 
            onClick={() => scrollToSection('projects')} 
            className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
          >
            Projects
          </a>
          <a 
            onClick={() => scrollToSection('education')} 
            className={`nav-link ${activeSection === 'education' ? 'active' : ''}`}
          >
            Education
          </a>
          <a 
            onClick={() => scrollToSection('volunteer')} 
            className={`nav-link ${activeSection === 'volunteer' ? 'active' : ''}`}
          >
            Volunteer
          </a>
          <a 
            onClick={() => scrollToSection('contact')} 
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
          >
            Contact
          </a>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 z-50 bg-white dark:bg-portfolio-navy transform ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center`}
        >
          <nav className="flex flex-col space-y-8 items-center">
            <a 
              onClick={() => scrollToSection('home')} 
              className={`nav-link text-xl ${activeSection === 'home' ? 'active' : ''}`}
            >
              Home
            </a>
            <a 
              onClick={() => scrollToSection('about')} 
              className={`nav-link text-xl ${activeSection === 'about' ? 'active' : ''}`}
            >
              About
            </a>
            <a 
              onClick={() => scrollToSection('experience')} 
              className={`nav-link text-xl ${activeSection === 'experience' ? 'active' : ''}`}
            >
              Experience
            </a>
            <a 
              onClick={() => scrollToSection('projects')} 
              className={`nav-link text-xl ${activeSection === 'projects' ? 'active' : ''}`}
            >
              Projects
            </a>
            <a 
              onClick={() => scrollToSection('education')} 
              className={`nav-link text-xl ${activeSection === 'education' ? 'active' : ''}`}
            >
              Education
            </a>
            <a 
              onClick={() => scrollToSection('volunteer')} 
              className={`nav-link text-xl ${activeSection === 'volunteer' ? 'active' : ''}`}
            >
              Volunteer
            </a>
            <a 
              onClick={() => scrollToSection('contact')} 
              className={`nav-link text-xl ${activeSection === 'contact' ? 'active' : ''}`}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
