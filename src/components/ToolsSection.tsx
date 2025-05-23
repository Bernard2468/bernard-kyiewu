
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';

// Icons for categories
import { 
  Terminal, 
  Code,
  Brain,
  TerminalSquare,
  GitBranch,
  Cpu,
  Bot,
  Wrench
} from 'lucide-react';

// Define tool types and interfaces
interface Tool {
  name: string;
  icon: React.ReactNode;
  description: string;
  proficiency?: number; // 0-100
}

interface ToolCategory {
  name: string;
  icon: React.ReactNode;
  tools: Tool[];
}

const ToolsSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Languages']);

  // Tool categories with their respective tools
  const toolCategories: ToolCategory[] = [
    {
      name: "Languages",
      icon: <Code className="h-5 w-5" />,
      tools: [
        { 
          name: "Python", 
          icon: <Terminal className="h-5 w-5 text-blue-500" />,
          description: "Primary language for AI/ML development and data analysis"
        },
        { 
          name: "C++", 
          icon: <Terminal className="h-5 w-5 text-blue-700" />,
          description: "Used for embedded systems and performance-critical applications"
        },
        { 
          name: "JavaScript", 
          icon: <Terminal className="h-5 w-5 text-yellow-500" />,
          description: "Web development and interactive applications"
        },
        { 
          name: "HTML5", 
          icon: <Terminal className="h-5 w-5 text-orange-500" />,
          description: "Markup language for web page structure"
        },
        { 
          name: "CSS3", 
          icon: <Terminal className="h-5 w-5 text-blue-400" />,
          description: "Styling language for web pages"
        },
      ]
    },
    {
      name: "AI & ML Tools",
      icon: <Brain className="h-5 w-5" />,
      tools: [
        { 
          name: "MATLAB", 
          icon: <Terminal className="h-5 w-5 text-orange-600" />,
          description: "For mathematical modeling and signal processing"
        },
        { 
          name: "TensorFlow", 
          icon: <Terminal className="h-5 w-5 text-orange-500" />,
          description: "Deep learning framework for building AI models"
        },
        { 
          name: "PyTorch", 
          icon: <Terminal className="h-5 w-5 text-red-500" />,
          description: "Deep learning library for research and production"
        },
        { 
          name: "Pandas", 
          icon: <Terminal className="h-5 w-5 text-purple-500" />,
          description: "Data manipulation and analysis library"
        }
      ]
    },
    {
      name: "Development",
      icon: <TerminalSquare className="h-5 w-5" />,
      tools: [
        { 
          name: "VS Code", 
          icon: <Terminal className="h-5 w-5 text-blue-600" />,
          description: "Primary code editor and development environment"
        },
        { 
          name: "Git", 
          icon: <GitBranch className="h-5 w-5 text-orange-700" />,
          description: "Version control system"
        },
        { 
          name: "GitHub", 
          icon: <Terminal className="h-5 w-5 text-gray-800 dark:text-gray-200" />,
          description: "Code hosting and collaboration platform"
        },
        { 
          name: "Docker", 
          icon: <Terminal className="h-5 w-5 text-blue-600" />,
          description: "Containerization platform for application deployment"
        }
      ]
    },
    {
      name: "Embedded & IoT",
      icon: <Cpu className="h-5 w-5" />,
      tools: [
        { 
          name: "Arduino", 
          icon: <Terminal className="h-5 w-5 text-teal-500" />,
          description: "Microcontroller platform for physical computing"
        },
        { 
          name: "Raspberry Pi", 
          icon: <Terminal className="h-5 w-5 text-red-500" />,
          description: "Single-board computer for IoT applications"
        },
        { 
          name: "Proteus", 
          icon: <Terminal className="h-5 w-5 text-blue-400" />,
          description: "Circuit simulation and PCB design"
        },
        { 
          name: "Multisim", 
          icon: <Terminal className="h-5 w-5 text-yellow-600" />,
          description: "Circuit design and simulation tool"
        }
      ]
    },
    {
      name: "AI Web Tools",
      icon: <Bot className="h-5 w-5" />,
      tools: [
        { 
          name: "Cursor AI", 
          icon: <Terminal className="h-5 w-5 text-purple-600" />,
          description: "AI-powered code editor"
        },
        { 
          name: "ChatGPT", 
          icon: <Terminal className="h-5 w-5 text-green-500" />,
          description: "AI language model for text generation and assistance"
        },
        { 
          name: "Figma", 
          icon: <Terminal className="h-5 w-5 text-purple-500" />,
          description: "Design and prototyping tool"
        }
      ]
    },
    {
      name: "Other Tools",
      icon: <Wrench className="h-5 w-5" />,
      tools: [
        { 
          name: "Simulink", 
          icon: <Terminal className="h-5 w-5 text-orange-500" />,
          description: "Block diagram environment for multi-domain simulation"
        },
        { 
          name: "AutoCAD", 
          icon: <Terminal className="h-5 w-5 text-red-600" />,
          description: "Computer-aided design software"
        },
        { 
          name: "WordPress", 
          icon: <Terminal className="h-5 w-5 text-blue-600" />,
          description: "Content management system for website building"
        },
        { 
          name: "Huawei Networking Tools", 
          icon: <Terminal className="h-5 w-5 text-red-500" />,
          description: "Networking configuration and management tools"
        }
      ]
    }
  ];

  // Toggle a category's expanded state
  const toggleCategory = (categoryName: string) => {
    if (expandedCategories.includes(categoryName)) {
      setExpandedCategories(expandedCategories.filter(cat => cat !== categoryName));
    } else {
      setExpandedCategories([...expandedCategories, categoryName]);
    }
  };

  // Filter tools based on search query
  const filteredCategories = toolCategories.map(category => {
    const filteredTools = category.tools.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...category, tools: filteredTools };
  }).filter(category => category.tools.length > 0);

  return (
    <section id="tools" className="py-20 bg-white dark:bg-portfolio-navy/95">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-8">Tools & Technologies</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          A curated collection of languages, frameworks, and tools I use to bring ideas to life.
        </p>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search tools..."
              className="pl-10 bg-white dark:bg-portfolio-light-navy border-gray-200 dark:border-gray-700 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tools grid using Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="multiple" className="space-y-4">
            {filteredCategories.map((category) => (
              <AccordionItem 
                key={category.name} 
                value={category.name}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-portfolio-light-navy"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 dark:hover:bg-portfolio-lightest-navy/10">
                  <div className="flex items-center gap-2 text-left">
                    <div className="bg-portfolio-amber/10 p-2 rounded-full">
                      {category.icon}
                    </div>
                    <span className="font-medium text-lg">{category.name}</span>
                    <Badge variant="outline" className="ml-2 text-xs bg-gray-100 dark:bg-gray-800">
                      {category.tools.length}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {category.tools.map((tool) => (
                      <HoverCard key={tool.name}>
                        <HoverCardTrigger asChild>
                          <div 
                            className="flex flex-col items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-portfolio-lightest-navy/10 hover:shadow-md hover:scale-105 transition-all cursor-pointer"
                          >
                            <div className="p-2 rounded-full bg-white dark:bg-portfolio-light-navy shadow-sm mb-2">
                              {tool.icon}
                            </div>
                            <span className="text-sm font-medium text-center">{tool.name}</span>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64">
                          <div className="flex justify-between space-x-4">
                            <div>
                              <h4 className="text-sm font-semibold">{tool.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {tool.description}
                              </p>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
