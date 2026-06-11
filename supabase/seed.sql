-- ============================================================================
-- Seed data — ports the previously-hardcoded site content into Supabase.
-- Re-runnable: clears content tables first, then re-inserts.
-- Run AFTER 0001_init.sql. (Does not touch contact_messages or auth users.)
-- ============================================================================

begin;

truncate table
  public.profile, public.experiences, public.projects, public.publications,
  public.education, public.certifications, public.skills, public.interests,
  public.tools, public.talks, public.service, public.posts, public.site_settings
restart identity;

-- ---------------------------------------------------------------------------
-- profile
-- ---------------------------------------------------------------------------
insert into public.profile
  (full_name, headline, roles, hero_tagline, short_bio, long_bio, avatar_url,
   location, email, phone, socials, badges, cv_url)
values (
  'Kyiewu Bernard',
  'Health & Safety Advocate · AI Engineer (LLM, NLP) · Computer Engineer · Front-End Developer',
  array['Health and Safety Advocate','AI Engineer (LLM, NLP)','Computer Engineer','Front End Developer'],
  'Bridging technical innovation with real-world solutions.',
  'Dynamic and innovative Computer Engineering graduate with hands-on experience in AI engineering, front-end development, technology support, volunteering, and applied research, bridging technical innovation with real-world solutions.',
  jsonb_build_array(
    jsonb_build_object('heading','The Engineer''s Odyssey','body','From my first encounter with an Arduino microcontroller to developing AI models for local language processing, I''ve been driven by the fusion of engineering principles and the integration of hardware and software to solve real-world challenges. With a BSc in Computer Engineering, 2.5+ years of research and teaching experience, and proficiency in front-end development (HTML, CSS, React, JavaScript, and Figma for UI/UX design), I bridge the gap between theoretical innovation and practical implementation. My toolkit spans Python, C++, embedded systems, responsive web design, safety advocacy, and AI engineering — always with a focus on scalable, human-centric solutions.'),
    jsonb_build_object('heading','Learning and Building Intelligent Systems','body','I thrive at the intersection of AI and engineering. My thesis project — a Twi speech recognition system achieving 75% accuracy — reflects my passion for democratizing technology through local language NLP. At Reality AI Lab, I reduced LLM hallucinations by 35% using RAG architectures and optimized chatbot latency by 25%. Beyond AI, I''ve crafted intuitive front-end interfaces for IoT dashboards, portfolio websites, and research tools, ensuring seamless user experiences even for complex systems.'),
    jsonb_build_object('heading','Mentorship & Knowledge Sharing','body','As a Teaching Assistant, I mentored 100+ students in web development, analog and digital communication, and other core engineering courses, boosting exam scores by 15% and fostering a culture of collaborative problem-solving. My workshops on AI, front-end frameworks, and C++ for 120+ students reinforced my belief that technology''s true impact lies in empowering others.'),
    jsonb_build_object('heading','Precision Meets Practicality','body','My fieldwork at Ghana Grid Company (GridCo) sharpened my eye for detail — diagnosing hydraulic faults, testing protection relays, and ensuring 100% compliance during audits. These experiences instilled a relentless focus on safety, efficiency, and documentation. I aim to apply these skills in industry settings where safety and accuracy are non-negotiable.'),
    jsonb_build_object('heading','Forward Momentum & Collaboration','body','I am currently exploring neuromorphic computing (a bridge between AI and the study of the human brain), advanced front-end architectures, and wireless communication systems. I am open to roles and collaborations that challenge me and bring about scalable solutions in any industry — whether as a hire, contributor, or research partner.')
  ),
  '/lovable-uploads/9a78f029-10e8-4f2d-b9ae-5b5c450c314b.png',
  'Ghana',
  'kyiewubernard18@gmail.com',
  '+233 20 544 2522',
  jsonb_build_object(
    'linkedin','https://www.linkedin.com/in/kyiewu-bernard/',
    'github','https://github.com/Bernard2468',
    'x','https://x.com/_kbern_',
    'email','mailto:kyiewubernard18@gmail.com'
  ),
  array['Award-Winning Instructor','Entry-Level AI Engineer','Research Specialist','Huawei-Certified Engineer','2.5+ Years of Research Experience'],
  null
);

