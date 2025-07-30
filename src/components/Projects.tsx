import React from 'react';
import { Github, ExternalLink, Code, Shield, Terminal, Database } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      name: '3xF Audit Tool',
      description: 'Outil automatisé d\'audit de sécurité pour applications web',
      tech: ['Python', 'Docker', 'PostgreSQL'],
      status: 'production',
      icon: Shield
    },
    {
      name: '3xF Defender',
      description: 'Système de détection et réponse aux incidents en temps réel',
      tech: ['Go', 'Redis', 'Elasticsearch'],
      status: 'beta',
      icon: Terminal
    },
    {
      name: '3xF Forensics',
      description: 'Kit d\'outils pour l\'analyse forensique numérique',
      tech: ['C++', 'Python', 'SQLite'],
      status: 'development',
      icon: Code
    },
    {
      name: '3xF Intel',
      description: 'Plateforme de threat intelligence et IOC management',
      tech: ['TypeScript', 'Node.js', 'MongoDB'],
      status: 'planning',
      icon: Database
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'production': return 'success';
      case 'beta': return 'cyan';
      case 'development': return 'alert';
      case 'planning': return 'steel';
      default: return 'steel';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'production': return 'En production';
      case 'beta': return 'Version bêta';
      case 'development': return 'En développement';
      case 'planning': return 'En planification';
      default: return 'Statut inconnu';
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-steel/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-orbitron font-bold text-cyan mb-4">
            NOS PROJETS
          </h2>
          <p className="text-lg font-mono text-gray-400 max-w-2xl mx-auto">
            Outils open source et solutions développées par notre équipe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-steel/20 rounded-xl border border-steel/40 hover:border-cyan/50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan/10"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-cyan/20 rounded-lg flex items-center justify-center border border-cyan/40">
                    <project.icon className="w-5 h-5 text-cyan" />
                  </div>
                  <div>
                    <h3 className="text-lg font-orbitron font-bold text-white">
                      {project.name}
                    </h3>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-mono border`}>
                      <div className={`w-2 h-2 rounded-full mr-2 bg-${getStatusColor(project.status)}`}></div>
                      <span className={`text-${getStatusColor(project.status)}`}>
                        {getStatusText(project.status)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg bg-steel/30 hover:bg-steel/50 text-cyan hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-steel/30 hover:bg-steel/50 text-cyan hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Project Description */}
              <p className="font-mono text-sm text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-primary/30 border border-steel/40 rounded-full font-mono text-xs text-cyan"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-steel/30 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${
                    project.status === 'production' ? 'from-success to-success/80 w-full' :
                    project.status === 'beta' ? 'from-cyan to-cyan/80 w-3/4' :
                    project.status === 'development' ? 'from-alert to-alert/80 w-1/2' :
                    'from-steel to-steel/80 w-1/4'
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Link */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/3xF-Security"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-steel/20 border border-steel/40 hover:border-cyan/50 rounded-lg font-mono text-cyan hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan/10"
          >
            <Github className="w-5 h-5" />
            <span>Voir tous nos projets sur GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;