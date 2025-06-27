
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ChartBar, Briefcase, GraduationCap, Clock } from "lucide-react";

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  achievements: string[];
  isLast?: boolean;
}

const ExperienceItem = ({ title, company, period, achievements, isLast = false }: ExperienceItemProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className={`timeline-item ${isLast ? 'border-l-transparent' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="timeline-dot bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-400/20 scale-110"></div>
      <div className="ml-4 bg-white/5 backdrop-blur-sm dark:bg-black/5 p-5 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="text-blue-500 h-5 w-5" />
          <h3 className="text-xl font-medium text-portfolio-navy dark:text-portfolio-white">{title}</h3>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700/50 px-3 py-1 inline-flex items-center justify-center">
            {company}
          </Badge>
          <span className="hidden sm:block text-gray-500 dark:text-gray-400">•</span>
          <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
            <Clock className="h-3.5 w-3.5" />
            <p className="text-sm">{period}</p>
          </div>
        </div>
        <motion.ul 
          className="space-y-3 text-gray-700 dark:text-portfolio-light-slate ml-1"
          variants={listVariants}
        >
          {achievements.map((achievement, index) => (
            <motion.li 
              key={index} 
              className="flex items-start gap-2"
              variants={itemVariants}
            >
              <span className="h-5 w-5 min-w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              </span>
              <span>{achievement}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const experiences = [
    {
      title: "Research Assistant | APD & PDS Units",
      company: "Metascholar Consult Limited",
      period: "May 2025 - Present",
      achievements: [
        "Serve as Organization Administrator for Turnitin and iThenticate, overseeing academic integrity and plagiarism detection services for clients",
        "Provide support in thesis correction, proposal development, and project writing for B.Sc., Masters, and PhD students",
        "Develop and maintain websites, software, and digital learning platforms for academic and professional use.",
        "Deliver editing, proofreading, Systematic Reviews and academic article writing services tailored for publications and presentations.",
        "Offer remote IT support and contribute to AI engineering tasks, including facilitation of online courses and workshops."
      ]
    },
    {
      title: "Junior AI Engineer & Model Trainer | Researcher",
      company: "Reality AI Lab",
      period: "January 2025 - May 2025",
      achievements: [
        "Developing a predictive AI model chatbot improving accuracy by 30% and reducing latency by 25%.",
        "Engineered automated data preprocessing workflows using techniques such as tokenization and embeddings.",
        "Conducted research focused on implementing retrieval-augmented generation (RAG) architectures reducing LLM hallucinations by 35%.",
        "Collaborated with a team of 5 engineers to benchmark and deploy Hugging Face's pre-trained LLMs across 3 production environments."
      ]
    },
    {
      title: "Teaching Assistant",
      company: "University of Energy and Natural Resources",
      period: "November 2022 - December 2024",
      achievements: [
        "Mentored over 100 undergraduate students across computer engineering courses, resulting in a 15% increase in average exam scores.",
        "Held daily office hours to address students' questions and resolving 95% of student queries within 24 hours.",
        "Under the supervision of Dr Samuel Tweneboah-Koduah, organized and delivered comprehensive lecture materials for 5 courses directly supporting 200+ students and contributing to increase in assessment scores."
      ]
    },
    {
      title: "Research Assistant",
      company: "University of Energy and Natural Resources",
      period: "November 2022 - December 2024",
      achievements: [
        "Performed literature searches and co-edited 3 peer-reviewed manuscripts on advance wireless communication systems.",
        "Guided over 15 students in research work, facilitating 100% final thesis completion.",
        "Processed and analyzed 500+ research datasets, improving data readiness for publication by 35%.",
        "Experienced in finding, collecting, cleaning, analyzing, coding, and entering research data increasing paper accuracy by 20%.",
        "Served as a peer reviewer for not less than 7 academic papers and research projects."
      ]
    },
    {
      title: "Administrator, Office of the Assistant Program Coordinator",
      company: "UENR - Computer Engineering Department",
      period: "January 2024 - December 2024",
      achievements: [
        "Maintained accurate records and streamlined communication between 100s of students and faculty.",
        "Optimized scheduling for 3 faculty members by implementing a shared Google Calendar system, reducing meeting conflicts.",
        "Coordinated 4+ departmental workshops, research activities and hackathons."
      ]
    },
    {
      title: "Engineering / Industrial / Field Experience",
      company: "Ghana Grid Company (GridCo)",
      period: "September 2021 - February 2022",
      achievements: [
        "Assisted lines teams in maintaining high-tension power lines, including replacing capacitors on transmission towers, ensuring uninterrupted power distribution.",
        "Performed routine inspections and maintenance of heavy machinery and tools, including diagnosing faults in hydraulic systems and power tools, reducing downtime by 15%.",
        "Maintained inventory of electrical and mechanical tools, tracking issuance/returns and reporting damaged equipment to supervisors for timely repairs.",
        "Documented maintenance logs and tool attrition reports weekly, contributing to audits and resource allocation plans.",
        "Detected and rectified 5 data entry errors in power system models, improving the accuracy of grid simulations.",
        "Tested 15+ protection relays, ensuring 100% operational compliance during audits.",
        "Participated in emergency response drills for power outages, including troubleshooting under pressure and coordinating with teams to restore operations."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-portfolio-navy/95 dark:to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
            <Briefcase className="h-6 w-6" />
          </div>
          <h2 className="section-title text-center mb-3 relative inline-block">
            Professional Experience
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">My professional journey showcases a blend of technical expertise and practical experience in various engineering environments.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={index}
              title={exp.title}
              company={exp.company}
              period={exp.period}
              achievements={exp.achievements}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
