
import { GraduationCap, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EducationSection = () => {
  return (
    <section id="education" className="py-20 bg-white dark:bg-portfolio-navy/95">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-14">Education & Certifications</h2>
        
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white dark:bg-portfolio-light-navy border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-3 text-2xl text-portfolio-navy dark:text-portfolio-white">
                <GraduationCap className="h-6 w-6 text-portfolio-amber" />
                University Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <h3 className="text-xl font-medium text-portfolio-navy dark:text-portfolio-white">
                  Bachelor of Science, Computer Engineering
                </h3>
                <p className="text-base text-portfolio-navy/70 dark:text-portfolio-light-slate">
                  University of Energy and Natural Resources
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  September 2018 – October 2022
                </p>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-portfolio-amber" />
                  <h3 className="font-medium text-lg">Academic Achievements</h3>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-portfolio-light-slate pl-2">
                  <li>Graduated with honors</li>
                  <li>Conducted innovative thesis research on NLP and IoT applications</li>
                  <li>Participated in several engineering competitions</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-portfolio-amber" />
                  <h3 className="font-medium text-lg">Professional Certifications</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-portfolio-lightest-navy/10 p-3 rounded-md">
                    <h4 className="font-medium">Health & Safety Compliance</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ISO Procedures & Standards</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-portfolio-lightest-navy/10 p-3 rounded-md">
                    <h4 className="font-medium">AI Engineering</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">LLM & NLP Specialization</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
