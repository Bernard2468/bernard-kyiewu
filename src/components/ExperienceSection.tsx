
import { Badge } from "@/components/ui/badge";

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  achievements: string[];
  isLast?: boolean;
}

const ExperienceItem = ({ title, company, period, achievements, isLast = false }: ExperienceItemProps) => (
  <div className={`timeline-item ${isLast ? 'border-l-transparent' : ''}`}>
    <div className="timeline-dot"></div>
    <div className="ml-4">
      <h3 className="text-xl font-medium text-portfolio-navy dark:text-portfolio-white">{title}</h3>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
        <p className="text-portfolio-amber font-medium">{company}</p>
        <span className="hidden sm:block text-gray-500 dark:text-gray-400">•</span>
        <p className="text-gray-500 dark:text-gray-400">{period}</p>
      </div>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-portfolio-light-slate">
        {achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>
    </div>
  </div>
);

const ExperienceSection = () => {
  const experiences = [
    {
      title: "Junior AI Engineer & Model Trainer | Researcher",
      company: "Reality AI Lab",
      period: "January 2025 - Present",
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
      period: "November 2022 - Present",
      achievements: [
        "Mentored over 100 undergraduate students across computer engineering courses, resulting in a 15% increase in average exam scores.",
        "Held daily office hours to address students' questions and resolving 95% of student queries within 24 hours.",
        "Under the supervision of Dr Samuel Tweneboah-Koduah, organized and delivered comprehensive lecture materials for 5 courses directly supporting 200+ students and contributing to increase in assessment scores."
      ]
    },
    {
      title: "Research Assistant",
      company: "University of Energy and Natural Resources",
      period: "November 2022 - Present",
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
      company: "Computer Engineering Department",
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
    <section id="experience" className="py-20 bg-white dark:bg-portfolio-navy/95">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-14">Professional Experience</h2>

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
