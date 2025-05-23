
import { GraduationCap, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EducationSection = () => {
  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-portfolio-navy/90">
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
                {/* Add thesis supervisor directly under degree */}
                 <p className="text-sm italic text-portfolio-navy/60 dark:text-portfolio-light-slate/80 mt-1">
                  Thesis Supervisor: <span className="font-semibold">Dr. Samuel Tweneboah-Koduah, PhD</span>
                </p>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-portfolio-amber" />
                  <h3 className="font-medium text-lg">Academic Achievements</h3>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-portfolio-light-slate pl-2">
                  <li>Conducted innovative thesis research on IoT applications</li>
                  <li>Participated in several engineering competitions and symposiums</li>
                  <li>
                   <span className="font-medium">Thesis</span>: "Development of Speech Recognition System in Twi using NLP Principles" 
                    <span className="italic text-sm ml-1">(Supervised by Dr. Samuel Tweneboah-Koduah)</span>
                  </li>
                  <li>Actively participated at the 4th Annual AI Symposium (University of South Dakota)</li>
                  <li>Recipient of the <span className="font-medium">Engineering Eminence Award</span> for Teaching/Research</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