-- ---------------------------------------------------------------------------
-- experiences
-- ---------------------------------------------------------------------------
insert into public.experiences (title, organization, period, kind, is_current, achievements, sort_order) values
('Research Assistant | APD & PDS Units','Metascholar Consult Limited','May 2025 - Present','research',true, array[
  'Serve as Organization Administrator for Turnitin and iThenticate, overseeing academic integrity and plagiarism detection services for clients',
  'Provide support in thesis correction, proposal development, and project writing for B.Sc., Masters, and PhD students',
  'Develop and maintain websites, software, and digital learning platforms for academic and professional use',
  'Deliver editing, proofreading, systematic reviews and academic article writing services tailored for publications and presentations',
  'Offer remote IT support and contribute to AI engineering tasks, including facilitation of online courses and workshops'
],10),
('Junior AI Engineer & Model Trainer | Researcher','Reality AI Lab','January 2025 - May 2025','work',false, array[
  'Developed a predictive AI model chatbot improving accuracy by 30% and reducing latency by 25%',
  'Engineered automated data preprocessing workflows using techniques such as tokenization and embeddings',
  'Conducted research focused on implementing retrieval-augmented generation (RAG) architectures reducing LLM hallucinations by 35%',
  'Collaborated with a team of 5 engineers to benchmark and deploy Hugging Face''s pre-trained LLMs across 3 production environments'
],20),
('Teaching Assistant','University of Energy and Natural Resources','November 2022 - December 2024','teaching',false, array[
  'Mentored over 100 undergraduate students across computer engineering courses, resulting in a 15% increase in average exam scores',
  'Held daily office hours to address students'' questions, resolving 95% of student queries within 24 hours',
  'Under the supervision of Dr Samuel Tweneboah-Koduah, organized and delivered comprehensive lecture materials for 5 courses, directly supporting 200+ students'
],30),
('Research Assistant','University of Energy and Natural Resources','November 2022 - December 2024','research',false, array[
  'Performed literature searches and co-edited 3 peer-reviewed manuscripts on advanced wireless communication systems',
  'Guided over 15 students in research work, facilitating 100% final thesis completion',
  'Processed and analyzed 500+ research datasets, improving data readiness for publication by 35%',
  'Experienced in finding, collecting, cleaning, analyzing, coding, and entering research data, increasing paper accuracy by 20%',
  'Served as a peer reviewer for not less than 7 academic papers and research projects'
],40),
('Administrator, Office of the Assistant Program Coordinator','UENR — Computer Engineering Department','January 2024 - December 2024','admin',false, array[
  'Maintained accurate records and streamlined communication between hundreds of students and faculty',
  'Optimized scheduling for 3 faculty members by implementing a shared Google Calendar system, reducing meeting conflicts',
  'Coordinated 4+ departmental workshops, research activities and hackathons'
],50),
('Engineering / Industrial / Field Experience','Ghana Grid Company (GridCo)','September 2021 - February 2022','field',false, array[
  'Assisted lines teams in maintaining high-tension power lines, including replacing capacitors on transmission towers, ensuring uninterrupted power distribution',
  'Performed routine inspections and maintenance of heavy machinery and tools, including diagnosing faults in hydraulic systems and power tools, reducing downtime by 15%',
  'Maintained inventory of electrical and mechanical tools, tracking issuance/returns and reporting damaged equipment to supervisors',
  'Documented maintenance logs and tool attrition reports weekly, contributing to audits and resource allocation plans',
  'Detected and rectified 5 data entry errors in power system models, improving the accuracy of grid simulations',
  'Tested 15+ protection relays, ensuring 100% operational compliance during audits',
  'Participated in emergency response drills for power outages, troubleshooting under pressure and coordinating with teams to restore operations'
],60);

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
insert into public.projects (title, slug, summary, description, tech, achievement, featured, sort_order) values
('Twi (Local Language) Speech Recognition System','twi-speech-recognition',
 'An NLP-based speech recognition system for the Twi language, enhancing accessibility for local language speakers.',
 'Applied NLP principles to develop a speech recognition system for Twi language, enhancing accessibility for local language speakers.',
 array['NLP','Speech Recognition','Machine Learning','Python','TensorFlow'],
 '85% accuracy on a dataset of 10,000+ speech samples', true, 10),
('IoT-Enabled Predictive Maintenance System','iot-predictive-maintenance',
 'An IoT system for industrial equipment that predicts maintenance needs before failures occur.',
 'Developed an IoT system for industrial equipment that predicts maintenance needs before failures occur, reducing equipment downtime.',
 array['IoT','Predictive Analytics','Machine Learning','Arduino','Cloud Computing'],
 '15% reduction in maintenance downtime', true, 20),
