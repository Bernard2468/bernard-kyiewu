
import { GithubIcon, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  achievement: string;
  githubLink?: string;
  demoLink?: string;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  achievement,
  githubLink,
  demoLink
}: ProjectCardProps) => (
  <div className="project-card">
    <h3 className="text-xl font-semibold text-portfolio-navy dark:text-portfolio-white mb-3">{title}</h3>
    <p className="text-gray-700 dark:text-portfolio-light-slate mb-4">{description}</p>
    
    <div className="mb-4">
      <div className="font-medium mb-2">Key Achievement:</div>
      <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50">
        {achievement}
      </Badge>
    </div>

    <div className="mb-4 flex flex-wrap gap-2">
      {technologies.map((tech, index) => (
        <Badge key={index} variant="outline" className="bg-gray-100 dark:bg-portfolio-lightest-navy/30">
          {tech}
        </Badge>
      ))}
    </div>
    
    <div className="flex space-x-4 mt-auto">
      {githubLink && (
        <a 
          href={githubLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-portfolio-navy dark:text-portfolio-light-slate hover:text-portfolio-amber dark:hover:text-portfolio-amber transition-colors"
        >
          <GithubIcon className="w-5 h-5 mr-2" />
          GitHub
        </a>
      )}
      {demoLink && (
        <a 
          href={demoLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-portfolio-navy dark:text-portfolio-light-slate hover:text-portfolio-amber dark:hover:text-portfolio-amber transition-colors"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          Live Demo
        </a>
      )}
    </div>
  </div>
);

const ProjectsSection = () => {
  const projects = [
    {
      title: "Twi (Local Language) Speech Recognition System",
      description: "Applied NLP principles to develop a speech recognition system for Twi language, enhancing accessibility for local language speakers.",
      technologies: ["NLP", "Speech Recognition", "Machine Learning", "Python", "Tensorflow"],
      achievement: "85% accuracy on a dataset of 10,000+ speech samples",
      //githubLink: "#"
      //demoLink: "#"
    },
    {
      title: "IoT-Enabled Predictive Maintenance System",
      description: "Developed an IoT system for industrial equipment that predicts maintenance needs before failures occur, reducing equipment downtime.",
      technologies: ["IoT", "Predictive Analytics", "Machine Learning", "Arduino", "Cloud Computing"],
      achievement: "15% reduction in maintenance downtime",
      //githubLink: "#",
      //demoLink: "#"
    },
    {
      title: "Non-Orthogonal Multiple Access in 5G Networks",
      description: "Research on implementing NOMA techniques in 5G networks to improve spectral efficiency and support more simultaneous users.",
      technologies: ["5G", "NOMA", "Signal Processing", "Wireless Communication", "MATLAB"],
      achievement: "Aided in preparing a manuscript for a research paper on novel approach to NOMA implementation.",
      //demoLink: "#"
    },
    {
      title: "Secure Communication System Using Public Key Cryptography",
      description: "Designed and implemented a secure communication system using public key infrastructure to ensure encrypted data transmission.",
      technologies: ["Cryptography", "Network Security", "Python", "Algorithms", "PKI"],
      achievement: "Successful implementation with 79.9% data integrity",
    
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-portfolio-navy/90">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-14">Projects & Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              achievement={project.achievement}
              //githubLink={project.githubLink}
              //demoLink={project.demoLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
