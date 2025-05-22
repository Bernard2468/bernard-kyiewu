
import { Users, School, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const VolunteerCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType, 
  title: string, 
  description: string 
}) => (
  <Card className="bg-white dark:bg-portfolio-light-navy border-none shadow-md hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex flex-col items-center text-center">
        <div className="bg-portfolio-amber/10 p-3 rounded-full mb-4">
          <Icon className="h-6 w-6 text-portfolio-amber" />
        </div>
        <h3 className="text-lg font-medium text-portfolio-navy dark:text-portfolio-white mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-portfolio-light-slate">{description}</p>
      </div>
    </CardContent>
  </Card>
);

const VolunteerSection = () => {
  const volunteerActivities = [
    {
      icon: Users,
      title: "AI and Engineering Workshops",
      description: "Conducted AI and Engineering workshops for over 70 Senior High School students within Sunyani municipality."
    },
    {
      icon: School,
      title: "Student Tutoring",
      description: "Tutored students in the basics of microcontrollers (Arduino), C++, and web development with 80% reporting improved technical proficiency."
    },
    {
      icon: Users,
      title: "Technical Workshops",
      description: "Conducted 8 workshops attended by 120+ students on AI and embedded systems."
    },
    {
      icon: Users,
      title: "Event Coordination",
      description: "Coordinated over 10 successful events and workshops throughout the year, increasing participant engagement by 40% through targeted communication strategies."
    },
    {
      icon: ShieldCheck,
      title: "Safety Workshops",
      description: "Conducted sessions on PPE usage and hazard awareness for 100+ first year engineering students."
    }
  ];

  return (
    <section id="volunteer" className="py-20 bg-gray-50 dark:bg-portfolio-navy/90">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-14">Volunteer & Leadership</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {volunteerActivities.map((activity, index) => (
            <VolunteerCard 
              key={index}
              icon={activity.icon}
              title={activity.title}
              description={activity.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
