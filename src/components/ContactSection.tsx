
import { useState } from 'react';
import { Phone, Mail, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-portfolio-navy/95">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-14">Contact Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div>
            <h3 className="section-subtitle mb-6">Let's Connect</h3>
            <p className="text-gray-700 dark:text-portfolio-light-slate mb-8">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-portfolio-amber/10 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-portfolio-amber" />
                </div>
                <div>
                  <h4 className="font-medium text-portfolio-navy dark:text-portfolio-white">Email</h4>
                  <a 
                    href="mailto:kyiewubernard18@gmail.com" 
                    className="text-gray-600 dark:text-portfolio-light-slate hover:text-portfolio-amber dark:hover:text-portfolio-amber transition-colors"
                  >
                    kyiewubernard18@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-portfolio-amber/10 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-portfolio-amber" />
                </div>
                <div>
                  <h4 className="font-medium text-portfolio-navy dark:text-portfolio-white">Phone</h4>
                  <a 
                    href="tel:+233205442522" 
                    className="text-gray-600 dark:text-portfolio-light-slate hover:text-portfolio-amber dark:hover:text-portfolio-amber transition-colors"
                  >
                    +233 20 544 2522
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-portfolio-amber/10 p-3 rounded-full mr-4">
                  <Linkedin className="h-6 w-6 text-portfolio-amber" />
                </div>
                <div>
                  <h4 className="font-medium text-portfolio-navy dark:text-portfolio-white">LinkedIn</h4>
                  <a 
                    href="https://www.linkedin.com/in/kyiewu-bernard/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-portfolio-light-slate hover:text-portfolio-amber dark:hover:text-portfolio-amber transition-colors"
                  >
                    linkedin.com/in/kyiewu-bernard
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white dark:bg-portfolio-light-navy rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-portfolio-navy dark:text-portfolio-white mb-6">
              Send Me a Message
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="contact-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    className="contact-input"
                  />
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="contact-input"
                />
              </div>
              
              <div className="space-y-2 mb-6">
                <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  required
                  className="contact-input min-h-[150px]"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-portfolio-amber hover:bg-portfolio-dark-amber text-white font-medium py-2 px-4 rounded-md flex items-center justify-center"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