('Non-Orthogonal Multiple Access in 5G Networks','noma-5g',
 'Research on implementing NOMA techniques in 5G networks to improve spectral efficiency.',
 'Research on implementing NOMA techniques in 5G networks to improve spectral efficiency and support more simultaneous users.',
 array['5G','NOMA','Signal Processing','Wireless Communication','MATLAB'],
 'Aided in preparing a manuscript on a novel approach to NOMA implementation', false, 30),
('Secure Communication System Using Public Key Cryptography','secure-comms-pki',
 'A secure communication system using public key infrastructure for encrypted data transmission.',
 'Designed and implemented a secure communication system using public key infrastructure to ensure encrypted data transmission.',
 array['Cryptography','Network Security','Python','Algorithms','PKI'],
 'Successful implementation with 79.9% data integrity', false, 40);

-- ---------------------------------------------------------------------------
-- publications (derived from research experience / projects)
-- ---------------------------------------------------------------------------
insert into public.publications (title, authors, venue, year, kind, status, abstract, sort_order) values
('Development of a Speech Recognition System in Twi using NLP Principles','Kyiewu Bernard; Tweneboah-Koduah, S. (Supervisor)','BSc Thesis, University of Energy and Natural Resources',2022,'manuscript','published',
 'A speech recognition system for the Twi language built on NLP principles, achieving up to 85% accuracy on a dataset of 10,000+ samples to improve accessibility for local-language speakers.',10),
('A Novel Approach to Non-Orthogonal Multiple Access (NOMA) Implementation in 5G Networks','Research group, University of Energy and Natural Resources','Manuscript in preparation',2024,'conference','under-review',
 'Investigates NOMA techniques to improve spectral efficiency and support a greater number of simultaneous users in 5G networks.',20);

-- ---------------------------------------------------------------------------
-- education
-- ---------------------------------------------------------------------------
insert into public.education (degree, institution, field, period, thesis_title, thesis_supervisor, achievements, sort_order) values
('Bachelor of Science, Computer Engineering','University of Energy and Natural Resources','Computer Engineering','September 2018 – October 2022',
 'Development of Speech Recognition System in Twi using NLP Principles','Dr. Samuel Tweneboah-Koduah, PhD', array[
   'Conducted innovative thesis research on IoT applications',
   'Participated in several engineering competitions and symposiums',
   'Actively participated at the 4th Annual AI Symposium (University of South Dakota)',
   'Recipient of the Engineering Eminence Award for Teaching/Research'
 ],10);

-- ---------------------------------------------------------------------------
-- certifications
-- ---------------------------------------------------------------------------
insert into public.certifications (name, issuer, year, sort_order) values
('Huawei-Certified Engineer','Huawei',null,10);

-- ---------------------------------------------------------------------------
-- skills
-- ---------------------------------------------------------------------------
insert into public.skills (category, name, proficiency, sort_order) values
('technical','AI Engineering (LLM, NLP)',75,10),
('technical','Computer Programming',80,20),
('technical','Front End Web Development',90,30),
('technical','Proteus & Multisim Simulations',75,40),
('technical','Networking (TCP/IP, Routing & Switching)',65,50),
('technical','Embedded Systems (Arduino)',85,60),
('technical','Research Writing',90,70),
('technical','Project Management',85,80),
('technical','System Fault Detection and Troubleshooting',80,90),
('computer','Microsoft Office Suite',95,10),
('computer','Record Keeping Systems',90,20),
('computer','File Management and Organization',95,30),
('computer','Internet and Email Management',100,40),
('computer','UI/UX Design (Figma)',80,50),
('behavioral','Reliability & Safety-Consciousness',100,10),
('behavioral','Communication Skills',90,20),
('behavioral','Problem Solving',95,30),
('behavioral','Teamwork & Leadership',90,40),
('behavioral','Detail-Oriented & Proactive',95,50),
('behavioral','Organizational Skills',90,60);

-- ---------------------------------------------------------------------------
-- interests
-- ---------------------------------------------------------------------------
insert into public.interests (name, sort_order) values
('Artificial Intelligence',10),
('Neuromorphic Computing',20),
('Wireless Communication Systems',30),
('Robotics',40),
('Computational Modelling',50),
('Embedded Systems & IoT',60);

