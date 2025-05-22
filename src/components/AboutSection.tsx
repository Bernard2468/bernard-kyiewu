
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface SkillProps {
  name: string;
  proficiency?: number;
}

const SkillCard = ({ name, proficiency = 85 }: SkillProps) => (
  <div className="skill-card">
    <h3 className="font-medium mb-2">{name}</h3>
    <div className="w-full bg-gray-200 dark:bg-portfolio-lightest-navy rounded-full h-2.5">
      <div 
        className="bg-portfolio-amber h-2.5 rounded-full" 
        style={{ width: `${proficiency}%` }}
      ></div>
    </div>
  </div>
);

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('technical');

  const technicalSkills = [
    { name: 'AI Engineering (LLM, NLP)', proficiency: 90 },
    { name: 'Computer Programming', proficiency: 85 },
    { name: 'Web Development', proficiency: 80 },
    { name: 'Proteus & Multisim Simulations', proficiency: 75 },
    { name: 'Networking (TCP/IP, Routing & Switching)', proficiency: 80 },
    { name: 'Embedded Systems (Arduino)', proficiency: 85 },
    { name: 'Research Writing', proficiency: 90 },
    { name: 'Project Management', proficiency: 85 },
    { name: 'System Fault Detection and Troubleshooting', proficiency: 80 },
  ];

  const computerSkills = [
    { name: 'Microsoft Office Suite', proficiency: 95 },
    { name: 'Record Keeping Systems', proficiency: 90 },
    { name: 'File Management and Organization', proficiency: 95 },
    { name: 'Internet and Email Management', proficiency: 100 },
    { name: 'UI/UX Design (Figma)', proficiency: 80 },
  ];

  const behavioralSkills = [
    { name: 'Reliability & Safety-Consciousness', proficiency: 100 },
    { name: 'Communication Skills', proficiency: 90 },
    { name: 'Problem Solving', proficiency: 95 },
    { name: 'Teamwork & Leadership', proficiency: 90 },
    { name: 'Detail-Oriented & Proactive', proficiency: 95 },
  ];

  const interests = [
    { name: 'Artificial Intelligence' },
    { name: 'Neuromorphic Computing' },
    { name: 'Wireless Communication Systems' },
    { name: 'Robotics' },
    { name: 'Computational Modelling' },
    { name: 'Embedded Systems & IoT' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-portfolio-navy">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-10">About Me</h2>

        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-lg text-gray-700 dark:text-portfolio-light-slate mb-6">
            Dynamic and Innovative Computer Engineering Graduate with 2.5+ years of hands-on experience in 
            AI engineering, technology support, technical support, mentoring, and applied research, coupled 
            with a proven ability to bridge technical innovation with real-world solutions.
          </p>
          <p className="text-lg text-gray-700 dark:text-portfolio-light-slate">
            I thrive in teams, mentor junior engineers and students, and rapidly master emerging tools. 
            My ambition is to make a significant impact through creative research and functional collaboration, 
            and I am eager to pursue a career in engineering, academia, and research, contributing to innovative 
            projects that achieve scalable solutions.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="section-subtitle text-center mb-8">My Skills</h3>

          <Tabs 
            defaultValue="technical" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-3xl mx-auto"
          >
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger 
                value="technical"
                className={`${activeTab === 'technical' ? 'bg-portfolio-amber text-white' : ''}`}
              >
                Technical Skills
              </TabsTrigger>
              <TabsTrigger 
                value="computer"
                className={`${activeTab === 'computer' ? 'bg-portfolio-amber text-white' : ''}`}
              >
                Computer Skills
              </TabsTrigger>
              <TabsTrigger 
                value="behavioral"
                className={`${activeTab === 'behavioral' ? 'bg-portfolio-amber text-white' : ''}`}
              >
                Behavioral Skills
              </TabsTrigger>
            </TabsList>

            <TabsContent value="technical" className="animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {technicalSkills.map((skill, index) => (
                  <SkillCard key={index} name={skill.name} proficiency={skill.proficiency} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="computer" className="animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {computerSkills.map((skill, index) => (
                  <SkillCard key={index} name={skill.name} proficiency={skill.proficiency} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="behavioral" className="animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {behavioralSkills.map((skill, index) => (
                  <SkillCard key={index} name={skill.name} proficiency={skill.proficiency} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h3 className="section-subtitle text-center mb-8">Academic Interests</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {interests.map((interest, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-portfolio-light-navy px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-portfolio-lightest-navy text-portfolio-navy dark:text-portfolio-light-slate"
              >
                {interest.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
