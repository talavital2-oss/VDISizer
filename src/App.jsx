import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import VdiArchitectCalculator from './components/VdiArchitectCalculator';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [theme, setTheme] = useState('dark');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('vdi-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('vdi-theme', theme);
  }, [theme]);

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('vdi-projects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        console.error('Failed to load projects:', e);
      }
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('vdi-projects', JSON.stringify(projects));
  }, [projects]);

  const handleCreateProject = ({ name, description }) => {
    const newProject = {
      id: Date.now().toString(),
      name,
      description,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      data: null,
    };

    setProjects((prev) => [newProject, ...prev]);
    setCurrentProject(newProject);
    setCurrentView('calculator');
  };

  const handleOpenProject = (project) => {
    setCurrentProject(project);
    setCurrentView('calculator');
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      if (currentProject?.id === projectId) {
        setCurrentProject(null);
        setCurrentView('home');
      }
    }
  };

  const handleSaveProject = (data) => {
    if (currentProject) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === currentProject.id
            ? { ...p, data, lastModified: new Date().toISOString() }
            : p
        )
      );
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setCurrentProject(null);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  if (currentView === 'home') {
    return (
      <HomePage
        projects={projects}
        onOpenProject={handleOpenProject}
        onCreateProject={handleCreateProject}
        onDeleteProject={handleDeleteProject}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <VdiArchitectCalculator
      project={currentProject}
      onSave={handleSaveProject}
      onBack={handleBackToHome}
      theme={theme}
      onToggleTheme={toggleTheme}
    />
  );
}

export default App;