-- ---------------------------------------------------------------------------
-- tools (icon_slug = react-icons slug; resolver maps unknowns to a default)
-- ---------------------------------------------------------------------------
insert into public.tools (category, name, icon_slug, sort_order) values
('Languages','Python','SiPython',10),
('Languages','C++','SiCplusplus',20),
('Languages','JavaScript','SiJavascript',30),
('Languages','HTML5','SiHtml5',40),
('Languages','CSS3','SiCss3',50),
('AI & ML Tools','MATLAB','FaCalculator',10),
('AI & ML Tools','TensorFlow','SiTensorflow',20),
('AI & ML Tools','PyTorch','SiPytorch',30),
('AI & ML Tools','Pandas','SiPandas',40),
('Development','VS Code','FaLaptopCode',10),
('Development','Git','SiGit',20),
('Development','GitHub','SiGithub',30),
('Development','Docker','SiDocker',40),
('Development','Formspree','SiFormspree',50),
('Embedded & IoT','Arduino','SiArduino',10),
('Embedded & IoT','Raspberry Pi','SiRaspberrypi',20),
('Embedded & IoT','Proteus','SiProteus',30),
('Embedded & IoT','Multisim','SiMultisim',40),
('AI Web Tools','Cursor AI','FaCode',10),
('AI Web Tools','ChatGPT','SiOpenai',20),
('AI Web Tools','Figma','SiFigma',30),
('Other','Simulink','FaCalculator',10),
('Other','AutoCAD','SiAutodesk',20),
('Other','WordPress','SiWordpress',30),
('Other','Huawei Tools','SiHuawei',40),
('Other','Perplexity','SiPerplexity',50);

-- ---------------------------------------------------------------------------
-- talks & workshops (derived from outreach / volunteering)
-- ---------------------------------------------------------------------------
insert into public.talks (title, event, venue, audience_size, kind, description, sort_order) values
('AI and Engineering Workshops for Senior High Students','Outreach Program','Sunyani Municipality',70,'workshop',
 'Conducted AI and engineering workshops for over 70 Senior High School students within the Sunyani municipality.',10),
('AI and Embedded Systems Technical Workshops','University Workshop Series','University of Energy and Natural Resources',120,'workshop',
 'Delivered 8 workshops attended by 120+ students on AI and embedded systems.',20),
('Safety, PPE Usage & Hazard Awareness Session','Engineering Orientation','University of Energy and Natural Resources',100,'talk',
 'Conducted sessions on PPE usage and hazard awareness for 100+ first-year engineering students.',30);

-- ---------------------------------------------------------------------------
-- service (volunteer & leadership)
-- ---------------------------------------------------------------------------
insert into public.service (title, organization, description, icon_slug, sort_order) values
('AI and Engineering Workshops','Community Outreach','Conducted AI and engineering workshops for over 70 Senior High School students within Sunyani municipality.','Users',10),
('Student Tutoring','University of Energy and Natural Resources','Tutored students in the basics of microcontrollers (Arduino), C++, and web development, with 80% reporting improved technical proficiency.','School',20),
('Technical Workshops','University of Energy and Natural Resources','Conducted 8 workshops attended by 120+ students on AI and embedded systems.','Users',30),
('Event Coordination','UENR — Computer Engineering Department','Coordinated over 10 successful events and workshops throughout the year, increasing participant engagement by 40% through targeted communication strategies.','Users',40),
('Safety Workshops','University of Energy and Natural Resources','Conducted sessions on PPE usage and hazard awareness for 100+ first-year engineering students.','ShieldCheck',50);

-- ---------------------------------------------------------------------------
-- posts (one sample so the blog isn't empty; published)
-- ---------------------------------------------------------------------------
insert into public.posts (title, slug, excerpt, body, tags, published, published_at) values
('Welcome to my new portfolio','welcome',
 'A quick note on why I rebuilt this site and what you''ll find here.',
 E'I rebuilt this portfolio to better share my work across AI engineering, computer engineering, research, and teaching.\n\nOver the coming weeks I''ll be writing about local-language NLP, embedded systems, and lessons from mentoring students. Thanks for stopping by.',
 array['announcement'], true, now());

-- ---------------------------------------------------------------------------
-- site_settings
-- ---------------------------------------------------------------------------
insert into public.site_settings (seo_title, seo_description, default_theme) values
('Kyiewu Bernard — AI Engineer, Computer Engineer & Health and Safety Advocate',
 'Portfolio of Kyiewu Bernard: AI engineering (LLM, NLP), computer engineering, applied research, teaching, and health & safety advocacy.',
 'light');

commit;
