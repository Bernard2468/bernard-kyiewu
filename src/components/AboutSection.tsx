import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { ChartBar, Computer, Users, Star } from 'lucide-react';

interface SkillProps {
  name: string;
  proficiency?: number;
}

const SkillCard = ({ name, proficiency = 85 }: SkillProps) => {
  const progressVariants = {
    hidden: { width: 0 },
    visible: { width: `${proficiency}%` }
  };

  return (
    <motion.div 
      className="skill-card hover:transform hover:scale-105 transition-all duration-300 bg-white dark:bg-portfolio-light-navy border border-gray-100 dark:border-gray-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 p-5 rounded-lg shadow-md hover:shadow-xl"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="font-medium mb-3 text-gray-800 dark:text-white">{name}</h3>
      <div className="w-full bg-gray-200 dark:bg-portfolio-lightest-navy rounded-full h-2.5 overflow-hidden">
        <motion.div 
          className="bg-gradient-to-r from-blue-500 to-blue-700 h-2.5 rounded-full shadow-inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={progressVariants}
          transition={{ duration: 1, ease: "easeOut" }}
        ></motion.div>
      </div>
      <div className="flex justify-end mt-2">
        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{proficiency}%</span>
      </div>
    </motion.div>
  );
};

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('technical');

  const technicalSkills = [
    { name: 'AI Engineering (LLM, NLP)', proficiency: 75 },
    { name: 'Computer Programming', proficiency: 80 },
    { name: 'Front End Web Development', proficiency: 90 },
    { name: 'Proteus & Multisim Simulations', proficiency: 75 },
    { name: 'Networking (TCP/IP, Routing & Switching)', proficiency: 65 },
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
    { name: 'Organizational Skills', proficiency: 90 },
  ];

  const interests = [
    { name: 'Artificial Intelligence' },
    { name: 'Neuromorphic Computing' },
    { name: 'Wireless Communication Systems' },
    { name: 'Robotics' },
    { name: 'Computational Modelling' },
    { name: 'Embedded Systems & IoT' },
  ];

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const iconMap = {
    technical: <ChartBar className="h-5 w-5" />,
    computer: <Computer className="h-5 w-5" />,
    behavioral: <Users className="h-5 w-5" />
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-portfolio-navy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
            <Users className="h-6 w-6" />
          </div>
          <h2 className="section-title text-center mb-3 relative inline-block">
            About Me
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <motion.p 
            className="text-lg text-gray-700 dark:text-portfolio-light-slate mb-12 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Dynamic and Innovative Computer Engineering Graduate. I thrive in teams, mentor junior engineers and students, 
            and rapidly master emerging tools. My ambition is to make a significant impact through creative research and functional collaboration, 
            and I am eager to pursue a career in engineering, academia, and research, contributing to innovative 
            projects that achieve scalable solutions.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              className="bg-white dark:bg-portfolio-light-navy p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold text-portfolio-navy dark:text-portfolio-white mb-4 border-b border-blue-200 dark:border-blue-800 pb-2">
                The Engineer's Odyssey
              </h3>
              <p className="text-gray-700 dark:text-portfolio-light-slate text-center">
                From my first encounter with an Arduino microcontroller to developing AI models for local language processing, I've been driven by the fusion of engineering principles and the integration of hardware and software to solve real-world challenges. 
                With a BSc in Computer Engineering, 2.5+ years of research and teaching experience, and proficiency in front-end development (HTML,CSS,React, JavaScript, and Figma for UI/UX design), I bridge the gap between theoretical innovation and practical implementation. 
                My toolkit spans Python, C++, embedded systems, responsive web design,safety advocacy, and AI engineering—always with a focus on scalable, human-centric solutions.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-portfolio-light-navy p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold text-portfolio-navy dark:text-portfolio-white mb-4 border-b border-blue-200 dark:border-blue-800 pb-2">
                Learning and Building Intelligent Systems
              </h3>
              <p className="text-gray-700 dark:text-portfolio-light-slate text-center">
                I thrive at the intersection of AI and engineering. My thesis project—a Twi speech recognition system achieving 75% accuracy—reflects my passion for democratizing technology through local language NLP. 
                At Reality AI Lab, I reduced LLM hallucinations by 35% using RAG architectures and optimized chatbot latency by 25%. Beyond AI, I've crafted intuitive front-end interfaces for IoT dashboards,portfolio websites, and research tools, 
                ensuring seamless user experiences even for complex systems. Whether it's predictive maintenance for industrial IoT or securing 5G networks, I aid in engineering systems that learn, adapt, and endure.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-portfolio-light-navy p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold text-portfolio-navy dark:text-portfolio-white mb-4 border-b border-blue-200 dark:border-blue-800 pb-2">
                Mentorship & Knowledge Sharing
              </h3>
              <p className="text-gray-700 dark:text-portfolio-light-slate text-center">
                As a Teaching Assistant, I mentored 100+ students in web development, analog and digital communication, and other core engineering courses/concepts, boosting exam scores by 15% and fostering a culture of collaborative problem-solving. 
                My workshops on AI, front-end frameworks, and C++ for 120+ students reinforced my belief that technology's true impact lies in empowering others.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-portfolio-light-navy p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold text-portfolio-navy dark:text-portfolio-white mb-4 border-b border-blue-200 dark:border-blue-800 pb-2">
                Precision Meets Practicality
              </h3>
              <p className="text-gray-700 dark:text-portfolio-light-slate text-center">
                My fieldwork at Ghana Grid Company (GridCo) sharpened my eye for detail—diagnosing hydraulic faults, testing protection relays, and ensuring 100% compliance during audits. 
                These experiences instilled a relentless focus on safety, efficiency, and documentation—principles. I am aiming to apply this skills in industry settings where safety, and accuracy is non-negotiable.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-portfolio-light-navy p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold text-portfolio-navy dark:text-portfolio-white mb-4 border-b border-blue-200 dark:border-blue-800 pb-2">
                Forward Momentum & Collaboration
              </h3>
              <p className="text-gray-700 dark:text-portfolio-light-slate text-center">
                I am currently exploring neuromorphic computing (a bridge between AI and the study of human brain), advanced front-end architectures, and wireless communication systems.
                I am open to roles and collaborations that challenge me, and bring about scalable solutions in any industry, and merge AI with elegant interfaces—whether as a hire, contributor, or research partner.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-block p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
              <Star className="h-6 w-6" />
            </div>
            <h3 className="section-subtitle text-center mb-3 relative inline-block">
              My Skills
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">A comprehensive overview of my technical abilities and professional competencies.</p>
          </div>

          <Tabs 
            defaultValue="technical" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-4xl mx-auto"
          >
            <TabsList className="grid grid-cols-3 mb-10 bg-gray-100 dark:bg-portfolio-lightest-navy/20 p-1 rounded-full">
              {['technical', 'computer', 'behavioral'].map(tab => (
                <TabsTrigger 
                  key={tab}
                  value={tab}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-white dark:bg-blue-600 text-blue-700 dark:text-white shadow-lg' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {tab === 'technical' && iconMap.technical}
                  {tab === 'computer' && iconMap.computer}
                  {tab === 'behavioral' && iconMap.behavioral}
                  <span className="capitalize">{tab} Skills</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {['technical', 'computer', 'behavioral'].map(tabValue => (
              <TabsContent key={tabValue} value={tabValue} className="animate-fade-in">
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={tabVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {tabValue === 'technical' && technicalSkills.map((skill, index) => (
                    <SkillCard key={index} name={skill.name} proficiency={skill.proficiency} />
                  ))}
                  
                  {tabValue === 'computer' && computerSkills.map((skill, index) => (
                    <SkillCard key={index} name={skill.name} proficiency={skill.proficiency} />
                  ))}
                  
                  {tabValue === 'behavioral' && behavioralSkills.map((skill, index) => (
                    <SkillCard key={index} name={skill.name} proficiency={skill.proficiency} />
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div>
          <h3 className="section-subtitle text-center mb-8 relative inline-block">
            Academic Interests
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {interests.map((interest, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-portfolio-light-navy px-5 py-2.5 rounded-full shadow-md border border-gray-200 dark:border-portfolio-lightest-navy text-portfolio-navy dark:text-portfolio-light-slate hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                {interest.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
