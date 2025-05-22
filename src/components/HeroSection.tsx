
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [profileImgSrc, setProfileImgSrc] = useState<string>("/lovable-uploads/9a78f029-10e8-4f2d-b9ae-5b5c450c314b.png");

  useEffect(() => {
    // Get the profile picture from the HTML
    const profilePictureElement = document.getElementById('profile-picture') as HTMLImageElement;
    if (profilePictureElement && profilePictureElement.src) {
      setProfileImgSrc(profilePictureElement.src);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen hero-gradient flex items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-portfolio-amber animate-pulse-soft"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-portfolio-amber animate-pulse-soft delay-300"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-portfolio-amber animate-pulse-soft delay-700"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center relative z-10">
        {/* Profile Image */}
        <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center md:justify-end animate-fade-in">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-portfolio-amber shadow-xl transform transition-transform hover:scale-105 duration-300">
              <img 
                src={profileImgSrc}
                alt="Kyiewu Bernard" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-portfolio-amber opacity-20 animate-pulse"></div>
            
            {/* Highlight elements */}
            <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-portfolio-dark-amber animate-bounce-subtle"></div>
            <div className="absolute -top-2 -left-2 w-12 h-12 rounded-full bg-portfolio-amber animate-bounce-subtle delay-300"></div>
          </div>
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left md:pl-8 animate-fade-in-up">
          <span className="inline-block px-4 py-1 mb-4 rounded-full bg-portfolio-amber/10 text-portfolio-amber font-medium text-sm">Welcome to my portfolio</span>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-2">
            Kyiewu Bernard
          </h1>
          
          <h2 className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-4">
            <span className="text-portfolio-amber">Health and Safety Advocate</span> | 
            <span className="ml-1">AI Engineer (LLM, NLP)</span> | 
            <span className="ml-1">Computer Engineer</span>
          </h2>
          
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto md:mx-0">
            Dynamic and innovative Computer Engineering Graduate with 2.5+ years of hands-on experience in AI engineering, 
            technology support, mentoring, and applied research, bridging technical innovation with real-world solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button 
              onClick={() => scrollToSection('projects')}
              className="bg-portfolio-amber hover:bg-portfolio-dark-amber text-white font-medium py-2 px-6 rounded-md flex items-center justify-center transform transition-transform hover:scale-105 duration-300"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 animate-bounce-subtle" />
            </Button>
            
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="border-portfolio-amber text-portfolio-amber hover:bg-portfolio-amber/10 font-medium py-2 px-6 rounded-md transform transition-transform hover:scale-105 duration-300"
            >
              Contact Me
            </Button>
          </div>
          
          {/* Social proof indicators */}
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <div className="bg-white dark:bg-portfolio-lightest-navy/10 px-3 py-1 rounded-full text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              2.5+ Years Experience
            </div>
            <div className="bg-white dark:bg-portfolio-lightest-navy/10 px-3 py-1 rounded-full text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              AI Engineering
            </div>
            <div className="bg-white dark:bg-portfolio-lightest-navy/10 px-3 py-1 rounded-full text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              Research Specialist
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-subtle">
        <div className="w-1 h-8 bg-portfolio-amber rounded-full"></div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Scroll Down</div>
      </div>
    </section>
  );
};

export default HeroSection;
