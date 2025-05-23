import { useState } from 'react';
import { 
  SiPython, SiCplusplus, SiJavascript, SiHtml5, SiCss3,
  SiTensorflow, SiPytorch, SiPandas, SiMultisim,
  SiGit, SiGithub, SiDocker, SiProteus, SiPerplexity,
  SiArduino, SiRaspberrypi, SiAutodesk, SiFormspree,
  SiOpenai, SiFigma, SiWordpress, SiHuawei
} from 'react-icons/si';
import { 
  FaSearch, 
  FaChevronDown, 
  FaCode, 
  FaCalculator,
  FaLaptopCode 
} from 'react-icons/fa';
import { Input } from '@/components/ui/input';

interface Tool {
  name: string;
  icon: React.ElementType;
}

interface ToolCategory {
  name: string;
  tools: Tool[];
  isExpanded?: boolean;
}

const ToolsSection = () => {
  const toolCategories: ToolCategory[] = [
    {
      name: "Languages",
      tools: [
        { name: "Python", icon: SiPython },
        { name: "C++", icon: SiCplusplus },
        { name: "JavaScript", icon: SiJavascript },
        { name: "HTML5", icon: SiHtml5 },
        { name: "CSS3", icon: SiCss3 },
      ],
    },
    {
      name: "AI & ML Tools",
      tools: [
        { name: "MATLAB", icon: FaCalculator },
        { name: "TensorFlow", icon: SiTensorflow },
        { name: "PyTorch", icon: SiPytorch },
        { name: "Pandas", icon: SiPandas },
      ],
    },
    {
      name: "Development",
      tools: [
        { name: "VS Code", icon: FaLaptopCode },
        { name: "Git", icon: SiGit },
        { name: "GitHub", icon: SiGithub },
        { name: "Docker", icon: SiDocker },
        { name: "Formspree", icon: SiFormspree },
      ],
    },
    {
      name: "Embedded & IoT",
      tools: [
        { name: "Arduino", icon: SiArduino },
        { name: "Raspberry Pi", icon: SiRaspberrypi },
        { name: "Proteus", icon: SiProteus },
        { name: "Multisim", icon: SiMultisim },
      ],
    },
    {
      name: "AI Web Tools",
      tools: [
        { name: "Cursor AI", icon: FaCode },
        { name: "ChatGPT", icon: SiOpenai },
        { name: "Figma", icon: SiFigma },
      ],
    },
    {
      name: "Other",
      tools: [
        { name: "Simulink", icon: FaCalculator },
        { name: "AutoCAD", icon: SiAutodesk },
        { name: "WordPress", icon: SiWordpress },
        { name: "Huawei Tools", icon: SiHuawei },
        { name: "Perplexity", icon: SiPerplexity },
      ],
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(toolCategories.map(cat => [cat.name, true]))
  );

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const filteredCategories = toolCategories.map(category => ({
    ...category,
    tools: category.tools.filter(tool =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.tools.length > 0);

  return (
    <section id="tools" className="py-20 bg-white dark:bg-portfolio-navy/95">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-8">Tools & Technologies</h2>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search tools or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full bg-white dark:bg-portfolio-light-navy border-gray-200 dark:border-portfolio-lightest-navy focus:ring-portfolio-amber focus:border-portfolio-amber"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.name}
              className="bg-white dark:bg-portfolio-light-navy rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full p-4 flex items-center justify-between bg-gray-50 dark:bg-portfolio-lightest-navy"
              >
                <h3 className="text-lg font-semibold text-portfolio-navy dark:text-portfolio-white">
                  {category.name}
                </h3>
                <FaChevronDown
                  className={`transform transition-transform duration-300 ${
                    expandedCategories[category.name] ? 'rotate-180' : ''
                  } text-portfolio-amber`}
                />
              </button>

              {expandedCategories[category.name] && (
                <div className="p-4 grid grid-cols-2 gap-4">
                  {category.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex flex-col items-center p-3 rounded-lg bg-gray-50 dark:bg-portfolio-lightest-navy/50 hover:scale-105 transition-transform duration-300"
                    >
                      <tool.icon className="w-8 h-8 text-portfolio-amber mb-2" />
                      <span className="text-sm text-center text-portfolio-navy dark:text-portfolio-light-slate">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection; 