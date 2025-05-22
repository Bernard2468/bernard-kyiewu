
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
    <section id="home" className="min-h-screen hero-gradient flex items-center">
      <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center">
        {/* Profile Image */}
        <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center md:justify-end animate-fade-in">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-portfolio-amber shadow-xl">
              <img 
                src={profileImgSrc}
                alt="Kyiewu Bernard" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-portfolio-amber opacity-20 animate-pulse"></div>
          </div>
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left md:pl-8 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-portfolio-navy dark:text-portfolio-white mb-2">
            Kyiewu Bernard
          </h1>
          
          <h2 className="text-xl md:text-2xl font-medium text-portfolio-navy/80 dark:text-portfolio-light-slate mb-4">
            <span className="text-portfolio-amber">Health and Safety Advocate</span> | 
            <span className="ml-1">AI Engineer (LLM, NLP)</span> | 
            <span className="ml-1">Computer Engineer</span>
          </h2>
          
          <p className="text-base md:text-lg text-portfolio-navy/70 dark:text-portfolio-slate mb-6 max-w-lg mx-auto md:mx-0">
            Dynamic and innovative Computer Engineering Graduate with 2.5+ years of hands-on experience in AI engineering, 
            technology support, mentoring, and applied research, bridging technical innovation with real-world solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button 
              onClick={() => scrollToSection('projects')}
              className="bg-portfolio-amber hover:bg-portfolio-dark-amber text-white font-medium py-2 px-6 rounded-md flex items-center justify-center"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="border-portfolio-amber text-portfolio-amber hover:bg-portfolio-amber/10 font-medium py-2 px-6 rounded-md"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
